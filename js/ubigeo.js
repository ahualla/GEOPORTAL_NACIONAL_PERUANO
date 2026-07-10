// Estructura oficial de Departamentos, Provincias y Distritos del Perú
const dataUbigeo = {
    "Amazonas": {
        "Chachapoyas": ["Chachapoyas", "Asuncion", "Balsa", "Cheto", "Chiliquin", "Chuquibamba", "Granada", "Huancas", "La Jalca", "Leimebamba", "Levanto", "Magdalena", "Mariscal Castilla", "Molinopampa", "Montevideo", "Olleros", "Granada", "Quinjalca", "San Francisco de Daguas", "San Isidro de Maino", "Soloco", "Sonche"],
        "Bagua": ["Bagua", "Aramango", "Copallin", "El Parco", "Imaza", "La Peca"],
        "Bongará": ["Jumbilla", "Chisquilla", "Churuja", "Corosha", "Cuispes", "Florida", "Jazan", "Recta", "San Carlos", "Shipasbamba", "Valera", "Yambrasbamba"],
        "Condorcanqui": ["Nieva", "El Cenepa", "Rio Santiago"],
        "Luya": ["Lamud", "Camporredondo", "Cocabamba", "Colcamar", "Conila", "Inguilpata", "Longuita", "Lonya Chico", "Luya", "Luya Viejo", "Maria", "Ocalli", "Ocumal", "Pisuquia", "Providencia", "San Cristobal", "San Francisco del Yeso", "San Jeronimo", "San Juan de Lopecancha", "Santa Catalina", "Santo Tomas", "Tingo", "Trita"],
        "Rodriguez de Mendoza": ["San Nicolas", "Chirimoto", "Cochamal", "Huambo", "Limabamba", "Longar", "Mariscal Benavides", "Milpuc", "Omia", "Santa Rosa", "Totora", "Vista Alegre"],
        "Utcubamba": ["Bagua Grande", "Cajaruro", "Cumba", "El Milagro", "Jamalca", "Lonya Grande", "Yamon"]
    },
    "Ancash": {
        "Huaraz": ["Huaraz", "Cochabamba", "Colcabamba", "Huanchay", "Independencia", "Jangas", "La Libertad", "Olleros", "Pampas Grande", "Pariacoto", "Pira", "Tarica"],
        "Aija": ["Aija", "Coris", "Huacllan", "La Merced", "Succha"],
        "Antonio Raymondi": ["Llamellin", "Aczo", "Chaccho", "Chingas", "Murga", "San Juan de Rontoy"],
        "Asuncion": ["Chacas", "Acochaca"],
        "Bolognesi": ["Chiquian", "Abelardo Pardo Lezameta", "Antonio Raymondi", "Aquia", "Cajacay", "Canis", "Colquioc", "Huallanca", "Huasta", "Huayllacayán", "Mangas", "Pacllon", "San Miguel de Corpanqui", "Ticllos"],
        "Carhuaz": ["Carhuaz", "Acopampa", "Amashca", "Anta", "Ataquero", "Marcará", "Pariahuanca", "San Miguel de Aco", "Shilla", "Tinco", "Yungar"],
        "Carlos Fermin Fitzcarrald": ["San Luis", "San Nicolas", "Yauya"],
        "Casma": ["Casma", "Buenavista Alta", "Comandante Noel", "Yautan"],
        "Corongo": ["Corongo", "Aco", "Bambas", "Cusca", "La Pampa", "Yanan", "Yupan"],
        "Huari": ["Huari", "Anra", "Cajay", "Chavin de Huantar", "Huacachi", "Huacchis", "Huachis", "Huantar", "Masin", "Paucas", "Ponto", "Rahuapampa", "Rapayan", "San Marcos", "San Pedro de Chana", "Uco"],
        "Huarmey": ["Huarmey", "Cochapeti", "Culebras", "Huayan", "Malvas"],
        "Huaylas": ["Caraz", "Huallanca", "Huata", "Huaylas", "Mato", "Pamparomas", "Pueblo Libre", "Santa Cruz", "Santo Toribio", "Yuracmarca"],
        "Mariscal Luzuriaga": ["Piscobamba", "Casca", "Eleazar Guzman Barron", "Fidel Olivas Escudero", "Llama", "Llumpa", "Lucma", "Musga"],
        "Ocros": ["Ocros", "Acapa", "Cajamarquilla", "Carhuapampa", "Cochas", "Congas", "Llipa", "San Cristobal de Rajan", "San Pedro", "Santiago de Chilcas"],
        "Pallasca": ["Cabana", "Bolognesi", "Conchucos", "Huacaschuque", "Huandoval", "Lacabamba", "Llapo", "Pallasca", "Pampas", "Santa Rosa", "Tauca"],
        "Pomabamba": ["Pomabamba", "Huayllan", "Parobamba", "Quinuabamba"],
        "Recuay": ["Recuay", "Catac", "Cotaparaco", "Huayllapampa", "Llacllin", "Marca", "Pampas Chico", "Pararin", "Tapacocha", "Ticapampa"],
        "Santa": ["Chimbote", "Caceres del Peru", "Coishco", "Macate", "Moro", "Nepeña", "Samanco", "Santa", "Nuevo Chimbote"],
        "Sihuas": ["Sihuas", "Acobamba", "Alfonso Ugarte", "Cashapampa", "Chingalpo", "Huayllabamba", "Quiches", "Ragash", "San Juan", "Sicsibamba"],
        "Yungay": ["Yungay", "Cascapara", "Mancos", "Matacoto", "Quillo", "Ranrahirca", "Shupluy", "Yanama"]
    },
    "Apurimac": {
        "Abancay": ["Abancay", "Chacoche", "Circa", "Curahuasi", "Huanipaca", "Lambrama", "Pichirhua", "San Pedro de Cachora", "Tamburco"],
        "Andahuaylas": ["Andahuaylas", "Andarapa", "Chiara", "Huancarama", "Huancaray", "Huayana", "Kishuara", "Pacobamba", "Pacucha", "Pampachiri", "Pomacocha", "San Antonio de Cachi", "San Jeronimo", "San Miguel de Chaccrampa", "Santa Maria de Chicmo", "Talavera", "Tumay Huaraca", "Turpo", "Kaquiabamba"],
        "Antabamba": ["Antabamba", "El Oro", "Huaquirca", "Juan Espinoza Medrano", "Oropesa", "Sabaino", "Sabaino"],
        "Aymaraes": ["Chalhuanca", "Capaya", "Caraybamba", "Chapimarca", "Colcabamba", "Cotaruse", "Ihuayllo", "Justo Apu Sahuaraura", "Lucre", "Pocohuanca", "San Juan de Chacña", "Sañayca", "Soraya", "Tapairihua", "Tintay", "Toraya"],
        "Cotabambas": ["Tambobamba", "Cotabambas", "Coyllurqui", "Haquira", "Mara", "Challhuahuacho"],
        "Chincheros": ["Chincheros", "Anco_Huallo", "Cocharcas", "Huaccana", "Ocobamba", "Ongoy", "Uranmarca", "Ranracancha"],
        "Grau": ["Chuquibambilla", "Curbasco", "Curasco", "Gamarra", "Huayllati", "Mamara", "Mariscal Gamarra", "Micaela Bastidas", "Pataypampa", "Progreso", "San Antonio", "Santa Rosa", "Turpay", "Vilcabamba"]
    },
    "Arequipa": {
        "Arequipa": ["Arequipa", "Alto Selva Alegre", "Cayma", "Cerro Colorado", "Characato", "Chiguata", "Jacobo Hunter", "La Joya", "Mariano Melgar", "Miraflores", "Mollebaya", "Paucarpata", "Pocsi", "Polobaya", "Quequeña", "Sabandia", "Sachaca", "San Juan de Siguas", "San Juan de Tarucani", "Santa Isabel de Siguas", "Santa Rita de Siguas", "Socabaya", "Tiabaya", "Uchumayo", "Vitor", "Yanahuara", "Yarabamba", "Yura", "Jose Luis Bustamante Y Rivero"],
        "Camaná": ["Camana", "Jose Maria Quimper", "Mariano Nicolas Valcarcel", "Mariscal Caceres", "Nicolas de Pierola", "Ocoña", "Quilca", "Samuel Pastor"],
        "Caravelí": ["Caraveli", "Acari", "Atico", "Atiquipa", "Bella Union", "Cahuacho", "Chala", "Chaparra", "Huanuhuanu", "Jaqui", "Lomas", "Quicacha", "Yauca"],
        "Castilla": ["Aplao", "Andagua", "Ayo", "Chachas", "Chilcaymarca", "Choco", "Huancarqui", "Machaguay", "Orcopampa", "Pampacolca", "Tipan", "Uñon", "Uraca", "Viraco"],
        "Caylloma": ["Chivay", "Achoma", "Cabanaconde", "Callalli", "Caylloma", "Coporaque", "Huambo", "Huanca", "Ichupampa", "Lari", "Lluta", "Maca", "Madrigal", "San Antonio de Chuca", "Sibayo", "Tisco", "Tuti", "Yanque", "Majes"],
        "Condesuyos": ["Chuquibamba", "Andaray", "Cayarani", "Chichas", "Iray", "Rio Grande", "Salamanca", "Yanaquihua"],
        "Islay": ["Mollendo", "Cocachacra", "Dean Valdivia", "Isly", "Mejia", "Punta de Bombón"],
        "La Unión": ["Cotahuasi", "Alca", "Charcana", "Huaynacotas", "Pampamarca", "Puyca", "Quechualla", "Sayla", "Tauria", "Tomepampa", "Toro"]
    },
    "Ayacucho": {
        "Huamanga": ["Ayacucho", "Acocro", "Acos Vinchos", "Carmen Alto", "Chiara", "Ocros", "Pacaycasa", "Quinua", "San Jose de Ticllas", "San Juan Bautista", "Santiago de Pischa", "Socos", "Tambillo", "Vinchos", "Jesus Nazareno"],
        "Cangallo": ["Cangallo", "Chuschi", "Los Morochucos", "Maria Parado de Bellido", "Paras", "Totos"],
        "Huanca Sancos": ["Sancos", "Carapo", "Sacsamarca", "Santiago de Lucanamarca"],
        "Huanta": ["Huanta", "Ayahuanco", "Huamanguilla", "Iguain", "Luricocha", "Santillana", "Sivia", "Llochegua"],
        "La Mar": ["San Miguel", "Anco", "Ayna", "Chilcas", "Chungui", "Luis Carranza", "Santa Rosa", "Tamban", "Samugari"],
        "Lucanas": ["Puquio", "Aucara", "Cabana", "Carmen Salcedo", "Chaviña", "Chipao", "Huac-Huas", "Laramate", "Leoncio Prado", "Llauta", "Lucanas", "Ocaña", "San Pedro", "San Pedro de Palco", "Sancos", "Santa Ana de Huaycahuacho", "Santa Lucia"],
        "Parinacochas": ["Coracora", "Chumpi", "Coronel Castañeda", "Pacapausa", "Pullo", "Puyusca", "San Francisco de Ravacayco", "Upahuacho"],
        "Páucar del Sara Sara": ["Pausa", "Colta", "Corculla", "Lampa", "Marcabamba", "Oyolo", "Pararca", "San Javier de Alpabamba", "San Jose de Ushua", "Sara Sara"],
        "Sucre": ["Querobamba", "Belén", "Chalcos", "Chilcayoc", "Huacaña", "Morcolla", "Paico", "San Pedro de Larcay", "San Salvador de Quije", "Santiago de Paucaray", "Soras", "Huancapi"],
        "Víctor Fajardo": ["Huancapi", "Alcamenca", "Apongo", "Asquipata", "Canaria", "Cayara", "Colca", "Huamanquiquia", "Huancaraylla", "Huaya", "Sarhua", "Vilcanchos"],
        "Vilcas Huamán": ["Vilcas Huaman", "Accomarca", "Carhuanca", "Concepcion", "Huambalpa", "Independencia", "Saurama", "Vischongo"]
    },
    "Cajamarca": {
        "Cajamarca": ["Cajamarca", "Asuncion", "Chetilla", "Cospan", "Encañada", "Jesus", "Llacanora", "Los Baños del Inca", "Magdalena", "Matara", "Namora", "San Juan"],
        "Cajabamba": ["Cajabamba", "Cachachi", "Condebamba", "Sitacocha"],
        "Celendín": ["Celendin", "Chumuch", "Cortegana", "Huasmin", "Jorge Chavez", "Jose Galvez", "Miguel Iglesias", "Oxamarca", "Sorochuco", "Sucre", "Utco", "La Libertad de Pallan"],
        "Chota": ["Chota", "Anguia", "Chadin", "Chalamarca", "Chiguirip", "Chimban", "Cochabamba", "Conchan", "Huambos", "Llama", "Miracosta", "Paccha", "Pion", "Querocoto", "San Juan de Licupis", "Tacabamba", "Tocmoche", "Choropampa"],
        "Contumazá": ["Contumaza", "Chilete", "Cupisnique", "Guzmango", "San Benito", "Santa Cruz de Toledo", "Tantarica", "Yonan"],
        "Cutervo": ["Cutervo", "Callayuc", "Choros", "Cujillo", "La Ramada", "Pimpingos", "Querocotillo", "San Andres de Cutervo", "San Juan de Cutervo", "San Luis de Lucma", "Santa Cruz", "Santo Domingo de la Capilla", "Santo Tomas"],
        "Hualgayoc": ["Bambamarca", "Chugur", "Hualgayoc"],
        "Jaén": ["Jaen", "Bellavista", "Chontali", "Colasay", "Huabal", "Las Pirias", "Pomahuaca", "Pucara", "Sallique", "San Felipe", "San Jose del Alto", "Santa Rosa"],
        "San Ignacio": ["San Ignacio", "Chirinos", "Huarango", "La Coipa", "Namballe", "San Jose de Lourdes", "Tabaconas"],
        "San Marcos": ["Pedro Galvez", "Eduardo Villanueva", "Gregorio Pita", "Ichocan", "Jose Manuel Quiroz", "Jose Sabogal", "Chancay"],
        "San Miguel": ["San Miguel", "San Miguel", "Calquis", "Catilluc", "El Prado", "Llapa", "Nanchoc", "Niepos", "San Gregorio", "San Silvestre de Cochan", "Tongod", "Union Agua Blanca"],
        "San Pablo": ["San Pablo", "San Bernardino", "San Luis", "Tumbaden"],
        "Santa Cruz": ["Santa Cruz", "Andabamba", "Catache", "Chancaybaños", "La Esperanza", "Ninabamba", "Pulan", "Saucepampa", "Sexi", "Uticyacu", "Yauyucan"]
    },
    "Cusco": {
        "Cusco": ["Cusco", "Ccorca", "Poroy", "San Jeronimo", "San Sebastian", "Santiago", "Saylla", "Wanchaq"],
        "Acomayo": ["Acomayo", "Acopia", "Acos", "Mosoc Llacta", "Pombochi", "Rondan", "Sangarara"],
        "Anta": ["Anta", "Ancahuasi", "Cachimayo", "Chinchaypuquio", "Huarocondo", "Limatambo", "Mollepata", "Pucyura", "Zurite"],
        "Calca": ["Calca", "Coya", "Lamay", "Lares", "Pisac", "San Salvador", "Taray", "Yanatile"],
        "Canas": ["Yanaoca", "Checca", "Kunturkanki", "Langui", "Layo", "Pampamarca", "Quehue", "Tupac Amaru"],
        "Canchis": ["Sicuani", "Checacupe", "Combapata", "Marangani", "Pitumarca", "San Pablo", "San Pedro", "Tinta"],
        "Chumbivilcas": ["Santo Tomas", "Capacmarca", "Chamaca", "Colquemarca", "Livitaca", "Llusco", "Quiñota", "Velille"],
        "Espinar": ["Yauri", "Condoroma", "Coporaque", "Ocoruro", "Pallpata", "Pichigua", "Suyckutambo", "Alto Pichigua"],
        "La Convención": ["Quillabamba", "Echarate", "Huayopata", "Maranura", "Ocobamba", "Pichari", "Quellouno", "Santa Ana", "Santa Teresa", "Vilcabamba", "Kimbiri"],
        "Paruro": ["Paruro", "Accha", "Ccapi", "Colcha", "Huanoquite", "Omacha", "Paccaritambo", "Pillpinto", "Yaurisque"],
        "Paucartambo": ["Paucartambo", "Caicay", "Challabamba", "Colquepata", "Huancarani", "Kosñipata"],
        "Quispicanchi": ["Urcos", "Andahuaylillas", "Camanti", "Ccarhuayo", "Ccatca", "Cusipata", "Lucre", "Marcapata", "Ocongate", "Oropesa", "Quiquijana", "Urcos"],
        "Urubamba": ["Urubamba", "Chinchero", "Huayllabamba", "Machupicchu", "Maras", "Ollantaytambo", "Yucay"]
    },
    "Huancavelica": {
        "Huancavelica": ["Huancavelica", "Acobambilla", "Acoria", "Conayca", "Cuenca", "Huachocolpa", "Huayllahuara", "Izcuchaca", "Laria", "Manta", "Mariscal Caceres", "Moya", "Nuevo Occoro", "Palca", "Pilchaca", "Ascencion", "San Jose de Acobambilla"],
        "Acobamba": ["Acobamba", "Andabamba", "Anta", "Caja", "Marcas", "Paucará", "Pomacocha", "Rosario"],
        "Angaraes": ["Lircay", "Anchonga", "Callanmarca", "Congalla", "Chincho", "Huallay-Grande", "Huanca-Huanca", "Julcamarca", "San Antonio de Antaparco", "San Jose de Secce", "Secclla", "Santo Tomas de Pata"],
        "Castrovirreyna": ["Castrovirreyna", "Arma", "Aurahua", "Capillas", "Chupamarca", "Cocas", "Huachos", "Huamatambo", "Ticrapo", "Mollepampa", "San Juan", "Santa Ana", "Tantara"],
        "Churcampa": ["Churcampa", "Anco", "Chinchihuasi", "El Carmen", "La Merced", "Locroja", "Paucarbamba", "San Pedro de Coris", "Pachamarca"],
        "Huaytará": ["Huaytara", "Ayavi", "Cordova", "Huayacundo Arma", "Laramarca", "Ocoyo", "Pilpichaca", "Querco", "Quito-Arma", "San Antonio de Cusicancha", "San Francisco de Sangayaico", "San Isidro", "Santiago de Chocorvos", "Santiago de Quirahuara", "Santo Domingo de Capillas", "Tambon"],
        "Tayacaja": ["Pampas", "Acostambo", "Acraquia", "Ahuaycha", "Colcabamba", "Daniel Hernandez", "Huachocolpa", "Huaribamba", "Ñahuimpuquio", "Pazos", "Quishuar", "Salcabamba", "Salcahuasi", "San Marcos de Rocchac", "Surcubamba", "Tintay Puncu"]
    },
    "Huánuco": {
        "Huánuco": ["Huanuco", "Amarilis", "Chinchao", "Churubamba", "Margos", "Quisqui", "San Francisco de Cayran", "San Pedro de Chaulan", "Santa Maria del Valle", "Yarumayo", "Pillco Marca"],
        "Ambo": ["Ambo", "Cayna", "Colpas", "Conchamarca", "Huacar", "San Francisco", "San Rafael", "Tomay Kichwa"],
        "Dos de Mayo": ["La Union", "Chuquis", "Marías", "Pachas", "Quivilla", "Ripan", "Shunqui", "Sillapata", "Yanas"],
        "Huacaybamba": ["Huacaybamba", "Canchabamba", "Cochabamba", "Pinra"],
        "Huamalíes": ["Llata", "Arancay", "Chavin de Pariarca", "Jacas Grande", "Jircan", "Monzon", "Punchao", "Puños", "Singa", "Tantamayo"],
        "Leoncio Prado": ["Rupa-Rupa", "Daniel Alomia Robles", "Hermilio Valdizan", "Luyando", "Mariano Damaso Beraun", "Jose Crespo Y Castillo"],
        "Marañón": ["Huacrachuco", "Cholon", "San Buenaventura"],
        "Pachitea": ["Panao", "Chaglla", "Molino", "Umari"],
        "Puerto Inca": ["Puerto Inca", "Codo del Pozuzo", "Honoria", "Tournavista", "Yuyapichis"],
        "Lauricocha": ["Jesus", "Baños", "Jivia", "Queropalca", "Rondan", "San Francisco de Asis", "San Miguel de Cauri"],
        "Yarowilca": ["Chavinillo", "Cahuac", "Chacon", "Aparicio Pomares", "Jacas Chico", "Obas", "Pampamarca", "San Juan de Nupe"]
    },
    "Ica": {
        "Ica": ["Ica", "La Tinguiña", "Los Aquijes", "Ocucaje", "Pachacutec", "Parcona", "Pueblo Nuevo", "Salas", "San Jose de Los Molinos", "San Juan Bautista", "Santiago", "Subtanjalla", "Tate", "Yauca del Rosario"],
        "Nazca": ["Nazca", "Changuillo", "El Ingenio", "Marcona", "Vista Alegre"],
        "Palpa": ["Palpa", "Llipata", "Santa Cruz", "Rio Grande", "Tibillo"],
        "Pisco": ["Pisco", "Huancano", "Humay", "Independencia", "Paracas", "San Andres", "San Clemente", "Tupac Amaru Inca"],
        "Chincha": ["Chincha Alta", "Alto Laran", "Chavin", "Chincha Baja", "El Carmen", "El Recreo", "Grobio Prado", "Pueblo Nuevo", "San Juan de Yanac", "San Pedro de Huacarpana", "Sunampe", "Tambo de Mora"]
    },
    "Junín": {
        "Huancayo": ["Huancayo", "Carhuacallanga", "Chacapampa", "Chicche", "Chilca", "Chongos Alto", "Chupuro", "Colca", "Cullhuas", "El Tambo", "Huacrapuquio", "Hualhuas", "Huancan", "Huasicancha", "Huayucachi", "Ingenio", "Pariahuanca", "Pilcomayo", "Pucara", "Quichuay", "Quilcas", "San Agustin", "San Jeronimo de Tunan", "Saño", "Sapallanga", "Sicaya", "Santo Domingo de Acobamba", "Viques"],
        "Concepción": ["Concepcion", "Aco", "Andamarca", "Chambera", "Cochas", "Comas", "Heroinas Toledo", "Manzanares", "Mariscal Castilla", "Matahuasi", "Mito", "Nueve de Julio", "Orcotuna", "San Jose de Quero", "Santa Rosa de Ocopa"],
        "Chanchamayo": ["Chanchamayo", "Perene", "San Luis de Shuaro", "San Ramon", "Vitoc", "Pichanaqui"],
        "Jauja": ["Jauja", "Acolla", "Apata", "Ataura", "Canchayllo", "Curicaca", "El Mantaro", "Huamali", "Huaripampa", "Huertas", "Janjaillo", "Leonor Ordoñez", "Llocllapampa", "Marco", "Masma", "Masma Chicche", "Molinos", "Monobamba", "Muqui", "Muquiyauyo", "Paca", "Paccha", "Pancan", "Parco", "Pombocha", "Ricran", "San Lorenzo", "San Pedro de Chunan", "Sausa", "Sincos", "Tunan Marca", "Yauli", "Yauyos"],
        "Junín": ["Junin", "Carhuamayo", "Ondores", "Ulcumayo"],
        "Satipo": ["Satipo", "Coviliriali", "Llaylla", "Mazamari", "Pampa Hermosa", "Pangoa", "Rio Negro", "Rio Tambo"],
        "Tarma": ["Tarma", "Acobamba", "Huaracolba", "Huasahuasi", "La Union", "Palca", "Palcamayo", "San Pedro de Cajas", "Tapo"],
        "Yauli": ["La Oroya", "Chacapalpa", "Huay-Huay", "Marcapomacocha", "Morococha", "Paccha", "Santa Barbara de Carhuacayan", "Suitucancha", "Yauli"],
        "Chupaca": ["Chupaca", "Ahuac", "Chongos Bajo", "Huachac", "Huamancaca Chico", "San Juan de Iscos", "San Juan de Jarpa", "Tres de Diciembre", "Yanacancha"]
    },
    "La Libertad": {
        "Trujillo": ["Trujillo", "El Porvenir", "Florencia de Mora", "Huanchaco", "La Esperanza", "Laredo", "Moche", "Poroto", "Salaverry", "Simbal", "Victor Larco Herrera"],
        "Ascope": ["Ascope", "Chicama", "Chocope", "Magdalena de Cao", "Paijan", "Razuri", "Santiago de Cao", "Casa Grande"],
        "Bolívar": ["Bolivar", "Bambamarca", "Condormarca", "Longotea", "Uchumarca", "Ucuncha"],
        "Chepén": ["Chepen", "Pacanga", "Pueblo Nuevo"],
        "Julcán": ["Julcan", "Calamarca", "Carabamba", "Huaso"],
        "Otuzco": ["Otuzco", "Agallpampa", "Charat", "Huaranchal", "La Cuesta", "Mache", "Paranday", "Salpo", "Sinsicap", "Usquil"],
        "Pacasmayo": ["San Pedro de Lloc", "Guadalupe", "Jequetepeque", "Pacasmayo", "San Jose"],
        "Pataz": ["Tayabamba", "Buldibuyo", "Chillia", "Huancaspata", "Huaylillas", "Huayo", "Ongon", "Parcoy", "Pataz", "Pias", "Santiago de Challas", "Taurija", "Urpay"],
        "Sánchez Carrión": ["Huamachuco", "Chugay", "Cochorco", "Curgos", "Marcabal", "Sanagorán", "Sarin", "Sartimbamba"],
        "Santiago de Chuco": ["Santiago de Chuco", "Angasmarca", "Cachicadan", "Molinamarca", "Molinopampa", "Quiruvilca", "Santa Cruz de Chuca", "Sitabamba"],
        "Gran Chimú": ["Cascas", "Lucma", "Marmot", "Sayapullo"],
        "Virú": ["Viru", "Chao", "Guadalupito"]
    },
    "Lambayeque": {
        "Chiclayo": ["Chiclayo", "Chongoyape", "Eten", "Eten Puerto", "Jose Leonardo Ortiz", "La Victoria", "Lagunas", "Monsefu", "Nueva Arica", "Oyotun", "Picsi", "Pimentel", "Reque", "Santa Rosa", "Saña", "Cayalti", "Patapo", "Pomalca", "Pucala", "Tumán"],
        "Ferrenafe": ["Ferreñafe", "Cañaris", "Incahuasi", "Manuel Antonio Mesones Muro", "Pitipo", "Pueblo Nuevo"],
        "Lambayeque": ["Lambayeque", "Chochope", "Illimo", "Jayanca", "Mochumi", "Morrope", "Motupe", "Olmos", "Pacora", "Salas", "San Jose", "Tucume"]
    },
    "Lima": {
        "Lima": ["Lima", "Ancon", "Ate", "Barranco", "Breña", "Carabayllo", "Chaclacayo", "Chorrillos", "Cieneguilla", "Comas", "El Agustino", "Independencia", "Jesus Maria", "La Molina", "La Victoria", "Lince", "Los Olivos", "Lurigancho", "Lurin", "Magdalena del Mar", "Miraflores", "Pachacamac", "Pucusana", "Pueblo Libre", "Puente Piedra", "Punta Hermosa", "Punta Negra", "Rimac", "San Bartolo", "San Borja", "San Isidro", "San Juan de Lurigancho", "San Juan de Miraflores", "San Luis", "San Martin de Porres", "San Miguel", "Santa Anita", "Santa Maria del Mar", "Santa Rosa", "Santiago de Surco", "Surquillo", "Villa El Salvador", "Villa Maria del Triunfo"],
        "Barranca": ["Barranca", "Paramonga", "Pativilca", "Supe", "Supe Puerto"],
        "Cajatambo": ["Cajatambo", "Copa", "Gorgor", "Huancapon", "Manas"],
        "Callao": ["Callao", "Bellavista", "Carmen de la Legua Reynoso", "La Perla", "La Punta", "Ventanilla", "Mi Perú"],
        "Canta": ["Canta", "Arahuay", "Huamantanga", "Lachaqui", "San Buenaventura", "Santa Rosa de Quives", "Lahuaytambo"],
        "Cañete": ["San Vicente de Cañete", "Asia", "Calango", "Cerro Azul", "Chilca", "Coayllo", "Imperial", "Lunahuana", "Mala", "Nuevo Imperial", "Pacaran", "Quilmana", "San Antonio", "San Luis", "Santa Cruz de Flores", "Zúñiga"],
        "Huaral": ["Huaral", "Atavillos Alto", "Atavillos Bajo", "Acochaca", "Ihuari", "Lampian", "Pacaraos", "San Miguel de Acos", "Santa Cruz de Andamarca", "Sumbilca", "27 de Noviembre"],
        "Huarochirí": ["Matucana", "Antioquia", "Callahuanca", "Carampoma", "Chicla", "Cuenca", "Huachupampa", "Huanza", "Huarochiri", "Lahuaytambo", "Langa", "Laraos", "Mariatana", "Ricardo Palma", "San Andres de Tupicocha", "San Antonio", "San Bartolome", "San Damian", "San Juan de Iris", "San Juan de Tantaranche", "San Lorenzo de Quinti", "San Mateo", "San Mateo de Otao", "San Pedro de Casta", "San Pedro de Huancayre", "Sangallaya", "Santa Cruz de Cocachacra", "Santa Eulalia", "Santiago de Anchucaya", "Santiago de Tuna", "Santo Domingo de los Olleros", "Surco"],
        "Huaura": ["Huacho", "Ambar", "Carquin", "Checras", "Hualmay", "Huaura", "Leoncio Prado", "Paccho", "Santa Leonor", "Santa Maria", "Sayán", "Vegeta"],
        "Oyón": ["Oyon", "Andajes", "Caujul", "Cochamarca", "Navan", "Pachangara"],
        "Yauyos": ["Yauyos", "Alis", "Ayauca", "Ayavirí", "Azángaro", "Cacra", "Carania", "Catahuasi", "Chacos", "Chongos", "Cochas", "Colonia", "Hongos", "Huampara", "Huancaya", "Huangascar", "Huantán", "Huañec", "Laraos", "Lincha", "Madean", "Miraflores", "Omas", "Putinha", "Quinches", "Quinian", "San Joaquin", "San Pedro de Pilas", "Tanta", "Tauripampa", "Tomas", "Tupe", "Viñac", "Vitis"]
    },
    "Loreto": {
        "Maynas": ["Iquitos", "Alto Nanay", "Fernando Lores", "Indiana", "Las Amazonas", "Mazan", "Napo", "Punchana", "Torres Causana", "Belén", "San Juan Bautista"],
        "Alto Amazonas": ["Yurimaguas", "Balsapuerto", "Jeberos", "Lagunas", "Santa Cruz", "Teniente Cesar Lopez Rojas"],
        "Loreto": ["Nauta", "Parinari", "Tigre", "Trompeteros", "Urarinas"],
        "Mariscal Ramón Castilla": ["Pebas", "Yavari", "San Pablo", "Ramón Castilla"],
        "Requena": ["Requena", "Alto Tapiche", "Capelo", "Emilio San Martin", "Maquia", "Puinahua", "Sapiu_a", "Soplin", "Tapiche", "Jenaro Herrera", "Yaquerana"],
        "Ucahyli": ["Contamana", "Inahuaya", "Padre Marquez", "Pampa Hermosa", "Sarayacu", "Vargas Guerra"],
        "Datem del Marañón": ["Barranca", "Cahuapanas", "Manseriche", "Morona", "Pastaza", "Andoas"]
    },
    "Madre de Dios": {
        "Tambopata": ["Tambopata", "Inambari", "Las Piedras", "Laberinto"],
        "Manu": ["Manu", "Fitzcarrald", "Madre de Dios", "Huepetuhe"],
        "Tahuamanu": ["Iñapari", "Iberia", "Tahuamanu"]
    },
    "Moquegua": {
        "Mariscal Nieto": ["Moquegua", "Carumas", "Cuchumbaya", "Samegua", "San Cristobal", "Torata"],
        "General Sánchez Cerro": ["Omate", "Chojata", "Coalaque", "Ichuña", "La Capilla", "Lloque", "Matalaque", "Puquina", "Quinistaquillas", "Ubinas", "Yunga"],
        "Ilo": ["Ilo", "El Algarrobal", "Pacocha"]
    },
    "Pasco": {
        "Pasco": ["Chaupimarca", "Huachon", "Huariaca", "Huayllay", "Ninacaca", "Pallanchacra", "Paucartambo", "San Fco. de Asis de Yarusyacan", "Simon Bolivar", "Ticlacayan", "Tinyahuarco", "Vicco", "Yanacancha"],
        "Daniel Alcides Carrión": ["Yanahuanca", "Chacayán", "Goyllarisquizga", "Paucar", "San Pedro de Pillao", "Santa Ana de Tusi", "Tapuc", "Vilcabamba"],
        "Oxapampa": ["Oxapampa", "Chontabamba", "Huancabamba", "Pozuzo", "Puerto Bermudez", "Villa Rica", "Palcazu"]
    },
    "Piura": {
        "Piura": ["Piura", "Castilla", "Catacaos", "Cura Mori", "El Tallan", "La Arena", "La Union", "Las Lomas", "Tambo Grande", "Veintiseis de Octubre"],
        "Ayabaca": ["Ayabaca", "Frias", "Jilili", "Lagunas", "Montero", "Pacaipampa", "Paimas", "Sapillica", "Sicchez", "Suyo"],
        "Huancabamba": ["Huancabamba", "Canchaque", "El Carmen de la Frontera", "Huarmaca", "Lalaquiz", "San Miguel de El Faique", "Sondor", "Sondorillo"],
        "Morropón": ["Chulucanas", "Buenos Aires", "Chalaco", "La Matanza", "Morropon", "Salitral", "San Juan de Bigote", "Santa Catalina de Mossa", "Santo Domingo", "Yamango"],
        "Paita": ["Paita", "Amotape", "Colan", "El Arenal", "La Huaca", "Tamarindo", "Vichayal"],
        "Sullana": ["Sullana", "Bellavista", "Ignacio Escudero", "Lancones", "Marcavelica", "Miguel Checa", "Querecotillo", "Salitral"],
        "Talara": ["Pariñas", "El Alto", "La Brea", "Lobitos", "Los Organos", "Mancora"],
        "Sechura": ["Sechura", "Bellavista de la Union", "Bernal", "Cristo Nos Valga", "Vice", "Rinconada Llicuar"]
    },
    "Puno": {
        "Puno": ["Puno", "Acora", "Amantani", "Atuncolla", "Capachica", "Chucuito", "Coata", "Huata", "Mañazo", "Paucarcolla", "Pichacani", "Plateria", "San Antonio", "Tiquillaca", "Vilque"],
        "Azángaro": ["Azangaro", "Achaya", "Arapa", "Asillo", "Caminaca", "Chupa", "Jose Domingo Choquehuanca", "Muñani", "Potoni", "Saman", "San Anton", "San Jose", "San Juan de Salinas", "Santiago de Pupuja", "Tirapata"],
        "Carabaya": ["Macusani", "Ajoyani", "Ayapata", "Coasa", "Corani", "Crucero", "Ituata", "Ollachea", "San Gaban", "Usicayos"],
        "Chucuito": ["Juli", "Desaguadero", "Huacullani", "Kelluyo", "Pisacoma", "Pomata", "Zepita"],
        "El Collao": ["Ilave", "Capazo", "Pilcuyo", "Santa Rosa", "Conduriri"],
        "Huancané": ["Huancane", "Cojata", "Chusi", "Inchupalla", "Pusi", "Rosaspata", "Taraco", "Vilque Chico"],
        "Lampa": ["Lampa", "Cabanilla", "Calapuja", "Nicasio", "Ocuviri", "Palca", "Paratia", "Pucara", "Santa Lucia", "Vila Vila"],
        "Melgar": ["Ayaviri", "Antauta", "Cupi", "Llalli", "Macari", "Nuñoa", "Orurillo", "Santa Rosa", "Umachiri"],
        "Moho": ["Moho", "Conima", "Tilali", "Huayrapata"],
        "San Antonio de Putina": ["Putina", "Ananea", "Pedro Vilca Apaza", "Quilcapuncu", "Sina"],
        "San Román": ["Juliaca", "Caracoto", "Cabanillas", "San Miguel"],
        "Sandia": ["Sandia", "Cuyocuyo", "Limbani", "Patambuco", "Phara", "Quiaca", "San Juan del Oro", "Yanahuaya", "Alto Inambari"],
        "Yunguyo": ["Yunguyo", "Anapia", "Copani", "Cuturapi", "Ollaraya", "Tinicachi", "Unicachi"]
    },
    "San Martín": {
        "Moyobamba": ["Moyobamba", "Calzada", "Habana", "Jepelacio", "Soritor", "Yantalo"],
        "Bellavista": ["Bellavista", "Alto Bio_Bio", "Bajo Bio_Bio", "Huallaga", "San Pablo", "San Rafael"],
        "El Dorado": ["San Jose de Sisa", "Agua Blanca", "San Martin", "Santa Rosa", "Shatoja"],
        "Huallaga": ["Saposoa", "Alto Saposoa", "Eslabón", "Piscoyacu", "Sacanche", "Tingo de Ponasa"],
        "Lamas": ["Lamas", "Alonso de Alvarado", "Barranquita", "Caynarachi", "Cuñumbuqui", "Pinto Recodo", "Rumisapa", "San Roque de Cumbaza", "Shanao", "Tabalosos", "Zapatero"],
        "Mariscal Cáceres": ["Juanjui", "Campanilla", "Huicungo", "Pachiza", "Pajarillo"],
        "Picota": ["Picota", "Buenos Aires", "Caspizapa", "Pilluana", "Pucacaca", "San Cristobal", "San Hilarion", "Shamboyacu", "Tingo de Alponas"],
        "Rioja": ["Rioja", "Awajun", "Elias Soplin Vargas", "Nueva Rioja", "Pardo Miguel", "Posic", "San Fernando", "Yorongos", "Yuracyacu"],
        "San Martín": ["Tarapoto", "Alberto Leveau", "Cacatachi", "Chazuta", "Chipurana", "El Porvenir", "Huimbayoc", "Juan Guerra", "Morales", "Papaplaya", "San Antonio", "Sauce", "Shapaja"],
        "Tocache": ["Tocache", "Nuevo Progreso", "Polvora", "Shunte", "Uchiza"]
    },
    "Tacna": {
        "Tacna": ["Tacna", "Alto de la Alianza", "Calana", "Ciudad Nueva", "Inclan", "Pachia", "Palca", "Pocollay", "Sama", "Coronel Gregorio Albarracin L."],
        "Candarave": ["Candarave", "Cairani", "Camilaca", "Curibaya", "Huanuara", "Quilahuani"],
        "Jorge Basadre": ["Locumba", "Ilabaya", "Ite"],
        "Tarata": ["Tarata", "Chucatamani", "Estique", "Estique-Pampa", "Sitajara", "Susapaya", "Tarucachi", "Ticaco"]
    },
    "Tumbes": {
        "Tumbes": ["Tumbes", "Corrales", "La Cruz", "Pampas de Hospital", "San Jacinto", "San Juan de la Virgen"],
        "Contralmirante Villar": ["Zorritos", "Casitas"],
        "Zarumilla": ["Zarumilla", "Aguas Verdes", "Matapalo", "Papayal"]
    },
    "Ucayali": {
        "Coronel Portillo": ["Calleria", "Campoverde", "Iparia", "Masisea", "Yarinacocha", "Nueva Requena", "Manantay"],
        "Atalaya": ["Raymondi", "Sepahua", "Tahuania", "Yurua"],
        "Padre Abad": ["Padre Abad", "Irazola", "Curimana"],
        "Purús": ["Purus"]
    }
};