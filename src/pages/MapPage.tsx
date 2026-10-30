import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  MapPin,
  Compass,
  Navigation,
  ExternalLink,
  Layers,
  HeartPulse,
  GraduationCap,
  Droplet,
  Building2,
  CheckCircle2,
  Phone,
  Clock,
  Car,
  Bus,
  Bike,
  Route,
  Search,
  Sparkles,
  Maximize2,
  Share2,
  CornerDownRight,
  ShieldCheck,
  Wheat,
  Landmark,
  Zap
} from 'lucide-react';

import { GisPlannerPage } from './GisPlannerPage';

interface VillageFacilityLocation {
  id: string;
  nameMr: string;
  nameEn: string;
  category: 'governance' | 'healthcare' | 'education' | 'water' | 'agriculture' | 'banking' | 'transport' | 'power';
  latitude: number;
  longitude: number;
  distanceFromCenter: string;
  direction: string;
  addressMr: string;
  addressEn: string;
  timingsMr: string;
  timingsEn: string;
  contactNumber: string;
  servicesMr: string[];
  servicesEn: string[];
  roadType: string;
}

interface ConnectivityRoute {
  id: string;
  originVillageId: string;
  originNameEn: string;
  originNameMr: string;
  destVillageId: string;
  destNameEn: string;
  destNameMr: string;
  distanceKm: number;
  timeCar: string;
  timeBus: string;
  highwayName: string;
  roadQuality: 'Excellent 4-Lane' | 'Good 2-Lane Asphalt' | 'Concrete Link';
  waypoints: string[];
  turnByTurn: { instructionEn: string; instructionMr: string; distance: string }[];
}

export const MapPage: React.FC = () => {
  const { language, selectedVillage, allVillages, navigateTo } = useApp();
  const t = getTranslation(language);

  // Tab View Mode: 'facilities' (Village & POI Map), 'inter-village-routes' (Regional Connectivity Network), or 'gis-planner' (10-Feature Suite)
  const [viewMode, setViewMode] = useState<'facilities' | 'inter-village-routes' | 'gis-planner'>('facilities');

  // Google Maps Style: 'm' (Roadmap), 'k' (Satellite), 'p' (Terrain)
  const [mapType, setMapType] = useState<'m' | 'k' | 'p'>('m');
  const [zoomLevel, setZoomLevel] = useState<number>(15);

  // Category Filter for facilities
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Selected Facility for detail & focus
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('fac-gp-01');

  // Route Planner state
  const [routeOrigin, setRouteOrigin] = useState<string>(selectedVillage.id);
  const [routeDest, setRouteDest] = useState<string>('bhilar-mahabaleshwar-satara');
  const [travelMode, setTravelMode] = useState<'car' | 'bus' | 'bike'>('car');

  const vName = language === 'mr' ? selectedVillage.nameMr : selectedVillage.nameEn;
  const tName = language === 'mr' ? selectedVillage.talukaMr : selectedVillage.talukaEn;
  const dName = language === 'mr' ? selectedVillage.districtMr : selectedVillage.districtEn;

  // Comprehensive Detailed Facilities for Medshi Village (Malegaon Budruk) and selected villages
  const detailedFacilities: VillageFacilityLocation[] = [
    {
      id: 'fac-gp-01',
      nameMr: 'ग्रामपंचायत भवन व आपले सरकार सेवा केंद्र (CSC)',
      nameEn: 'Gram Panchayat Bhawan & Aaple Sarkar Seva Kendra (CSC)',
      category: 'governance',
      latitude: selectedVillage.latitude,
      longitude: selectedVillage.longitude,
      distanceFromCenter: '0 m (केंद्रीत)',
      direction: 'Center',
      addressMr: 'मुख्य चौक, वॉर्ड क्र. १, मेडशी गाव',
      addressEn: 'Main Square, Ward 1, Medshi Village',
      timingsMr: 'सकाळी १०:०० ते संध्याकाळी ५:४५ (शासकीय दिवस)',
      timingsEn: '10:00 AM - 5:45 PM (Working Days)',
      contactNumber: '+91 2462 278144',
      servicesMr: ['७/१२ व ८-अ डिजिटल उतारा', 'जन्म-मृत्यू प्रमाणपत्र', 'घरपट्टी-पाणीपट्टी भरणा', 'ई-सेवा अर्ज'],
      servicesEn: ['Digital 7/12 & 8-A Extract', 'Birth & Death Registry', 'Property Tax Payment', 'E-Services Desk'],
      roadType: 'Cement Concrete Main Street'
    },
    {
      id: 'fac-sch-02',
      nameMr: 'जिल्हा परिषद प्राथमिक डिजिटल शाळा (इ. १ ली ते ७ वी)',
      nameEn: 'ZP Primary Digital School (Grades 1 to 7)',
      category: 'education',
      latitude: selectedVillage.latitude + 0.0022,
      longitude: selectedVillage.longitude - 0.0018,
      distanceFromCenter: '240 m',
      direction: 'North-West (वायव्य)',
      addressMr: 'शाळा गल्ली, मारुती मंदिराशेजारी, मेडशी गाव',
      addressEn: 'School Lane, Near Maruti Temple, Medshi Village',
      timingsMr: 'सकाळी ९:३० ते दुपारी ४:३० (सोम-शनि)',
      timingsEn: '9:30 AM - 4:30 PM (Mon-Sat)',
      contactNumber: '+91 2462 278102',
      servicesMr: ['डिजिटल स्मार्ट वर्गखोल्या', 'मोफत पाठ्यपुस्तके व गणवेश', 'शालेय पोषण आहार (MDM)', 'संगणक लॅब'],
      servicesEn: ['Digital Smart Classrooms', 'Free Textbooks & Uniforms', 'Mid-Day Meals Kitchen', 'Computer Lab'],
      roadType: 'Bituminous Paved Village Road'
    },
    {
      id: 'fac-phc-03',
      nameMr: 'प्राथमिक आरोग्य उपकेंद्र (PHC Sub-Centre) व १०२ रुग्णवाहिका',
      nameEn: 'Primary Health Sub-Centre (PHC) & 102 Ambulance Point',
      category: 'healthcare',
      latitude: selectedVillage.latitude - 0.0028,
      longitude: selectedVillage.longitude + 0.0025,
      distanceFromCenter: '350 m',
      direction: 'South-East (आग्नेय)',
      addressMr: 'महामार्ग जोडरस्त्यालगत, मेडशी गाव',
      addressEn: 'Highway Link Road, Medshi Village',
      timingsMr: 'सकाळी ९:०० ते संध्याकाळी ५:०० (आपत्कालीन २४x७ सेवा)',
      timingsEn: '9:00 AM - 5:00 PM (Emergency Call 24x7)',
      contactNumber: '+91 94220 89123',
      servicesMr: ['नियमित बाह्यरुग्ण (OPD)', 'बाल व माता लसीकरण', '१०२ मोफत रुग्णवाहिका', 'आयुष्मान आरोग्य तपासणी'],
      servicesEn: ['Outpatient Care (OPD)', 'Maternal & Child Immunization', '102 Free Ambulance', 'Generic Medicines Counter'],
      roadType: 'State Highway Link Road'
    },
    {
      id: 'fac-ro-04',
      nameMr: 'सामुदायिक आरओ शुद्ध पेयजल एटीएम केंद्र (Jal Jeevan Plant)',
      nameEn: 'Community RO Safe Drinking Water ATM Plant (JJM)',
      category: 'water',
      latitude: selectedVillage.latitude - 0.0012,
      longitude: selectedVillage.longitude - 0.0022,
      distanceFromCenter: '210 m',
      direction: 'West (पश्चिम)',
      addressMr: 'बस स्थानक चौक, मेडशी गाव',
      addressEn: 'Bus Stand Square, Medshi Village',
      timingsMr: 'सकाळी ६:०० ते रात्री ९:०० (दैनंदिन)',
      timingsEn: '6:00 AM - 9:00 PM Daily',
      contactNumber: '+91 98224 55190',
      servicesMr: ['२० लिटर शुद्ध पाणी स्मार्ट कार्डने', 'प्रति तास २००० लिटर प्रक्रिया', 'टीडीएस पातळी ८५ पीपीएम नियंत्रित'],
      servicesEn: ['20-Litre Smart Water ATM Dispenser', '2,000 LPH Capacity', 'Controlled TDS 85 ppm Safe Water'],
      roadType: 'Main Bazar Asphalt Lane'
    },
    {
      id: 'fac-krishi-05',
      nameMr: 'कृषी सेवा केंद्र, माती परीक्षण प्रयोगशाळा व शेतकरी सल्लागार कक्ष',
      nameEn: 'Krishi Seva Kendra, Soil Testing Lab & Farmer Advisory Depot',
      category: 'agriculture',
      latitude: selectedVillage.latitude + 0.0031,
      longitude: selectedVillage.longitude + 0.0019,
      distanceFromCenter: '320 m',
      direction: 'North-East (ईशान्य)',
      addressMr: 'कृषी बाजार पटांगण, मेडशी गाव',
      addressEn: 'Agri Market Yard, Medshi Village',
      timingsMr: 'सकाळी ८:०० ते संध्याकाळी ७:००',
      timingsEn: '8:00 AM - 7:00 PM',
      contactNumber: '+91 98231 99014',
      servicesMr: ['शासकीय अनुदानावरील बियाणे व खते', 'डिजिटल माती परीक्षण', 'ठिबक सिंचन सुटे भाग', 'पीक संरक्षण मार्गदर्शन'],
      servicesEn: ['Govt Subsidized Seeds & Fertilizers', 'Digital Soil Testing Report', 'Drip Spares & Micro-irrigation', 'Crop Advisory'],
      roadType: 'Paved APMC Approach Road'
    },
    {
      id: 'fac-bank-06',
      nameMr: 'महाराष्ट्र ग्रामीण बँक - ग्राहक सेवा केंद्र (BC) व आधार एटीएम',
      nameEn: 'Maharashtra Gramin Bank - Customer Service Point & AePS ATM',
      category: 'banking',
      latitude: selectedVillage.latitude + 0.0014,
      longitude: selectedVillage.longitude - 0.0009,
      distanceFromCenter: '150 m',
      direction: 'North (उत्तर)',
      addressMr: 'पोस्ट ऑफिस गल्ली, मेडशी गाव',
      addressEn: 'Post Office Lane, Medshi Village',
      timingsMr: 'सकाळी १०:०० ते दुपारी ४:०० (सोम-शनि)',
      timingsEn: '10:00 AM - 4:00 PM (Mon-Sat)',
      contactNumber: '+91 2462 278210',
      servicesMr: ['पंतप्रधान किसान सन्मान थेट रक्कम वाटप', 'आधार अंगठा कॅश विड्रॉल (AePS)', 'नवीन खाते उघडणे', 'महिला बचत गट व्यवहार'],
      servicesEn: ['Direct PM-Kisan DBT Withdrawal', 'Aadhaar AePS Micro-ATM', 'Zero Balance Accounts', 'SHG Credit Facility'],
      roadType: 'Paved Pedestrian Street'
    },
    {
      id: 'fac-bus-07',
      nameMr: 'एसटी बस थांबा (MSRTC) व ग्रामीण प्रवासी निवारा शेड',
      nameEn: 'MSRTC State Transport Bus Stand & Passenger Transit Shelter',
      category: 'transport',
      latitude: selectedVillage.latitude - 0.0035,
      longitude: selectedVillage.longitude + 0.0032,
      distanceFromCenter: '460 m',
      direction: 'South-East (आग्नेय)',
      addressMr: 'राज्य महामार्ग नाका, मेडशी गाव',
      addressEn: 'State Highway Junction, Medshi Village',
      timingsMr: '२४ तास उपलब्ध (पहिली बस पहाटे ५:४५)',
      timingsEn: '24 Hours Open (First bus 5:45 AM)',
      contactNumber: '+91 2462 278001',
      servicesMr: ['अर्धापूर, नांदेड, हिंगोली नियमित बस फेऱ्या', 'विद्यार्थी पास सुविधा केंद्र', 'शेती माल वाहतूक पिकअप'],
      servicesEn: ['Direct MSRTC buses to Ardhapur, Nanded, Hingoli', 'Student Concession Pass Counter', 'Farm Freight Halt'],
      roadType: 'Multi-lane Highway Junction'
    },
    {
      id: 'fac-power-08',
      nameMr: 'महावितरण ३३/११ केव्ही कृषी व घरगुती वीज उपकेंद्र',
      nameEn: 'MSEDCL 33/11 kV Dedicated Agriculture & Village Substation',
      category: 'power',
      latitude: selectedVillage.latitude - 0.0042,
      longitude: selectedVillage.longitude - 0.0030,
      distanceFromCenter: '520 m',
      direction: 'South-West (नैऋत्य)',
      addressMr: 'शेत पाणंद रस्ता, मेडशी गाव',
      addressEn: 'Farm Access Panand Road, Medshi Village',
      timingsMr: '२४ तास नियंत्रण कक्ष (Control Room)',
      timingsEn: '24x7 Control Room & Breakdown Desk',
      contactNumber: '+91 2462 278300',
      servicesMr: ['शेतपंपासाठी स्वतंत्र ८ तास थ्री-फेज वीज', 'ट्रान्सफॉर्मर जळाल्यास ४८ तासांत बदल', 'सौर कृषी पंप तांत्रिक मदत'],
      servicesEn: ['Dedicated 8-Hour 3-Phase Agricultural Feeder', '48-Hour Transformer Replacement SLA', 'Solar Pump Maintenance'],
      roadType: 'Gravel Panand Approach Road'
    }
  ];

  // Inter-Village Connectivity Routes
  const connectivityRoutes: ConnectivityRoute[] = [
    {
      id: 'route-medshi-ardhapur',
      originVillageId: 'malegaon-ardhapur-nanded',
      originNameEn: 'Medshi Village (Malegaon)',
      originNameMr: 'मेडशी गाव (मालेगाव)',
      destVillageId: 'ardhapur-hub',
      destNameEn: 'Ardhapur Taluka Junction',
      destNameMr: 'अर्धापूर तालुका केंद्र',
      distanceKm: 12.4,
      timeCar: '18 mins',
      timeBus: '25 mins',
      highwayName: 'State Highway 204 (SH-204) & Ardhapur Arterial',
      roadQuality: 'Good 2-Lane Asphalt',
      waypoints: ['Medshi Village Gate', 'Asna River Bridge', 'Degaon Phata', 'Ardhapur APMC Bypass'],
      turnByTurn: [
        {
          instructionEn: 'Head south from Medshi Gram Panchayat Chowk onto Village Main Connector road',
          instructionMr: 'मेडशी ग्रामपंचायत चौकातून दक्षिणेकडे मुख्य जोडरस्त्याकडे जा',
          distance: '0.8 km'
        },
        {
          instructionEn: 'Turn left onto State Highway 204 (SH-204) towards Ardhapur',
          instructionMr: 'राज्य महामार्ग २०४ (SH-204) वर डावे वळण घ्या व अर्धापूरच्या दिशेने पुढे जा',
          distance: '7.2 km'
        },
        {
          instructionEn: 'Cross Asna River Bridge; stay in right lane past Degaon Phata',
          instructionMr: 'आसणा नदीचा पूल ओलांडा; देगाव फाटा ओलांडून उजव्या लेनमध्ये रहा',
          distance: '3.4 km'
        },
        {
          instructionEn: 'Arrive at Ardhapur Taluka administrative square & Bus Terminal',
          instructionMr: 'अर्धापूर तालुका प्रशासकीय चौक व बस स्थानक येथे पोहोचा',
          distance: '1.0 km'
        }
      ]
    },
    {
      id: 'route-medshi-nanded',
      originVillageId: 'malegaon-ardhapur-nanded',
      originNameEn: 'Medshi Village (Malegaon)',
      originNameMr: 'मेडशी गाव (मालेगाव)',
      destVillageId: 'nanded-district',
      destNameEn: 'Nanded District Headquarters (Huzur Sahib)',
      destNameMr: 'नांदेड जिल्हा मुख्यालय (हुजूर साहिब)',
      distanceKm: 28.6,
      timeCar: '38 mins',
      timeBus: '55 mins',
      highwayName: 'National Highway 161 (NH-161 Akola-Nanded Corridor)',
      roadQuality: 'Excellent 4-Lane',
      waypoints: ['Medshi Village Main Gate', 'Ardhapur Interchange', 'Taroda Naka Ring Road', 'Nanded Central Railway Stn'],
      turnByTurn: [
        {
          instructionEn: 'Take SH-204 from Medshi to Ardhapur Interchange',
          instructionMr: 'मेडशीतून राज्य महामार्ग २०४ ने अर्धापूर इंटरचेंजकडे जा',
          distance: '12.4 km'
        },
        {
          instructionEn: 'Merge onto National Highway 161 (NH-161 4-Lane Express Corridor)',
          instructionMr: 'राष्ट्रीय महामार्ग १६१ (NH-161 ४-पदरी द्रुतगती कॉरिडॉर) वर सामील व्हा',
          distance: '11.8 km'
        },
        {
          instructionEn: 'Take the flyover towards Taroda Naka and Nanded Station Road',
          instructionMr: 'तरोडा नाका उड्डाणपुलावरून नांदेड स्टेशन रोडकडे वळा',
          distance: '3.2 km'
        },
        {
          instructionEn: 'Reach Nanded District Collectorate and Guru Gobind Singh Ji Airport junction',
          instructionMr: 'नांदेड जिल्हाधिकारी कार्यालय व विमानतळ चौकात पोहोचा',
          distance: '1.2 km'
        }
      ]
    },
    {
      id: 'route-medshi-bhilar',
      originVillageId: 'malegaon-ardhapur-nanded',
      originNameEn: 'Medshi Village (Malegaon)',
      originNameMr: 'मेडशी गाव (मालेगाव)',
      destVillageId: 'bhilar-mahabaleshwar-satara',
      destNameEn: 'Bhilar (Village of Books, Satara)',
      destNameMr: 'भिलार (पुस्तकांचे गाव, सातारा)',
      distanceKm: 486.0,
      timeCar: '7 hrs 45 mins',
      timeBus: '11 hrs 30 mins',
      highwayName: 'Samruddhi Mahamarg (Expressway) -> Pune Ring Road -> NH-48 (Pasarni Ghat)',
      roadQuality: 'Excellent 4-Lane',
      waypoints: ['Nanded Hub', 'Chh. Sambhajinagar Interchange', 'Wagholi (Pune)', 'Surur Phata (Satara)', 'Panchgani / Bhilar'],
      turnByTurn: [
        {
          instructionEn: 'Proceed via NH-161 to Jalna / Chhatrapati Sambhajinagar Expressway feeder',
          instructionMr: 'NH-१६१ ने जालना / छत्रपती संभाजीनगर समृद्धी महामार्ग फीडरकडे जा',
          distance: '185.0 km'
        },
        {
          instructionEn: 'Connect to Pune-Ahmednagar corridor into Wagholi sector',
          instructionMr: 'पुणे-अहमदनगर कॉरिडॉरवरून वाघोली हद्दीत प्रवेश करा',
          distance: '198.0 km'
        },
        {
          instructionEn: 'Take Pune-Bangalore National Highway 48 (NH-48) South towards Satara / Shirwal',
          instructionMr: 'पुणे-बंगलोर राष्ट्रीय महामार्ग ४८ ने सातारा / शिरवळ दिशेने दक्षिणेकडे जा',
          distance: '78.0 km'
        },
        {
          instructionEn: 'Exit at Surur Phata onto Wai-Panchgani-Mahabaleshwar Road; ascend Pasarni Ghat into Bhilar Village',
          instructionMr: 'सुरूर फाट्यावरून वाई-पाचगणी रस्त्याने पसरणी घाट चढून भिलार पुस्तकांच्या गावात पोहोचा',
          distance: '25.0 km'
        }
      ]
    },
    {
      id: 'route-pune-bhilar',
      originVillageId: 'wagholi-haveli-pune',
      originNameEn: 'Wagholi (Pune Sector)',
      originNameMr: 'वाघोली (पुणे परिसर)',
      destVillageId: 'bhilar-mahabaleshwar-satara',
      destNameEn: 'Bhilar (Satara / Mahabaleshwar)',
      destNameMr: 'भिलार (सातारा / महाबळेश्वर)',
      distanceKm: 114.5,
      timeCar: '2 hrs 40 mins',
      timeBus: '3 hrs 45 mins',
      highwayName: 'National Highway 48 (NH-48 Old NH-4 Pune-Satara Road)',
      roadQuality: 'Excellent 4-Lane',
      waypoints: ['Wagholi Bypass', 'Katraj Tunnel (Pune)', 'Shirwal MIDC', 'Surur Phata (Wai)', 'Bhilar Village Entry'],
      turnByTurn: [
        {
          instructionEn: 'From Wagholi, take Katraj-Dehu Road bypass onto NH-48 South',
          instructionMr: 'वाघोलीतून कात्रज-देहूरोड बायपासने NH-४८ दक्षिणेकडे जा',
          distance: '28.0 km'
        },
        {
          instructionEn: 'Drive through New Katraj Tunnel and Khambatki Ghat onto Shirwal stretch',
          instructionMr: 'नवीन कात्रज बोगदा व खंबाटकी घाटातून शिरवळ पट्ट्यातून पुढे जा',
          distance: '52.0 km'
        },
        {
          instructionEn: 'Turn right at Surur Phata towards Wai & Panchgani Strawberry belt',
          instructionMr: 'सुरूर फाट्यावर उजवे वळण घेऊन वाई व पाचगणी स्ट्रॉबेरी पट्ट्याकडे जा',
          distance: '22.5 km'
        },
        {
          instructionEn: 'Ascend Pasarni Ghat road and turn left at Bhilar Book Village gate',
          instructionMr: 'पसरणी घाट चढून भिलार पुस्तकांचे गाव कमान येथे डावे वळण घ्या',
          distance: '12.0 km'
        }
      ]
    }
  ];

  // Active facility details
  const activeFacility =
    detailedFacilities.find((f) => f.id === selectedFacilityId) || detailedFacilities[0];

  // Filtered facilities by active category and search
  const filteredFacilities = detailedFacilities.filter((f) => {
    if (activeCategory !== 'all' && f.category !== activeCategory) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      const match =
        f.nameEn.toLowerCase().includes(q) ||
        f.nameMr.toLowerCase().includes(q) ||
        f.addressEn.toLowerCase().includes(q) ||
        f.addressMr.toLowerCase().includes(q) ||
        f.servicesEn.some((s) => s.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  // Active selected connectivity route
  const currentRoute =
    connectivityRoutes.find(
      (r) =>
        (r.originVillageId === routeOrigin && r.destVillageId === routeDest) ||
        (r.originVillageId === routeDest && r.destVillageId === routeOrigin)
    ) || connectivityRoutes[0];

  // Google Maps dynamic URL for iframe
  // t=m (roadmap), t=k (satellite), t=p (terrain)
  const mapCenterLat =
    viewMode === 'facilities' && activeFacility ? activeFacility.latitude : (selectedVillage?.latitude ?? 19.3245);
  const mapCenterLng =
    viewMode === 'facilities' && activeFacility ? activeFacility.longitude : (selectedVillage?.longitude ?? 77.2743);

  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${mapCenterLat},${mapCenterLng}&z=${zoomLevel}&t=${mapType}&output=embed`;

  // Direct Google Maps native navigation launch
  const handleLaunchGoogleMapsApp = (lat: number, lng: number, placeName: string) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(
      placeName
    )}`;
    try {
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleLaunchRouteInGoogleMaps = () => {
    const originVil = allVillages.find((v) => v.id === routeOrigin) || selectedVillage;
    const destVil = allVillages.find((v) => v.id === routeDest) || allVillages[1] || selectedVillage;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${originVil.latitude},${originVil.longitude}&destination=${destVil.latitude},${destVil.longitude}&travelmode=driving`;
    try {
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const getCategoryIcon = (cat: VillageFacilityLocation['category']) => {
    switch (cat) {
      case 'governance':
        return <Building2 className="w-4 h-4 text-amber-700" />;
      case 'education':
        return <GraduationCap className="w-4 h-4 text-emerald-700" />;
      case 'healthcare':
        return <HeartPulse className="w-4 h-4 text-rose-700" />;
      case 'water':
        return <Droplet className="w-4 h-4 text-blue-700" />;
      case 'agriculture':
        return <Wheat className="w-4 h-4 text-green-700" />;
      case 'banking':
        return <Landmark className="w-4 h-4 text-indigo-700" />;
      case 'transport':
        return <Bus className="w-4 h-4 text-orange-700" />;
      case 'power':
        return <Zap className="w-4 h-4 text-yellow-700" />;
      default:
        return <MapPin className="w-4 h-4 text-stone-700" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-16">
      <Breadcrumbs
        items={[
          { label: dName },
          { label: tName },
          { label: vName, page: 'village-overview' },
          { label: language === 'mr' ? 'गाव नकाशा, सुविधा व दळणवळण' : 'Live Google Map, Facility GIS & Connectivity' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Top Header */}
        <div className="border-b border-amber-200 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-orange-700 uppercase tracking-wider font-mono">
                {language === 'mr'
                  ? '🚩 गुगल मॅप्स जिओ-स्थान, सुविधा नेटवर्क व दिशादर्शक'
                  : '🚩 Live Google Map Cartography, Facilities GIS & Route Connectivity'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight font-serif mt-0.5">
              {vName} — {language === 'mr' ? 'नकाशा व रस्ते जोडणी' : 'Interactive Map & Connectivity'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {language === 'mr'
                ? 'गुगल मॅप्स उपग्रह व रस्ते दृश्य, गावातील सर्व प्रमुख ठिकाणे, अंतर, वेळ आणि इतर गावांशी थेट दिशादर्शक (Directions).'
                : 'Interactive Google Maps satellite & roadmap views, detailed amenity coordinates, facility services, and inter-village highway routes with GPS navigation.'}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => handleLaunchGoogleMapsApp(activeFacility.latitude, activeFacility.longitude, activeFacility.nameEn)}
              className="px-4 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs rounded-xl transition-all inline-flex items-center gap-2 shadow-sm"
              title="Launch Google Maps App with GPS turn-by-turn directions"
            >
              <Navigation className="w-4 h-4" />
              <span>{language === 'mr' ? 'Google Maps वर नेव्हिगेट करा' : 'Open Live in Google Maps'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => navigateTo('village-overview')}
              className="px-3.5 py-2.5 bg-white hover:bg-amber-50 border border-amber-300 text-stone-800 text-xs font-bold rounded-xl transition-colors shadow-2xs"
            >
              {t.back}
            </button>
          </div>
        </div>

        {/* Primary View Mode Switcher: Village Facility GIS vs Inter-Village Highway Connectivity */}
        <div className="bg-white p-2 rounded-2xl border border-amber-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setViewMode('facilities')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                viewMode === 'facilities'
                  ? 'bg-gradient-to-r from-stone-900 to-stone-950 text-white shadow-xs'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{language === 'mr' ? 'गावातील सर्व सुविधा व ठिकाणे' : 'Village Facilities & Local GIS'}</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px]">
                {detailedFacilities.length} Points
              </span>
            </button>

            <button
              onClick={() => setViewMode('inter-village-routes')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                viewMode === 'inter-village-routes'
                  ? 'bg-gradient-to-r from-stone-900 to-stone-950 text-white shadow-xs'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Route className="w-4 h-4 text-emerald-400" />
              <span>{language === 'mr' ? 'सर्व गावांची दळणवळण व रस्ते जोडणी' : 'All Villages Highway Connectivity'}</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                Routes & ETA
              </span>
            </button>

            <button
              onClick={() => setViewMode('gis-planner')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                viewMode === 'gis-planner'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-stone-950 shadow-md border-amber-400 ring-2 ring-amber-400/30'
                  : 'bg-stone-50 hover:bg-amber-50 text-stone-800 border-amber-300'
              }`}
            >
              <Sparkles className={`w-4 h-4 ${viewMode === 'gis-planner' ? 'text-stone-950' : 'text-amber-600'}`} />
              <span>{language === 'mr' ? 'AI जीआयएस व नवीन सुविधा नियोजन कक्ष' : 'AI GIS & Facility Location Planner'}</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-200 text-amber-950 font-mono text-[10px] font-black">
                10 Suite Features
              </span>
            </button>
          </div>

          {/* Google Maps Layer / Style Controls */}
          <div className="flex items-center gap-1.5 bg-stone-50 p-1 rounded-xl border border-stone-200 text-xs font-medium">
            <span className="text-[11px] text-stone-500 font-mono px-2 hidden md:inline">
              {language === 'mr' ? 'गुगल मॅप दृश्य:' : 'Map Style:'}
            </span>
            <button
              onClick={() => setMapType('m')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                mapType === 'm'
                  ? 'bg-white text-stone-900 font-bold shadow-2xs border border-stone-300'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Roadmap
            </button>
            <button
              onClick={() => setMapType('k')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                mapType === 'k'
                  ? 'bg-white text-stone-900 font-bold shadow-2xs border border-stone-300'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => setMapType('p')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                mapType === 'p'
                  ? 'bg-white text-stone-900 font-bold shadow-2xs border border-stone-300'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Terrain
            </button>
          </div>
        </div>

        {/* =========================================================================
            VIEW 1: VILLAGE FACILITIES & DETAILED LOCAL GIS MAP
            ========================================================================= */}
        {viewMode === 'facilities' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Live Google Map Iframe + Overlay Controls */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white rounded-3xl border border-amber-200 overflow-hidden shadow-md flex flex-col relative">
                {/* Map Interactive Control Strip */}
                <div className="p-3.5 bg-stone-900 text-white flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold text-white font-mono">
                      GPS: {activeFacility.latitude.toFixed(4)}° N, {activeFacility.longitude.toFixed(4)}° E
                    </span>
                    <span className="text-stone-400 text-[11px] hidden sm:inline">
                      · {activeFacility.distanceFromCenter} from GP Chowk
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Zoom in/out buttons */}
                    <div className="flex items-center bg-stone-800 rounded-lg p-0.5 border border-stone-700">
                      <button
                        onClick={() => setZoomLevel((z) => Math.min(z + 1, 19))}
                        className="px-2 py-0.5 text-stone-200 hover:text-white font-bold"
                        title="Zoom In"
                      >
                        +
                      </button>
                      <span className="px-2 text-[10px] font-mono text-stone-400">z{zoomLevel}</span>
                      <button
                        onClick={() => setZoomLevel((z) => Math.max(z - 1, 10))}
                        className="px-2 py-0.5 text-stone-200 hover:text-white font-bold"
                        title="Zoom Out"
                      >
                        -
                      </button>
                    </div>

                    <button
                      onClick={() => handleLaunchGoogleMapsApp(activeFacility.latitude, activeFacility.longitude, activeFacility.nameEn)}
                      className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg inline-flex items-center gap-1.5 transition-colors"
                      title="Open full view in Google Maps"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Full View</span>
                    </button>
                  </div>
                </div>

                {/* Live Google Maps Iframe Container */}
                <div className="relative h-[480px] w-full bg-stone-100 overflow-hidden">
                  <iframe
                    title="Google Maps Village Cartography"
                    src={googleMapsEmbedUrl}
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                  />

                  {/* Floating Marker Callout Card on the Map */}
                  <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-stone-300 shadow-xl space-y-2 pointer-events-auto">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                          {getCategoryIcon(activeFacility.category)}
                        </div>
                        <div>
                          <span className="text-[10px] font-bold font-mono uppercase text-orange-900 block">
                            {activeFacility.category} · {activeFacility.direction}
                          </span>
                          <h3 className="font-bold text-stone-950 text-xs sm:text-sm font-serif leading-tight">
                            {language === 'mr' ? activeFacility.nameMr : activeFacility.nameEn}
                          </h3>
                        </div>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full shrink-0">
                        Active
                      </span>
                    </div>

                    <p className="text-[11px] text-stone-600 line-clamp-1">
                      📍 {language === 'mr' ? activeFacility.addressMr : activeFacility.addressEn}
                    </p>

                    <div className="flex items-center justify-between pt-1 border-t border-stone-200 text-xs">
                      <span className="text-[11px] font-mono text-stone-500">
                        ⏰ {language === 'mr' ? activeFacility.timingsMr : activeFacility.timingsEn}
                      </span>
                      <button
                        onClick={() => handleLaunchGoogleMapsApp(activeFacility.latitude, activeFacility.longitude, activeFacility.nameEn)}
                        className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg text-xs inline-flex items-center gap-1 transition-colors"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>{language === 'mr' ? 'दिशादर्शक (Route)' : 'Directions'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Quick-POI Strip */}
                <div className="p-3.5 bg-amber-50/60 border-t border-amber-200 flex items-center gap-2 overflow-x-auto text-xs">
                  <span className="font-mono font-bold text-stone-600 text-[11px] shrink-0 uppercase">
                    {language === 'mr' ? 'नकाशावर उडी मारा:' : 'Jump to Location:'}
                  </span>
                  {detailedFacilities.map((fac) => (
                    <button
                      key={fac.id}
                      onClick={() => setSelectedFacilityId(fac.id)}
                      className={`px-3 py-1.5 rounded-xl whitespace-nowrap text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                        selectedFacilityId === fac.id
                          ? 'bg-stone-900 text-white shadow-xs font-bold'
                          : 'bg-white text-stone-700 hover:bg-amber-100/60 border border-stone-200'
                      }`}
                    >
                      {getCategoryIcon(fac.category)}
                      <span>{language === 'mr' ? fac.nameMr.split(' ')[0] : fac.nameEn.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Location Details Card */}
              <div className="bg-white p-6 rounded-3xl border border-amber-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
                      {getCategoryIcon(activeFacility.category)}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-stone-500 uppercase font-mono">
                        Verified Facility Geo-Record
                      </span>
                      <h2 className="text-base sm:text-lg font-bold text-stone-950 font-serif">
                        {language === 'mr' ? activeFacility.nameMr : activeFacility.nameEn}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLaunchGoogleMapsApp(activeFacility.latitude, activeFacility.longitude, activeFacility.nameEn)}
                      className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xs rounded-xl inline-flex items-center gap-1.5 shadow-sm"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'थेट गुगल मॅप्स दिशा' : 'Live Google Maps Directions'}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                    <span className="text-stone-500 font-mono text-[10px] uppercase block">
                      {language === 'mr' ? 'गावाच्या केंद्रापासून अंतर' : 'Distance & Bearing'}
                    </span>
                    <span className="font-black text-stone-900 font-mono text-sm block">
                      {activeFacility.distanceFromCenter}
                    </span>
                    <span className="text-stone-600 text-[11px]">
                      Direction: {activeFacility.direction}
                    </span>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                    <span className="text-stone-500 font-mono text-[10px] uppercase block">
                      {language === 'mr' ? 'कार्यालयीन वेळ' : 'Operating Hours'}
                    </span>
                    <span className="font-bold text-stone-900 text-xs block">
                      {language === 'mr' ? activeFacility.timingsMr : activeFacility.timingsEn}
                    </span>
                    <span className="text-stone-600 text-[11px] flex items-center gap-1 font-mono">
                      <Phone className="w-3 h-3 text-orange-600" />
                      <span>{activeFacility.contactNumber}</span>
                    </span>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                    <span className="text-stone-500 font-mono text-[10px] uppercase block">
                      {language === 'mr' ? 'रस्ता प्रकार' : 'Road Quality'}
                    </span>
                    <span className="font-bold text-stone-900 text-xs block">
                      {activeFacility.roadType}
                    </span>
                    <span className="text-emerald-700 text-[11px] font-semibold">
                      ✓ All-Weather Paved Access
                    </span>
                  </div>
                </div>

                {/* Available Services Chips */}
                <div>
                  <span className="text-[11px] font-bold text-stone-500 uppercase font-mono block mb-2">
                    {language === 'mr' ? 'येथे मिळणाऱ्या प्रमुख सेवा व सुविधा:' : 'Available Citizen Services & Amenities:'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(language === 'mr' ? activeFacility.servicesMr : activeFacility.servicesEn).map((srv, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-amber-50 text-stone-800 rounded-lg text-xs font-medium border border-amber-200 flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{srv}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Searchable Directory of all Important Locations */}
            <div className="lg:col-span-4 space-y-4">
              {/* Category Filter Pills & Search */}
              <div className="bg-white p-4 rounded-3xl border border-amber-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-stone-950 text-sm font-serif">
                    {language === 'mr' ? 'गावातील सर्व ठिकाणे' : 'Village Locations Directory'}
                  </h3>
                  <span className="text-[10px] font-mono text-stone-500 font-semibold">
                    {filteredFacilities.length} Points
                  </span>
                </div>

                {/* Search Box */}
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder={language === 'mr' ? 'शाळा, उपकेंद्र, पाणी किंवा बँक शोधा...' : 'Search school, PHC, water...'}
                    className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Category Filter Chips */}
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {[
                    { id: 'all', labelMr: 'सर्व (All)', labelEn: 'All' },
                    { id: 'healthcare', labelMr: 'आरोग्य', labelEn: 'Health' },
                    { id: 'education', labelMr: 'शिक्षण', labelEn: 'Education' },
                    { id: 'water', labelMr: 'पाणी', labelEn: 'Water' },
                    { id: 'agriculture', labelMr: 'शेती/APMC', labelEn: 'Agro' },
                    { id: 'banking', labelMr: 'बँक/CSC', labelEn: 'Bank' },
                    { id: 'transport', labelMr: 'बस थांबा', labelEn: 'Transit' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        activeCategory === cat.id
                          ? 'bg-orange-600 text-white font-bold shadow-2xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {language === 'mr' ? cat.labelMr : cat.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrollable Facility List */}
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {filteredFacilities.map((fac) => {
                  const isSelected = fac.id === selectedFacilityId;

                  return (
                    <div
                      key={fac.id}
                      onClick={() => setSelectedFacilityId(fac.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 group ${
                        isSelected
                          ? 'bg-amber-50/80 border-orange-500 shadow-md ring-1 ring-orange-400'
                          : 'bg-white border-stone-200 hover:border-amber-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-orange-500 text-white' : 'bg-stone-100 text-stone-700'
                          }`}>
                            {getCategoryIcon(fac.category)}
                          </div>
                          <div>
                            <span className="text-[10px] font-bold font-mono text-stone-500 uppercase block">
                              {fac.category} · {fac.distanceFromCenter}
                            </span>
                            <h4 className="font-bold text-stone-900 text-xs group-hover:text-orange-950 leading-snug">
                              {language === 'mr' ? fac.nameMr : fac.nameEn}
                            </h4>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded shrink-0">
                          {fac.direction}
                        </span>
                      </div>

                      <p className="text-[11px] text-stone-600 line-clamp-1">
                        {language === 'mr' ? fac.addressMr : fac.addressEn}
                      </p>

                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                        <span className="text-[10px] font-mono text-stone-500">
                          {language === 'mr' ? fac.timingsMr.split('(')[0] : fac.timingsEn.split('(')[0]}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLaunchGoogleMapsApp(fac.latitude, fac.longitude, fac.nameEn);
                            }}
                            className="text-[11px] font-bold text-orange-700 hover:text-orange-900 inline-flex items-center gap-1"
                          >
                            <Navigation className="w-3 h-3" />
                            <span>GPS</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: INTER-VILLAGE CONNECTIVITY & HIGHWAY ROUTE PLANNER
            ========================================================================= */}
        {viewMode === 'inter-village-routes' && (
          <div className="space-y-6">
            {/* Route Planner Card */}
            <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
                      Maharashtra Rural Transport Grid
                    </span>
                    <span className="text-stone-400 text-xs font-mono">NH / SH Corridors</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black font-serif text-white">
                    {language === 'mr'
                      ? 'महाराष्ट्रातील सर्व गावांची रस्ते जोडणी व प्रवास मार्ग'
                      : 'Inter-Village Route Planner & Highway Transit Matrix'}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mt-1">
                    {language === 'mr'
                      ? 'मेडशी गाव, अर्धापूर, भिलार, वाघोली, शिरोली व इतर प्रमुख गावांमधील अचूक अंतर, प्रवासाचा वेळ आणि गुगल मॅप्स दिशादर्शक.'
                      : 'Calculate driving distance, transit durations, highway toll corridors, and turn-by-turn road waypoints between all rural hubs.'}
                  </p>
                </div>

                <button
                  onClick={handleLaunchRouteInGoogleMaps}
                  className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl inline-flex items-center gap-2 shadow-lg transition-all shrink-0"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{language === 'mr' ? 'गुगल मॅप्सवर थेट नेव्हिगेशन सुरू करा' : 'Start Google Maps Navigation'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Origin -> Destination Selector Bar */}
              <div className="bg-stone-800/90 p-4 rounded-2xl border border-stone-700 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Origin Selector */}
                <div className="md:col-span-4 space-y-1">
                  <label className="text-[10px] font-mono uppercase text-stone-400 font-bold block">
                    {language === 'mr' ? 'प्रारंभिक ठिकाण (Origin):' : 'Starting Village (Origin):'}
                  </label>
                  <select
                    value={routeOrigin}
                    onChange={(e) => setRouteOrigin(e.target.value)}
                    className="w-full p-2.5 bg-stone-900 border border-stone-600 rounded-xl text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {allVillages.map((vil) => (
                      <option key={vil.id} value={vil.id}>
                        {language === 'mr' ? vil.nameMr : vil.nameEn} ({vil.districtEn})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Arrow / Switch Icon */}
                <div className="md:col-span-1 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-stone-700 flex items-center justify-center text-emerald-400 font-bold">
                    ⇄
                  </div>
                </div>

                {/* Destination Selector */}
                <div className="md:col-span-4 space-y-1">
                  <label className="text-[10px] font-mono uppercase text-stone-400 font-bold block">
                    {language === 'mr' ? 'गंतव्य ठिकाण (Destination):' : 'Destination Village / Hub:'}
                  </label>
                  <select
                    value={routeDest}
                    onChange={(e) => setRouteDest(e.target.value)}
                    className="w-full p-2.5 bg-stone-900 border border-stone-600 rounded-xl text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {allVillages.map((vil) => (
                      <option key={vil.id} value={vil.id}>
                        {language === 'mr' ? vil.nameMr : vil.nameEn} ({vil.districtEn})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Travel Mode Pills */}
                <div className="md:col-span-3 space-y-1">
                  <label className="text-[10px] font-mono uppercase text-stone-400 font-bold block">
                    {language === 'mr' ? 'प्रवासाचे साधन:' : 'Travel Mode:'}
                  </label>
                  <div className="flex items-center gap-1 bg-stone-900 p-1 rounded-xl border border-stone-700">
                    <button
                      onClick={() => setTravelMode('car')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                        travelMode === 'car' ? 'bg-emerald-600 text-white' : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      <Car className="w-3.5 h-3.5" />
                      <span>Car</span>
                    </button>
                    <button
                      onClick={() => setTravelMode('bus')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                        travelMode === 'bus' ? 'bg-emerald-600 text-white' : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      <Bus className="w-3.5 h-3.5" />
                      <span>Bus</span>
                    </button>
                    <button
                      onClick={() => setTravelMode('bike')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                        travelMode === 'bike' ? 'bg-emerald-600 text-white' : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      <Bike className="w-3.5 h-3.5" />
                      <span>Bike</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculated Route Details & Turn-by-Turn Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Route Summary & Turn-by-Turn Directions */}
              <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-amber-200 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
                  <div>
                    <span className="text-[10px] font-bold text-orange-800 uppercase font-mono">
                      Selected Road Corridor
                    </span>
                    <h3 className="text-lg font-bold text-stone-950 font-serif">
                      {currentRoute.highwayName}
                    </h3>
                  </div>

                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full font-mono">
                    {currentRoute.roadQuality}
                  </span>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
                    <span className="text-[10px] text-stone-500 font-mono uppercase block">Total Distance</span>
                    <span className="text-2xl font-black text-orange-950 font-mono">
                      {currentRoute.distanceKm} <span className="text-xs font-normal">km</span>
                    </span>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                    <span className="text-[10px] text-stone-500 font-mono uppercase block">Driving ETA</span>
                    <span className="text-2xl font-black text-emerald-950 font-mono">
                      {travelMode === 'bus' ? currentRoute.timeBus : currentRoute.timeCar}
                    </span>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                    <span className="text-[10px] text-stone-500 font-mono uppercase block">Waypoints</span>
                    <span className="text-2xl font-black text-stone-950 font-mono">
                      {currentRoute.waypoints.length}
                    </span>
                  </div>
                </div>

                {/* Waypoints Flow */}
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                  <span className="text-[11px] font-mono font-bold text-stone-600 uppercase block">
                    Key Highway Junctions & Towns along Route:
                  </span>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {currentRoute.waypoints.map((wp, idx) => (
                      <React.Fragment key={idx}>
                        <span className="px-2.5 py-1 bg-white border border-stone-300 rounded-lg font-semibold text-stone-800 shadow-2xs">
                          📍 {wp}
                        </span>
                        {idx < currentRoute.waypoints.length - 1 && (
                          <span className="text-stone-400 font-bold">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Turn-by-Turn Navigation Steps */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-stone-900 uppercase font-mono block">
                    {language === 'mr' ? 'टप्प्याटप्प्याने दिशादर्शक (Step-by-Step Directions):' : 'Turn-by-Turn GPS Directions:'}
                  </span>
                  <div className="space-y-2.5">
                    {currentRoute.turnByTurn.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-white rounded-xl border border-stone-200 flex items-start gap-3 hover:border-orange-400 transition-colors shadow-2xs"
                      >
                        <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <div className="flex-1 text-xs">
                          <p className="font-semibold text-stone-900 leading-snug">
                            {language === 'mr' ? step.instructionMr : step.instructionEn}
                          </p>
                        </div>
                        <span className="text-[11px] font-mono font-bold text-stone-500 shrink-0">
                          {step.distance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: All Villages Highway Network Matrix */}
              <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-amber-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <h3 className="font-bold text-stone-950 text-sm font-serif">
                    {language === 'mr' ? 'प्रमुख ग्रामीण अंतर सारणी (Distance Matrix)' : 'Maharashtra Villages Distance Matrix'}
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                    Connected Grid
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  {connectivityRoutes.map((rt) => (
                    <div
                      key={rt.id}
                      onClick={() => {
                        setRouteOrigin(rt.originVillageId);
                        setRouteDest(rt.destVillageId);
                      }}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                        currentRoute.id === rt.id
                          ? 'bg-amber-50 border-orange-500 shadow-sm'
                          : 'bg-stone-50 border-stone-200 hover:bg-amber-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-900 text-xs">
                          {rt.originNameEn.split(' ')[0]} ⇄ {rt.destNameEn.split(' ')[0]}
                        </span>
                        <span className="font-mono font-black text-orange-900 text-sm">
                          {rt.distanceKm} km
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 line-clamp-1">
                        🛣️ {rt.highwayName}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-stone-500 font-mono pt-1">
                        <span>🚗 Car: {rt.timeCar}</span>
                        <span>🚌 MSRTC Bus: {rt.timeBus}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* State Transport Bus Information Notice */}
                <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200 text-xs text-blue-950 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Bus className="w-4 h-4 text-blue-700" />
                    <span>MSRTC Rural Bus Timing & Helpline</span>
                  </div>
                  <p className="text-[11px] text-blue-800 leading-relaxed">
                    Direct State Transport buses run every 30 minutes from Medshi Village gate to Ardhapur and Nanded Central Bus Station (Toll-free Enquiry: 1800 22 1250).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: AI GIS & RURAL FACILITY LOCATION DECISION SUITE (10 FEATURES)
            ========================================================================= */}
        {viewMode === 'gis-planner' && (
          <div className="pt-2">
            <GisPlannerPage embedded={true} />
          </div>
        )}
      </div>
    </div>
  );
};
