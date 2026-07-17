from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field, field_validator
from typing import Dict, Any, Union, List
import ee
import os
import json
import io
import requests

# --- VERIFICACIÓN DE DEPENDENCIAS CRÍTICAS ---
try:
    from reportlab.lib.pagesizes import letter
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib import colors
    REPORTLAB_DISPONIBLE = True
except ImportError:
    REPORTLAB_DISPONIBLE = False

app = FastAPI(
    title="Geoportal Nacional Peruano API",
    description="Backend de alto rendimiento para análisis geoespacial automatizado con Google Earth Engine",
    version="3.0.0"
)

# --- MIDDLEWARE CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- INICIALIZACIÓN SEGURO DE GOOGLE EARTH ENGINE ---
def inicializar_gee():
    try:
        gee_json_env = os.environ.get("GEE_JSON")
        if gee_json_env:
            info_credenciales = json.loads(gee_json_env)
            credentials = ee.ServiceAccountCredentials(
                info_credenciales['client_email'], 
                key_data=json.dumps(info_credenciales)
            )
            ee.Initialize(credentials, project='ee-tesistambopata1')
            return "Producción (Variables de Entorno)"
        
        ruta_json_local = "ee-tesistambopata1-ecf622e54bef.json" 
        if os.path.exists(ruta_json_local):
            credentials = ee.ServiceAccountCredentials.from_json_keyfile(ruta_json_local)
            ee.Initialize(credentials, project='ee-tesistambopata1')
            return f"Local ({ruta_json_local})"
        
        ee.Initialize(project='ee-tesistambopata1')
        return "Por Defecto (GCloud CLI)"
    except Exception as e:
        print(f"❌ Error crítico en inicialización GEE: {str(e)}")
        return None

entorno_gee = inicializar_gee()
if entorno_gee:
    print(f"✔ GEE conectado exitosamente en entorno: {entorno_gee}")

# --- MODELOS DE DATOS Y VALIDADORES ---
 INDICES_SOPORTADOS = ["NDVI", "EVI", "SAVI", "GCI", "MSAVI", "ARVI", "NDRE", "NDWI", "MNDWI", "NDMI", "LSWI", "NDSI", "BAI", "BSI", "NBR", "CRI"]

class ConsultaMapa(BaseModel):
    indice: str = Field(..., description="Siglas del índice espectral a calcular")
    anio: Union[int, str] = Field(..., alias="año", description="Año de análisis temporal")
    geometria: Dict[str, Any] = Field(..., description="GeoJSON de la geometría de interés")

    @field_validator('anio', mode='before')
    @classmethod
    def limpiar_y_validar_anio(cls, v):
        try:
            anio_int = int(v)
            if anio_int < 1984 or anio_int > 2026:
                raise ValueError("El año de consulta debe estar entre 1984 y el año actual.")
            return anio_int
        except (ValueError, TypeError):
            raise ValueError("El año debe ser un número entero válido.")

    @field_validator('indice')
    @classmethod
    def validar_indice(cls, v):
        if v.upper() not in INDICES_SOPORTADOS:
            raise ValueError(f"Índice '{v}' no soportado. Lista permitida: {', '.join(INDICES_SOPORTADOS)}")
        return v.upper()

    @property
    def año(self) -> int:
        return int(self.anio)

class DatosReportePDF(ConsultaMapa):
    departamento: str = Field(..., example="Madre de Dios")
    provincia: str = Field(..., example="Tambopata")
    distrito: str = Field(..., example="Tambopata")
    satelite: str = Field(..., example="Sentinel-2")


# --- PROCESADORES OPTIMIZADOS DE IMÁGENES ---
def obtener_imagen_por_año(año: int, region_ee: ee.Geometry) -> ee.Image:
    start_date = f"{año}-01-01"
    end_date = f"{año}-12-31"

    # Restricción lógica automatizada de satélites por línea de tiempo histórica
    if año >= 2015:  # Sentinel-2 MSI
        coleccion = (ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                     .filterDate(start_date, end_date)
                     .filterBounds(region_ee)  
                     .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 40)))
        if coleccion.size().getInfo() == 0:
            raise ValueError(f"No hay escenas Sentinel-2 con nubosidad menor al 40% para el año {año}.")
        return coleccion.median().select(['B2', 'B3', 'B4', 'B5', 'B8', 'B11'], ['BLUE', 'GREEN', 'RED', 'RED_EDGE', 'NIR', 'SWIR'])

    elif año >= 2013:  # Landsat 8 OLI
        coleccion = (ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
                     .filterDate(start_date, end_date)
                     .filterBounds(region_ee)
                     .filter(ee.Filter.lt('CLOUD_COVER', 40)))
        if coleccion.size().getInfo() == 0:
            raise ValueError(f"No hay escenas Landsat 8 con nubosidad menor al 40% para el año {año}.")
        return coleccion.median().select(['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6'], ['BLUE', 'GREEN', 'RED', 'NIR', 'SWIR']).addBands(ee.Image(0).rename('RED_EDGE'))

    else:  # Landsat 5 TM (Histórico)
        if año < 1984:
            raise ValueError("El archivo histórico digital solo cuenta con registros estables desde 1984.")
        coleccion = (ee.ImageCollection('LANDSAT/LT05/C02/T1_L2')
                     .filterDate(start_date, end_date)
                     .filterBounds(region_ee)
                     .filter(ee.Filter.lt('CLOUD_COVER', 40)))
        if coleccion.size().getInfo() == 0:
            raise ValueError(f"Archivo histórico Landsat 5 sin coberturas limpias de nubes para el año {año}.")
        return coleccion.median().select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5'], ['BLUE', 'GREEN', 'RED', 'NIR', 'SWIR']).addBands(ee.Image(0).rename('RED_EDGE'))


def calcular_todos_los_indices(image: ee.Image, indice_nombre: str, año: int) -> ee.Image:
    blue, green, red, red_edge = image.select('BLUE'), image.select('GREEN'), image.select('RED'), image.select('RED_EDGE')
    nir, swir = image.select('NIR'), image.select('SWIR')
    ind = indice_nombre.upper()

    # Corrección matemática adaptativa para NDRE en sensores antiguos sin banda RedEdge
    if ind == "NDRE" and año < 2015:
        red_edge = red.add(nir).multiply(0.5).rename('RED_EDGE')

    dicc_bandas = {'BLUE': blue, 'GREEN': green, 'RED': red, 'RED_EDGE': red_edge, 'NIR': nir, 'SWIR': swir}

    formulas = {
        "NDVI": "image.normalizedDifference(['NIR', 'RED'])",
        "EVI": "image.expression('2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', dicc_bandas)",
        "SAVI": "image.expression('((NIR - RED) / (NIR + RED + 0.5)) * 1.5', dicc_bandas)",
        "GCI": "image.expression('(NIR / GREEN) - 1', dicc_bandas)",
        "MSAVI": "image.expression('(2 * NIR + 1 - ((2 * NIR + 1)**2 - 8 * (NIR - RED))**0.5) / 2', dicc_bandas)",
        "ARVI": "image.expression('(NIR - (RED - (BLUE - RED))) / (NIR + (RED - (BLUE - RED)))', dicc_bandas)",
        "NDRE": "image.normalizedDifference(['NIR', 'RED_EDGE'])",
        "NDWI": "image.normalizedDifference(['GREEN', 'NIR'])",
        "MNDWI": "image.normalizedDifference(['GREEN', 'SWIR'])",
        "NDMI": "image.normalizedDifference(['NIR', 'SWIR'])",
        "LSWI": "image.normalizedDifference(['NIR', 'SWIR'])",
        "NDSI": "image.normalizedDifference(['GREEN', 'SWIR'])",
        "BAI": "image.expression('(SWIR / RED) - 1', dicc_bandas)",
        "BSI": "image.expression('((SWIR + RED) - (NIR + BLUE)) / ((SWIR + RED) + (NIR + BLUE))', dicc_bandas)",
        "NBR": "image.normalizedDifference(['NIR', 'SWIR'])",
        "CRI": "image.expression('(SWIR / GREEN) - 1', dicc_bandas)"
    }

    ejecucion_eval = eval(formulas.get(ind, "image.normalizedDifference(['NIR', 'RED'])"))
    return ejecucion_eval.rename(ind)


def obtener_paleta_y_rangos(indice_nombre: str):
    ind = indice_nombre.upper()
    if ind in ["NDVI", "EVI", "SAVI", "GCI", "MSAVI", "ARVI", "NDRE"]:
        return ['#4a3319', '#8c6239', '#c69c6d', '#e6d594', '#b3e09b', '#78c679', "#25b904", '#238443', "#008A2A"], -0.05, 0.85
    elif ind in ["NDWI", "MNDWI", "NDMI", "LSWI"]:
        return ['#fcfaf2', '#d0f4de', '#a8ded9', '#43a2ca', '#0868ac', '#012a4a'], -0.15, 0.70
    elif ind == "NDSI":
        return ['#ffffff', '#e0f7fa', '#80deea', '#00b4d8', '#003049'], 0.15, 0.90
    elif ind == "BSI":
        return ['#005f73', '#94d2bd', '#e9d8a6', '#ee9b00', '#ca6702', '#9b2226'], -0.20, 0.50
    else:
        return ['#2b9348', '#e5e5e5', '#f4a261', '#e76f51', '#b7094c', '#510a32'], -0.25, 0.65


# --- PIPELINE CENTRAL DE CÁLCULO (DRY PRINCIPLE) ---
def ejecutar_pipeline_analisis(datos: ConsultaMapa):
    # Solución de geometrías rotas (Autofix topológico nativo)
    region_ee = ee.Geometry(datos.geometria, 'EPSG:4326').buffer(0)
    
    imagen_base = obtener_imagen_por_año(datos.año, region_ee)
    resultado_indice = calcular_todos_los_indices(imagen_base, datos.indice, datos.año)
    resultado_recortado = resultado_indice.clip(region_ee)
    
    scale_calc = 10 if datos.año >= 2015 else 30
    area_km2 = round(region_ee.area(maxError=1).getInfo() / 1000000.0, 2)
    
    estadisticas = resultado_recortado.reduceRegion(
        reducer=ee.Reducer.mean().combine(reducer2=ee.Reducer.max(), sharedInputs=True).combine(reducer2=ee.Reducer.min(), sharedInputs=True),
        geometry=region_ee,
        scale=scale_calc,
        maxPixels=1e9
    ).getInfo()
    
    nombre_banda = datos.indice.upper()
    return {
        "imagen_ee": resultado_recortado,
        "region_ee": region_ee,
        "scale": scale_calc,
        "area_km2": area_km2,
        "val_prom": f"{round(estadisticas.get(f'{nombre_banda}_mean') or 0.0, 3):.3f}",
        "val_max": f"{round(estadisticas.get(f'{nombre_banda}_max') or 0.0, 3):.3f}",
        "val_min": f"{round(estadisticas.get(f'{nombre_banda}_min') or 0.0, 3):.3f}"
    }


# --- ENDPOINTS CORE ---

@app.post("/calcular-indice-zona")
def procesar_mapa_zona(datos: ConsultaMapa):
    try:
        pipeline = ejecutar_pipeline_analisis(datos)
        paleta, min_val, max_val = obtener_paleta_y_rangos(datos.indice)
        map_id_dict = pipeline["imagen_ee"].getMapId({'min': min_val, 'max': max_val, 'palette': paleta})
        
        return {
            "status": "success",
            "indice": datos.indice.upper(),
            "año": datos.año,
            "tile_url": map_id_dict['tile_fetcher'].url_format,
            "area_km2": pipeline["area_km2"],
            "val_prom": pipeline["val_prom"],
            "val_max": pipeline["val_max"],
            "val_min": pipeline["val_min"]
        }
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error en GEE: {str(e)}")


@app.post("/descargar-tiff")
def descargar_tiff_zona(datos: ConsultaMapa):
    try:
        pipeline = ejecutar_pipeline_analisis(datos)
        url_descarga = pipeline["imagen_ee"].getDownloadURL({
            'scale': pipeline["scale"],
            'crs': 'EPSG:4326',
            'region': pipeline["region_ee"],
            'format': 'GEO_TIFF'
        })
        return {"status": "success", "download_url": url_descarga}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@app.post("/descargar-pdf")
def descargar_pdf_reporte(datos: DatosReportePDF):
    if not REPORTLAB_DISPONIBLE:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="ReportLab ausente.")
        
    try:
        # El backend autogestiona el cálculo matemático para evitar adulteraciones del cliente
        pipeline = ejecutar_pipeline_analisis(datos)
        
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter, rightMargin=45, leftMargin=45, topMargin=45, bottomMargin=45)
        story = []
        
        styles = getSampleStyleSheet()
        style_titulo = ParagraphStyle('T1', parent=styles['Heading1'], fontSize=16, textColor=colors.HexColor('#0F3A20'), spaceAfter=12)
        style_sub = ParagraphStyle('T2', parent=styles['Heading2'], fontSize=12, textColor=colors.HexColor('#2C3E50'), spaceAfter=8)
        style_txt = ParagraphStyle('TXT', parent=styles['Normal'], fontSize=10, leading=14)
        style_th = ParagraphStyle('TH', parent=styles['Normal'], fontSize=10, fontName='Helvetica-Bold', textColor=colors.white)

        story.append(Paragraph("GEOPORTAL NACIONAL PERUANO — INFORME DE ANÁLISIS RÁSTER", style_titulo))
        story.append(Paragraph(f"<b>Área de Estudio:</b> {datos.departamento} / {datos.provincia} / {datos.distrito}", style_txt))
        story.append(Paragraph(f"<b>Sensor Satelital:</b> {datos.satelite} | <b>Motor de Procesamiento:</b> Google Earth Engine", style_txt))
        story.append(Spacer(1, 15))
        
        story.append(Paragraph("Estadísticas de la Región de Interés (ROI)", style_sub))
        
        tabla_datos = [
            [Paragraph("Parámetro de Control", style_th), Paragraph("Valor en Matriz de Píxeles", style_th)],
            [Paragraph("Índice Espectral Evaluado", style_txt), Paragraph(datos.indice.upper(), style_txt)],
            [Paragraph("Dimensión de la Muestra (Área)", style_txt), Paragraph(f"{pipeline['area_km2']} km²", style_txt)],
            [Paragraph("Resolución del Píxel Analizado", style_txt), Paragraph(f"{pipeline['scale']} Metros", style_txt)],
            [Paragraph("Valor Promedio (Mean)", style_txt), Paragraph(pipeline["val_prom"], style_txt)],
            [Paragraph("Valor Máximo Registrado (Max)", style_txt), Paragraph(pipeline["val_max"], style_txt)],
            [Paragraph("Valor Mínimo Registrado (Min)", style_txt), Paragraph(pipeline["val_min"], style_txt)],
        ]
        
        t = Table(tabla_datos, colWidths=[240, 240])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (1,0), colors.HexColor('#0F3A20')),
            ('ALIGN', (0,0), (-1,-1), 'LEFT'),
            ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor('#F4F6F6'), colors.white]),
            ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#BDC3C7')),
            ('TOPPADDING', (0,0), (-1,-1), 6),
            ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ]))
        story.append(KeepTogether([t]))
        story.append(Spacer(1, 20))
        
        story.append(Paragraph("<b>Certificación Técnica:</b> Datos calculados dinámicamente mediante el procesamiento de colecciones satelitales calibradas de reflectancia en superficie (Level-2A / Tier 1). Sistema de Referencia Geográfico: WGS84 (EPSG:4326).", style_txt))
        
        doc.build(story)
        buffer.seek(0)
        
        return StreamingResponse(
            buffer, 
            media_type="application/pdf", 
            headers={"Content-Disposition": f"attachment; filename=REPORTE_{datos.indice.upper()}_{datos.año}.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Falla al compilar el PDF dinámico: {str(e)}")


@app.post("/descargar-shp")
def descargar_shp_data(datos: DatosReportePDF):
    try:
        # El pipeline repara topológicamente la geometría enviada por el mapa
        pipeline = ejecutar_pipeline_analisis(datos)
        
        # Inyección de metadatos al archivo tabular (.dbf) embebido del Shapefile
        feature = ee.Feature(pipeline["region_ee"], {
            'DEPARTAMEN': datos.departamento[:254],  # Restricción de longitud estándar en formato DBF
            'PROVINCIA': datos.provincia[:254],
            'DISTRITO': datos.distrito[:254],
            'INDICE': datos.indice.upper(),
            'ANIO': int(datos.año),
            'AREA_KM2': float(pipeline["area_km2"]),
            'VAL_PROM': float(pipeline["val_prom"])
        })
        
        fc = ee.FeatureCollection([feature])
        
        # Generación nativa del empaquetado binario por los servidores de Google
        url_shp_gee = fc.getDownloadURL(
            filetype='SHP', 
            selectors=['DEPARTAMEN', 'PROVINCIA', 'DISTRITO', 'INDICE', 'ANIO', 'AREA_KM2', 'VAL_PROM'], 
            filename='Capa_Geoportal_Nacional'
        )
        
        respuesta_gee = requests.get(url_shp_gee, timeout=30)
        if respuesta_gee.status_code != 200:
            raise ValueError("Google Earth Engine rechazó la solicitud de conversión a Shapefile.")
            
        buffer_zip = io.BytesIO(respuesta_gee.content)
        buffer_zip.seek(0)
        
        filename_limpio = f"SHP_{datos.departamento}_{datos.provincia}_{datos.distrito}".replace(" ", "_")
        return StreamingResponse(
            buffer_zip, 
            media_type="application/zip", 
            headers={"Content-Disposition": f"attachment; filename={filename_limpio}.zip"}
        )
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error en empaquetado vectorial SHP real: {str(e)}")


# --- ENRUTAMIENTO ESTÁTICO ---
@app.get("/", response_class=HTMLResponse)
def read_root():
    if os.path.exists("index.html"):
        return FileResponse("index.html")
    return "<h1>✔ Servidor Backend Activo de Alto Rendimiento</h1>"

app.mount("/", StaticFiles(directory=".", html=True), name="static")
