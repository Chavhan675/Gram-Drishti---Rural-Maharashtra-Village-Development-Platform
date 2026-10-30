import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Building2,
  GraduationCap,
  HeartPulse,
  FileSpreadsheet,
  AlertCircle,
  MapPin,
  Compass,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Layers,
  Sparkles,
  BookOpen,
  Users,
  Activity,
  Calendar,
  Landmark,
  FileText,
  Brain,
  Cpu,
  Terminal
} from 'lucide-react';
import {
  MAHARASHTRA_DIVISIONS,
  MAHARASHTRA_DISTRICTS,
  MAHARASHTRA_TALUKAS,
  MOCK_ANNOUNCEMENTS
} from '../data/mockData';

export const HomePage: React.FC = () => {
  const { language, navigateTo, allVillages, setSelectedVillageId } = useApp();
  const t = getTranslation(language);

  // Search Mode: 'name' or 'dropdown'
  const [searchMode, setSearchMode] = useState<'name' | 'dropdown'>('name');
  const [nameQuery, setNameQuery] = useState('');

  // Dropdown selector state
  const [selectedDiv, setSelectedDiv] = useState<string>('marathwada');
  const [selectedDist, setSelectedDist] = useState<string>('nanded');
  const [selectedTal, setSelectedTal] = useState<string>('ardhapur');
  const [selectedVil, setSelectedVil] = useState<string>('malegaon-ardhapur-nanded');

  const filteredDistricts = MAHARASHTRA_DISTRICTS.filter(
    (d) => !selectedDiv || d.divisionId === selectedDiv
  );
  const filteredTalukas = MAHARASHTRA_TALUKAS.filter(
    (tl) => !selectedDist || tl.districtId === selectedDist
  );
  const filteredVillages = allVillages.filter(
    (v) => !selectedTal || v.id.includes(selectedTal) || v.talukaMr.includes('अर्धापूर')
  );

  // Instant name search matches
  const nameSearchResults = nameQuery.trim()
    ? allVillages.filter(
        (v) =>
          v.nameMr.toLowerCase().includes(nameQuery.toLowerCase()) ||
          v.nameEn.toLowerCase().includes(nameQuery.toLowerCase()) ||
          v.talukaMr.toLowerCase().includes(nameQuery.toLowerCase()) ||
          v.talukaEn.toLowerCase().includes(nameQuery.toLowerCase()) ||
          v.districtMr.toLowerCase().includes(nameQuery.toLowerCase()) ||
          v.districtEn.toLowerCase().includes(nameQuery.toLowerCase()) ||
          v.pincode.includes(nameQuery)
      )
    : [];

  const handleSelectVillageAndGo = (vId: string) => {
    setSelectedVillageId(vId);
    navigateTo('village-overview', vId);
  };

  const handleDropdownGo = () => {
    if (selectedVil) {
      handleSelectVillageAndGo(selectedVil);
    } else {
      navigateTo('search');
    }
  };

  // 6 Core Portals as requested - executive clean design adhering to Zero-Pill discipline
  const explorePillars = [
    {
      id: 'village-overview',
      titleMr: 'माझे गाव व रूपरेषा',
      titleEn: 'Village Overview & Dossier',
      descMr: 'गावाची लोकसंख्या, प्रशासन, ग्रामपंचायत पदाधिकारी आणि मूलभूत रूपरेषा.',
      descEn: 'Demographics, Gram Panchayat leaders, civic metrics, and administration.',
      icon: Users,
      kickerMr: 'ग्राम प्रोफाइल',
      kickerEn: 'Demographics',
      iconClass: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
      borderHover: 'hover:border-emerald-500',
      linkClass: 'text-emerald-700'
    },
    {
      id: 'schemes',
      titleMr: 'शासकीय योजना',
      titleEn: 'Government Welfare Schemes',
      descMr: 'शेतकरी, महिला, विद्यार्थी व ज्येष्ठ नागरिकांसाठी उपलब्ध राज्य व केंद्र योजना.',
      descEn: 'Subsidies, DBT transfers, and welfare grants with step-by-step application guidance.',
      icon: FileSpreadsheet,
      kickerMr: 'कल्याणकारी योजना',
      kickerEn: 'Welfare & Grants',
      iconClass: 'bg-amber-50 text-amber-900 border border-amber-200',
      borderHover: 'hover:border-amber-500',
      linkClass: 'text-amber-800'
    },
    {
      id: 'village-development',
      titleMr: 'विकासकामे व निधी',
      titleEn: 'Public Works & Fund Tracker',
      descMr: 'गावात मंजूर झालेले रस्ते, पाणी, शाळा व स्वच्छता प्रकल्प आणि प्रत्यक्ष प्रगती.',
      descEn: 'Physical infrastructure, sanctioned budgets, completion rates, and audit logs.',
      icon: Building2,
      kickerMr: 'पायाभूत सुविधा',
      kickerEn: 'Infrastructure',
      iconClass: 'bg-blue-50 text-blue-800 border border-blue-200',
      borderHover: 'hover:border-blue-500',
      linkClass: 'text-blue-800'
    },
    {
      id: 'village-facilities',
      titleMr: 'सार्वजनिक सुविधा',
      titleEn: 'Civic Amenities & Facilities',
      descMr: 'प्राथमिक शाळा, आरोग्य केंद्र, पिण्याचे पाणी, बँक मित्र व वीज सुविधांची नोंद.',
      descEn: 'Directory of primary health centers, schools, potable water stations, and banking kiosks.',
      icon: HeartPulse,
      kickerMr: 'नागरी सुविधा',
      kickerEn: 'Amenities Directory',
      iconClass: 'bg-teal-50 text-teal-800 border border-teal-200',
      borderHover: 'hover:border-teal-500',
      linkClass: 'text-teal-800'
    },
    {
      id: 'report-issue',
      titleMr: 'नागरी तक्रार निवारण',
      titleEn: 'Citizen Grievance Redressal',
      descMr: 'रस्ते, पाणी, वीज किंवा इतर नागरी समस्यांची ऑनलाइन नोंद व थेट ट्रॅकिंग.',
      descEn: 'Register public grievances with automated tracking numbers and departmental routing.',
      icon: AlertCircle,
      kickerMr: 'सार्वजनिक निवारण',
      kickerEn: 'Public Redressal',
      iconClass: 'bg-rose-50 text-rose-800 border border-rose-200',
      borderHover: 'hover:border-rose-500',
      linkClass: 'text-rose-800'
    },
    {
      id: 'ml-analytics',
      titleMr: 'AI व ML संशोधन लॅब',
      titleEn: 'AI & Machine Learning Hub',
      descMr: 'XGBoost पीक अंदाज, ARIMA भूजल मॉडेल, K-Means क्लस्टरिंग व पायथन कोड.',
      descEn: 'Interactive machine learning models, agro-climatic predictions, and Python code.',
      icon: Brain,
      kickerMr: 'अभियांत्रिकी प्रकल्प',
      kickerEn: 'College Capstone',
      iconClass: 'bg-indigo-50 text-indigo-800 border border-indigo-200',
      borderHover: 'hover:border-indigo-500',
      linkClass: 'text-indigo-800'
    },
    {
      id: 'village-3d',
      titleMr: '३डी डिजिटल ट्विन',
      titleEn: '3D Spatial Twin',
      descMr: 'Three.js PBR द्वारे ग्रामपंचायत, जल जीवन टाकी, सौर सबस्टेशन व शेतीची ३डी प्रतिकृती.',
      descEn: 'Three.js 3D spatial twin with Jal Jeevan hydraulic grid, solar microgrid, and precision farm.',
      icon: Layers,
      kickerMr: 'स्थानिक ३डी',
      kickerEn: '3D WebGL Twin',
      iconClass: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
      borderHover: 'hover:border-emerald-500',
      linkClass: 'text-emerald-800'
    },
    {
      id: 'map',
      titleMr: 'गुगल मॅप्स व रस्ते जोडणी',
      titleEn: 'Google Maps & Connectivity',
      descMr: 'गुगल मॅप्स दृश्य, गावातील सर्व प्रमुख ठिकाणे, अंतर आणि सर्व गावांशी थेट दिशादर्शक (Directions).',
      descEn: 'Live Google Maps satellite view, detailed amenity coordinates, and inter-village highway routes.',
      icon: MapPin,
      kickerMr: 'नकाशा व दिशा',
      kickerEn: 'Google Maps GIS',
      iconClass: 'bg-orange-50 text-orange-800 border border-orange-200',
      borderHover: 'hover:border-orange-500',
      linkClass: 'text-orange-800'
    },
    {
      id: 'gis-planner',
      titleMr: 'AI जीआयएस निर्णय कक्ष (१० वैशिष्ट्ये)',
      titleEn: 'Civic GIS Decision Suite (10 Features)',
      descMr: 'नवीन रुग्णालय व शाळा शिफारस, ५ ट्रॅव्हल मोड, पूर धोका, व्हॉट-इफ सिम्युलेटर व अधिकृत पीडीएफ अहवाल.',
      descEn: 'Interactive GIS dashboard, AI MCDA location scoring, multi-modal transit, hazard audit, and PDF exports.',
      icon: Sparkles,
      kickerMr: 'स्थानिक निर्णय प्रणाली',
      kickerEn: 'Spatial Decision DSS',
      iconClass: 'bg-amber-50 text-amber-900 border border-amber-300',
      borderHover: 'hover:border-amber-600',
      linkClass: 'text-amber-900'
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO + VILLAGE SEARCH */}
      <section className="relative bg-stone-900 text-white overflow-hidden border-b border-amber-900/30">
        {/* Background Visual: Lush Rural Maharashtra Landscape with Warm Golden-Hour Saffron Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80"
            alt="Lush agricultural village landscape in Maharashtra"
            className="w-full h-full object-cover object-center transform scale-102"
          />
          {/* Authentic Warm Maharashtra sunset & green earth glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-stone-950/92 via-orange-950/75 to-emerald-950/85 backdrop-blur-[0.5px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center space-y-8">
          {/* Authentic Transparency Tag with Saffron & Emerald Accent */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/25 via-amber-500/20 to-emerald-500/25 backdrop-blur-md border border-amber-300/40 text-amber-200 text-xs font-mono shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="font-medium text-amber-100">
              {language === 'mr'
                ? '🚩 सार्वजनिक व खुले शासकीय डेटा संच (LGD, Census & OGD)'
                : '🚩 Built Using Public Government Datasets & Civic Portals'}
            </span>
          </div>

          {/* Citizen-Friendly Hero Headline with Vibrant Maharashtra Accent */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-serif leading-tight">
              {language === 'mr' ? (
                <>
                  आपले गाव. आपली माहिती.{' '}
                  <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent font-black drop-shadow-sm">
                    आपल्या गावाची प्रगती.
                  </span>
                </>
              ) : (
                <>
                  Your Village. Your Information.{' '}
                  <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent font-black drop-shadow-sm">
                    Your Progress.
                  </span>
                </>
              )}
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-amber-100/90 leading-relaxed font-normal">
              {language === 'mr'
                ? 'महाराष्ट्रातील ग्रामीण भागासाठी लोकसंख्या, विकासकामे, शाळा, आरोग्य, शेती आणि शासकीय योजनांची माहिती जाणून घेण्याचे सोपे नागरिक व्यासपीठ.'
                : 'Discover verified information about your village in Maharashtra — demographics, development projects, schools, healthcare, agriculture, and citizen welfare schemes.'}
            </p>
          </div>

          {/* 3. SIMPLER VILLAGE SELECTOR BOX (Dual Mode: Search by Name OR Select Location) */}
          <div className="max-w-3xl mx-auto bg-white/98 backdrop-blur-md rounded-2xl border border-amber-200 shadow-2xl p-5 sm:p-7 text-stone-900 text-left relative overflow-hidden">
            {/* Top Festive Maharashtra Accent Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-orange-600 via-amber-400 via-emerald-600 to-indigo-600 rounded-t-2xl -mt-5 -mx-5 sm:-mt-7 sm:-mx-7 mb-5" />

            {/* Header with Mode Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200/90 pb-4 mb-5">
              <div>
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block font-mono">
                  {language === 'mr' ? 'गाव शोध कक्ष · LGD डिरेक्टरी' : 'Civic Directory · LGD Registry'}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-stone-950 flex items-center gap-2 mt-0.5">
                  <Search className="w-4 h-4 text-stone-700" />
                  <span>{language === 'mr' ? 'आपले गाव शोधा' : 'Search Maharashtra Villages'}</span>
                </h2>
              </div>

              {/* Segmented Mode Control */}
              <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200 text-xs shadow-2xs">
                <button
                  type="button"
                  onClick={() => setSearchMode('name')}
                  className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                    searchMode === 'name'
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {language === 'mr' ? 'नावाने शोधा' : 'Search by Name'}
                </button>
                <button
                  type="button"
                  onClick={() => setSearchMode('dropdown')}
                  className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                    searchMode === 'dropdown'
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {language === 'mr' ? 'जिल्हा व तालुका' : 'District & Taluka'}
                </button>
              </div>
            </div>

            {/* Mode A: Search by Village Name */}
            {searchMode === 'name' && (
              <div className="space-y-4">
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={nameQuery}
                    onChange={(e) => setNameQuery(e.target.value)}
                    placeholder={
                      language === 'mr'
                        ? 'गावाचे नाव टाइप करा (उदा. मेडशी गाव, भिलार, खेड शिवापूर, राळेगण)...'
                        : 'Type village name or PIN (e.g. Medshi Village, Bhilar, Khed Shivapur, Ralegan)...'
                    }
                    className="w-full pl-10 pr-9 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:border-stone-900 focus:bg-white transition-all"
                  />
                  {nameQuery && (
                    <button
                      onClick={() => setNameQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 px-1.5 py-0.5"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Quick Suggestion Pills */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-600">
                  <span className="font-semibold text-stone-500 font-mono text-[11px]">
                    {language === 'mr' ? 'लोकप्रिय गावे:' : 'Popular Villages:'}
                  </span>
                  {[
                    { id: 'malegaon-ardhapur-nanded', labelMr: 'मेडशी गाव (मालेगाव)', labelEn: 'Medshi Village (Malegaon)' },
                    { id: 'bhilar-mahabaleshwar-satara', labelMr: 'भिलार (सातारा)', labelEn: 'Bhilar (Satara)' },
                    { id: 'khed-shivapur-haveli-pune', labelMr: 'खेड शिवापूर (पुणे)', labelEn: 'Khed Shivapur (Pune)' },
                    { id: 'ralegan-siddhi-parner-ahilyanagar', labelMr: 'राळेगण सिद्धी', labelEn: 'Ralegan Siddhi' }
                  ].map((sug) => (
                    <button
                      key={sug.id}
                      onClick={() => handleSelectVillageAndGo(sug.id)}
                      className="px-2.5 py-1 rounded-md text-xs font-medium border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800 transition-colors shadow-2xs"
                    >
                      {language === 'mr' ? sug.labelMr : sug.labelEn}
                    </button>
                  ))}
                </div>

                {/* Instant Live Results List */}
                {nameSearchResults.length > 0 && (
                  <div className="border border-stone-200 rounded-lg overflow-hidden divide-y divide-stone-100 bg-white max-h-56 overflow-y-auto mt-2 shadow-lg">
                    {nameSearchResults.map((vil) => (
                      <button
                        key={vil.id}
                        onClick={() => handleSelectVillageAndGo(vil.id)}
                        className="w-full px-4 py-2.5 hover:bg-stone-50 text-left flex items-center justify-between transition-colors group"
                      >
                        <div>
                          <div className="text-xs font-bold text-stone-900 group-hover:text-stone-700">
                            {language === 'mr' ? vil.nameMr : vil.nameEn}
                          </div>
                          <div className="text-[11px] text-stone-500">
                            {language === 'mr'
                              ? `तालुका: ${vil.talukaMr} · जिल्हा: ${vil.districtMr}`
                              : `Taluka: ${vil.talukaEn} · District: ${vil.districtEn}`}
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-stone-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          <span>{language === 'mr' ? 'पहा' : 'View'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Mode B: Location Selector (District → Taluka → Village) */}
            {searchMode === 'dropdown' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {/* District */}
                  <div>
                    <label className="font-semibold text-stone-800 block mb-1">
                      {language === 'mr' ? '१. जिल्हा निवडा' : '1. Select District'}
                    </label>
                    <select
                      value={selectedDist}
                      onChange={(e) => setSelectedDist(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
                    >
                      {MAHARASHTRA_DISTRICTS.map((d) => (
                        <option key={d.id} value={d.id}>
                          {language === 'mr' ? d.nameMr : d.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Taluka */}
                  <div>
                    <label className="font-semibold text-stone-800 block mb-1">
                      {language === 'mr' ? '२. तालुका निवडा' : '2. Select Taluka'}
                    </label>
                    <select
                      value={selectedTal}
                      onChange={(e) => setSelectedTal(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
                    >
                      {filteredTalukas.map((tl) => (
                        <option key={tl.id} value={tl.id}>
                          {language === 'mr' ? tl.nameMr : tl.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Village */}
                  <div>
                    <label className="font-semibold text-stone-800 block mb-1">
                      {language === 'mr' ? '३. गाव निवडा' : '3. Select Village'}
                    </label>
                    <select
                      value={selectedVil}
                      onChange={(e) => setSelectedVil(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
                    >
                      {filteredVillages.map((v) => (
                        <option key={v.id} value={v.id}>
                          {language === 'mr' ? v.nameMr : v.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleDropdownGo}
                    className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-lg transition-all inline-flex items-center gap-2 shadow-xs hover:shadow-md"
                  >
                    <span>{language === 'mr' ? 'गावाची माहिती उघडा' : 'View Village Records'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. "EXPLORE GRAM DRISHTI" (The 5 Core Pillars in Maharashtra Jewel Tones) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-amber-200 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-orange-700 uppercase tracking-wider font-mono">
              {language === 'mr' ? '🚩 नागरिक सेवा दालन' : '🚩 Core Portals'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 font-serif tracking-tight mt-0.5">
              {language === 'mr' ? 'ग्राम दृष्टी दालने' : 'Explore Gram Drishti'}
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              {language === 'mr'
                ? 'आपल्या गरजेनुसार संबंधित विभागावर क्लिक करून सविस्तर माहिती मिळवा.'
                : 'Choose any civic portal to explore structured, verified village and welfare information.'}
            </p>
          </div>
          <button
            onClick={() => navigateTo('search')}
            className="text-xs font-bold text-orange-700 hover:text-orange-900 inline-flex items-center gap-1 self-start sm:self-auto hover:underline"
          >
            <span>{language === 'mr' ? 'सर्व गावे शोधा' : 'Search All Villages'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {explorePillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <button
                key={pillar.id}
                onClick={() => navigateTo(pillar.id as any)}
                className={`p-5 rounded-xl border border-stone-200/90 bg-white hover:bg-stone-50/50 shadow-2xs hover:shadow-md transition-all text-left group flex flex-col justify-between ${pillar.borderHover}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 ${pillar.iconClass}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-medium text-stone-500 uppercase tracking-wider">
                      {language === 'mr' ? pillar.kickerMr : pillar.kickerEn}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-stone-950 group-hover:text-stone-700 transition-colors">
                    {language === 'mr' ? pillar.titleMr : pillar.titleEn}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                    {language === 'mr' ? pillar.descMr : pillar.descEn}
                  </p>
                </div>

                <div className={`mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold ${pillar.linkClass}`}>
                  <span>{language === 'mr' ? 'तपशील पहा' : 'View Portal'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        {/* SPECIAL COLLEGE CAPSTONE AI & ML SHOWCASE BANNER */}
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-indigo-700/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold">
                <Brain className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>
                  {language === 'mr'
                    ? 'कॉलेज पदवी प्रकल्प · प्रगत मशीन लर्निंग व डेटा सायन्स आर्किटेक्चर'
                    : 'COLLEGE CAPSTONE PROJECT · ADVANCED ML, AI & DATA SCIENCE ARCHITECTURE'}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black font-serif text-white tracking-tight">
                {language === 'mr'
                  ? 'महाराष्ट्र ग्रामीण प्रशासनासाठी ६ मशीन लर्निंग अल्गोरिदम व पायथन पाइपलाइन्स'
                  : '6 Production Machine Learning Pipelines & Python Architecture for Rural Governance'}
              </h3>

              <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
                {language === 'mr'
                  ? 'XGBoost व Random Forest पीक उत्पादन अंदाज (SHAP व्हॅल्यूज), ARIMA भूजल टाईम-सिरीज, K-Means व PCA क्लस्टरिंग, Sentinel-2 उपग्रह NDVI वनस्पती निर्देशांक, BERT तक्रार NLP वर्गीकरण, आणि डाऊनलोड करण्यायोग्य जुपिटर (.ipynb) कोड.'
                  : 'Featuring XGBoost & Random Forest Crop Regressors with SHAP explainability, ARIMA/Prophet Groundwater time-series, K-Means & PCA village clustering, Sentinel-2 satellite NDVI remote sensing, BERT NLP complaint triage, and exportable Jupyter Notebooks.'}
              </p>

              {/* Algorithm pills */}
              <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-mono">
                <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/10 text-emerald-300">
                  ⚡ XGBoost (Tree Ensemble)
                </span>
                <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/10 text-sky-300">
                  📈 ARIMA + Prophet
                </span>
                <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/10 text-purple-300">
                  🏘 K-Means + PCA (2D Projection)
                </span>
                <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/10 text-teal-300">
                  🛰 Sentinel-2 NDVI
                </span>
                <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/10 text-amber-300">
                  📝 DistilBERT NLP
                </span>
                <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/10 text-rose-300">
                  🔍 Isolation Forest
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
              <button
                onClick={() => navigateTo('village-3d')}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/25 inline-flex items-center justify-center gap-2 group border border-emerald-400/40"
              >
                <span className="text-base">🌐</span>
                <span>{language === 'mr' ? '३डी डिजिटल ट्विन (Three.js PBR)' : 'Launch 3D Spatial Twin (Three.js)'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigateTo('presentation')}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-stone-950 font-black text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-amber-400/20 inline-flex items-center justify-center gap-2 group"
              >
                <span className="text-sm">🎓</span>
                <span>{language === 'mr' ? 'प्रकल्प सादरीकरण (Project Defense for Sir)' : 'Project Defense for Sir (Sem VII)'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigateTo('ml-analytics')}
                className="px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white font-mono text-xs rounded-xl border border-white/20 transition-all inline-flex items-center justify-center gap-2"
              >
                <Cpu className="w-3.5 h-3.5 text-amber-300" />
                <span>{language === 'mr' ? 'थेट AI/ML लॅब उघडा' : 'Launch Interactive ML Lab'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAHARASHTRA AT A GLANCE (State Metrics Strip - Executive Data Center Aesthetic) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white rounded-2xl p-8 sm:p-10 shadow-xl border border-stone-800 relative overflow-hidden">
          {/* Subtle Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-emerald-500 to-indigo-500" />

          <div className="max-w-3xl mb-8">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block font-bold">
              {language === 'mr' ? 'महाराष्ट्र सांख्यिकी विहंगावलोकन' : 'Public Digital Infrastructure · State at a Glance'}
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold font-serif text-white mt-1">
              {language === 'mr'
                ? '३६ जिल्हे, ३५८ तालुके आणि ४३,०००+ ग्रामपंचायतींचा डिजिटल संदर्भ'
                : 'Digital Reference Across 36 Districts, 358 Talukas & 43,665+ Gram Panchayats'}
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-5 bg-stone-800/70 rounded-xl border border-stone-700/70">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-300 block tracking-tight">
                36
              </span>
              <span className="text-xs text-stone-200 font-semibold block mt-1.5">
                {language === 'mr' ? 'महसुली जिल्हे' : 'Revenue Districts'}
              </span>
              <span className="text-[10px] text-stone-400 block mt-0.5 font-mono">
                {language === 'mr' ? '६ प्रशासकीय विभाग' : '6 Administrative Divisions'}
              </span>
            </div>

            <div className="p-5 bg-stone-800/70 rounded-xl border border-stone-700/70">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-300 block tracking-tight">
                358
              </span>
              <span className="text-xs text-stone-200 font-semibold block mt-1.5">
                {language === 'mr' ? 'तालुके / पंचायत समित्या' : 'Talukas / Blocks'}
              </span>
              <span className="text-[10px] text-stone-400 block mt-0.5 font-mono">
                {language === 'mr' ? 'स्थानिक विकास घटक' : 'Sub-district Civic Units'}
              </span>
            </div>

            <div className="p-5 bg-stone-800/70 rounded-xl border border-stone-700/70">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-cyan-300 block tracking-tight">
                43,665+
              </span>
              <span className="text-xs text-stone-200 font-semibold block mt-1.5">
                {language === 'mr' ? 'ग्रामपंचायती' : 'Gram Panchayats'}
              </span>
              <span className="text-[10px] text-stone-400 block mt-0.5 font-mono">
                {language === 'mr' ? 'LGD संहिता प्रमाणीकरण' : 'LGD Code Verified'}
              </span>
            </div>

            <div className="p-5 bg-stone-800/70 rounded-xl border border-stone-700/70">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-purple-300 block tracking-tight">
                61.5M+
              </span>
              <span className="text-xs text-stone-200 font-semibold block mt-1.5">
                {language === 'mr' ? 'ग्रामीण लोकसंख्या' : 'Rural Citizens'}
              </span>
              <span className="text-[10px] text-stone-400 block mt-0.5 font-mono">
                {language === 'mr' ? 'कृषी व ग्रामीण समाज' : 'Agri-Rural Demographics'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW GRAM DRISHTI WORKS (Clean Minimalist Process) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-left max-w-2xl space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 font-bold">
            {language === 'mr' ? 'वापरण्याची पद्धत' : 'Civic Navigation Workflow'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-950 font-serif">
            {language === 'mr' ? 'ग्राम दृष्टी कसे कार्य करते?' : 'How Gram Drishti Works'}
          </h2>
          <p className="text-xs text-stone-600">
            {language === 'mr'
              ? 'कोणत्याही क्लिष्टतेशिवाय गावातील माहिती मिळवण्यासाठी ३ सोप्या पायऱ्या.'
              : 'Three streamlined steps to discover, inspect, and track verified civic records.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-all space-y-3">
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-white font-mono font-bold flex items-center justify-center text-xs">
              01
            </div>
            <h3 className="text-sm font-bold text-stone-900">
              {language === 'mr' ? '१. आपले गाव निवडा' : '1. Locate Your Village'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {language === 'mr'
                ? 'गावाचे नाव टाइप करा किंवा जिल्हा आणि तालुक्यानुसार फिल्टर करून आपले गाव त्वरित शोधा.'
                : 'Search by village name, PIN code, or navigate the administrative directory hierarchy.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-all space-y-3">
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-white font-mono font-bold flex items-center justify-center text-xs">
              02
            </div>
            <h3 className="text-sm font-bold text-stone-900">
              {language === 'mr' ? '२. पडताळलेली माहिती तपासा' : '2. Inspect Verified Records'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {language === 'mr'
                ? 'लोकसंख्या, मंजूर विकासकामे, बजेट खर्च, शाळा, दवाखाने आणि शेती आकडेवारी स्पष्टपणे पहा.'
                : 'Review official census data, physical works progress, healthcare centers, and water tables.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-all space-y-3">
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-white font-mono font-bold flex items-center justify-center text-xs">
              03
            </div>
            <h3 className="text-sm font-bold text-stone-900">
              {language === 'mr' ? '३. योजनांचा लाभ व तक्रार नोंदणी' : '3. Welfare Grants & Grievances'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {language === 'mr'
                ? 'पात्र शासकीय योजनांची माहिती घ्या किंवा स्थानिक नागरी समस्यांची डिजिटल तक्रार नोंदवा.'
                : 'Check welfare scheme eligibility, download documents, or log public grievances with tracking IDs.'}
            </p>
          </div>
        </div>
      </section>

      {/* 5. IMPORTANT UPDATES & NOTICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200/90 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 font-bold">
              {language === 'mr' ? 'परिपत्रके व ग्रामसभा' : 'Gazette Circulars & Gram Sabha'}
            </span>
            <h3 className="text-lg font-bold text-stone-950 font-serif">
              {language === 'mr' ? 'महत्त्वाच्या सूचना व अद्यतने' : 'Public Notices & Resolutions'}
            </h3>
          </div>
          <button
            onClick={() => navigateTo('announcements')}
            className="text-xs font-semibold text-stone-700 hover:text-stone-950 inline-flex items-center gap-1 hover:underline"
          >
            <span>{language === 'mr' ? 'सर्व परिपत्रके पहा' : 'View All Notices'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_ANNOUNCEMENTS.slice(0, 3).map((ann) => (
            <div
              key={ann.id}
              onClick={() => navigateTo('announcements')}
              className="bg-white p-5 rounded-xl border border-stone-200/90 hover:border-stone-400 hover:shadow-sm transition-all cursor-pointer space-y-2.5 group"
            >
              <div className="flex items-center gap-2 text-[11px] font-mono text-stone-500">
                <span className="font-semibold text-stone-700">{ann.departmentMr}</span>
                <span aria-hidden="true">·</span>
                <span>{ann.date}</span>
              </div>
              <h4 className="text-xs font-bold text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-2">
                {language === 'mr' ? ann.titleMr : ann.titleEn}
              </h4>
              <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                {language === 'mr' ? ann.summaryMr : ann.summaryEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. DATA SOURCES & TRANSPARENCY STANDARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <h3 className="text-base font-bold text-stone-950 font-serif">
                  {language === 'mr'
                    ? 'डेटा स्रोत व पारदर्शकता धोरण'
                    : 'Data Sources & Transparency Standards'}
                </h3>
              </div>
              <p className="text-xs text-stone-600 max-w-3xl leading-relaxed">
                {language === 'mr'
                  ? 'ग्राम दृष्टी हे सार्वजनिक व खुल्या शासकीय डेटा संचांवर आधारित एक स्वतंत्र माहिती व्यासपीठ आहे. येथे दर्शविलेली आकडेवारी स्थानिक स्वराज्य संस्था, भारत सरकार LGD प्रणाली आणि संबंधित विभागांच्या सार्वजनिक नोंदींनुसार संकलित करण्यात आली आहे.'
                  : 'Gram Drishti is an independent public digital initiative built using open government records. All statistics reflect verified releases from the Local Government Directory (LGD), Census, and departmental administrative disclosures.'}
              </p>
            </div>

            <button
              onClick={() => navigateTo('about')}
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-all inline-flex items-center gap-1.5 shrink-0 self-start shadow-xs"
            >
              <span>{language === 'mr' ? 'डेटा स्रोत पहा' : 'View Data Sources'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="pt-3 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-600 font-mono">
            <div>
              <strong className="text-stone-900 font-sans block text-[11px] font-semibold">{language === 'mr' ? 'प्राथमिक स्रोत:' : 'Primary Sources:'}</strong>
              <span className="text-stone-700">LGD, Census 2011/2021, OGD Platform</span>
            </div>
            <div>
              <strong className="text-stone-900 font-sans block text-[11px] font-semibold">{language === 'mr' ? 'अद्यतन कालावधी:' : 'Reference Period:'}</strong>
              <span className="text-stone-700">FY 2025–26 (September 2026 Release)</span>
            </div>
            <div>
              <strong className="text-stone-900 font-sans block text-[11px] font-semibold">{language === 'mr' ? 'स्वायत्तता:' : 'Affiliation:'}</strong>
              <span className="text-stone-700">Open Public Digital Repository (Civic Tech)</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
