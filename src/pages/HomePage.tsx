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
  FileText
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

  // 5 Core Pillars as requested with authentic Maharashtra jewel tones
  const explorePillars = [
    {
      id: 'village-overview',
      titleMr: 'माझे गाव',
      titleEn: 'My Village',
      descMr: 'गावाची लोकसंख्या, प्रशासन, ग्रामपंचायत पदाधिकारी आणि मूलभूत रूपरेषा.',
      descEn: 'Demographics, Gram Panchayat leaders, and civic profile.',
      icon: Users,
      badgeMr: 'सविस्तर गाव केंद्र',
      badgeEn: 'Village Hub',
      cardClass: 'border-emerald-200 hover:border-emerald-500 bg-gradient-to-b from-emerald-50/80 via-white to-white',
      iconClass: 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-sm ring-1 ring-emerald-300',
      badgeClass: 'text-emerald-800 bg-emerald-100/80',
      linkClass: 'text-emerald-700 hover:text-emerald-900'
    },
    {
      id: 'schemes',
      titleMr: 'शासकीय योजना',
      titleEn: 'Government Schemes',
      descMr: 'शेतकरी, महिला, विद्यार्थी व ज्येष्ठ नागरिकांसाठी उपलब्ध राज्य व केंद्र योजना.',
      descEn: 'Welfare schemes for farmers, women, students, and seniors.',
      icon: FileSpreadsheet,
      badgeMr: 'पात्रता व अर्ज',
      badgeEn: 'Eligibility & Steps',
      cardClass: 'border-amber-200 hover:border-amber-500 bg-gradient-to-b from-amber-50/80 via-white to-white',
      iconClass: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-sm ring-1 ring-amber-300',
      badgeClass: 'text-amber-900 bg-amber-100/80',
      linkClass: 'text-amber-800 hover:text-amber-950'
    },
    {
      id: 'village-development',
      titleMr: 'विकासकामे',
      titleEn: 'Development Works',
      descMr: 'गावात मंजूर झालेले रस्ते, पाणी, शाळा व स्वच्छता प्रकल्प आणि प्रत्यक्ष प्रगती.',
      descEn: 'Physical works, sanctioned funds, and real progress tracking.',
      icon: Building2,
      badgeMr: 'पारदर्शक निधी',
      badgeEn: 'Sanctioned Funds',
      cardClass: 'border-blue-200 hover:border-blue-500 bg-gradient-to-b from-blue-50/80 via-white to-white',
      iconClass: 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-sm ring-1 ring-blue-300',
      badgeClass: 'text-blue-800 bg-blue-100/80',
      linkClass: 'text-blue-700 hover:text-blue-900'
    },
    {
      id: 'village-facilities',
      titleMr: 'सार्वजनिक सुविधा',
      titleEn: 'Public Facilities',
      descMr: 'प्राथमिक शाळा, आरोग्य केंद्र, पिण्याचे पाणी, बँक मित्र व वीज सुविधांची नोंद.',
      descEn: 'Schools, clinics, drinking water supply, and banking kiosks.',
      icon: HeartPulse,
      badgeMr: 'सुविधा निर्देशिका',
      badgeEn: 'Service Directory',
      cardClass: 'border-teal-200 hover:border-teal-500 bg-gradient-to-b from-teal-50/80 via-white to-white',
      iconClass: 'bg-gradient-to-br from-teal-600 to-cyan-700 text-white shadow-sm ring-1 ring-teal-300',
      badgeClass: 'text-teal-800 bg-teal-100/80',
      linkClass: 'text-teal-700 hover:text-teal-900'
    },
    {
      id: 'report-issue',
      titleMr: 'तक्रार नोंदवा',
      titleEn: 'Report an Issue',
      descMr: 'रस्ते, पाणी, वीज किंवा इतर नागरी समस्यांची ऑनलाइन नोंद व पाठपुरावा.',
      descEn: 'Register public grievances with automated digital tracking.',
      icon: AlertCircle,
      badgeMr: 'नागरिक निवारण',
      badgeEn: 'Public Redressal',
      cardClass: 'border-rose-200 hover:border-rose-500 bg-gradient-to-b from-rose-50/80 via-white to-white',
      iconClass: 'bg-gradient-to-br from-rose-600 to-red-700 text-white shadow-sm ring-1 ring-rose-300',
      badgeClass: 'text-rose-800 bg-rose-100/80',
      linkClass: 'text-rose-700 hover:text-rose-900'
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-100 pb-4 mb-5">
              <div>
                <span className="text-xs font-bold text-orange-700 uppercase tracking-wider block font-mono">
                  {language === 'mr' ? 'गाव शोध कक्ष' : 'Village Discovery'}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-stone-950 flex items-center gap-2">
                  <Search className="w-4 h-4 text-orange-600" />
                  <span>{language === 'mr' ? 'आपले गाव शोधा' : 'Find Your Village'}</span>
                </h2>
              </div>

              {/* Two clear options */}
              <div className="flex items-center bg-amber-50 p-1 rounded-xl border border-amber-200 text-xs">
                <button
                  type="button"
                  onClick={() => setSearchMode('name')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    searchMode === 'name'
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs'
                      : 'text-stone-700 hover:text-orange-800'
                  }`}
                >
                  {language === 'mr' ? 'नावाने शोधा' : 'Search by Name'}
                </button>
                <button
                  type="button"
                  onClick={() => setSearchMode('dropdown')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    searchMode === 'dropdown'
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs'
                      : 'text-stone-700 hover:text-orange-800'
                  }`}
                >
                  {language === 'mr' ? 'जिल्हा निवडा' : 'Select Location'}
                </button>
              </div>
            </div>

            {/* Mode A: Search by Village Name */}
            {searchMode === 'name' && (
              <div className="space-y-4">
                <div className="relative">
                  <Search className="w-5 h-5 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={nameQuery}
                    onChange={(e) => setNameQuery(e.target.value)}
                    placeholder={
                      language === 'mr'
                        ? 'गावाचे नाव टाइप करा (उदा. मालेगाव, भिलार, खेड शिवापूर, राळेगण)...'
                        : 'Type village name (e.g. Malegaon, Bhilar, Khed Shivapur, Ralegan)...'
                    }
                    className="w-full pl-11 pr-4 py-3 bg-amber-50/40 border border-amber-300 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all shadow-inner"
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

                {/* Quick Suggestion Pills with Authentic Maharashtra Colors */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-600">
                  <span className="font-semibold text-stone-500 font-mono">
                    {language === 'mr' ? 'उदा.' : 'Popular:'}
                  </span>
                  {[
                    { id: 'malegaon-ardhapur-nanded', labelMr: 'मालेगाव (नांदेड)', labelEn: 'Malegaon (Nanded)', color: 'bg-orange-50 text-orange-800 border-orange-200 hover:bg-orange-100 hover:border-orange-300' },
                    { id: 'bhilar-mahabaleshwar-satara', labelMr: 'भिलार (सातारा)', labelEn: 'Bhilar (Satara)', color: 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300' },
                    { id: 'khed-shivapur-haveli-pune', labelMr: 'खेड शिवापूर (पुणे)', labelEn: 'Khed Shivapur (Pune)', color: 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100 hover:border-blue-300' },
                    { id: 'ralegan-siddhi-parner-ahilyanagar', labelMr: 'राळेगण सिद्धी', labelEn: 'Ralegan Siddhi', color: 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100 hover:border-amber-300' }
                  ].map((sug) => (
                    <button
                      key={sug.id}
                      onClick={() => handleSelectVillageAndGo(sug.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors shadow-2xs ${sug.color}`}
                    >
                      {language === 'mr' ? sug.labelMr : sug.labelEn}
                    </button>
                  ))}
                </div>

                {/* Instant Live Results List */}
                {nameSearchResults.length > 0 && (
                  <div className="border border-amber-200 rounded-xl overflow-hidden divide-y divide-amber-100 bg-white max-h-56 overflow-y-auto mt-2 shadow-lg">
                    {nameSearchResults.map((vil) => (
                      <button
                        key={vil.id}
                        onClick={() => handleSelectVillageAndGo(vil.id)}
                        className="w-full px-4 py-2.5 hover:bg-orange-50 text-left flex items-center justify-between transition-colors group"
                      >
                        <div>
                          <div className="text-xs font-bold text-stone-900 group-hover:text-orange-900">
                            {language === 'mr' ? vil.nameMr : vil.nameEn}
                          </div>
                          <div className="text-[11px] text-stone-500">
                            {language === 'mr'
                              ? `तालुका: ${vil.talukaMr} · जिल्हा: ${vil.districtMr}`
                              : `Taluka: ${vil.talukaEn} · District: ${vil.districtEn}`}
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-orange-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
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
                      onChange={(e) => {
                        setSelectedDist(e.target.value);
                      }}
                      className="w-full bg-amber-50/40 border border-amber-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                      onChange={(e) => {
                        setSelectedTal(e.target.value);
                      }}
                      className="w-full bg-amber-50/40 border border-amber-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                      className="w-full bg-amber-50/40 border border-amber-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                    className="px-6 py-2.5 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs rounded-lg transition-all inline-flex items-center gap-2 shadow-md hover:shadow-lg"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {explorePillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <button
                key={pillar.id}
                onClick={() => navigateTo(pillar.id as any)}
                className={`p-5 rounded-xl border shadow-xs hover:shadow-lg transition-all text-left group flex flex-col justify-between ${pillar.cardClass}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${pillar.iconClass}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${pillar.badgeClass}`}>
                      {language === 'mr' ? pillar.badgeMr : pillar.badgeEn}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-stone-950 group-hover:text-orange-950 transition-colors">
                    {language === 'mr' ? pillar.titleMr : pillar.titleEn}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {language === 'mr' ? pillar.descMr : pillar.descEn}
                  </p>
                </div>

                <div className={`mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold ${pillar.linkClass}`}>
                  <span>{language === 'mr' ? 'उघडा' : 'Explore'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. MAHARASHTRA AT A GLANCE (State Metrics Strip - Rich Indigo/Saffron/Emerald) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-stone-950 via-slate-900 to-orange-950 text-white rounded-2xl p-8 sm:p-10 shadow-xl border border-orange-500/20 relative overflow-hidden">
          {/* Top Maharashtra Tricolor Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-500" />

          <div className="max-w-3xl mb-8">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 block font-bold">
              {language === 'mr' ? '🚩 महाराष्ट्र सांख्यिकी विहंगावलोकन' : '🚩 Maharashtra State at a Glance'}
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold font-serif text-white mt-1">
              {language === 'mr'
                ? '३६ जिल्हे, ३५८ तालुके आणि ४३,०००+ ग्रामपंचायतींचा डिजिटल संदर्भ'
                : 'Digital Reference Across 36 Districts, 358 Talukas & 43,665+ Gram Panchayats'}
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-5 bg-gradient-to-b from-amber-500/15 to-transparent rounded-xl border border-amber-400/30 backdrop-blur-xs">
              <span className="text-3xl sm:text-4xl font-black font-mono text-amber-300 block drop-shadow-sm">
                ३६ / 36
              </span>
              <span className="text-xs text-amber-100 font-semibold block mt-1">
                {language === 'mr' ? 'एकूण महसुली जिल्हे' : 'Revenue Districts'}
              </span>
              <span className="text-[10px] text-amber-300/70 block mt-0.5 font-mono">
                ६ प्रशासकीय विभाग
              </span>
            </div>

            <div className="p-5 bg-gradient-to-b from-orange-500/15 to-transparent rounded-xl border border-orange-400/30 backdrop-blur-xs">
              <span className="text-3xl sm:text-4xl font-black font-mono text-orange-300 block drop-shadow-sm">
                ३५८ / 358
              </span>
              <span className="text-xs text-orange-100 font-semibold block mt-1">
                {language === 'mr' ? 'तालुके / पंचायत समित्या' : 'Talukas / Blocks'}
              </span>
              <span className="text-[10px] text-orange-300/70 block mt-0.5 font-mono">
                स्थानिक प्रशासन घटक
              </span>
            </div>

            <div className="p-5 bg-gradient-to-b from-emerald-500/15 to-transparent rounded-xl border border-emerald-400/30 backdrop-blur-xs">
              <span className="text-3xl sm:text-4xl font-black font-mono text-emerald-300 block drop-shadow-sm">
                ४३,६६५+
              </span>
              <span className="text-xs text-emerald-100 font-semibold block mt-1">
                {language === 'mr' ? 'ग्रामपंचायती' : 'Gram Panchayats'}
              </span>
              <span className="text-[10px] text-emerald-300/70 block mt-0.5 font-mono">
                LGD ग्राम संहिता नोंदणी
              </span>
            </div>

            <div className="p-5 bg-gradient-to-b from-cyan-500/15 to-transparent rounded-xl border border-cyan-400/30 backdrop-blur-xs">
              <span className="text-3xl sm:text-4xl font-black font-mono text-cyan-300 block drop-shadow-sm">
                ५.८+ कोटी
              </span>
              <span className="text-xs text-cyan-100 font-semibold block mt-1">
                {language === 'mr' ? 'ग्रामीण लोकसंख्या' : 'Rural Citizens'}
              </span>
              <span className="text-[10px] text-cyan-300/70 block mt-0.5 font-mono">
                कृषी व ग्रामीण समाज
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW GRAM DRISHTI WORKS (3 Progressive Steps with Vibrant Colors) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-bold text-orange-700 uppercase tracking-wider font-mono">
            {language === 'mr' ? 'वापरण्याची सोपी पद्धत' : 'Simple Workflow'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-950 font-serif">
            {language === 'mr' ? 'ग्राम दृष्टी कसे कार्य करते?' : 'How Gram Drishti Works'}
          </h2>
          <p className="text-xs text-stone-600">
            {language === 'mr'
              ? 'कोणत्याही क्लिष्टतेशिवाय गावातील माहिती मिळवण्यासाठी ३ सोप्या पायऱ्या.'
              : 'Three simple steps to discover, inspect, and track verified civic records.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-gradient-to-b from-orange-50/50 to-white p-6 rounded-xl border border-orange-200 hover:border-orange-400 hover:shadow-md transition-all space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white font-mono font-bold flex items-center justify-center text-sm shadow-sm ring-2 ring-orange-200">
              01
            </div>
            <h3 className="text-base font-bold text-stone-900">
              {language === 'mr' ? '१. आपले गाव निवडा' : '1. Find Your Village'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {language === 'mr'
                ? 'गावाचे नाव टाइप करा किंवा जिल्हा आणि तालुक्यानुसार फिल्टर करून आपले गाव त्वरित शोधा.'
                : 'Type your village name or browse by District and Taluka for instant access.'}
            </p>
          </div>

          <div className="bg-gradient-to-b from-emerald-50/50 to-white p-6 rounded-xl border border-emerald-200 hover:border-emerald-400 hover:shadow-md transition-all space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-mono font-bold flex items-center justify-center text-sm shadow-sm ring-2 ring-emerald-200">
              02
            </div>
            <h3 className="text-base font-bold text-stone-900">
              {language === 'mr' ? '२. पडताळलेली माहिती तपासा' : '2. Inspect Verified Data'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {language === 'mr'
                ? 'लोकसंख्या, मंजूर विकासकामे, बजेट खर्च, शाळा, दवाखाने आणि शेती आकडेवारी स्पष्टपणे पहा.'
                : 'Review clean demographic metrics, sanctioned funds, school facilities, and clinic services.'}
            </p>
          </div>

          <div className="bg-gradient-to-b from-blue-50/50 to-white p-6 rounded-xl border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-mono font-bold flex items-center justify-center text-sm shadow-sm ring-2 ring-blue-200">
              03
            </div>
            <h3 className="text-base font-bold text-stone-900">
              {language === 'mr' ? '३. योजनांचा लाभ व तक्रार नोंदणी' : '3. Avail Schemes & Report'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {language === 'mr'
                ? 'पात्र शासकीय योजनांची माहिती घ्या किंवा स्थानिक नागरी समस्यांची डिजिटल तक्रार नोंदवा.'
                : 'Identify government welfare eligibility or log local civic issues for tracking.'}
            </p>
          </div>
        </div>
      </section>

      {/* 5. IMPORTANT UPDATES & NOTICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between border-b border-amber-200 pb-3">
          <div>
            <span className="text-[11px] font-mono uppercase text-orange-700 font-bold">
              {language === 'mr' ? '🚩 परिपत्रके व ग्रामसभा' : '🚩 Public Notices'}
            </span>
            <h3 className="text-lg font-bold text-stone-950 font-serif">
              {language === 'mr' ? 'महत्त्वाच्या सूचना व अद्यतने' : 'Important Civic Updates'}
            </h3>
          </div>
          <button
            onClick={() => navigateTo('announcements')}
            className="text-xs font-bold text-orange-700 hover:text-orange-900 inline-flex items-center gap-1 hover:underline"
          >
            <span>{language === 'mr' ? 'सर्व परिपत्रके पहा' : 'View All Notices'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_ANNOUNCEMENTS.slice(0, 3).map((ann, idx) => {
            const borderColors = ['hover:border-orange-400', 'hover:border-emerald-400', 'hover:border-blue-400'];
            const badgeBg = ['bg-orange-50 text-orange-800', 'bg-emerald-50 text-emerald-800', 'bg-blue-50 text-blue-800'];
            return (
              <div
                key={ann.id}
                onClick={() => navigateTo('announcements')}
                className={`bg-white p-5 rounded-xl border border-stone-200 ${borderColors[idx % 3]} hover:shadow-md transition-all cursor-pointer space-y-2.5 group`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className={`px-2 py-0.5 rounded font-semibold ${badgeBg[idx % 3]}`}>
                    {ann.departmentMr}
                  </span>
                  <span className="text-stone-400">{ann.date}</span>
                </div>
                <h4 className="text-xs font-bold text-stone-900 group-hover:text-orange-900 transition-colors line-clamp-2">
                  {language === 'mr' ? ann.titleMr : ann.titleEn}
                </h4>
                <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                  {language === 'mr' ? ann.summaryMr : ann.summaryEn}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. DATA SOURCES & TRANSPARENCY (Point 10 Trust Feature with Warm Maharashtra styling) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-amber-50/60 via-white to-emerald-50/40 border border-amber-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-200/30 to-transparent rounded-bl-full pointer-events-none" />

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
              className="px-5 py-2.5 bg-gradient-to-r from-orange-700 to-amber-700 hover:from-orange-800 hover:to-amber-800 text-white text-xs font-bold rounded-lg transition-all inline-flex items-center gap-1.5 shrink-0 self-start shadow-sm"
            >
              <span>{language === 'mr' ? 'डेटा स्रोत पहा' : 'View Data Sources'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="pt-3 border-t border-amber-200/70 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-600 font-mono">
            <div>
              <strong className="text-stone-800 font-sans block">{language === 'mr' ? 'प्राथमिक स्रोत:' : 'Primary Sources:'}</strong>
              <span className="text-orange-900">LGD, Census 2011/2021, OGD Platform</span>
            </div>
            <div>
              <strong className="text-stone-800 font-sans block">{language === 'mr' ? 'अद्यतन कालावधी:' : 'Reference Period:'}</strong>
              <span className="text-emerald-900">आर्थिक वर्ष २०२५–२६ (सप्टेंबर २०२६)</span>
            </div>
            <div>
              <strong className="text-stone-800 font-sans block">{language === 'mr' ? 'स्वायत्तता:' : 'Affiliation:'}</strong>
              <span className="text-stone-700">स्वतंत्र नागरिक संदर्भ व्यासपीठ (Public Project)</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
