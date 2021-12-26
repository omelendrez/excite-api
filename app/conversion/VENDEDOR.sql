DROP TABLE IF EXISTS `VENDEDOR`; CREATE TABLE `VENDEDOR` (ID INTEGER NOT NULL AUTO_INCREMENT,VENCOD INTEGER NOT NULL,VENNOM VARCHAR (60) NOT NULL,VENDOM VARCHAR (60) NOT NULL,VENLOC VARCHAR (60) NOT NULL,VENTEL VARCHAR (20) NOT NULL,VENCEL VARCHAR (20) NOT NULL,VENOBS VARCHAR (60) NOT NULL,VENINT VARCHAR (12) NOT NULL,VENCP VARCHAR (8) NOT NULL,PROCOD CHAR (1) NOT NULL,VENFECSAL DATE NULL,VENSALDEB DECIMAL (10,2) DEFAULT 0,VENSALHAB DECIMAL (10,2) DEFAULT 0,VENSALIMP DECIMAL (10,2) DEFAULT 0,PRIMARY KEY (ID));INSERT INTO `VENDEDOR` (VENCOD,VENNOM,VENDOM,VENLOC,VENTEL,VENCEL,VENOBS,VENINT,VENCP,PROCOD,VENFECSAL,VENSALDEB,VENSALHAB,VENSALIMP) VALUES (3,"ERICK PITCHON","BELGRANO Y RIVAS","CORONEL SUAREZ","02926 432031","02926 15400831","","INTERIOR","","B","2018-12-31",53023.34,0,53023.34),(4,"EXCITE FRAGANCIAS","CARONTI 339","BAHIA BLANCA","4533304","","","BAHIA BLANCA","8000","B","2021-01-01",0,0,0),(5,"","ESTADOS UNIDOS 62 1ª 'A'","S.M. DE TUCUMAN","0381-4218503","0381-155870858 MANZA","CA BCO RIO 069-368497-9        WALTER  0381-154420457","INTERIOR","4000","T","2015-12-31",7879.01,0,7879.01),(10,"","SUIPACHA 1334","DORREGO GUAYMAYEN","0261 4483967","0261 154185830","","INTERIOR","5519","M","2009-01-01",4395.43,0,4395.43),(11,"","","BAHIA BLANCA","4516541","","","BAHIA BLANCA","8000","B","2018-06-01",3608.09,0,3608.09),(15,"MORENO OSCAR","CUYO 460","BAHIA BLANCA","4885737","","PRECIO UNITARIO $ 9.00","BAHIA BLANCA","8000","B","2016-12-31",53394.06,0,53394.06),(20,"ESCALANTE JORGE","CASANOVA 48 P 15 DTO E T2","BAHIA BLANCA","4545162","154293295","SRA SILVIA 2914292750","BAHIA BLANCA","8000","B","2021-01-01",441621.49,0,441621.49),(21,"","DONOVAN 1653","TAPIALES","4816254","0221-155010028","","INTERIOR","8000","B","2010-01-01",3995.44,0,3995.44),(23,"","THOMSON 1226","BAHIA BLANCA","0291-","0291-155752161","","BAHIA BLANCA","8000","B","2001-01-01",0,0,0),(24,"","BATALLA DE AYACUCHO 852","SAN MIGUEL DE TUCUMAN","0381-4249455","0381-154621593","1 EXCIBIDOR  --TRASPÒRTE TAC","INTERIOR","","T","2008-01-01",273.4,0,273.4),(25,"VILLAR YSABEL LEONOR","AGUADO 1665","NEUQUEN","0299-4480991","0299-154707131","COM 12%","INTERIOR","8300","Q","2021-01-01",188495.99,48.18,188447.81),(27,"SENTIS JORGE ALBERTO","DOMINGO VAZQUEZ 181","TRES ARROYOS","02983-424688","02983-15647666","BANCO CREDICOOP","INTERIOR","7500","B","2021-01-01",0,0,0),(28,"","MONSEÑOR CANEVA 1224","SIERRAS BAYAS","02284-492931","02284-15659323","","INTERIOR","7403","B","2008-01-01",583.52,0,583.52),(100,"","","B BLANCA","","","","BAHIA BLANCA","8000","B","2015-12-31",0,0,0),(101,"","PEPIRI 645 1° DTO B","PARQUE PATRICIO","011-49129478","011-1550411540","BCO FRANCES C.A.156-027155-8","INTERIOR","1437","B","2008-01-01",0,0,0),(102,"","KARUKINKA Y GOLETA FLO","USHUAIA","02901-422360","02901-15469801","","INTERIOR","9410","V","2021-01-01",0,0,0),(103,"ROMERO SERGIO ALEJANDRO","AV.URUGUAY460 BLOK4 DT 11","SALTA","0387-4270574","0387-154182173","0387-4247805  URUGUAY 460 BLOCK4  1ºPISO D DTO 11","INTERIOR","4400","A","2021-01-01",0,0,0),(104,"NUÑEZ JAVIER ALEJANDRO","J.LAVALLE 362 (GAINZA Y P","ALEJANDRO KORN","02317-521195","011-1535403194","JUAN LLAVALLE (ENTRE GAINZA Y PUEYRREDON)","INTERIOR","1864","B","2021-01-01",0,0,0),(105,"","DORREGO 441","GUAYMALLEN","0261-4218879","0261-155192836","TRA 4252788-155132111 HORACIO","INTERIOR","5519","M","2001-01-01",0,0,0),(106,"GUTMAN VICTOR PEDRO","CTE FERNANDEZ 479 ENS.SUR","SAENZ PEÑA","03732-429850","03732-15600487","","INTERIOR","3700","H","2008-01-01",0,0,0),(107,"","ING. LAPORTE 4129","ROSARIO","0341-4535152","0341-156621549","DANILO 0341-156162085 NEGO 0341-4532997","INTERIOR","2000","S","2009-01-01",0,0,0),(108,"PERUGINI BEATRIZ","AVDA PERON 774","VILLA CONSTITUCION","03400-472808","03461-15662869","TUS SAN NICOLAS LISTA TUCUMAN","INTERIOR","","S","2009-01-01",0,0,0),(109,"","JOSE MARTI 364","MAR DEL PLATA","0223-4892030","0223-155336815","FLETE EN DESTINO","INTERIOR","7600","B","2010-01-01",0,0,0),(110,"","CHUBUT 630","BAHIA BLANCA","","0291-154461403","154141592 SRA HIJO MAXIMILIANO 154357023 4515152 OFI","BAHIA BLANCA","8000","B","2010-01-01",0,0,0),(111,"RODRIGUEZ M. ESTEBAN","JOAQUIN V GONZALEZ 2242","GODOY CRUZ","0261-4391943","0261-156532971","","INTERIOR","5501","M","2021-01-01",0,0,0),(112,"LOPEZ EDUARDO","PARANA 977","ROSARIO","0341-4382788","0341-156658130","MAURO HIJO 0341-156100084 TODO LISTA 2","INTERIOR","2000","S","2021-01-01",0,0,0),(113,"","CALLE N°543 N°3876","QUEQUEN NECOCHEA","02262-555965","02262-451465 MADRE","CORVALAN CLAUDIA 02262-15492746  CALLE 557 N°3417 MADRE","INTERIOR","","B","2010-01-01",0,0,0),(114,"","ANDRADE 1036","MAR DEL PLATA","0223-155711347","0291-154407409","CUIT 27-24889813-0","INTERIOR","7600","B","2009-01-01",0,0,0),(115,"","GUEMES 660","BAHIA BLANCA","4560614 PADRE","154266093","","BAHIA BLANCA","8000","B","2010-01-01",0,0,0),(116,"","MNA D LTE 33 BRIO JARDIN","SANTIAGO DEL ESTERO","0385-4317713","0385-154140385","FAC CON EL 5% MAS NUEVO PART 0385-4010051 0385-154302704","INTERIOR","4200","G","2010-01-01",0,0,0),(117,"","PARQ.NAC.LAGO PUELO 869","BARILOCHE","","02944-15576425","DNI 21797652  TRABAJO DE B B NICOLAS 0291 156424440","INTERIOR","8400","R","2010-01-01",0,0,0),(119,"COLANERI DIEGO","ZABALA 3306","POSADAS","0376-4593497","0376-4324587","DIEGOROSI@ARNET.COM","INTERIOR","3300","N","2021-01-01",0,0,0),(121,"","JUAN XXIII 1131 P2 DTO B","NEUQUEN","0299-","0299-5509264","SRA 0299-5808862  TEL PARTICULAR 0299-4006414","INTERIOR","8300","Q","2018-06-01",0,0,0),(122,"LOPEZ MAURO","PARANA 977","ROSARIO","","0341-156100084","","INTERIOR","","S","2021-01-01",0,0,0),(123,"","523 BIS 4705","LA PLATA","0221-4707279","011-36979399","LEWENBERGER4616@YAHOO.COM.AR","INTERIOR","1900","B","2015-12-31",0,0,0),(124,"","RAFAELA 3809","CIUDADELA","0","011-1558124566","EL-GULY@LIVE.COM","INTERIOR","1702","B",NULL,0,0,0),(125,"","RIVADAVIA 3278","RAFAEL CALZADA","20705053-42914004","011-1561809843","LIMARDOOSCAR467@YAHOO.COM.AR","INTERIOR","1847","B","2015-12-31",0,0,0),(126,"","CABRAL 2510","HAEDO","011-44438368","011-60571124","","INTERIOR","1706","B","2015-12-31",0,0,0),(127,"","PARANA 118","PILAR","0230-4428278","011-1551463170","SE MANEJA CON FAX","INTERIOR","1629","B","2015-12-31",0,0,0),(128,"MENALLED NELIDA","RAWSON 217 4 PISO DTO 22","CAPITAL","011-49814231","011-53167396","","INTERIOR","","B","2015-12-31",0,0,0),(129,"","MINISTRO BRIN 4448","REMEDIOS DE ESCALADA","011-42028674","1149160838","LEMA.DANIEL@HOTMAIL.COM","INTERIOR","","B",NULL,0,0,0),(130,"","MOLIERE 2351","CAPITAL","011-45677647","011-1535854210","","INTERIOR","","B",NULL,0,0,0),(131,"","NEMESIO ALVAREZ 559","MORENO","0237-4624579","011-63976755","CEL SRA 1164781902  HIJO 0237-1545328881","INTERIOR","1744","B","2015-12-31",0,0,0),(132,"","CISNEROS 2759","SAN JUSTO","011-46516240","011-1536779690","DNI 12.703.991","INTERIOR","","B",NULL,0,0,0),(133,"","AV.DIAZ VELEZ3302 ESQGALL","PEHUAJO","","0111561654336","GALPON 4 PORTON 23","INTERIOR","","B",NULL,0,0,0),(134,"","ALEM 1875","PUNTA ALTA","","02932-15573116","LAAGUADAH2O@GMAIL.COM","INTERIOR","","B",NULL,0,0,0),(135,"","PELEGRINI 226","SAN MARTIN","011-47526135","011-1553179809","EL GULY@LIVE.COM  MAIL DE MAIENZA GERMAN","INTERIOR","1650","B","2015-12-31",0,0,0),(136,"","ZAPIOLA 1098","BRAGADO","","","","INTERIOR","6640","B",NULL,0,0,0),(137,"","NEUQUEN 3792","MAR DEL PLATA","","","FLETE EN ORIGEN","INTERIOR","","B",NULL,0,0,0),(138,"","","","","","","INTERIOR","","B","2015-12-31",0,0,0),(139,"MARTINEZ JOSE ANTONIO","OHIGGINS 29 1 C","BAHIA BLANCA","","0291-6467147","","BAHIA BLANCA","","B","2021-01-01",0,0,0),(140,"MIGUEL JUAN SANTIAGO","MAIPU 1409","DAERAUX","02314-15622914","02314-15627255 SRA","EMILCE RAQUEL ANDRADE COMISIONISTA 2314548401","INTERIOR","6555","L","2016-12-31",0,0,0),(141,"","","","","","","INTERIOR","","B","2015-12-31",0,0,0),(142,"MOREJON GUILLERMO","","TRELEW","","0280-4609646","","INTERIOR","","U","2020-01-01",0,0,0),(143,"PIRONTI DANIEL","RENE FAVALORO 731","MONTE HERMOSO","","0223-155217736","","BAHIA BLANCA","","B","2021-01-01",0,0,0),(144,"DOMEÑO CAROLINA","","","","","","BAHIA BLANCA","","B","2021-01-01",0,0,0),(145,"TORRES DIEGO","","","","154276304","","BAHIA BLANCA","","B","2021-01-01",0,0,0),(146,"DE PEDRO EZEQUIEL IGNACIO","ALBERDI 1742 PB","BAHIA BLANCA","291-4649284","291-6468614","","BAHIA BLANCA","","B","2021-01-01",0,0,0),(147,"VITELI RODOLFO ALBERTO","","BAHIA BLANCA","4542128","0291-156412782","","INTERIOR","","B","2021-01-01",0,0,0),(148,"TUMINELLO GUSTAVO","","","","","","BAHIA BLANCA","","B",NULL,0,0,0),(14,"CARLOS DUARTE","","BAHIA BLANCA","","","","BAHIA BLANCA","","B",NULL,0,0,0),(149,"JOSE MARIA TEJERINA","AVDA OLASCOAGA 1991","NEUQUEN","","2996339762","","INTERIOR","","Q",NULL,0,0,0)