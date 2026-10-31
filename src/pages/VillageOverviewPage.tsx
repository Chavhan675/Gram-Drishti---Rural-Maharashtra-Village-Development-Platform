import React from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  Users,
  MapPin,
  Building,
  HeartPulse,
  BarChart3,
  Wheat,
  FolderOpen,
  Share2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Printer,
  ChevronRight,
  ExternalLink,
  FileText
} from 'lucide-react';

export const VillageOverviewPage: React.FC = () => {
  const {
    language,
    selectedVillage,
    allVillages,
    setSelectedVillageId,
    projects,
    facilities,
    navigateTo,
    setIsShareModalOpen,
    setIsFactsheetModalOpen
  } = useApp();

  const t = getTranslation(language);

  const vName = language === 'mr' ? selectedVillage.nameMr : selectedVillage.nameEn;
  const tName = language === 'mr' ? selectedVillage.talukaMr : selectedVillage.talukaEn;
  const dName = language === 'mr' ? selectedVillage.districtMr : selectedVillage.districtEn;

  const villageProjects = projects.filter((p) => p.villageId === selectedVillage.id);
  const villageFacilities = facilities.filter((f) => f.villageId === selectedVillage.id);

  // The core cards with authentic Maharashtra jewel tones
  const coreHubCards = [
    {
      id: 'village-governance',
      emoji: '🗳️',
      titleMr: 'निवडणूक व कामकाज (Elections & Work)',
      titleEn: 'Elections & Governance Record',
      actionMr: 'निकाल व कामे पहा →',
      actionEn: 'View Results & Work →',
      descMr: 'विद्यमान सरपंच, विजयी मते व मताधिक्य, प्रभाग सदस्य आणि कार्यकाळातील प्रत्यक्ष विकासकामे.',
      descEn: 'Elected Sarpanch, vote tally & victory margin, ward council, and audited work delivery.',
      countLabel: `${selectedVillage.election.sarpanchElection.votesSecured.toLocaleString('en-IN')} ${language === 'mr' ? 'मते (+' + selectedVillage.election.sarpanchElection.victoryMargin + ' मताधिक्य)' : 'Votes'}`,
      cardTheme: 'border-orange-300 hover:border-orange-600 bg-gradient-to-b from-orange-100/60 via-amber-50/40 to-white ring-1 ring-orange-200/70',
      badgeTheme: 'bg-orange-200/80 text-orange-950 border-orange-300 font-bold',
      actionTheme: 'text-orange-800 group-hover:text-orange-950 font-bold'
    },
    {
      id: 'apply-document',
      emoji: '📜',
      titleMr: 'ग्राम ई-सेवा व दाखले (Documents)',
      titleEn: 'Citizen Document Desk',
      actionMr: 'दाखला अर्ज करा →',
      actionEn: 'Apply Documents →',
      descMr: 'रहिवासी दाखला, जन्म/मृत्यू नोंद, उत्पन्न, ७/१२ उतारा आणि ग्रामपंचायत ना-हरकत (RTS कायदा २०१५).',
      descEn: 'Residence, birth/death, income, 7/12 land records, and Gram Panchayat NOC with RTS guarantee.',
      countLabel: language === 'mr' ? '१० अधिकृत सेवा' : '10 RTS Services',
      cardTheme: 'border-emerald-300 hover:border-emerald-600 bg-gradient-to-b from-emerald-100/60 via-teal-50/40 to-white ring-1 ring-emerald-200/70',
      badgeTheme: 'bg-emerald-200/80 text-emerald-950 border-emerald-300 font-bold',
      actionTheme: 'text-emerald-800 group-hover:text-emerald-950 font-bold'
    },
    {
      id: 'village-profile',
      emoji: '🏡',
      titleMr: 'ग्राम रूपरेषा (Profile)',
      titleEn: 'Village Profile',
      actionMr: 'माहिती पहा →',
      actionEn: 'View Info →',
      descMr: 'सविस्तर लोकसंख्या, जातनिहाय आकडेवारी, सरपंच व ग्रामपंचायत संपर्क.',
      descEn: 'Demographics, household counts, and administrative contacts.',
      countLabel: `${selectedVillage.demographics.households} ${language === 'mr' ? 'कुटुंबे' : 'Households'}`,
      cardTheme: 'border-orange-200 hover:border-orange-500 bg-gradient-to-b from-orange-50/60 via-white to-white',
      badgeTheme: 'bg-orange-100/80 text-orange-900 border-orange-200',
      actionTheme: 'text-orange-700 group-hover:text-orange-900 font-bold'
    },
    {
      id: 'village-statistics',
      emoji: '📊',
      titleMr: 'सांख्यिकी व स्कोअरकार्ड',
      titleEn: 'Statistics & Scorecard',
      actionMr: 'डेटा तपासा →',
      actionEn: 'Explore Data →',
      descMr: 'शिक्षण, आरोग्य, रस्ते आणि वीज या क्षेत्रांमधील प्रगती निर्देशांक.',
      descEn: 'Education, health, infrastructure, and water index ratings.',
      countLabel: `${language === 'mr' ? 'साक्षरता' : 'Literacy'}: ${selectedVillage.demographics.literacyRate}%`,
      cardTheme: 'border-blue-200 hover:border-blue-500 bg-gradient-to-b from-blue-50/60 via-white to-white',
      badgeTheme: 'bg-blue-100/80 text-blue-900 border-blue-200',
      actionTheme: 'text-blue-700 group-hover:text-blue-900 font-bold'
    },
    {
      id: 'village-development',
      emoji: '🏗️',
      titleMr: 'विकासकामे (Development)',
      titleEn: 'Development Works',
      actionMr: 'प्रकल्प तपासा →',
      actionEn: 'View Projects →',
      descMr: 'सुरू असलेले व पूर्ण झालेले रस्ते, पाणी आणि बांधकाम प्रकल्प आणि निधी.',
      descEn: 'Sanctioned civil works, budget expenditures, and progress.',
      countLabel: `${villageProjects.length} ${language === 'mr' ? 'प्रकल्प' : 'Projects'}`,
      cardTheme: 'border-emerald-200 hover:border-emerald-500 bg-gradient-to-b from-emerald-50/60 via-white to-white',
      badgeTheme: 'bg-emerald-100/80 text-emerald-900 border-emerald-200',
      actionTheme: 'text-emerald-700 group-hover:text-emerald-900 font-bold'
    },
    {
      id: 'village-facilities',
      emoji: '🏥',
      titleMr: 'सार्वजनिक सुविधा (Facilities)',
      titleEn: 'Public Facilities',
      actionMr: 'सुविधा शोधा →',
      actionEn: 'Find Services →',
      descMr: 'शाळा, प्राथमिक आरोग्य केंद्र, पिण्याचे पाणी, बँक मित्र व ई-सेवा केंद्र.',
      descEn: 'Schools, health centres, drinking water plants, and banks.',
      countLabel: `${villageFacilities.length} ${language === 'mr' ? 'नोंदणीकृत केंद्रे' : 'Civic Centers'}`,
      cardTheme: 'border-rose-200 hover:border-rose-500 bg-gradient-to-b from-rose-50/60 via-white to-white',
      badgeTheme: 'bg-rose-100/80 text-rose-900 border-rose-200',
      actionTheme: 'text-rose-700 group-hover:text-rose-900 font-bold'
    },
    {
      id: 'village-agriculture',
      emoji: '🌾',
      titleMr: 'शेती व जलसंधारण (Agriculture)',
      titleEn: 'Agriculture & Irrigation',
      actionMr: 'शेती माहिती पहा →',
      actionEn: 'Explore Agriculture →',
      descMr: 'प्रमुख पिके, सिंचन पद्धती, शेततळी, कृषी सेवा केंद्र व स्थानिक बाजारपेठ.',
      descEn: 'Major crops, irrigation coverage, farm ponds, and local markets.',
      countLabel: `${selectedVillage.agriculture.majorCropsMr.length} ${language === 'mr' ? 'प्रमुख पिके' : 'Major Crops'}`,
      cardTheme: 'border-amber-200 hover:border-amber-500 bg-gradient-to-b from-amber-50/60 via-white to-white',
      badgeTheme: 'bg-amber-100/80 text-amber-950 border-amber-200',
      actionTheme: 'text-amber-800 group-hover:text-amber-950 font-bold'
    },
    {
      id: 'schemes',
      emoji: '📋',
      titleMr: 'शासकीय योजना (Schemes)',
      titleEn: 'Welfare Schemes',
      actionMr: 'योजना शोधा →',
      actionEn: 'Find Schemes →',
      descMr: 'शेतकरी, महिला, विद्यार्थी व कुटुंबांसाठी पात्र कल्याणकारी योजना.',
      descEn: 'Beneficiary criteria, subsidies, and required documents.',
      countLabel: language === 'mr' ? 'पात्र योजना यादी' : 'Active Schemes',
      cardTheme: 'border-purple-200 hover:border-purple-500 bg-gradient-to-b from-purple-50/60 via-white to-white',
      badgeTheme: 'bg-purple-100/80 text-purple-900 border-purple-200',
      actionTheme: 'text-purple-700 group-hover:text-purple-900 font-bold'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-16">
      <Breadcrumbs
        items={[
          { label: 'Maharashtra' },
          { label: dName },
          { label: tName },
          { label: vName }
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Village Switcher Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-white rounded-xl border border-amber-200 shadow-xs text-xs">
          <div className="flex items-center gap-2 text-stone-700">
            <span className="font-semibold text-stone-800">
              {language === 'mr' ? '🚩 सध्या निवडलेले गाव:' : '🚩 Currently Selected Village:'}
            </span>
            <span className="font-bold text-orange-950 font-serif text-sm bg-orange-100/80 px-2.5 py-0.5 rounded-md border border-orange-300">
              {vName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="quick-village-select" className="text-stone-600 hidden sm:inline font-medium">
              {language === 'mr' ? 'इतर गाव निवडा:' : 'Switch village:'}
            </label>
            <select
              id="quick-village-select"
              value={selectedVillage.id}
              onChange={(e) => setSelectedVillageId(e.target.value)}
              className="bg-amber-50/60 border border-amber-300 rounded-lg px-2.5 py-1.5 text-stone-800 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {allVillages.map((v) => (
                <option key={v.id} value={v.id}>
                  {language === 'mr' ? v.nameMr : v.nameEn} ({language === 'mr' ? v.districtMr : v.districtEn})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Central Village Showcase Header with Festive Maharashtra Trim */}
        <div className="bg-white rounded-2xl border border-amber-200 p-6 sm:p-8 shadow-sm text-center space-y-5 relative overflow-hidden">
          {/* Top Maharashtra Tricolor Accent Line */}
          <div className="h-2 w-full bg-gradient-to-r from-orange-600 via-amber-400 via-emerald-600 to-indigo-600 rounded-t-2xl -mt-6 -mx-6 sm:-mt-8 sm:-mx-8 mb-5" />

          <div className="space-y-1.5">
            <div className="flex justify-center items-center gap-2 text-xs text-stone-500 font-mono">
              <span className="bg-amber-50 px-2 py-0.5 rounded text-amber-900 border border-amber-200">LGD: {selectedVillage.lgdCode}</span>
              <span>·</span>
              <span className="bg-emerald-50 px-2 py-0.5 rounded text-emerald-900 border border-emerald-200">PIN: {selectedVillage.pincode}</span>
              <span>·</span>
              <span className="text-stone-700 font-sans font-semibold">{language === 'mr' ? selectedVillage.divisionMr : selectedVillage.divisionEn}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-950 tracking-tight font-serif">
              {vName}
            </h1>

            <p className="text-xs sm:text-sm text-orange-950 flex items-center justify-center gap-1.5 pt-1 font-medium">
              <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
              <span>
                {language === 'mr'
                  ? `तालुका: ${tName} · जिल्हा: ${dName}`
                  : `Taluka: ${tName} · District: ${dName}`}
              </span>
            </p>
          </div>

          {/* Quick Action Ribbon */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
            <button
              onClick={() => navigateTo('apply-document')}
              className="px-4 py-2 bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white font-bold text-xs rounded-lg transition-all inline-flex items-center gap-1.5 shadow-sm hover:shadow"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-200" />
              <span>{language === 'mr' ? 'दाखले अर्ज करा (ई-सेवा)' : 'Apply Documents (RTS)'}</span>
            </button>

            <button
              onClick={() => setIsFactsheetModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs rounded-lg transition-all inline-flex items-center gap-1.5 shadow-sm hover:shadow"
            >
              <Printer className="w-3.5 h-3.5 text-amber-200" />
              <span>{language === 'mr' ? 'माहिती पत्रक प्रिंट करा' : 'Print Village Factsheet'}</span>
            </button>

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="px-4 py-2 bg-white hover:bg-amber-50/70 border border-amber-300 text-stone-700 font-semibold text-xs rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5 text-stone-600" />
              <span>{t.share}</span>
            </button>

            <button
              onClick={() => navigateTo('report-issue')}
              className="px-4 py-2 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-bold text-xs rounded-lg transition-all inline-flex items-center gap-1.5 shadow-sm hover:shadow"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{t.navReportIssue}</span>
            </button>
          </div>

          {/* Key Demographics Ribbon with Rich Jewel Tones */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-amber-100 text-center">
            <div className="bg-gradient-to-b from-orange-50/80 to-white p-3.5 rounded-xl border border-orange-200 shadow-2xs">
              <span className="text-[10px] text-orange-800 block uppercase font-mono font-bold">{t.population}</span>
              <span className="text-xl sm:text-2xl font-black text-stone-900 font-mono block tabular-nums mt-0.5">
                {selectedVillage.demographics.totalPopulation}
              </span>
              <span className="text-[10px] text-stone-500 font-mono mt-0.5 block">
                {selectedVillage.demographics.malePopulation} M · {selectedVillage.demographics.femalePopulation} F
              </span>
            </div>

            <div className="bg-gradient-to-b from-amber-50/80 to-white p-3.5 rounded-xl border border-amber-200 shadow-2xs">
              <span className="text-[10px] text-amber-800 block uppercase font-mono font-bold">{t.households}</span>
              <span className="text-xl sm:text-2xl font-black text-stone-900 font-mono block tabular-nums mt-0.5">
                {selectedVillage.demographics.households}
              </span>
              <span className="text-[10px] text-amber-800 font-medium mt-0.5 block">
                {language === 'mr' ? 'कुटुंबे' : 'Families'}
              </span>
            </div>

            <div className="bg-gradient-to-b from-emerald-50/80 to-white p-3.5 rounded-xl border border-emerald-200 shadow-2xs">
              <span className="text-[10px] text-emerald-800 block uppercase font-mono font-bold">{t.literacy}</span>
              <span className="text-xl sm:text-2xl font-black text-stone-900 font-mono block tabular-nums mt-0.5">
                {selectedVillage.demographics.literacyRate}%
              </span>
              <span className="text-[10px] text-stone-500 font-mono mt-0.5 block">
                M: {selectedVillage.demographics.maleLiteracyRate}% · F: {selectedVillage.demographics.femaleLiteracyRate}%
              </span>
            </div>

            <div className="bg-gradient-to-b from-blue-50/80 to-white p-3.5 rounded-xl border border-blue-200 shadow-2xs">
              <span className="text-[10px] text-blue-800 block uppercase font-mono font-bold">{t.area}</span>
              <span className="text-xl sm:text-2xl font-black text-stone-900 font-mono block tabular-nums mt-0.5">
                {selectedVillage.demographics.areaHectares}
              </span>
              <span className="text-[10px] text-blue-800 font-medium mt-0.5 block">
                {language === 'mr' ? 'हेक्टर क्षेत्र' : 'Hectares Area'}
              </span>
            </div>
          </div>
        </div>

        {/* 3.5 GOVERNANCE & ELECTIONS SPOTLIGHT BANNER */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-emerald-500/10 rounded-2xl border-2 border-amber-300/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-black uppercase text-orange-950 bg-amber-200/90 px-2.5 py-0.5 rounded-full border border-amber-300 font-mono inline-flex items-center gap-1">
                🗳️ {language === 'mr' ? 'विद्यमान सरपंच व निवडणूक निकाल' : 'Current Sarpanch & Election Record'}
              </span>
              <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                {selectedVillage.election.termPeriod}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-stone-950 font-serif">
              {language === 'mr' ? selectedVillage.election.sarpanchElection.electedHeadMr : selectedVillage.election.sarpanchElection.electedHeadEn}
              <span className="text-xs font-normal text-stone-600 ml-2">
                ({language === 'mr' ? selectedVillage.election.sarpanchElection.panelNameMr : selectedVillage.election.sarpanchElection.panelNameEn})
              </span>
            </h3>
            <p className="text-xs text-stone-700 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>
                {language === 'mr' ? 'मिळालेली मते:' : 'Votes Secured:'}{' '}
                <strong className="font-mono text-orange-900 font-bold">
                  {selectedVillage.election.sarpanchElection.votesSecured.toLocaleString('en-IN')}
                </strong>{' '}
                ({selectedVillage.election.sarpanchElection.voteSharePercent}%)
              </span>
              <span className="text-stone-300">·</span>
              <span className="text-emerald-800 font-bold font-mono">
                +{selectedVillage.election.sarpanchElection.victoryMargin} {language === 'mr' ? 'मताधिक्य' : 'Margin'}
              </span>
              <span className="text-stone-300">·</span>
              <span>
                {language === 'mr' ? 'झालेला निधी खर्च:' : 'Funds Spent:'}{' '}
                <strong className="font-mono text-stone-900 font-bold">
                  ₹{selectedVillage.election.governanceWork.utilizedBudgetLakhs}L
                </strong>{' '}
                ({selectedVillage.election.governanceWork.completedWorksCount} {language === 'mr' ? 'पूर्ण कामे' : 'works done'})
              </span>
            </p>
          </div>

          <button
            onClick={() => navigateTo('village-governance')}
            className="px-4 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>{language === 'mr' ? 'सविस्तर निकाल व कामे पहा' : 'View Full Voting & Work Audit'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4. THE PRIMARY NAVIGATION TILES (The Heart of Gram Drishti) */}
        <div>
          <div className="mb-4 text-center sm:text-left">
            <span className="text-xs font-bold text-orange-700 uppercase tracking-wider font-mono">
              {language === 'mr' ? '🚩 गावाची माहिती दालने' : '🚩 Village Portals & Records'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-stone-950 font-serif mt-0.5">
              {language === 'mr' ? 'ग्राम केंद्र दालने' : 'Dedicated Village Hubs'}
            </h2>
            <p className="text-xs text-stone-600">
              {language === 'mr'
                ? 'खालीलपैकी संबंधित विभागावर क्लिक करून माहिती तपशीलवार पहा.'
                : 'Select any category below to access dedicated data and verified civic records.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreHubCards.map((card) => (
              <button
                key={card.id}
                onClick={() => navigateTo(card.id as any)}
                className={`p-5 rounded-2xl border shadow-xs hover:shadow-lg text-left transition-all group flex flex-col justify-between ${card.cardTheme}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl p-2 bg-white rounded-xl shadow-2xs border border-stone-100 group-hover:scale-110 transition-transform">
                      {card.emoji}
                    </span>
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${card.badgeTheme}`}>
                      {card.countLabel}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-stone-950 group-hover:text-orange-950 transition-colors">
                      {language === 'mr' ? card.titleMr : card.titleEn}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {language === 'mr' ? card.descMr : card.descEn}
                    </p>
                  </div>
                </div>

                <div className={`mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold ${card.actionTheme}`}>
                  <span>{language === 'mr' ? card.actionMr : card.actionEn}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 10. VERY IMPORTANT DATA SOURCE & TRANSPARENCY CARD */}
        <div className="p-6 bg-gradient-to-br from-amber-50/60 via-white to-emerald-50/40 rounded-2xl border border-amber-200 text-xs text-stone-700 space-y-3.5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
              <span className="font-bold text-stone-900 text-sm">
                {language === 'mr' ? 'माहिती पडताळणी व संदर्भ (Data Source)' : 'Data Verification & Source Reference'}
              </span>
            </div>

            <button
              onClick={() => navigateTo('about')}
              className="text-orange-800 hover:text-orange-950 hover:underline inline-flex items-center gap-1 font-bold text-xs self-start sm:self-auto"
            >
              <span>{language === 'mr' ? 'सर्व स्रोत व पद्धत पहा →' : 'View Source & Methodology →'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-amber-200/80 font-mono text-[11px] text-stone-600">
            <div>
              <span className="text-stone-500 block font-sans">{language === 'mr' ? 'डेटा स्रोत:' : 'Source:'}</span>
              <span className="font-bold text-orange-900">LGD & Public Gov Records</span>
            </div>
            <div>
              <span className="text-stone-500 block font-sans">{language === 'mr' ? 'अंतिम पडताळणी:' : 'Last Updated:'}</span>
              <span className="font-bold text-emerald-900">September 2026</span>
            </div>
            <div>
              <span className="text-stone-500 block font-sans">{language === 'mr' ? 'कालावधी:' : 'Data Period:'}</span>
              <span className="font-bold text-stone-800">2025–26 Municipal Release</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
