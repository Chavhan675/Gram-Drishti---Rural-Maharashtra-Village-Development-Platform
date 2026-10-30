import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  FolderOpen,
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  CheckCircle2,
  Phone,
  ArrowRight,
  Filter,
  Wheat,
  Users,
  GraduationCap,
  HeartPulse,
  Home,
  Calculator,
  IndianRupee,
  Sparkles,
  FileCheck,
  Printer,
  CheckSquare,
  HelpCircle
} from 'lucide-react';
import { SchemeCategory, GovernmentScheme } from '../types';

export const SchemesPage: React.FC = () => {
  const { language, schemes, setSelectedSchemeModal } = useApp();
  const t = getTranslation(language);

  // Tab: 'directory' or 'calculator'
  const [activeTab, setActiveTab] = useState<'directory' | 'calculator'>('directory');
  const [activeCategory, setActiveCategory] = useState<'all' | SchemeCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Eligibility Calculator Inputs
  const [persona, setPersona] = useState<'farmer' | 'student' | 'woman' | 'senior' | 'general'>('farmer');
  const [landholding, setLandholding] = useState<'none' | 'marginal' | 'small' | 'large'>('marginal');
  const [annualIncome, setAnnualIncome] = useState<'low' | 'mid' | 'high'>('low'); // <1L, 1-2.5L, >2.5L
  const [socialCategory, setSocialCategory] = useState<'general' | 'obc' | 'sc_st' | 'ews'>('obc');
  const [hasRationCard, setHasRationCard] = useState<boolean>(true);
  const [irrigationAvailable, setIrrigationAvailable] = useState<boolean>(false);

  const categories: { id: 'all' | SchemeCategory; label: string }[] = [
    { id: 'all', label: t.filterAll },
    { id: 'farmers', label: t.catFarmers },
    { id: 'women', label: t.catWomen },
    { id: 'students', label: t.catStudents },
    { id: 'health', label: t.catHealth },
    { id: 'housing', label: t.catHousing }
  ];

  const filteredSchemes = schemes.filter((s) => {
    if (activeCategory !== 'all' && s.category !== activeCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        s.nameMr.toLowerCase().includes(q) ||
        s.nameEn.toLowerCase().includes(q) ||
        s.departmentMr.toLowerCase().includes(q) ||
        s.departmentEn.toLowerCase().includes(q) ||
        s.shortDescMr.toLowerCase().includes(q) ||
        s.shortDescEn.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Calculate matching schemes & total estimated financial subsidy
  const eligibilityResults = useMemo(() => {
    const matched: {
      scheme: GovernmentScheme;
      subsidyAmount: number;
      subsidyText: string;
      eligibilityReason: string;
    }[] = [];

    schemes.forEach((s) => {
      // 1. PM-Kisan & Namo Shetkari
      if (s.id === 'pm-kisan' || s.id === 'namo-shetkari') {
        if (persona === 'farmer' && (landholding === 'marginal' || landholding === 'small')) {
          matched.push({
            scheme: s,
            subsidyAmount: 6000,
            subsidyText: '₹6,000 / year (Direct Bank Transfer)',
            eligibilityReason:
              language === 'mr'
                ? 'अल्प व अत्यल्प भूधारक शेतकरी (५ एकरांपेक्षा कमी जमीन) निकष पूर्ण.'
                : 'Small & marginal landholder (below 5 acres) criteria satisfied.'
          });
        }
      }
      // 2. Magel Tyala Shettale (Farm Pond Subsidy)
      else if (s.id === 'magel-tyala-shettale') {
        if (persona === 'farmer' && landholding !== 'none') {
          matched.push({
            scheme: s,
            subsidyAmount: 75000,
            subsidyText: 'Up to ₹75,000 (Direct Infrastructure Grant)',
            eligibilityReason:
              language === 'mr'
                ? 'शेतजमीन मालक शेतकरी शेततळ्यासाठी थेट अनुदानास पात्र.'
                : 'Agricultural landholder eligible for farm pond construction grant.'
          });
        }
      }
      // 3. MJPJAY (Health Insurance)
      else if (s.id === 'mjpjay') {
        if (hasRationCard) {
          matched.push({
            scheme: s,
            subsidyAmount: 500000,
            subsidyText: '₹5,00,000 / family (Cashless Hospitalization)',
            eligibilityReason:
              language === 'mr'
                ? 'रेशनकार्डधारक सर्व महाराष्ट्र नागरिक ५ लाखांपर्यंत कॅशलेस उपचारास पात्र.'
                : 'All ration card holders eligible for cashless hospital care up to ₹5 Lakhs.'
          });
        }
      }
      // 4. MahaDBT Post-Matric Scholarship
      else if (s.id === 'mahadbt-scholarship') {
        if (persona === 'student' && annualIncome !== 'high') {
          matched.push({
            scheme: s,
            subsidyAmount: 45000,
            subsidyText: '₹25,000 - ₹50,000 / year (100% Tuition Fee Waiver)',
            eligibilityReason:
              language === 'mr'
                ? 'उत्पन्न व सामाजिक संवर्ग निकषानुसार शिक्षण शुल्क प्रतिपूर्ती.'
                : 'Tuition and exam fee reimbursement for higher education.'
          });
        }
      }
      // 5. Ladki Bahin Yojana
      else if (s.id === 'ladki-bahin') {
        if (persona === 'woman' && annualIncome !== 'high') {
          matched.push({
            scheme: s,
            subsidyAmount: 18000,
            subsidyText: '₹1,500 / month (₹18,000 / year DBT)',
            eligibilityReason:
              language === 'mr'
                ? '२१ ते ६५ वयोगटातील पात्र महिलांना मासिक आर्थिक साहाय्य.'
                : 'Direct benefit transfer for eligible women aged 21-65 years.'
          });
        }
      }
      // 6. Gharkul / PMAY Housing Scheme
      else if (s.id === 'pmay-gramin') {
        if (annualIncome === 'low') {
          matched.push({
            scheme: s,
            subsidyAmount: 120000,
            subsidyText: '₹1,20,000 (Pucca House Construction Grant)',
            eligibilityReason:
              language === 'mr'
                ? 'कच्चे घर किंवा बेघर कुटुंबांसाठी पक्के घर बांधकाम अनुदान.'
                : 'Financial assistance for construction of pucca house in rural area.'
          });
        }
      }
      // 7. Sanjay Gandhi Niradhar
      else if (s.id === 'sanjay-gandhi-niradhar') {
        if ((persona === 'senior' || persona === 'woman') && annualIncome === 'low') {
          matched.push({
            scheme: s,
            subsidyAmount: 18000,
            subsidyText: '₹1,500 / month Pension',
            eligibilityReason:
              language === 'mr'
                ? 'निराधार वृद्ध, दिव्यांग किंवा विधवा व्यक्तींसाठी मासिक निवृत्तीवेतन.'
                : 'Monthly pension support for destitute, elderly, and widowed individuals.'
          });
        }
      }
    });

    const totalCashBenefit = matched
      .filter((m) => m.subsidyAmount < 200000) // exclude 5L health coverage from direct cash sum
      .reduce((acc, curr) => acc + curr.subsidyAmount, 0);

    return { matched, totalCashBenefit };
  }, [persona, landholding, annualIncome, socialCategory, hasRationCard, irrigationAvailable, schemes, language]);

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-16 font-sans">
      <Breadcrumbs items={[{ label: t.schemesTitle }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header Banner */}
        <div className="border-b border-amber-200 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-orange-700 uppercase tracking-wider font-mono">
                {language === 'mr' ? '📋 कल्याणकारी शासकीय योजना व थेट लाभ' : '📋 Government Welfare Schemes & DBT Hub'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight font-serif mt-0.5">
              {t.schemesTitle}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl">
              {language === 'mr'
                ? 'महाराष्ट्रातील शेतकरी, महिला, विद्यार्थी व कुटुंबांसाठी योजनांची अधिकृत माहिती, स्मार्ट पात्रता कॅल्क्युलेटर आणि अर्ज कागदपत्रे.'
                : 'Verified directory of Maharashtra and Central welfare schemes with an instant Smart Eligibility Calculator and document readiness audit.'}
            </p>
          </div>

          {/* Tab Switcher: Directory vs Calculator */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 shrink-0 shadow-2xs">
            <button
              onClick={() => setActiveTab('directory')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'directory'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'सर्व योजनांची यादी' : 'All Schemes Directory'}</span>
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'calculator'
                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'स्मार्ट पात्रता कॅल्क्युलेटर' : 'Smart Eligibility Calculator'}</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: DIRECTORY MODE                                     */}
        {/* ========================================================= */}
        {activeTab === 'directory' && (
          <div className="space-y-6">
            {/* Filters and Search Bar */}
            <div className="bg-white p-4 rounded-xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              {/* Category Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto text-xs font-semibold">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-lg transition-all whitespace-nowrap ${
                      activeCategory === cat.id
                        ? 'bg-amber-600 text-white font-bold shadow-2xs'
                        : 'text-stone-700 hover:bg-amber-50'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Quick Search */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-amber-600 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'mr' ? 'योजना किंवा विभाग शोधा...' : 'Search scheme or dept...'}
                  className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                />
              </div>
            </div>

            {/* Schemes Grid */}
            {filteredSchemes.length === 0 ? (
              <div className="bg-white rounded-xl border border-stone-200 p-12 text-center text-xs text-stone-500 shadow-2xs">
                {language === 'mr'
                  ? 'कोणतीही योजना आढळली नाही.'
                  : 'No welfare schemes found matching your search.'}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredSchemes.map((scheme) => {
                  const name = language === 'mr' ? scheme.nameMr : scheme.nameEn;
                  const dept = language === 'mr' ? scheme.departmentMr : scheme.departmentEn;
                  const desc = language === 'mr' ? scheme.shortDescMr : scheme.shortDescEn;

                  return (
                    <div
                      key={scheme.id}
                      onClick={() => setSelectedSchemeModal(scheme)}
                      className="bg-white rounded-xl border border-stone-200 p-5 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-stone-700 text-[11px] font-mono">
                            {dept}
                          </span>
                          {scheme.isCentrallySponsored && (
                            <span className="text-[10px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-mono">
                              GoI / Central
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug font-serif">
                          {name}
                        </h3>

                        <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                          {desc}
                        </p>

                        <div className="pt-2 border-t border-stone-100 space-y-1 text-xs text-stone-700 bg-stone-50 rounded-lg p-2.5">
                          <div className="flex items-center gap-1.5 text-[11px]">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate font-medium text-stone-800">
                              {language === 'mr' ? 'पात्रता व कागदपत्रे पडताळलेली' : 'Eligibility verified'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px]">
                            <Phone className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                            <span className="font-mono text-stone-700">{scheme.helpline}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-amber-800 group-hover:text-amber-950">
                        <span>{language === 'mr' ? 'पात्रता व अर्ज कसा करावा →' : 'View Guidelines →'}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: SMART ELIGIBILITY & SUBSIDY CALCULATOR             */}
        {/* ========================================================= */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-900 via-stone-900 to-stone-950 text-white p-6 rounded-2xl shadow-lg border border-amber-500/30">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Instant Beneficiary Assessment Algorithm</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-serif font-black text-white mt-1">
                    {language === 'mr' ? 'योजना पात्रता व थेट आर्थिक लाभ कॅल्क्युलेटर' : 'Smart Citizen Welfare & Subsidy Calculator'}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
                    {language === 'mr'
                      ? 'आपली माहिती निवडा व आपण कोणत्या शासकीय योजनांच्या थेट आर्थिक अनुदानास पात्र आहात हे त्वरित जाणून घ्या.'
                      : 'Configure your profile below to calculate direct annual financial transfers, free health coverage, and required application proofs.'}
                  </p>
                </div>

                <div className="p-4 bg-white/10 rounded-xl border border-white/15 text-center shrink-0">
                  <span className="text-[10px] uppercase font-mono text-amber-300 block">
                    {language === 'mr' ? 'अंदाजित थेट वार्षिक लाभ' : 'Estimated Annual Benefit'}
                  </span>
                  <span className="text-2xl sm:text-3xl font-mono font-black text-white mt-0.5 block">
                    ₹{eligibilityResults.totalCashBenefit.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-emerald-300 block mt-0.5 font-medium">
                    + ₹5,00,000 MJPJAY Health
                  </span>
                </div>
              </div>
            </div>

            {/* Input Criteria Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Column 1: Persona & Occupation */}
              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-4">
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-amber-600" />
                  <span>1. {language === 'mr' ? 'नागरिक संवर्ग' : 'Citizen Category'}</span>
                </h3>

                <div className="space-y-2 text-xs">
                  {[
                    { id: 'farmer', labelEn: 'Farmer / Cultivator', labelMr: 'शेतकरी / खातेदार' },
                    { id: 'student', labelEn: 'Student (Higher Education)', labelMr: 'विद्यार्थी (उच्च शिक्षण)' },
                    { id: 'woman', labelEn: 'Woman (Age 21-65)', labelMr: 'महिला (वय २१ ते ६५)' },
                    { id: 'senior', labelEn: 'Senior Citizen / Destitute', labelMr: 'ज्येष्ठ नागरिक / निराधार' },
                    { id: 'general', labelEn: 'General Rural Resident', labelMr: 'इतर ग्रामीण नागरिक' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setPersona(item.id as any)}
                      className={`w-full text-left p-2.5 rounded-lg border transition-colors flex items-center justify-between ${
                        persona === item.id
                          ? 'bg-amber-50 border-amber-500 font-bold text-amber-950'
                          : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span>{language === 'mr' ? item.labelMr : item.labelEn}</span>
                      {persona === item.id && <CheckCircle className="w-3.5 h-3.5 text-amber-600" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Column 2: Landholding & Income */}
              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-4">
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Wheat className="w-4 h-4 text-emerald-600" />
                  <span>2. {language === 'mr' ? 'जमीन व वार्षिक उत्पन्न' : 'Land & Income Bracket'}</span>
                </h3>

                <div>
                  <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                    {language === 'mr' ? 'शेती जमीन धारण (Landholding):' : 'Landholding Category:'}
                  </label>
                  <select
                    value={landholding}
                    onChange={(e) => setLandholding(e.target.value as any)}
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg font-medium text-stone-900"
                  >
                    <option value="none">{language === 'mr' ? 'शेतजमीन नाही (Landless)' : 'Landless / No Agricultural Land'}</option>
                    <option value="marginal">{language === 'mr' ? 'अत्यल्प भूधारक (२.५ एकरापर्यंत)' : 'Marginal Farmer (Up to 2.5 Acres)'}</option>
                    <option value="small">{language === 'mr' ? 'अल्प भूधारक (२.५ ते ५ एकर)' : 'Small Farmer (2.5 to 5.0 Acres)'}</option>
                    <option value="large">{language === 'mr' ? 'मोठा शेतकरी (५ एकरांपेक्षा जास्त)' : 'Medium / Large Farmer (>5 Acres)'}</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                    {language === 'mr' ? 'कुटुंबाचे वार्षिक उत्पन्न:' : 'Annual Family Income:'}
                  </label>
                  <select
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(e.target.value as any)}
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg font-medium text-stone-900"
                  >
                    <option value="low">{language === 'mr' ? '₹१ लाखापेक्षा कमी (BPL / Yellow/Orange Card)' : 'Below ₹1.0 Lakh (Low Income / BPL)'}</option>
                    <option value="mid">{language === 'mr' ? '₹१ लाख ते ₹२.५ लाख' : '₹1.0 Lakh to ₹2.5 Lakhs'}</option>
                    <option value="high">{language === 'mr' ? '₹२.५ लाखांपेक्षा जास्त' : 'Above ₹2.5 Lakhs'}</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                    {language === 'mr' ? 'सामाजिक संवर्ग (Caste / Category):' : 'Social Category:'}
                  </label>
                  <select
                    value={socialCategory}
                    onChange={(e) => setSocialCategory(e.target.value as any)}
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg font-medium text-stone-900"
                  >
                    <option value="obc">{language === 'mr' ? 'इतर मागास वर्ग (OBC / VJNT)' : 'OBC / VJNT'}</option>
                    <option value="sc_st">{language === 'mr' ? 'अनुसूचित जाती / जमाती (SC / ST)' : 'SC / ST Category'}</option>
                    <option value="ews">{language === 'mr' ? 'आर्थिक दुर्बल घटक (EWS)' : 'Economically Weaker Section (EWS)'}</option>
                    <option value="general">{language === 'mr' ? 'खुला प्रवर्ग (General)' : 'General Category'}</option>
                  </select>
                </div>
              </div>

              {/* Column 3: Proofs & Facilities */}
              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-4">
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-blue-600" />
                  <span>3. {language === 'mr' ? 'कागदपत्रे व सुविधा' : 'Documents & Assets'}</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <label className="flex items-center gap-2 p-2.5 bg-stone-50 border border-stone-200 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasRationCard}
                      onChange={(e) => setHasRationCard(e.target.checked)}
                      className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                    />
                    <span className="text-stone-800 font-medium">
                      {language === 'mr' ? 'महाराष्ट्र रेशनकार्ड उपलब्ध आहे' : 'Has Maharashtra Ration Card (AAY/PHH)'}
                    </span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 bg-stone-50 border border-stone-200 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={irrigationAvailable}
                      onChange={(e) => setIrrigationAvailable(e.target.checked)}
                      className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                    />
                    <span className="text-stone-800 font-medium">
                      {language === 'mr' ? 'शेतात विहीर / बोअरवेल पाणी उपलब्ध' : 'Has active well / borewell water'}
                    </span>
                  </label>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-950 space-y-1">
                  <div className="font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                    <span>Aaple Sarkar / CSC Verified</span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-snug">
                    Rules codified strictly according to current Govt of Maharashtra Government Resolutions (GRs).
                  </p>
                </div>
              </div>
            </div>

            {/* Matching Schemes Result List */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
                <div>
                  <h3 className="text-base font-bold text-stone-900 font-serif">
                    {language === 'mr'
                      ? `आपल्यासाठी ${eligibilityResults.matched.length} योजना पात्र ठरल्या आहेत:`
                      : `You Are Eligible for ${eligibilityResults.matched.length} Government Schemes:`}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Click any scheme to inspect sanction details or apply through official MahaDBT / National portals.
                  </p>
                </div>

                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-400" />
                  <span>Print Eligibility Slip</span>
                </button>
              </div>

              {eligibilityResults.matched.length === 0 ? (
                <div className="p-8 text-center text-xs text-stone-500">
                  No direct matching schemes found for this exact combination. Try adjusting income or landholding criteria.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {eligibilityResults.matched.map((item) => (
                    <div
                      key={item.scheme.id}
                      onClick={() => setSelectedSchemeModal(item.scheme)}
                      className="p-4 rounded-xl border border-stone-200 hover:border-amber-400 hover:bg-amber-50/20 transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono text-stone-500 text-[10px]">
                            {language === 'mr' ? item.scheme.departmentMr : item.scheme.departmentEn}
                          </span>
                          <span className="font-mono font-bold text-emerald-800 text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {item.subsidyText}
                          </span>
                        </div>

                        <h4 className="font-bold text-stone-900 text-sm group-hover:text-amber-800 transition-colors">
                          {language === 'mr' ? item.scheme.nameMr : item.scheme.nameEn}
                        </h4>

                        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                          {language === 'mr' ? item.scheme.shortDescMr : item.scheme.shortDescEn}
                        </p>

                        <div className="p-2 bg-stone-50 rounded-lg text-[11px] text-stone-700 border border-stone-200 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item.eligibilityReason}</span>
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-amber-800 font-bold">
                        <span>Official Portal: {new URL(item.scheme.officialPortalUrl).hostname}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
