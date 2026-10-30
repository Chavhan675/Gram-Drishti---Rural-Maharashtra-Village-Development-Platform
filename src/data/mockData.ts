import {
  Village,
  DevelopmentProject,
  Facility,
  GovernmentScheme,
  IssueReport,
  Announcement
} from '../types';

export const MAHARASHTRA_DIVISIONS = [
  { id: 'marathwada', nameMr: 'छत्रपती संभाजीनगर (मराठवाडा)', nameEn: 'Chhatrapati Sambhajinagar (Marathwada)' },
  { id: 'pune', nameMr: 'पुणे विभाग', nameEn: 'Pune Division' },
  { id: 'nashik', nameMr: 'नाशिक विभाग', nameEn: 'Nashik Division' },
  { id: 'vidarbha_nagpur', nameMr: 'नागपूर विभाग', nameEn: 'Nagpur Division' },
  { id: 'vidarbha_amravati', nameMr: 'अमरावती विभाग', nameEn: 'Amravati Division' },
  { id: 'konkan', nameMr: 'कोकण विभाग', nameEn: 'Konkan Division' },
];

export const MAHARASHTRA_DISTRICTS = [
  { id: 'nanded', divisionId: 'marathwada', nameMr: 'नांदेड', nameEn: 'Nanded' },
  { id: 'washim', divisionId: 'vidarbha_amravati', nameMr: 'वाशीम', nameEn: 'Washim' },
  { id: 'pune', divisionId: 'pune', nameMr: 'पुणे', nameEn: 'Pune' },
  { id: 'satara', divisionId: 'pune', nameMr: 'सातारा', nameEn: 'Satara' },
  { id: 'kolhapur', divisionId: 'pune', nameMr: 'कोल्हापूर', nameEn: 'Kolhapur' },
  { id: 'nagpur', divisionId: 'vidarbha_nagpur', nameMr: 'नागपूर', nameEn: 'Nagpur' },
  { id: 'chhatrapati_sambhajinagar', divisionId: 'marathwada', nameMr: 'छत्रपती संभाजीनगर', nameEn: 'Chhatrapati Sambhajinagar' },
  { id: 'ahmednagar', divisionId: 'nashik', nameMr: 'अहिल्यानगर (अहमदनगर)', nameEn: 'Ahilyanagar (Ahmednagar)' },
  { id: 'ratnagiri', divisionId: 'konkan', nameMr: 'रत्नागिरी', nameEn: 'Ratnagiri' },
];

export const MAHARASHTRA_TALUKAS = [
  { id: 'ardhapur', districtId: 'nanded', nameMr: 'अर्धापूर', nameEn: 'Ardhapur' },
  { id: 'nanded_rural', districtId: 'nanded', nameMr: 'नांदेड ग्रामीण', nameEn: 'Nanded Rural' },
  { id: 'mahabaleshwar', districtId: 'satara', nameMr: 'महाबळेश्वर', nameEn: 'Mahabaleshwar' },
  { id: 'haveli', districtId: 'pune', nameMr: 'हवेली', nameEn: 'Haveli' },
  { id: 'karveer', districtId: 'kolhapur', nameMr: 'करवीर', nameEn: 'Karveer' },
  { id: 'malegaon_washim', districtId: 'washim', nameMr: 'मालेगाव', nameEn: 'Malegaon' },
  { id: 'kamptee', districtId: 'nagpur', nameMr: 'कामठी', nameEn: 'Kamptee' },
];

export const MOCK_VILLAGES: Village[] = [
  {
    id: 'malegaon-ardhapur-nanded',
    nameMr: 'मेडशी गाव (मालेगाव बुद्रुक)',
    nameEn: 'Medshi Village (Malegaon Budruk)',
    talukaMr: 'अर्धापूर / मालेगाव',
    talukaEn: 'Ardhapur / Malegaon',
    districtMr: 'नांदेड',
    districtEn: 'Nanded',
    divisionMr: 'छत्रपती संभाजीनगर',
    divisionEn: 'Chhatrapati Sambhajinagar',
    pincode: '431704',
    lgdCode: '543120',
    latitude: 19.2831,
    longitude: 77.4124,
    isDemoData: true,
    dataVerifiedDate: 'सप्टेंबर २०२६ (September 2026)',
    officialSource: 'महाराष्ट्र ग्रामविकास विभाग व जिल्हा परिषद (Demonstration Profile)',
    demographics: {
      totalPopulation: 3840,
      malePopulation: 1980,
      femalePopulation: 1860,
      households: 742,
      literacyRate: 78.4,
      maleLiteracyRate: 85.2,
      femaleLiteracyRate: 71.1,
      workingPopulation: 1620,
      cultivators: 780,
      agriculturalLaborers: 540,
      scPopulation: 512,
      stPopulation: 184,
      areaHectares: 1240.5
    },
    administration: {
      gramPanchayatNameMr: 'ग्रामपंचायत मेडशी गाव (मालेगाव बु.)',
      gramPanchayatNameEn: 'Gram Panchayat Medshi Village (Malegaon B.)',
      sarpanchNameMr: 'सौ. सविता रमेश पाटील',
      sarpanchNameEn: 'Mrs. Savita Ramesh Patil',
      sarpanchContact: '+91 98230 XXXXX',
      gramSevakNameMr: 'श्री. विजय आनंदराव शिंदे',
      gramSevakNameEn: 'Mr. Vijay Anandrao Shinde',
      gramSevakContact: '+91 94221 XXXXX',
      talathiNameMr: 'श्री. गणेश बाबाराव कदम',
      talathiNameEn: 'Mr. Ganesh Babarao Kadam',
      talathiContact: '+91 97654 XXXXX',
      wardCount: 9,
      assemblyConstituencyMr: 'भोकर (८५)',
      assemblyConstituencyEn: 'Bhokar (85)',
      lokSabhaConstituencyMr: 'नांदेड (१६)',
      lokSabhaConstituencyEn: 'Nanded (16)',
      lgdCode: '543120',
      pincode: '431704'
    },
    agriculture: {
      majorCropsMr: ['सोयाबीन', 'कापूस', 'हळद', 'केळी', 'तूर'],
      majorCropsEn: ['Soybean', 'Cotton', 'Turmeric', 'Banana', 'Pigeon Pea (Tur)'],
      soilTypeMr: 'काळी कसदार व मध्यम पोताची जमीन',
      soilTypeEn: 'Medium to Heavy Black Cotton Soil',
      irrigatedAreaPercent: 68,
      waterSourceMr: 'आसणा नदी उपसा जलसिंचन व कूपनलिका',
      waterSourceEn: 'Asna River Lift Irrigation & Borewells',
      nearestApmcMr: 'कृषी उत्पन्न बाजार समिती, अर्धापूर',
      nearestApmcEn: 'APMC Yard, Ardhapur',
      apmcDistanceKm: 7.5,
      krishiSevaKendraCount: 3,
      farmPondsCount: 42,
      dripIrrigationCoveragePercent: 74
    },
    scorecard: {
      education: {
        titleMr: 'शिक्षण व शाळा सुविधा',
        titleEn: 'Education & Schools',
        score: 84,
        ratingMr: 'उत्कृष्ट (अ श्रेणी)',
        ratingEn: 'Excellent (Grade A)',
        highlightsMr: ['जि. प. डिजिटल प्राथमिक शाळा', '१००% मोफत पाठ्यपुस्तक वितरण', 'स्मार्ट टीव्ही वर्गखोल्या'],
        highlightsEn: ['ZP Digital Primary School', '100% Free Textbook Coverage', 'Smart Classrooms Active']
      },
      healthcare: {
        titleMr: 'आरोग्य सेवा व वैद्यकीय मदत',
        titleEn: 'Healthcare & Medical Access',
        score: 76,
        ratingMr: 'समाधानकारक (ब श्रेणी)',
        ratingEn: 'Good (Grade B)',
        highlightsMr: ['उपकेंद्र कार्यरत', 'दर बुधवारी बाल लसीकरण सत्र', '१०२ रुग्णवाहिका संपर्क उपलब्ध'],
        highlightsEn: ['Sub-centre Operational', 'Weekly Immunization Camps', '102 Ambulance Link Available']
      },
      infrastructure: {
        titleMr: 'रस्ते व दळणवळण',
        titleEn: 'Roads & Infrastructure',
        score: 82,
        ratingMr: 'चांगली प्रगती',
        ratingEn: 'Strong Progress',
        highlightsMr: ['मुख्य गावाचा रस्ता डांबरीकृत', 'अंतर्गत सिमेंट काँक्रीट रस्ते ७५%', 'एलईडी पथदिवे'],
        highlightsEn: ['Main Approach Road Tarred', '75% Internal Concrete Paved', 'LED Street Lighting']
      },
      waterSanitation: {
        titleMr: 'पिण्याचे पाणी व स्वच्छता',
        titleEn: 'Water & Sanitation',
        score: 88,
        ratingMr: 'आदर्श श्रेणी',
        ratingEn: 'Benchmark Standard',
        highlightsMr: ['जल जीवन मिशन नळजोडणी ९२%', 'गावात शुद्ध पाण्याचा आरओ प्रकल्प', 'हागणदारीमुक्त (ODF+) गाव'],
        highlightsEn: ['92% Jal Jeevan Mission Tap Connections', 'RO Drinking Water Plant', 'ODF+ Certified Village']
      },
      electricityConnectivity: {
        titleMr: 'वीज पुरवठा व डिजिटल जोडणी',
        titleEn: 'Power & Digital Connectivity',
        score: 79,
        ratingMr: 'समाधानकारक',
        ratingEn: 'Satisfactory',
        highlightsMr: ['शेतीसाठी स्वतंत्र कृषी वाहिनी', 'भारतनेट ग्रामपंचायत वायफाय', '४G मोबाईल नेटवर्क'],
        highlightsEn: ['Dedicated Agricultural Feeder', 'BharatNet Gram Panchayat Optical Fiber', '4G Mobile Coverage']
      },
      agriculture: {
        titleMr: 'शेती व जलसंधारण',
        titleEn: 'Agriculture & Water Harvest',
        score: 86,
        ratingMr: 'उत्कृष्ट',
        ratingEn: 'Outstanding',
        highlightsMr: ['हळद व केळी प्रक्रिया क्लस्टर', 'ठिबक सिंचनाचा मोठ्या प्रमाणावर वापर', '४२ शेततळी पूर्ण'],
        highlightsEn: ['Turmeric & Banana Processing Link', 'High Drip Adoption', '42 Completed Farm Ponds']
      },
      socialDevelopment: {
        titleMr: 'महिला व सामाजिक विकास',
        titleEn: 'Social & Women Welfare',
        score: 80,
        ratingMr: 'चांगले',
        ratingEn: 'Good',
        highlightsMr: ['१४ कार्यरत महिला बचत गट', 'अंगणवाडी पोषण आहार नियमित', 'वृद्ध पेन्शन वाटप केंद्र'],
        highlightsEn: ['14 Active Women SHGs', 'Regular Anganwadi Nutrition', 'Social Pension Distribution Desk']
      }
    }
  },
  {
    id: 'bhilar-mahabaleshwar-satara',
    nameMr: 'भिलार (पुस्तकांचे गाव)',
    nameEn: 'Bhilar (Village of Books)',
    talukaMr: 'महाबळेश्वर',
    talukaEn: 'Mahabaleshwar',
    districtMr: 'सातारा',
    districtEn: 'Satara',
    divisionMr: 'पुणे विभाग',
    divisionEn: 'Pune Division',
    pincode: '412805',
    lgdCode: '554310',
    latitude: 17.9234,
    longitude: 73.7421,
    isDemoData: true,
    dataVerifiedDate: 'सप्टेंबर २०२६ (September 2026)',
    officialSource: 'महाराष्ट्र राज्य मराठी विश्वकोश व जि. प. सातारा (Demonstration Profile)',
    demographics: {
      totalPopulation: 2950,
      malePopulation: 1510,
      femalePopulation: 1440,
      households: 580,
      literacyRate: 91.5,
      maleLiteracyRate: 95.0,
      femaleLiteracyRate: 87.8,
      workingPopulation: 1310,
      cultivators: 620,
      agriculturalLaborers: 290,
      scPopulation: 190,
      stPopulation: 45,
      areaHectares: 850.0
    },
    administration: {
      gramPanchayatNameMr: 'ग्रामपंचायत भिलार',
      gramPanchayatNameEn: 'Gram Panchayat Bhilar',
      sarpanchNameMr: 'श्री. प्रवीण पांडुरंग भिलारे',
      sarpanchNameEn: 'Mr. Pravin Pandurang Bhilare',
      sarpanchContact: '+91 94235 XXXXX',
      gramSevakNameMr: 'श्रीमती अनुराधा सावंत',
      gramSevakNameEn: 'Mrs. Anuradha Sawant',
      gramSevakContact: '+91 98224 XXXXX',
      talathiNameMr: 'श्री. किरण दत्तात्रय मोरे',
      talathiNameEn: 'Mr. Kiran Dattatraya More',
      talathiContact: '+91 99701 XXXXX',
      wardCount: 7,
      assemblyConstituencyMr: 'वाई (२५६)',
      assemblyConstituencyEn: 'Wai (256)',
      lokSabhaConstituencyMr: 'सातारा (४५)',
      lokSabhaConstituencyEn: 'Satara (45)',
      lgdCode: '554310',
      pincode: '412805'
    },
    agriculture: {
      majorCropsMr: ['स्ट्रॉबेरी', 'रास्पबेरी', 'गहू', 'भाजीपाला'],
      majorCropsEn: ['Strawberry', 'Raspberry', 'Wheat', 'Exotic Vegetables'],
      soilTypeMr: 'लाल जांभी डोंगराळ सुपीक जमीन',
      soilTypeEn: 'Red Laterite Fertile Hill Soil',
      irrigatedAreaPercent: 82,
      waterSourceMr: 'नैसर्गिक झरे व ठिबक साठवण तलाव',
      waterSourceEn: 'Natural Springs & Micro-Reservoirs',
      nearestApmcMr: 'कृषी उत्पन्न बाजार समिती, पाचगणी / वाई',
      nearestApmcEn: 'APMC Yard, Panchgani / Wai',
      apmcDistanceKm: 6.0,
      krishiSevaKendraCount: 2,
      farmPondsCount: 28,
      dripIrrigationCoveragePercent: 92
    },
    scorecard: {
      education: {
        titleMr: 'शिक्षण व वाचन संस्कृती',
        titleEn: 'Education & Cultural Literacy',
        score: 96,
        ratingMr: 'राज्यस्तरीय अग्रगण्य',
        ratingEn: 'State Pioneer Rank',
        highlightsMr: ['भारतातील पहिले पुस्तकांचे गाव', '२५ हून अधिक वाचन दालने', '१००% प्राथमिक शिक्षण'],
        highlightsEn: ["India's First Village of Books", '25+ Public Reading Lounges', '100% Primary Enrolment']
      },
      healthcare: {
        titleMr: 'आरोग्य सुविधा',
        titleEn: 'Healthcare Access',
        score: 82,
        ratingMr: 'उत्तम',
        ratingEn: 'Good',
        highlightsMr: ['उपकेंद्र कार्यरत', 'पाचगणी ग्रामीण रुग्णालय जवळ', 'नियमित आरोग्य तपासणी'],
        highlightsEn: ['Sub-centre Operational', 'Proximity to Panchgani Hospital', 'Periodic Health Drives']
      },
      infrastructure: {
        titleMr: 'पर्यटन व सार्वजनिक पायाभूत सुविधा',
        titleEn: 'Infrastructure & Tourism',
        score: 90,
        ratingMr: 'आदर्श',
        ratingEn: 'Exemplary',
        highlightsMr: ['उत्कृष्ट अंतर्गत रस्ते', 'पर्यटक दिशादर्शक फलक', 'सौर पथदिवे व्यवस्था'],
        highlightsEn: ['High Quality Paved Roads', 'Multilingual Signage', 'Solar Lighting Grid']
      },
      waterSanitation: {
        titleMr: 'पाणी व घनकचरा व्यवस्थापन',
        titleEn: 'Water & Waste Sanitation',
        score: 89,
        ratingMr: 'आदर्श',
        ratingEn: 'Exemplary',
        highlightsMr: ['१००% नळाने पाणीपुरवठा', 'प्लास्टिकमुक्त गाव उपक्रम', 'जैविक खत प्रकल्प'],
        highlightsEn: ['100% Piped Water', 'Plastic-Free Village Policy', 'Community Composting']
      },
      electricityConnectivity: {
        titleMr: 'ऊर्जा व डिजिटल सुविधा',
        titleEn: 'Power & Digital Access',
        score: 85,
        ratingMr: 'चांगले',
        ratingEn: 'Good',
        highlightsMr: ['अखंडित वीजपुरवठा', 'सार्वजनिक मोफत वायफाय स्पॉट्स', 'कॅशलेस पर्यटन पेमेंट्स'],
        highlightsEn: ['Reliable Mountain Grid', 'Public WiFi Hotspots', 'High Digital UPI Adoption']
      },
      agriculture: {
        titleMr: 'स्ट्रॉबेरी बागायती व तंत्रज्ञान',
        titleEn: 'Horticulture & Cold Chain',
        score: 92,
        ratingMr: 'उत्कृष्ट',
        ratingEn: 'Outstanding',
        highlightsMr: ['स्ट्रॉबेरी निर्यात दर्जा', 'कोल्ड स्टोरेज सुविधा जवळ', 'सेंद्रिय शेती प्रोत्साहन'],
        highlightsEn: ['Export Quality Strawberries', 'Cold Chain Access', 'Organic Farm Certification']
      },
      socialDevelopment: {
        titleMr: 'महिला व समाज कल्याण',
        titleEn: 'Social & SHG Progress',
        score: 88,
        ratingMr: 'उत्कृष्ट',
        ratingEn: 'High',
        highlightsMr: ['महिला संचालित होमस्टे व पुस्तकालये', 'बाल संगोपन सुविधा', 'वरिष्ठ नागरिक कट्टा'],
        highlightsEn: ['Women Run Homestays & Book Lounges', 'Childcare Support', 'Senior Citizen Pavilion']
      }
    }
  },
  {
    id: 'wagholi-haveli-pune',
    nameMr: 'वाघोली (ग्रामीण परिसर)',
    nameEn: 'Wagholi (Rural Sector)',
    talukaMr: 'हवेली',
    talukaEn: 'Haveli',
    districtMr: 'पुणे',
    districtEn: 'Pune',
    divisionMr: 'पुणे विभाग',
    divisionEn: 'Pune Division',
    pincode: '412207',
    lgdCode: '561230',
    latitude: 18.5793,
    longitude: 73.9806,
    isDemoData: true,
    dataVerifiedDate: 'सप्टेंबर २०२६ (September 2026)',
    officialSource: 'जिल्हा परिषद पुणे व ग्रामविकास विभाग (Demonstration Profile)',
    demographics: {
      totalPopulation: 7450,
      malePopulation: 3890,
      femalePopulation: 3560,
      households: 1620,
      literacyRate: 86.2,
      maleLiteracyRate: 91.4,
      femaleLiteracyRate: 80.6,
      workingPopulation: 3410,
      cultivators: 520,
      agriculturalLaborers: 410,
      scPopulation: 820,
      stPopulation: 140,
      areaHectares: 1480.0
    },
    administration: {
      gramPanchayatNameMr: 'ग्रामपंचायत वाघोली',
      gramPanchayatNameEn: 'Gram Panchayat Wagholi',
      sarpanchNameMr: 'श्री. सचिन बापूराव सातव',
      sarpanchNameEn: 'Mr. Sachin Bapurao Satav',
      sarpanchContact: '+91 98500 XXXXX',
      gramSevakNameMr: 'श्री. महेश नारायण थोरात',
      gramSevakNameEn: 'Mr. Mahesh Narayan Thorat',
      gramSevakContact: '+91 94223 XXXXX',
      talathiNameMr: 'श्रीमती कविता कुलकर्णी',
      talathiNameEn: 'Mrs. Kavita Kulkarni',
      talathiContact: '+91 98812 XXXXX',
      wardCount: 11,
      assemblyConstituencyMr: 'शिरूर (१९५)',
      assemblyConstituencyEn: 'Shirur (195)',
      lokSabhaConstituencyMr: 'शिरूर (३४)',
      lokSabhaConstituencyEn: 'Shirur (34)',
      lgdCode: '561230',
      pincode: '412207'
    },
    agriculture: {
      majorCropsMr: ['ऊस', 'भाजीपाला', 'चारा पिके', 'कांदा'],
      majorCropsEn: ['Sugarcane', 'Fresh Vegetables', 'Fodder Crops', 'Onion'],
      soilTypeMr: 'मध्यम काळी व पोयट्याची जमीन',
      soilTypeEn: 'Medium Black Alluvial Loam',
      irrigatedAreaPercent: 72,
      waterSourceMr: 'कालवा सिंचन व मुळा-मुठा खोरे विहिरी',
      waterSourceEn: 'Canal Lift & Mula-Mutha Basin Wells',
      nearestApmcMr: 'पुणे कृषी उत्पन्न बाजार समिती (गुलटेकडी)',
      nearestApmcEn: 'Pune APMC (Gultekdi)',
      apmcDistanceKm: 18.0,
      krishiSevaKendraCount: 5,
      farmPondsCount: 19,
      dripIrrigationCoveragePercent: 65
    },
    scorecard: {
      education: {
        titleMr: 'शिक्षण व तांत्रिक सोयी',
        titleEn: 'Education & Technical Institutions',
        score: 87,
        ratingMr: 'उत्कृष्ट',
        ratingEn: 'Excellent',
        highlightsMr: ['जि. प. शाळा व खाजगी विद्यालये', 'तांत्रिक प्रशिक्षण केंद्र जवळ', 'डिजिटल लायब्ररी'],
        highlightsEn: ['ZP School & Polytech Institutions', 'Skill Development Proximity', 'Digital Library']
      },
      healthcare: {
        titleMr: 'प्राथमिक आरोग्य सुविधा',
        titleEn: 'Healthcare Infrastructure',
        score: 81,
        ratingMr: 'चांगले',
        ratingEn: 'Good',
        highlightsMr: ['प्राथमिक आरोग्य केंद्र (PHC)', '२४x७ प्रसूती कक्ष', 'जेनेरिक औषध केंद्र'],
        highlightsEn: ['Primary Health Centre (PHC)', '24x7 Maternity Care', 'Generic Medicine Counter']
      },
      infrastructure: {
        titleMr: 'रस्ते, सांडपाणी व वीज',
        titleEn: 'Roads, Drainage & Power',
        score: 75,
        ratingMr: 'प्रगतीपथावर',
        ratingEn: 'Moderate - In Progress',
        highlightsMr: ['पुणे-नगर महामार्गालगत जोडणी', 'ड्रेनेज लाईन विस्तार सुरू', 'वाहनांची सतत वर्दळ'],
        highlightsEn: ['Highway Arterial Connection', 'Underground Sewer Project Ongoing', 'High Transit Volume']
      },
      waterSanitation: {
        titleMr: 'पाणीपुरवठा व कचरा प्रक्रिया',
        titleEn: 'Water & Solid Waste',
        score: 74,
        ratingMr: 'सुधारणा सुरू',
        ratingEn: 'Under Upgrade',
        highlightsMr: ['भामा आसखेड नळ योजना टप्पा', 'घरोघरी कचरा संकलन गाडी', 'पुणे मनपा पाणी समन्वय'],
        highlightsEn: ['Bhama Askhed Water Link Phase', 'Door-to-Door Garbage Hopper', 'Municipal Coordination']
      },
      electricityConnectivity: {
        titleMr: 'ऊर्जा व हाय-स्पीड इंटरनेट',
        titleEn: 'Power & High-Speed Telecom',
        score: 88,
        ratingMr: 'उत्कृष्ट',
        ratingEn: 'Excellent',
        highlightsMr: ['२२/११ केव्ही उपकेंद्र', '५G मोबाईल नेटवर्क', 'फायबर ब्रॉडबँड उपलब्ध'],
        highlightsEn: ['22/11 kV Local Substation', '5G Mobile Network Active', 'Fibre Broadband Readily Available']
      },
      agriculture: {
        titleMr: 'भाजीपाला व दुग्ध व्यवसाय',
        titleEn: 'Dairy & Peri-Urban Farming',
        score: 77,
        ratingMr: 'समाधानकारक',
        ratingEn: 'Satisfactory',
        highlightsMr: ['पुणे शहर थेट भाजीपाला पुरवठा', 'दुग्ध संकलन केंद्रे', 'पॉलीहाऊस शेती'],
        highlightsEn: ['Direct Vegetable Urban Supply', 'Dairy Chilling Collection Point', 'Polyhouse Farming']
      },
      socialDevelopment: {
        titleMr: 'कौशल्य व महिला सक्षमीकरण',
        titleEn: 'Youth Skills & Women SHGs',
        score: 82,
        ratingMr: 'चांगले',
        ratingEn: 'Good',
        highlightsMr: ['महिला उद्योजकता प्रशिक्षण', 'युवा रोजगार मार्गदर्शन', 'क्रीडांगण विकास'],
        highlightsEn: ['Women Entrepreneurship Drives', 'Employment Counseling', 'Community Sports Ground']
      }
    }
  },
  {
    id: 'shiroli-karveer-kolhapur',
    nameMr: 'शिरोली',
    nameEn: 'Shiroli',
    talukaMr: 'करवीर',
    talukaEn: 'Karveer',
    districtMr: 'कोल्हापूर',
    districtEn: 'Kolhapur',
    divisionMr: 'पुणे विभाग',
    divisionEn: 'Pune Division',
    pincode: '416122',
    lgdCode: '578901',
    latitude: 16.7451,
    longitude: 74.2812,
    isDemoData: true,
    dataVerifiedDate: 'सप्टेंबर २०२६ (September 2026)',
    officialSource: 'जिल्हा परिषद कोल्हापूर (Demonstration Profile)',
    demographics: {
      totalPopulation: 5820,
      malePopulation: 2990,
      femalePopulation: 2830,
      households: 1180,
      literacyRate: 84.8,
      maleLiteracyRate: 90.1,
      femaleLiteracyRate: 79.2,
      workingPopulation: 2640,
      cultivators: 610,
      agriculturalLaborers: 450,
      scPopulation: 670,
      stPopulation: 95,
      areaHectares: 1120.0
    },
    administration: {
      gramPanchayatNameMr: 'ग्रामपंचायत शिरोली',
      gramPanchayatNameEn: 'Gram Panchayat Shiroli',
      sarpanchNameMr: 'श्री. संभाजी रावसाहेब यादव',
      sarpanchNameEn: 'Mr. Sambhaji Raosaheb Yadav',
      sarpanchContact: '+91 94220 XXXXX',
      gramSevakNameMr: 'श्री. दत्तात्रय माने',
      gramSevakNameEn: 'Mr. Dattatraya Mane',
      gramSevakContact: '+91 98229 XXXXX',
      talathiNameMr: 'श्री. सचिन पाटील',
      talathiNameEn: 'Mr. Sachin Patil',
      talathiContact: '+91 97632 XXXXX',
      wardCount: 9,
      assemblyConstituencyMr: 'करवीर (२७५)',
      assemblyConstituencyEn: 'Karveer (275)',
      lokSabhaConstituencyMr: 'कोल्हापूर (४७)',
      lokSabhaConstituencyEn: 'Kolhapur (47)',
      lgdCode: '578901',
      pincode: '416122'
    },
    agriculture: {
      majorCropsMr: ['ऊस', 'सोयाबीन', 'भात', 'भुईमूग'],
      majorCropsEn: ['Sugarcane', 'Soybean', 'Paddy', 'Groundnut'],
      soilTypeMr: 'पंचगंगा खोऱ्यातील सुपीक गाळाची काळी जमीन',
      soilTypeEn: 'Panchganga Basin Fertile Alluvial Black Loam',
      irrigatedAreaPercent: 91,
      waterSourceMr: 'पंचगंगा नदी उपसा सिंचन व सहकारी पाणी योजना',
      waterSourceEn: 'Panchganga River Lift & Co-op Water Society',
      nearestApmcMr: 'कोल्हापूर शेती उत्पन्न बाजार समिती (शाहू मार्केट यार्ड)',
      nearestApmcEn: 'Kolhapur APMC (Shahu Market Yard)',
      apmcDistanceKm: 8.0,
      krishiSevaKendraCount: 4,
      farmPondsCount: 15,
      dripIrrigationCoveragePercent: 78
    },
    scorecard: {
      education: {
        titleMr: 'शिक्षण व ग्रंथालय',
        titleEn: 'Education & Facilities',
        score: 85,
        ratingMr: 'उत्कृष्ट',
        ratingEn: 'Excellent',
        highlightsMr: ['जि. प. प्राथमिक व हायस्कूल', 'गावात सार्वजनिक वाचनालय', 'डिजिटल लॅब'],
        highlightsEn: ['ZP Primary & High School', 'Public Library Functional', 'Digital Computer Lab']
      },
      healthcare: {
        titleMr: 'आरोग्य व स्वच्छता',
        titleEn: 'Healthcare Access',
        score: 80,
        ratingMr: 'चांगले',
        ratingEn: 'Good',
        highlightsMr: ['प्राथमिक आरोग्य उपकेंद्र', 'नियमित वैद्यकीय शिबिरे', 'आरोग्यवर्धिनी केंद्र'],
        highlightsEn: ['Sub-centre Active', 'Regular Medical Camps', 'Ayushman Arogya Mandir Active']
      },
      infrastructure: {
        titleMr: 'पायाभूत सुविधा व रस्ते',
        titleEn: 'Civil Infrastructure',
        score: 86,
        ratingMr: 'उत्कृष्ट',
        ratingEn: 'Excellent',
        highlightsMr: ['सिमेंट काँक्रीट मुख्य रस्ते', 'भूमिगत गटारे प्रकल्प', 'एलईडी पथदिवे'],
        highlightsEn: ['Concrete Core Roads', 'Underground Drainage System', 'Full LED Coverage']
      },
      waterSanitation: {
        titleMr: 'पिण्याचे पाणी व पर्यावरण',
        titleEn: 'Drinking Water & Hygiene',
        score: 89,
        ratingMr: 'आदर्श',
        ratingEn: 'High Standard',
        highlightsMr: ['जल जीवन मिशन १००% पूर्ण', 'दोन मोठे पाण्याचे टॉवर', 'कचरा वर्गीकरण केंद्र'],
        highlightsEn: ['100% Jal Jeevan Mission Complete', 'Two Elevated Storage Reservoirs', 'Waste Segregation Unit']
      },
      electricityConnectivity: {
        titleMr: 'वीज व नेटवर्क जोडणी',
        titleEn: 'Power & Telecom',
        score: 84,
        ratingMr: 'चांगले',
        ratingEn: 'Good',
        highlightsMr: ['शेतीसाठी स्वतंत्र वाहिनी', 'महावितरण स्थानिक कार्यालय', 'ऑप्टिकल फायबर सुविधा'],
        highlightsEn: ['Dedicated Agri Feeder', 'MSEDCL Local Desk', 'Fibre Broadband Access']
      },
      agriculture: {
        titleMr: 'ऊस उत्पादन व सहकार',
        titleEn: 'Cane Agriculture & Co-ops',
        score: 93,
        ratingMr: 'अव्वल श्रेणी',
        ratingEn: 'Top Tier',
        highlightsMr: ['प्रति एकरी ८५ टन ऊस उत्पादन', 'सहकारी साखर कारखाना संलग्न', 'ठिबक सिंचन अनुदान १००%'],
        highlightsEn: ['High Cane Yield (85 Tons/Acre)', 'Cooperative Sugar Mill Linked', 'High Drip Adoption']
      },
      socialDevelopment: {
        titleMr: 'सामाजिक सहभाग व कल्याण',
        titleEn: 'Social Welfare & Community',
        score: 83,
        ratingMr: 'चांगले',
        ratingEn: 'Good',
        highlightsMr: ['मजबूत दूध उत्पादक संस्था', 'महिला बचत गट पतसंस्था', 'समाज मंदिर सभागृह'],
        highlightsEn: ['Robust Dairy Co-op Society', 'Women SHG Microcredit', 'Community Hall Available']
      }
    }
  }
];

export const MOCK_PROJECTS: DevelopmentProject[] = [
  {
    id: 'PRJ-MH-ND-01',
    villageId: 'malegaon-ardhapur-nanded',
    titleMr: 'मेडशी गाव (मालेगाव) मुख्य रस्ता रुंदीकरण व डांबरीकरण',
    titleEn: 'Medshi Village (Malegaon) Main Road Widening and Asphalt Paving',
    category: 'roads',
    departmentMr: 'सार्वजनिक बांधकाम विभाग (PWD) व जि. प.',
    departmentEn: 'Public Works Department (PWD) & ZP',
    budgetLakhs: 48.5,
    expenditureLakhs: 36.2,
    progressPercent: 78,
    status: 'in-progress',
    startDate: 'जानेवारी २०२६',
    targetDate: 'नोव्हेंबर २०२६',
    contractorMr: 'मे. सह्याद्री इन्फ्रा कन्स्ट्रक्शन्स',
    contractorEn: 'M/s Sahyadri Infra Constructions',
    sanctionOrderNumber: 'PWD/CR-84/2025-26',
    verifiedSource: 'जिल्हा परिषद बांधकाम विभाग अधिकृत नोंदवही',
    descriptionMr: 'गावाच्या मुख्य प्रवेशद्वारापासून राज्य महामार्गापर्यंत २.८ किमी लांबीचा रस्ता रुंदीकरण व डांबरीकरण कार्य वेगाने सुरू आहे.',
    descriptionEn: 'Widening and bituminous strengthening of 2.8 km arterial connector road between Medshi Village gate and highway.'
  },
  {
    id: 'PRJ-MH-ND-02',
    villageId: 'malegaon-ardhapur-nanded',
    titleMr: 'जल जीवन मिशन अंतर्गत नवीन उच्चस्तरीय पाण्याची टाकी व अंतर्गत नळ जोडणी',
    titleEn: 'Jal Jeevan Mission New Overhead Water Reservoir & Household Taps',
    category: 'water',
    departmentMr: 'ग्रामीण पाणीपुरवठा विभाग, महाराष्ट्र शासन',
    departmentEn: 'Rural Water Supply Dept, Govt of Maharashtra',
    budgetLakhs: 34.0,
    expenditureLakhs: 34.0,
    progressPercent: 100,
    status: 'completed',
    startDate: 'ऑगस्ट २०२५',
    targetDate: 'मे २०२६',
    completionDate: 'मे २०२६',
    contractorMr: 'मे. कृष्णा वॉटर इन्फ्रा प्रा. लि.',
    contractorEn: 'M/s Krishna Water Infra Pvt. Ltd.',
    sanctionOrderNumber: 'JJM/MH-ND/W-412/2025',
    verifiedSource: 'जल जीवन मिशन महाराष्ट्र पोर्टल डेटा संच',
    descriptionMr: '५०,००० लिटर क्षमतेची नवीन पाण्याची टाकी उभारण्यात आली असून ६५० हून अधिक कुटुंबांना थेट शुध्द पाण्याचे नळ जोडण्यात आले आहेत.',
    descriptionEn: 'Erection of a 50,000-litre Elevated Service Reservoir and distribution of individual functional tap connections to 650+ households.'
  },
  {
    id: 'PRJ-MH-ND-03',
    villageId: 'malegaon-ardhapur-nanded',
    titleMr: 'जिल्हा परिषद डिजिटल शाळा इमारत नूतनीकरण व सौर ऊर्जा प्रकल्प',
    titleEn: 'ZP Digital School Building Renovation & Rooftop Solar Plant',
    category: 'education',
    departmentMr: 'शिक्षण विभाग, जिल्हा परिषद नांदेड',
    departmentEn: 'Education Dept, Zilla Parishad Nanded',
    budgetLakhs: 18.2,
    expenditureLakhs: 14.5,
    progressPercent: 85,
    status: 'in-progress',
    startDate: 'मार्च २०२६',
    targetDate: 'ऑक्टोबर २०२६',
    contractorMr: 'श्री. गणेश कन्स्ट्रक्शन, नांदेड',
    contractorEn: 'Shri Ganesh Constructions, Nanded',
    sanctionOrderNumber: 'ZP-EDU/PLAN/2026/184',
    verifiedSource: 'सर्व शिक्षा अभियान व जि. प. नांदेड शिक्षण समिती',
    descriptionMr: 'शाळेच्या ४ वर्गखोल्यांचे आधुनिकीकरण, ५ किलोवॅटचा सौर ऊर्जा प्रकल्प आणि डिजिटल इंटरअॅक्टिव्ह पॅनेल बसविण्याचे काम अंतिम टप्प्यात आहे.',
    descriptionEn: 'Classroom refurbishment with 5kW rooftop solar generator and installation of digital interactive flat panels for rural students.'
  },
  {
    id: 'PRJ-MH-ND-04',
    villageId: 'malegaon-ardhapur-nanded',
    titleMr: 'स्वच्छ भारत अभियान अंतर्गत भूमिगत सांडपाणी गटार व घनकचरा शेड',
    titleEn: 'Swachh Bharat Gramin Underground Sewage Pipeline & Segregation Shed',
    category: 'sanitation',
    departmentMr: 'पाणी व स्वच्छता मिशन कक्ष, नांदेड',
    departmentEn: 'Water & Sanitation Mission, Nanded',
    budgetLakhs: 22.0,
    expenditureLakhs: 4.5,
    progressPercent: 20,
    status: 'planned',
    startDate: 'ऑगस्ट २०२६',
    targetDate: 'फेब्रुवारी २०२७',
    contractorMr: 'निविदा प्रक्रिया सुरू (E-Tender in Progress)',
    contractorEn: 'E-Tender Allocation Phase',
    sanctionOrderNumber: 'SBM-G/MH/ND/SAN-29',
    verifiedSource: 'ग्रामपंचायत मालेगाव ठराव क्र. ४/२०२६',
    descriptionMr: 'गावातील पाण्याचा निचरा व्यवस्थित होण्यासाठी १.४ किमी बंदिस्त ड्रेनेज लाईन आणि कचरा संकलन शेड बांधणे मंजूर झाले आहे.',
    descriptionEn: 'Approved underground 1.4 km concrete drainage pipeline with community waste segregation shelter.'
  },
  {
    id: 'PRJ-MH-BH-01',
    villageId: 'bhilar-mahabaleshwar-satara',
    titleMr: 'पुस्तकांचे गाव: आंतरराष्ट्रीय दर्जाचे साहित्य वाचन केंद्र व ई-लायब्ररी',
    titleEn: 'Village of Books: Modern Literature Pavilions & Digital E-Library',
    category: 'education',
    departmentMr: 'मराठी भाषा विभाग व पर्यटन संचालनालय, महाराष्ट्र शासन',
    departmentEn: 'Marathi Language Dept & Directorate of Tourism, Govt of Maharashtra',
    budgetLakhs: 85.0,
    expenditureLakhs: 72.0,
    progressPercent: 90,
    status: 'in-progress',
    startDate: 'ऑक्टोबर २०२५',
    targetDate: 'डिसेंबर २०२६',
    contractorMr: 'महाराष्ट्र पर्यटन विकास महामंडळ (MTDC) नियुक्त एजन्सी',
    contractorEn: 'MTDC Authorized Contracting Agency',
    sanctionOrderNumber: 'LANG-TOUR/2025/CR-19',
    verifiedSource: 'महाराष्ट्र राज्य मराठी विश्वकोश निर्मिती मंडळ अधिकृत अहवाल',
    descriptionMr: 'भिलार येथील २५ वाचन दालनांचे नूतनीकरण, डिजिटल कॅटलॉगिंग आणि पर्यटकांसाठी ऑडिओ-व्हिज्युअल गाईड प्रणालीची स्थापना.',
    descriptionEn: 'Refurbishment of 25 specialty literary houses with centralized digital OPAC cataloguing and tourist audio guides.'
  },
  {
    id: 'PRJ-MH-WG-01',
    villageId: 'wagholi-haveli-pune',
    titleMr: 'वाघोली अंतर्गत रिंगरोड व पावसाळी पाणी निचरा नाला काँक्रीटीकरण',
    titleEn: 'Wagholi Internal Ring Link & Stormwater Culvert Concreting',
    category: 'roads',
    departmentMr: 'पुणे महानगर प्रदेश विकास प्राधिकरण (PMRDA)',
    departmentEn: 'Pune Metropolitan Region Development Authority (PMRDA)',
    budgetLakhs: 120.0,
    expenditureLakhs: 65.0,
    progressPercent: 55,
    status: 'in-progress',
    startDate: 'जानेवारी २०२६',
    targetDate: 'जानेवारी २०२७',
    contractorMr: 'मे. भारत इन्फ्रास्ट्रक्चर प्रकल्प लि.',
    contractorEn: 'M/s Bharat Infrastructure Projects Ltd',
    sanctionOrderNumber: 'PMRDA/ENG/2026/410',
    verifiedSource: 'पीएमआरडीए मासिक प्रगती अहवाल २०२६',
    descriptionMr: 'वाहतूक कोंडी सोडविण्यासाठी ३ किमी पर्यायी मार्ग व पावसाळ्यात पाणी साचू नये म्हणून आरसीसी नाला बांधकाम.',
    descriptionEn: 'Construction of 3 km relief link road along with reinforced concrete stormwater channels to prevent seasonal waterlogging.'
  },
  {
    id: 'PRJ-MH-SH-01',
    villageId: 'shiroli-karveer-kolhapur',
    titleMr: 'शिरोली सहकारी पाणीपुरवठा व सूक्ष्म सिंचन सुधारणा प्रकल्प',
    titleEn: 'Shiroli Co-operative Lift Irrigation & Micro-Drip Modernization',
    category: 'water',
    departmentMr: 'जलसंपदा विभाग, कोल्हापूर',
    departmentEn: 'Water Resources Dept, Kolhapur',
    budgetLakhs: 52.0,
    expenditureLakhs: 52.0,
    progressPercent: 100,
    status: 'completed',
    startDate: 'जुलै २०२५',
    targetDate: 'मार्च २०२६',
    completionDate: 'मार्च २०२६',
    contractorMr: 'मे. पंचगंगा इंजिनिअरिंग वर्क्स',
    contractorEn: 'M/s Panchganga Engineering Works',
    sanctionOrderNumber: 'WRD/KOL/LIFT-09/2025',
    verifiedSource: 'जलसंपदा विभाग कोल्हापूर तपासणी नोंद',
    descriptionMr: 'पंचगंगा नदीवरील मुख्य जॅकवेल मोटार पंपांचे आधुनिकीकरण आणि ६०० एकर शेतीसाठी दाबाने पाणीपुरवठा पाईपलाईन पूर्ण.',
    descriptionEn: 'Pump overhaul at Panchganga river jackwell with pressurized conduit pipeline feeding 600 acres of cane cultivation.'
  }
];

export const MOCK_FACILITIES: Facility[] = [
  // Medshi Village (Malegaon) Facilities
  {
    id: 'FAC-ND-01',
    villageId: 'malegaon-ardhapur-nanded',
    nameMr: 'जिल्हा परिषद प्राथमिक डिजिटल शाळा, मेडशी गाव (मालेगाव बु.)',
    nameEn: 'ZP Primary Digital School, Medshi Village (Malegaon B.)',
    category: 'education',
    typeMr: 'प्राथमिक शाळा (इ. १ ली ते ७ वी)',
    typeEn: 'Government Primary School (Grades 1 to 7)',
    operationalStatus: 'active',
    timingsMr: 'सकाळी ९:३० ते दुपारी ४:३० (सोम-शनि)',
    timingsEn: '9:30 AM to 4:30 PM (Mon-Sat)',
    capacityStaffMr: '२८५ विद्यार्थी · ९ शिक्षक',
    capacityStaffEn: '285 Students · 9 Teachers',
    addressMr: 'मुख्य चौक, ग्रामपंचायत कार्यालयाजवळ, मेडशी गाव (मालेगाव)',
    addressEn: 'Main Square, Near Gram Panchayat Office, Medshi Village (Malegaon)',
    contactNumber: '+91 2462 2XXXXX',
    hasElectricity: true,
    hasPipedWater: true,
    hasInternet: true,
    verifiedDate: 'सप्टेंबर २०२६'
  },
  {
    id: 'FAC-ND-02',
    villageId: 'malegaon-ardhapur-nanded',
    nameMr: 'प्राथमिक आरोग्य उपकेंद्र (PHC Sub-Centre), मेडशी गाव',
    nameEn: 'Primary Health Sub-Centre, Medshi Village (Malegaon)',
    category: 'healthcare',
    typeMr: 'शासकीय आरोग्य उपकेंद्र',
    typeEn: 'Public Health Sub-Centre',
    operationalStatus: 'active',
    timingsMr: 'सकाळी ९:०० ते संध्याकाळी ५:०० (आपत्कालीन २४x७ सेवा)',
    timingsEn: '9:00 AM to 5:00 PM (Emergency 24x7 call)',
    capacityStaffMr: '२ आरोग्य सेविका (ANM), १ बहुउद्देशीय आरोग्य कार्यकर्ता (MPW)',
    capacityStaffEn: '2 ANM Nurses, 1 MPW Health Worker',
    addressMr: 'महामार्ग रस्त्यालगत, मेडशी गाव',
    addressEn: 'Highway Road, Medshi Village (Malegaon)',
    contactNumber: '+91 94225 XXXXX',
    hasElectricity: true,
    hasPipedWater: true,
    hasInternet: true,
    verifiedDate: 'सप्टेंबर २०२६'
  },
  {
    id: 'FAC-ND-03',
    villageId: 'malegaon-ardhapur-nanded',
    nameMr: 'ग्रामपंचायत भवन व आपले सरकार सेवा केंद्र (CSC), मेडशी गाव',
    nameEn: 'Gram Panchayat Bhawan & Aaple Sarkar Seva Kendra (CSC), Medshi Village',
    category: 'civic',
    typeMr: 'प्रशासकीय कार्यालय व ई-सेवा केंद्र',
    typeEn: 'Administrative Office & Citizen E-Services Desk',
    operationalStatus: 'active',
    timingsMr: 'सकाळी १०:०० ते संध्याकाळी ५:४५ (शासकीय दिवस)',
    timingsEn: '10:00 AM to 5:45 PM (Working Days)',
    capacityStaffMr: 'ग्रामसेवक, संगणक परिचालक, शिपाई कार्यरत',
    capacityStaffEn: 'Gram Sevak, IT Operator, Panchayat Assistant',
    addressMr: 'वॉर्ड क्र. ३, मेडशी गाव',
    addressEn: 'Ward No. 3, Medshi Village (Malegaon)',
    contactNumber: '+91 2462 XXXXXX',
    hasElectricity: true,
    hasPipedWater: true,
    hasInternet: true,
    verifiedDate: 'सप्टेंबर २०२६'
  },
  {
    id: 'FAC-ND-04',
    villageId: 'malegaon-ardhapur-nanded',
    nameMr: 'सार्वजनिक आरओ शुद्ध पेयजल केंद्र (Jal Jeevan Plant), मेडशी गाव',
    nameEn: 'Community RO Safe Drinking Water Plant, Medshi Village',
    category: 'water',
    typeMr: 'शुद्ध पाणी एटीएम व वितरण केंद्र',
    typeEn: 'Water ATM & Dispensing Unit',
    operationalStatus: 'active',
    timingsMr: 'सकाळी ६:०० ते रात्री ९:००',
    timingsEn: '6:00 AM to 9:00 PM Daily',
    capacityStaffMr: 'प्रति तास २००० लिटर क्षमता',
    capacityStaffEn: '2000 Litres / Hour Capacity',
    addressMr: 'बस स्थानक चौक, मेडशी गाव',
    addressEn: 'Bus Stand Chowk, Medshi Village (Malegaon)',
    hasElectricity: true,
    hasPipedWater: true,
    hasInternet: false,
    verifiedDate: 'ऑगस्ट २०२६'
  },
  {
    id: 'FAC-ND-05',
    villageId: 'malegaon-ardhapur-nanded',
    nameMr: 'कृषी सेवा केंद्र व शेतकरी सुविधा केंद्र, मेडशी गाव',
    nameEn: 'Krishi Seva Kendra & Farmer Advisory Depot, Medshi Village',
    category: 'agriculture',
    typeMr: 'शासकीय मान्यताप्राप्त खत, बियाणे व सल्ला केंद्र',
    typeEn: 'Govt Certified Seeds, Fertilizer & Advisory Centre',
    operationalStatus: 'active',
    timingsMr: 'सकाळी ८:०० ते संध्याकाळी ७:००',
    timingsEn: '8:00 AM to 7:00 PM',
    capacityStaffMr: 'कृषी पदवीधर सल्लागार व साठा उपलब्ध',
    capacityStaffEn: 'Agri Graduate Technical Expert on Duty',
    addressMr: 'बाजार पटांगण, मेडशी गाव',
    addressEn: 'Market Ground, Medshi Village (Malegaon)',
    contactNumber: '+91 98231 XXXXX',
    hasElectricity: true,
    hasPipedWater: true,
    hasInternet: true,
    verifiedDate: 'सप्टेंबर २०२६'
  },
  {
    id: 'FAC-ND-06',
    villageId: 'malegaon-ardhapur-nanded',
    nameMr: 'महाराष्ट्र ग्रामीण बँक - ग्राहक सेवा केंद्र (Bank BC Desk)',
    nameEn: 'Maharashtra Gramin Bank - Customer Service Point (BC), Medshi Village',
    category: 'banking',
    typeMr: 'बँकिंग सेवा व आधार सक्षम पेमेंट केंद्र (AePS)',
    typeEn: 'Rural Banking & AePS Micro-ATM Outlet',
    operationalStatus: 'active',
    timingsMr: 'सकाळी १०:०० ते संध्याकाळी ४:००',
    timingsEn: '10:00 AM to 4:00 PM',
    capacityStaffMr: 'बँक मित्र प्रतिनिधी',
    capacityStaffEn: 'Certified Bank Mitra Agent',
    addressMr: 'पोस्ट ऑफिस गल्ली, मेडशी गाव',
    addressEn: 'Post Office Lane, Medshi Village (Malegaon)',
    hasElectricity: true,
    hasPipedWater: false,
    hasInternet: true,
    verifiedDate: 'सप्टेंबर २०२६'
  },

  // Bhilar Facilities
  {
    id: 'FAC-BH-01',
    villageId: 'bhilar-mahabaleshwar-satara',
    nameMr: 'मध्यवर्ती पुस्तकालय व वाचन संस्कृती केंद्र, भिलार',
    nameEn: 'Central Public Library & Literary Hub, Bhilar',
    category: 'education',
    typeMr: 'सार्वजनिक ग्रंथालय व माहिती केंद्र',
    typeEn: 'Public Library & Archive',
    operationalStatus: 'active',
    timingsMr: 'सकाळी १०:०० ते संध्याकाळी ७:००',
    timingsEn: '10:00 AM to 7:00 PM Daily',
    capacityStaffMr: '३५,०००+ पुस्तके · ५ ग्रंथपाल व स्वयंसेवक',
    capacityStaffEn: '35,000+ Books · 5 Librarians & Curators',
    addressMr: 'मुख्य बाजार रस्ता, भिलार',
    addressEn: 'Main Market Road, Bhilar',
    contactNumber: '+91 2168 2XXXXX',
    hasElectricity: true,
    hasPipedWater: true,
    hasInternet: true,
    verifiedDate: 'सप्टेंबर २०२६'
  },
  {
    id: 'FAC-BH-02',
    villageId: 'bhilar-mahabaleshwar-satara',
    nameMr: 'प्राथमिक आरोग्य उपकेंद्र, भिलar',
    nameEn: 'Primary Health Sub-Centre, Bhilar',
    category: 'healthcare',
    typeMr: 'उपकेंद्र व प्राथमिक प्रथमोपचार',
    typeEn: 'Rural Health Sub-centre & First Aid Post',
    operationalStatus: 'active',
    timingsMr: 'सकाळी ९:०० ते संध्याकाळी ५:००',
    timingsEn: '9:00 AM to 5:00 PM',
    capacityStaffMr: '१ वैद्यकीय अधिकारी (भेट दिवस) व २ परिचारिका',
    capacityStaffEn: 'Visiting Medical Officer & 2 Nursing Staff',
    addressMr: 'शाळेजवळ, भिलार',
    addressEn: 'Near Village School, Bhilar',
    hasElectricity: true,
    hasPipedWater: true,
    hasInternet: true,
    verifiedDate: 'सप्टेंबर २०२६'
  }
];

export const MOCK_SCHEMES: GovernmentScheme[] = [
  {
    id: 'SCH-MH-01',
    nameMr: 'नमो शेतकरी महासन्मान निधी योजना',
    nameEn: 'Namo Shetkari Mahasanman Nidhi Yojana',
    shortDescMr: 'महाराष्ट्रातील पात्र शेतकऱ्यांना वर्षाला अतिरिक्त ₹६,००० थेट बँक खात्यात आर्थिक सहाय्य.',
    shortDescEn: 'Annual financial support of ₹6,000 directly transferred to eligible farmer bank accounts in Maharashtra.',
    departmentMr: 'कृषी विभाग, महाराष्ट्र शासन',
    departmentEn: 'Agriculture Department, Govt of Maharashtra',
    category: 'farmers',
    eligibilityMr: [
      'महाराष्ट्राचे मूळ रहिवासी शेतकरी असणे आवश्यक.',
      'केंद्र सरकारच्या पीएम किसान (PM-KISAN) योजनेचे पात्र लाभार्थी असणे बंधनकारक.',
      'शेतजमीन स्वतःच्या नावावर ७/१२ उताऱ्यात नोंद असावी.',
      'बँक खात्याशी आधार कार्ड व डीबीटी (DBT) सक्रिय असणे आवश्यक.'
    ],
    eligibilityEn: [
      'Must be a resident farmer of Maharashtra state.',
      'Must be an active beneficiary under PM-KISAN scheme.',
      'Agricultural land title must be recorded in Form 7/12.',
      'Bank account must be Aadhaar-seeded with active DBT mode.'
    ],
    benefitsMr: [
      'दर चार महिन्यांनी ₹२,००० याप्रमाणे वर्षाला एकूण ₹६,००० चे अनुदान.',
      'पीएम किसानचे ₹६,००० + नमो शेतकरीचे ₹६,००० असे एकत्रित वर्षाला ₹१२,००० लाभ.',
      'खत, बी-बियाणे आणि कृषी निविष्ठा खरेदीसाठी वेळेवर रोख सहाय्य.'
    ],
    benefitsEn: [
      '₹2,000 per installment every 4 months totaling ₹6,000 annually.',
      'Combined with PM-KISAN, eligible farmers receive ₹12,000 per year.',
      'Direct liquidity support for seeds, organic manure, and seasonal inputs.'
    ],
    documentsRequiredMr: [
      'आधार कार्ड',
      '७/१२ व ८-अ उतारा',
      'बँक पासबुक प्रत (Aadhaar Linked)',
      'मोबाईल नंबर (आधार लिंक)'
    ],
    documentsRequiredEn: [
      'Aadhaar Card',
      'Land Record Extract 7/12 & 8-A',
      'Aadhaar-seeded Bank Passbook copy',
      'Active mobile number linked with Aadhaar'
    ],
    applicationProcessMr: 'पीएम किसान पोर्टलवर नोंदणी असलेल्या शेतकऱ्यांचा डेटा स्वयंचलित जोडला जातो. नवीन शेतकऱ्यांनी जवळच्या "आपले सरकार सेवा केंद्रावर" जाऊन ई-केवायसी (e-KYC) पूर्ण करावी.',
    applicationProcessEn: 'Beneficiaries active on PM-KISAN are automatically integrated. New farmers can register e-KYC via CSC / Aaple Sarkar Kendra or Krishi Sahayak.',
    officialPortalUrl: 'https://krishi.maharashtra.gov.in',
    helpline: '१८००-२३३-४००० (Toll Free Krishi Desk)',
    lastVerifiedDate: 'सप्टेंबर २०२६',
    isCentrallySponsored: false
  },
  {
    id: 'SCH-MH-02',
    nameMr: 'मुख्यमंत्री माझी लाडकी बहीण योजना',
    nameEn: 'Mukhyamantri Majhi Ladki Bahin Yojana',
    shortDescMr: '२१ ते ६५ वयोगटातील पात्र महिलांना दरमहा ₹१,५०० चे थेट आर्थिक सहाय्य.',
    shortDescEn: 'Monthly financial assistance of ₹1,500 transferred to eligible women aged 21-65 in Maharashtra.',
    departmentMr: 'महिला व बालविकास विभाग, महाराष्ट्र शासन',
    departmentEn: 'Women & Child Development Dept, Govt of Maharashtra',
    category: 'women',
    eligibilityMr: [
      'अर्जदार महिला महाराष्ट्राची रहिवासी असावी.',
      'वय वर्षे २१ पूर्ण ते ६५ वर्षे असणे आवश्यक.',
      'कुटुंबाचे एकत्रित वार्षिक उत्पन्न ₹२.५० लाखांपेक्षा जास्त नसावे (पिवळे/केशरी रेशनकार्ड धारकांना प्राधान्य).',
      'कुटुंबातील कोणीही सदस्य आयकरदाता नसावा.'
    ],
    eligibilityEn: [
      'Applicant woman must be a domicile of Maharashtra.',
      'Age between 21 and 65 years.',
      'Family annual income must not exceed ₹2.50 Lakhs (Yellow/Orange ration card holders eligible).',
      'No family member should be an income tax payee.'
    ],
    benefitsMr: [
      'दरमहा ₹१,५०० थेट महिलेच्या वैयक्तिक आधार जोडलेल्या बँक खात्यात.',
      'महिलांचे आर्थिक स्वावलंबन व पोषण आहारात सुधारणा.',
      'लहान कौटुंबिक गरजा भागवण्यासाठी आर्थिक मदत.'
    ],
    benefitsEn: [
      '₹1,500 per month transferred directly to beneficiary bank account.',
      'Enhanced economic empowerment and nutritional autonomy.',
      'Support for household healthcare, nutrition and children education.'
    ],
    documentsRequiredMr: [
      'आधार कार्ड',
      'अधिवास प्रमाणपत्र / रेशन कार्ड / मतदान ओळखपत्र',
      'उत्पन्नाचा दाखला (किंवा पिवळे/केशरी रेशन कार्ड)',
      'बँक पासबुक (आधार लिंक बँक खाते)'
    ],
    documentsRequiredEn: [
      'Aadhaar Card',
      'Maharashtra Domicile Certificate / Ration Card / Voter ID',
      'Income Certificate (or Yellow/Orange Ration Card)',
      'Bank Passbook with active Aadhaar DBT link'
    ],
    applicationProcessMr: 'नारीशक्ती दूत अॅप किंवा नारीशक्ती पोर्टलद्वारे ऑनलाईन नोंदणी करा, किंवा गावातील अंगणवाडी सेविका / ग्रामपंचायत आपले सरकार केंद्रात मोफत अर्ज सादर करा.',
    applicationProcessEn: 'Apply online via the official portal / mobile app, or submit documents at your village Anganwadi worker desk or CSC.',
    officialPortalUrl: 'https://ladakibahin.maharashtra.gov.in',
    helpline: '१८१ (महिला हेल्पलाइन / Women Helpline)',
    lastVerifiedDate: 'सप्टेंबर २०२६',
    isCentrallySponsored: false
  },
  {
    id: 'SCH-MH-03',
    nameMr: 'महात्मा ज्योतिराव फुले जन आरोग्य योजना (MJPJAY)',
    nameEn: 'Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY)',
    shortDescMr: 'राज्यातील सर्व पात्र कुटुंबांना प्रति वर्ष ₹५ लाख रुपयांपर्यंत मोफत कॅशलेस वैद्यकीय उपचार.',
    shortDescEn: 'Cashless hospitalisation coverage up to ₹5,00,000 per family per year across empaneled hospitals.',
    departmentMr: 'सार्वजनिक आरोग्य विभाग, महाराष्ट्र शासन',
    departmentEn: 'Public Health Department, Govt of Maharashtra',
    category: 'health',
    eligibilityMr: [
      'महाराष्ट्रातील वैध रेशनकार्ड धारक सर्व कुटुंबे (सार्वत्रिक आरोग्य कवच).',
      'शुभ्र, केशरी किंवा पिवळे रेशनकार्ड व आधार कार्ड धारक सर्व नागरिक.',
      'सर्व सरकारी व नोंदणीकृत खाजगी रुग्णालयात १,३५०+ गंभीर आजारांवर उपचार उपलब्ध.'
    ],
    eligibilityEn: [
      'All resident families in Maharashtra holding a valid Ration Card (Universal Health Coverage).',
      'Holders of White, Orange, or Yellow ration cards with Aadhaar verification.',
      'Covers 1,350+ medical and surgical procedures across empanelled hospitals.'
    ],
    benefitsMr: [
      'प्रति कुटुंब प्रति वर्ष ₹५,००,००० पर्यंतचे १००% कॅशलेस उपचार.',
      'शस्त्रक्रिया, औषधे, तपासण्या, रुग्णालयात दाखल राहण्याचा खर्च समाविष्ट.',
      'आरोग्य मित्रांच्या मदतीने रुग्णालयात त्वरित दाखल प्रक्रिया.'
    ],
    benefitsEn: [
      'Up to ₹5,00,000 per family annually in 100% cashless inpatient hospitalisation.',
      'Surgical operations, pre-and post-hospitalisation medicines, diagnostics covered.',
      'Assistance at hospitals through dedicated "Arogyamitra" facilitators.'
    ],
    documentsRequiredMr: [
      'आधार कार्ड',
      'रेशन कार्ड (पिवळे/केशरी/शुभ्र)',
      'ओळख पुरावा (मतदान कार्ड / वाहन चालक परवाना)'
    ],
    documentsRequiredEn: [
      'Aadhaar Card',
      'Ration Card (Yellow / Orange / White)',
      'Govt Photo ID proof'
    ],
    applicationProcessMr: 'कोणत्याही नोंदणीकृत रुग्णालयातील (Empaneled Hospital) "आरोग्य मित्र" कक्षात जाऊन रेशनकार्ड व आधारकार्ड दाखवून त्वरित मंजुरी मिळवा.',
    applicationProcessEn: 'Approach the "Arogyamitra" kiosk at any empanelled government or network hospital with Ration Card and Aadhaar Card.',
    officialPortalUrl: 'https://www.jeevandayee.gov.in',
    helpline: '१५५३८८ / १८००-२३३-२२०० (Toll Free Health Desk)',
    lastVerifiedDate: 'सप्टेंबर २०२६',
    isCentrallySponsored: false
  },
  {
    id: 'SCH-MH-04',
    nameMr: 'महाडीबीटी पोस्ट-मॅट्रिक शिष्यवृत्ती योजना',
    nameEn: 'MahaDBT Post-Matric Scholarship Scheme',
    shortDescMr: 'दहावीनंतर उच्च शिक्षणासाठी शिक्षण शुल्क व परीक्षा शुल्क परतावा शिष्यवृत्ती.',
    shortDescEn: 'Tuition and exam fee reimbursement scholarship for 10th-pass students pursuing higher education.',
    departmentMr: 'सामाजिक न्याय व इतर मागास बहुजन कल्याण विभाग',
    departmentEn: 'Social Justice & Bahujan Welfare Dept, Govt of Maharashtra',
    category: 'students',
    eligibilityMr: [
      'इयत्ता १० वी उत्तीर्ण होऊन मान्यताप्राप्त महाविद्यालयात पदविका/पदवी/व्यावसायिक अभ्यासक्रमात प्रवेश घेतलेला असावा.',
      'अनुसूचित जाती (SC), जमाती (ST), ओबीसी (OBC), विमुक्त जाती/भटक्या जमाती (VJNT), किंवा आर्थिकदृष्ट्या दुर्बल (EBC) प्रवर्गातील विद्यार्थी.',
      'शासनाने विहित केलेली वार्षिक उत्पन्न मर्यादा (उदा. EBC साठी ₹८ लाख, इतर प्रवर्गांसाठी संबंधित नियम).'
    ],
    eligibilityEn: [
      'Passed Class 10th and admitted to an accredited diploma, undergraduate, or professional degree programme.',
      'Students from SC, ST, OBC, VJNT, SBC, or EWS / EBC categories.',
      'Family income ceiling within respective departmental notification criteria.'
    ],
    benefitsMr: [
      'महाविद्यालय शिक्षण शुल्कात ५०% ते १००% पर्यंत माफी / परतावा.',
      'विद्यार्थ्यांना निर्वाह भत्ता (Hostel / Day Scholar Maintenance).',
      'थेट विद्यार्थ्यांच्या आधार लिंक बँक खात्यात डीबीटी रक्कम जमा.'
    ],
    benefitsEn: [
      '50% to 100% reimbursement of approved college tuition and exam fees.',
      'Monthly maintenance allowance for hostellers and day scholars.',
      'Direct DBT credit into Aadhaar-seeded student bank account.'
    ],
    documentsRequiredMr: [
      'जातीचे प्रमाणपत्र व जात वैधता (लागू असल्यास)',
      'उत्पन्नाचा दाखला (सक्षम प्राधिकारी तहसीलदार)',
      'इयत्ता १० वी/१२ वी गुणपत्रिका',
      'महाविद्यालय प्रवेश पावती व बोनाफाईड प्रमाणपत्र',
      'आधार कार्ड व बँक पासबुक'
    ],
    documentsRequiredEn: [
      'Caste Certificate & Validity (where applicable)',
      'Tehsildar Income Certificate',
      'Previous Academic Marksheets (10th/12th)',
      'College Fee Receipt & Bonafide Certificate',
      'Aadhaar Card and Student Bank Passbook'
    ],
    applicationProcessMr: 'MahaDBT (mahadbt.maharashtra.gov.in) पोर्टलवर स्वतःचे खाते उघडून ऑनलाइन अर्ज भरावा आणि संबंधित महाविद्यालयात कागदपत्रे पडताळणी करावी.',
    applicationProcessEn: 'Create student profile on MahaDBT portal (mahadbt.maharashtra.gov.in), select scheme, submit online and verify at college counter.',
    officialPortalUrl: 'https://mahadbt.maharashtra.gov.in',
    helpline: '०२२-४९१५०८०० (MahaDBT Helpline)',
    lastVerifiedDate: 'सप्टेंबर २०२६',
    isCentrallySponsored: false
  },
  {
    id: 'SCH-MH-05',
    nameMr: 'मागेल त्याला शेततळे योजना (महाडीबीटी कृषी)',
    nameEn: 'Magel Tyala Shettale (Farm Pond On Demand Scheme)',
    shortDescMr: 'शेतकऱ्यांना शेतात पाणी साठवण तळे तयार करण्यासाठी ₹७५,००० पर्यंतचे थेट अनुदान.',
    shortDescEn: 'Direct capital subsidy up to ₹75,000 to construct farm ponds for rainwater harvesting and protective irrigation.',
    departmentMr: 'कृषी विभाग, महाराष्ट्र शासन',
    departmentEn: 'Agriculture Dept, Govt of Maharashtra',
    category: 'farmers',
    eligibilityMr: [
      'शेतकऱ्याकडे किमान ०.६० हेक्टर (१.५ एकर) शेतजमीन असावी.',
      'शेतजमीन पाणी साठवण्यासाठी तांत्रिकदृष्ट्या योग्य असावी.',
      'पूर्वी या योजनेचा लाभ घेतलेला नसावा.'
    ],
    eligibilityEn: [
      'Farmer must own minimum 0.60 hectares (approx 1.5 acres) of cultivable land.',
      'Land slope and soil must be technically viable for water storage retention.',
      'Must not have availed farm pond subsidy under this scheme previously.'
    ],
    benefitsMr: [
      'शेततळे आकारमानानुसार कमाल ₹७५,००० पर्यंत अनुदान.',
      'दुष्काळी काळात किंवा पावसाच्या खंडात पिकांना संजीवनी सिंचन.',
      'शेततळ्यात मत्स्यव्यवसायाची अतिरिक्त संधी.'
    ],
    benefitsEn: [
      'Subsidy up to ₹75,000 based on pond dimension and plastic lining.',
      'Guarantees protective life-saving irrigation during rainfall dry spells.',
      'Supplementary income opportunity through inland fisheries.'
    ],
    documentsRequiredMr: [
      '७/१२ व ८-अ उतारा',
      'आधार कार्ड',
      'बँक पासबुक',
      'हमीपत्र व शेततळे नकाशा'
    ],
    documentsRequiredEn: [
      'Form 7/12 & 8-A land records',
      'Aadhaar Card',
      'Bank passbook copy',
      'Self-declaration and farm location map'
    ],
    applicationProcessMr: 'महाडीबीटी कृषी (mahadbt.maharashtra.gov.in/farmer) पोर्टलवर अर्ज करावा. तालुका कृषी अधिकाऱ्यांच्या पूर्वसंमतीनंतर काम सुरू करावे.',
    applicationProcessEn: 'Apply on MahaDBT Farmer portal under Jalyukt/Irrigation tab. Commence excavation post Taluka Agriculture Officer work order.',
    officialPortalUrl: 'https://mahadbt.maharashtra.gov.in/farmer',
    helpline: '१८००-२३३-४००० (कृषी कक्ष)',
    lastVerifiedDate: 'सप्टेंबर २०२६',
    isCentrallySponsored: false
  },
  {
    id: 'SCH-MH-06',
    nameMr: 'पंतप्रधान आवास योजना - ग्रामीण (PMAY-G)',
    nameEn: 'Pradhan Mantri Awas Yojana - Gramin (PMAY-G)',
    shortDescMr: 'ग्रामीण भागातील बेघर व कच्च्या घरात राहणाऱ्या कुटुंबांना पक्के घर बांधण्यासाठी ₹१.२० लाखांचे अनुदान.',
    shortDescEn: 'Financial assistance of ₹1,20,000 for constructing a permanent pucca house for rural homeless or kutcha house dwellers.',
    departmentMr: 'ग्रामविकास विभाग, महाराष्ट्र शासन / केंद्र शासन',
    departmentEn: 'Rural Development Dept, Govt of Maharashtra / MoRD GoI',
    category: 'housing',
    eligibilityMr: [
      'सामाजिक-आर्थिक व जात जनगणना (SECC) किंवा आवास प्लस प्रतीक्षा यादीतील लाभार्थी.',
      'स्वतःचे पक्के घर नसलेले कुटुंबीय.',
      'कुटुंबात कोणाकडेही चारचाकी वाहन अथवा सरकारी नोकरी नसावी.'
    ],
    eligibilityEn: [
      'Families enlisted under SECC Priority Waitlist or Awaas+ survey.',
      'Homeless or households living in zero, one or two-room kutcha houses.',
      'Must not own a motorized 4-wheeler or government permanent job.'
    ],
    benefitsMr: [
      'घर बांधकामासाठी ₹१,२०,००० थेट हप्त्यांमध्ये बँक खात्यात.',
      'मनरेगा (MGNREGA) अंतर्गत ९० ते ९५ दिवसांचा रोजगार मजुरी भत्ता (सुमारे ₹२५,००० अतिरिक्त).',
      'स्वच्छ भारत अभियानातून शौचालयासाठी स्वतंत्र ₹१२,००० अनुदान.'
    ],
    benefitsEn: [
      'Direct grant of ₹1,20,000 disbursed across structural stage completion.',
      'Additional 90-95 days of unskilled labour wages under MGNREGA (~₹25,000).',
      '₹12,000 grant under Swachh Bharat Gramin for individual toilet.'
    ],
    documentsRequiredMr: [
      'आधार कार्ड व जॉब कार्ड',
      'जागा मालकी पुरावा / ग्रामपंचायत नमुना ८',
      'बँक पासबुक',
      'विद्यमान कच्च्या घराचा जिओ-टॅग फोटो'
    ],
    documentsRequiredEn: [
      'Aadhaar Card and MGNREGA Job Card',
      'Land ownership deed or Gram Panchayat Form 8 register',
      'Bank Passbook',
      'Geo-tagged photograph of existing kutcha shelter'
    ],
    applicationProcessMr: 'ग्रामपंचायतीच्या ग्रामसभेमध्ये आवास प्लस यादीत नाव समाविष्ट करून ग्रामसेवकांमार्फत प्रस्ताव पंचायत समितीकडे सादर होतो.',
    applicationProcessEn: 'Eligibility verified via Gram Sabha resolution in Gram Panchayat; Gram Sevak forwards proposal to Panchayat Samiti.',
    officialPortalUrl: 'https://pmayg.nic.in',
    helpline: '०२२-२२०२५४०१ (ग्रामीण गृहनिर्माण कक्ष)',
    lastVerifiedDate: 'सप्टेंबर २०२६',
    isCentrallySponsored: true
  }
];

export const INITIAL_ISSUE_REPORTS: IssueReport[] = [
  {
    id: 'GRM-2026-001245',
    villageId: 'malegaon-ardhapur-nanded',
    villageNameMr: 'मेडशी गाव (मालेगाव बुद्रुक)',
    villageNameEn: 'Medshi Village (Malegaon Budruk)',
    category: 'water',
    titleMr: 'जि. प. प्राथमिक शाळेजवळील मुख्य पाईपलाईन गळती',
    titleEn: 'Main Water Pipeline Leakage Near ZP School',
    description: 'शाळेच्या पूर्व गेटजवळ जल जीवन मिशनच्या पाईपलाईनला तडे गेले असून रोज सकाळी पाणीपुरवठ्याच्या वेळी रस्त्यावर पाणी साचून वाहतुकीस अडचण येत आहे.',
    landmark: 'वॉर्ड क्र. २, जिल्हा परिषद शाळा पूर्व गेट',
    citizenName: 'रमेश पांडुरंग देशमुख',
    citizenPhone: '+91 98221 45XXX',
    status: 'in-progress',
    submittedAt: '१८ सप्टेंबर २०२६',
    updatedAt: '२१ सप्टेंबर २०२६',
    assignedDepartmentMr: 'ग्रामीण पाणीपुरवठा उपविभाग, अर्धापूर',
    assignedDepartmentEn: 'Rural Water Supply Sub-division, Ardhapur',
    assignedOfficerRemarks: 'प्लंबिंग पथकाने प्रत्यक्ष पाहणी केली असून सांधणीचे साहित्य मागवले आहे. २४ सप्टेंबरपर्यंत दुरुस्ती पूर्ण होईल.'
  },
  {
    id: 'GRM-2026-001890',
    villageId: 'bhilar-mahabaleshwar-satara',
    villageNameMr: 'भिलार',
    villageNameEn: 'Bhilar',
    category: 'street-lights',
    titleMr: 'वॉर्ड क्र. ३ वाचन दालनासमोर एलईडी पथदिवा बंद',
    titleEn: 'LED Streetlight Out of Order in front of Reading House 3',
    description: 'गेल्या पाच दिवसांपासून वाचन दालन क्र. ३ समोरील सौर पथदिवा बंद असल्याने संध्याकाळी पर्यटकांना व स्थानिक नागरिकांना अंधाराचा सामना करावा लागत आहे.',
    landmark: 'वाचन दालन ३, गणपती मंदिर परिसर',
    citizenName: 'सचिन यशवंत सावंत',
    citizenPhone: '+91 94231 87XXX',
    status: 'resolved',
    submittedAt: '१० सप्टेंबर २०२६',
    updatedAt: '१३ सप्टेंबर २०२६',
    assignedDepartmentMr: 'ग्रामपंचायत विद्युत देखभाल विभाग, भिलार',
    assignedDepartmentEn: 'Gram Panchayat Electrical Maintenance Desk, Bhilar',
    assignedOfficerRemarks: 'सोलर इनव्हर्टर बॅटरी टर्मिनल बदलण्यात आले असून दिवा पूर्ववत सुरू करण्यात आला आहे.'
  },
  {
    id: 'GRM-2026-002104',
    villageId: 'wagholi-haveli-pune',
    villageNameMr: 'वाघोली',
    villageNameEn: 'Wagholi',
    category: 'drainage',
    titleMr: 'बाजार पटांगण परिसरातील सांडपाणी नाला गाळ उपसा करणे',
    titleEn: 'Desilting and Sludge Removal from Market Ground Storm Drain',
    description: 'आठवडे बाजार परिसरात पावसाळी नाल्यात प्लास्टिक व गाळ साचल्यामुळे दुर्गंधी पसरत असून डासांचा प्रादुर्भाव वाढला आहे.',
    landmark: 'आठवडे बाजार मैदान, भैरवनाथ मंदिर रस्ता',
    citizenName: 'अमित दत्तात्रय सातव',
    citizenPhone: '+91 98501 12XXX',
    status: 'under-review',
    submittedAt: '२० सप्टेंबर २०२६',
    updatedAt: '२२ सप्टेंबर २०२६',
    assignedDepartmentMr: 'आरोग्य व स्वच्छता विभाग, ग्रामपंचायत वाघोली',
    assignedDepartmentEn: 'Health & Sanitation Dept, Gram Panchayat Wagholi',
    assignedOfficerRemarks: 'तक्रार प्राप्त झाली असून जेथे जेसीबी द्वारे गाळ काढणे आवश्यक आहे तेथे कामाचे वेळापत्रक निश्चित केले जात आहे.'
  }
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ANN-2026-01',
    titleMr: 'ग्रामसभा आयोजन: विकासकामांचा आर्थिक आढावा व जलसंधारण नियोजन',
    titleEn: 'General Gram Sabha Meeting: Financial Audit & Water Budgeting',
    departmentMr: 'ग्रामपंचायत प्रशासन व ग्रामविकास विभाग',
    departmentEn: 'Gram Panchayat Administration & Rural Development',
    summaryMr: 'गावातील सर्व प्रौढ नागरिकांना कळविण्यात येते की, आगामी वित्तीय वर्षातील विकासकामांचा आराखडा मंजूर करण्यासाठी ग्रामसभा आयोजित केली आहे.',
    summaryEn: 'Notice to all adult village residents: Mandatory Gram Sabha session scheduled to approve annual GPDP development works and Jal Jeevan audit.',
    date: '२५ सप्टेंबर २०२६',
    isUrgent: true,
    sourceUrl: 'https://rdd.maharashtra.gov.in'
  },
  {
    id: 'ANN-2026-02',
    titleMr: 'रब्बी हंगाम बियाणे वाटप व खत पुरवठा शिबिर',
    titleEn: 'Rabi Season Seed Allocation & Micro-Nutrient Distribution Camp',
    departmentMr: 'कृषी विभाग, महाराष्ट्र शासन',
    departmentEn: 'Agriculture Department, Govt of Maharashtra',
    summaryMr: 'शेतकऱ्यांसाठी प्रमाणित हरभरा, गहू आणि ज्वारी बियाणे ५०% अनुदानावर उपलब्ध असून शेतकरी बांधवांनी महाडीबीटी अर्जासह उपस्थित राहावे.',
    summaryEn: 'Certified gram, wheat, and jowar seed varieties made available at 50% subsidized rates under state food security mission.',
    date: '२८ सप्टेंबर २०२६',
    isUrgent: false,
    sourceUrl: 'https://krishi.maharashtra.gov.in'
  },
  {
    id: 'ANN-2026-03',
    titleMr: 'आयुष्मान भारत - डिजिटल आभा कार्ड (ABHA) नोंदणी महाशिबीर',
    titleEn: 'Ayushman Bharat Digital Health Account (ABHA) Mass Registration',
    departmentMr: 'सार्वजनिक आरोग्य विभाग व राष्ट्रीय आरोग्य अभियान',
    departmentEn: 'Public Health Department & National Health Mission',
    summaryMr: 'गावातील प्रत्येक नागरिकाने आपले डिजिटल आरोग्य खाते (ABHA ID) तयार करून सर्व वैद्यकीय तपासणी नोंदी सुरक्षित ठेवण्यासाठी उपकेंद्रात संपर्क साधावा.',
    summaryEn: 'All residents are encouraged to create their unique 14-digit ABHA health account at the local PHC sub-centre with Aadhaar authentication.',
    date: '०२ ऑक्टोबर २०२६',
    isUrgent: false,
    sourceUrl: 'https://arogya.maharashtra.gov.in'
  }
];
