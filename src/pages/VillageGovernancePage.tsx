import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  Vote,
  Award,
  Users,
  CheckCircle2,
  TrendingUp,
  FileCheck,
  Building,
  Phone,
  Landmark,
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck,
  Search,
  Filter,
  DollarSign,
  Droplets,
  Zap,
  GraduationCap,
  HeartPulse,
  Truck,
  Sprout,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { WorkDeliverableItem } from '../types';

export const VillageGovernancePage: React.FC = () => {
  const { language, selectedVillage, allVillages, setSelectedVillageId, navigateTo } = useApp();
  const t = getTranslation(language);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const vName = language === 'mr' ? selectedVillage.nameMr : selectedVillage.nameEn;
  const tName = language === 'mr' ? selectedVillage.talukaMr : selectedVillage.talukaEn;
  const dName = language === 'mr' ? selectedVillage.districtMr : selectedVillage.districtEn;

  const election = selectedVillage.election;
  const sarpanch = election.sarpanchElection;
  const work = election.governanceWork;
  const wardMembers = election.wardMembers;

  const categories = [
    { id: 'all', labelMr: 'सर्व कामे', labelEn: 'All Deliverables' },
    { id: 'water', labelMr: 'पिण्याचे पाणी', labelEn: 'Drinking Water' },
    { id: 'roads', labelMr: 'रस्ते व गटारे', labelEn: 'Roads & Drainage' },
    { id: 'education', labelMr: 'शिक्षण व शाळा', labelEn: 'Education' },
    { id: 'solar', labelMr: 'सौर ऊर्जा व वीज', labelEn: 'Solar & Power' },
    { id: 'health', labelMr: 'आरोग्य सुविधा', labelEn: 'Healthcare' },
    { id: 'agriculture', labelMr: 'शेती व सहकार', labelEn: 'Agriculture' },
    { id: 'sanitation', labelMr: 'स्वच्छता व कचरा', labelEn: 'Sanitation' }
  ];

  const filteredWorks = work.workItems.filter((item: WorkDeliverableItem) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchTerm.trim() === '' ||
      item.titleMr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.schemeSourceMr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.schemeSourceEn.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryBadge = (cat: WorkDeliverableItem['category']) => {
    switch (cat) {
      case 'water':
        return { label: language === 'mr' ? 'जल जीवन मिशन' : 'Water Supply', bg: 'bg-blue-50 text-blue-700 border-blue-200', icon: Droplets };
      case 'roads':
        return { label: language === 'mr' ? 'रस्ते व दळणवळण' : 'Roads & Transit', bg: 'bg-stone-100 text-stone-800 border-stone-300', icon: Truck };
      case 'education':
        return { label: language === 'mr' ? 'डिजिटल शिक्षण' : 'Education', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: GraduationCap };
      case 'solar':
        return { label: language === 'mr' ? 'सौर ऊर्जा' : 'Solar Power', bg: 'bg-amber-50 text-amber-800 border-amber-300', icon: Zap };
      case 'health':
        return { label: language === 'mr' ? 'आरोग्य उपकेंद्र' : 'Healthcare', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: HeartPulse };
      case 'agriculture':
        return { label: language === 'mr' ? 'शेती व उपजीविका' : 'Agriculture', bg: 'bg-green-50 text-green-800 border-green-200', icon: Sprout };
      case 'sanitation':
        return { label: language === 'mr' ? 'घनकचरा व गटारे' : 'Sanitation', bg: 'bg-teal-50 text-teal-800 border-teal-200', icon: Building };
      default:
        return { label: language === 'mr' ? 'नागरी विकास' : 'Civic Work', bg: 'bg-purple-50 text-purple-700 border-purple-200', icon: Building };
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-20">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: dName },
          { label: tName },
          { label: vName, page: 'village-overview' },
          { label: language === 'mr' ? 'निवडणूक व कामकाज' : 'Elections & Work' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Ribbon & Village Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-200 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-700 bg-orange-100/90 px-2.5 py-0.5 rounded-full border border-orange-200 font-mono">
                <Vote className="w-3.5 h-3.5 text-orange-700" />
                {language === 'mr' ? 'लोकशाही व पंचायत राज' : 'Panchayat Governance & Democracy'}
              </span>
              <span className="text-xs text-stone-500 font-mono">
                {language === 'mr' ? `कार्यकाळ: ${election.termPeriod}` : `Tenure: ${election.termPeriod}`}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-stone-950 font-serif tracking-tight">
              {vName} — {language === 'mr' ? 'ग्रामपंचायत निवडणूक निकाल व कामकाज' : 'Elections & Governance Work Record'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl">
              {language === 'mr'
                ? 'गावाचे विद्यमान सरपंच, मिळालेली विजयी मते, विजय अंतर, प्रभाग सदस्य आणि कार्यकाळातील प्रत्यक्ष पूर्ण केलेल्या विकासकामांचे सार्वजनिक नागरिक ऑडिट.'
                : 'Current elected village head (Sarpanch), electoral vote tally, victory margin, panchayat ward members, and audited development work deliverables.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Village Selector Dropdown */}
            <div className="flex items-center gap-1.5 bg-white border border-amber-300 rounded-xl px-3 py-1.5 shadow-2xs">
              <span className="text-[11px] text-stone-500 font-semibold">{language === 'mr' ? 'गाव बदल:' : 'Village:'}</span>
              <select
                aria-label={language === 'mr' ? 'गाव निवडा' : 'Select Village'}
                value={selectedVillage.id}
                onChange={(e) => setSelectedVillageId(e.target.value)}
                className="text-xs font-bold text-stone-900 bg-transparent focus:outline-none cursor-pointer"
              >
                {allVillages.map((v) => (
                  <option key={v.id} value={v.id}>
                    {language === 'mr' ? v.nameMr : v.nameEn} ({language === 'mr' ? v.districtMr : v.districtEn})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => navigateTo('village-overview')}
              className="px-4 py-1.5 bg-white hover:bg-amber-50 border border-amber-300 text-stone-800 text-xs font-bold rounded-xl transition-all shadow-2xs cursor-pointer"
            >
              {t.back}
            </button>
          </div>
        </div>

        {/* SECTION 1: SARPANCH SPOTLIGHT & ELECTORAL VICTORY CARD */}
        <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50/60 rounded-3xl border-2 border-amber-300/80 p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-44 h-44 bg-gradient-to-br from-amber-400/20 to-orange-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-amber-200/80">
            {/* Sarpanch Info */}
            <div className="flex items-start sm:items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center font-serif text-2xl sm:text-3xl font-black shadow-md shrink-0 border-2 border-white ring-4 ring-orange-200">
                <span>{sarpanch.electedHeadMr.charAt(3) || 'स'}</span>
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-orange-900 bg-orange-100/90 px-3 py-0.5 rounded-full border border-orange-300 font-mono">
                    🚩 {language === 'mr' ? 'गावाचे विद्यमान सरपंच (Village Head)' : 'Current Elected Village Head (Sarpanch)'}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 font-mono">
                    ✓ {language === 'mr' ? 'थेट जनतेतून निर्वाचित' : 'Directly Elected by Citizens'}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-stone-950 font-serif">
                  {language === 'mr' ? sarpanch.electedHeadMr : sarpanch.electedHeadEn}
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-stone-700 flex items-center gap-2">
                  <span>{language === 'mr' ? sarpanch.panelNameMr : sarpanch.panelNameEn}</span>
                  <span className="text-stone-300">·</span>
                  <span className="text-orange-900 font-mono">{election.termPeriod}</span>
                </p>
                <div className="pt-1 flex flex-wrap items-center gap-4 text-xs text-stone-600">
                  <span className="flex items-center gap-1 text-stone-700">
                    <Phone className="w-3.5 h-3.5 text-orange-600" />
                    <span className="font-mono">{selectedVillage.administration.sarpanchContact}</span>
                  </span>
                  <span className="text-stone-300">·</span>
                  <span>
                    {language === 'mr' ? 'आरक्षण:' : 'Seat Category:'}{' '}
                    <strong className="text-stone-900">
                      {language === 'mr' ? election.sarpanchSeatCategoryMr : election.sarpanchSeatCategoryEn}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Victory Tally Highlight Pill */}
            <div className="w-full lg:w-auto bg-white/95 rounded-2xl border-2 border-orange-300/80 p-4 sm:p-5 shadow-xs flex flex-row sm:flex-col justify-between items-center sm:items-end gap-2">
              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase font-bold text-stone-500 font-mono block">
                  {language === 'mr' ? 'मिळालेली विजयी मते' : 'Winning Votes Secured'}
                </span>
                <span className="text-3xl sm:text-4xl font-black text-orange-700 font-mono">
                  {sarpanch.votesSecured.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] font-bold text-stone-600 block mt-0.5">
                  {sarpanch.voteSharePercent}% {language === 'mr' ? 'मतदानातील हिस्सा' : 'Vote Share'}
                </span>
              </div>
              <div className="text-right">
                <span className="inline-block text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 font-mono">
                  +{sarpanch.victoryMargin.toLocaleString('en-IN')} {language === 'mr' ? 'मताधिक्य (Margin)' : 'Vote Margin'}
                </span>
              </div>
            </div>
          </div>

          {/* Voting Breakdown & Candidates Bar */}
          <div className="pt-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-orange-950 font-mono flex items-center justify-between">
              <span>{language === 'mr' ? '📊 सरपंच निवडणूक मत विभागणी (Candidate Vote Share)' : '📊 Sarpanch Election Candidates & Vote Share'}</span>
              <span className="text-stone-500 font-normal">
                {language === 'mr' ? `निवडणूक दिनांक: ${election.electionDate}` : `Election Date: ${election.electionDate}`}
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {sarpanch.candidates.map((cand, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border text-xs transition-all ${
                    cand.isWinner
                      ? 'bg-gradient-to-b from-orange-100/70 to-amber-50/90 border-orange-300 shadow-2xs ring-1 ring-orange-200'
                      : 'bg-white/80 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-stone-950 text-sm">
                      {language === 'mr' ? cand.candidateNameMr : cand.candidateNameEn}
                    </span>
                    {cand.isWinner && (
                      <span className="text-[10px] font-bold bg-orange-600 text-white px-2 py-0.5 rounded-full font-mono">
                        {language === 'mr' ? 'विजयी' : 'Winner'}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-stone-600 block mb-2">
                    {language === 'mr' ? cand.partyOrPanelMr : cand.partyOrPanelEn}
                  </span>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="font-mono font-bold text-stone-900 text-base">
                      {cand.votesSecured.toLocaleString('en-IN')}{' '}
                      <span className="text-[11px] font-normal text-stone-500">{language === 'mr' ? 'मते' : 'votes'}</span>
                    </span>
                    <span className="font-mono font-bold text-orange-900">{cand.voteSharePercent}%</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        cand.isWinner ? 'bg-gradient-to-r from-orange-500 to-amber-500' : 'bg-stone-400'
                      }`}
                      style={{ width: `${cand.voteSharePercent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Runner-up & Overall Turnout Pill Strip */}
            <div className="p-3 bg-amber-100/60 rounded-xl border border-amber-200/90 flex flex-wrap items-center justify-between text-xs gap-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-orange-950 font-mono">
                  {language === 'mr' ? 'दुसऱ्या क्रमांकाचे उमेदवार (Runner-up):' : 'Runner-up Candidate:'}
                </span>
                <span className="font-bold text-stone-900">
                  {language === 'mr' ? sarpanch.runnerUpNameMr : sarpanch.runnerUpNameEn}
                </span>
                <span className="text-stone-600">
                  ({language === 'mr' ? sarpanch.runnerUpPanelMr : sarpanch.runnerUpPanelEn})
                </span>
                <span className="font-mono font-semibold text-stone-700">
                  — {sarpanch.runnerUpVotes.toLocaleString('en-IN')} {language === 'mr' ? 'मते' : 'votes'}
                </span>
              </div>
              <div className="text-orange-900 font-semibold font-mono text-[11px]">
                {language === 'mr'
                  ? `सरपंचांनी ${sarpanch.victoryMargin} मतांच्या फरकाने दणदणीत विजय मिळवला.`
                  : `Secured victory with a strong margin of ${sarpanch.victoryMargin} votes.`}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: VOTING & ELECTORAL STATISTICS METRIC GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-2xl border border-amber-200 shadow-2xs">
            <span className="text-[10px] text-orange-800 uppercase font-mono font-bold block">
              {t.registeredVotersLabel}
            </span>
            <span className="text-2xl font-black text-stone-950 font-mono mt-1 block">
              {election.totalVoters.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-stone-600 font-mono mt-1 block">
              {election.maleVoters.toLocaleString('en-IN')} {language === 'mr' ? 'पुरुष' : 'M'} ·{' '}
              {election.femaleVoters.toLocaleString('en-IN')} {language === 'mr' ? 'स्त्री' : 'F'}
            </span>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-amber-200 shadow-2xs">
            <span className="text-[10px] text-blue-800 uppercase font-mono font-bold block">
              {t.votesPolledLabel}
            </span>
            <span className="text-2xl font-black text-stone-950 font-mono mt-1 block">
              {election.totalVotesPolled.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-stone-600 mt-1 block">
              {language === 'mr' ? 'वैध प्रत्यक्ष मतदान' : 'Total Valid Votes Cast'}
            </span>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-amber-200 shadow-2xs">
            <span className="text-[10px] text-emerald-800 uppercase font-mono font-bold block">
              {t.voterTurnoutLabel}
            </span>
            <span className="text-2xl font-black text-emerald-700 font-mono mt-1 block">
              {election.voterTurnoutPercent}%
            </span>
            <span className="text-[11px] text-stone-600 mt-1 block">
              {language === 'mr' ? 'उच्च नागरिक सहभाग' : 'High Civic Participation'}
            </span>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-amber-200 shadow-2xs">
            <span className="text-[10px] text-purple-800 uppercase font-mono font-bold block">
              {language === 'mr' ? 'प्रभाग (वार्ड) संख्या' : 'Total Wards'}
            </span>
            <span className="text-2xl font-black text-stone-950 font-mono mt-1 block">
              {wardMembers.length}
            </span>
            <span className="text-[11px] text-stone-600 mt-1 block">
              {language === 'mr' ? 'निर्वाचित प्रभाग सदस्य' : 'Elected Ward Councilors'}
            </span>
          </div>
        </div>

        {/* SECTION 3: WORK DELIVERED & BUDGET UTILIZATION SCORECARD */}
        <div className="bg-white rounded-3xl border border-amber-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-stone-950 font-serif">
                  {language === 'mr' ? 'सरपंच व ग्रामपंचायतीचे प्रत्यक्ष कामकाज' : 'Work Delivered by Village Head & Council'}
                </h2>
                <p className="text-xs text-stone-600">
                  {language === 'mr'
                    ? `कार्यकाळ ${election.termPeriod} मधील मंजूर विकास निधी, प्रत्यक्ष खर्च आणि पूर्ण झालेले पायाभूत प्रकल्प.`
                    : `Audited development funds, completed infrastructure works, and citizen satisfaction ratings during ${election.termPeriod}.`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 font-mono">
                ⭐ {work.citizenApprovalRatingPercent}% {language === 'mr' ? 'नागरिक समाधान' : 'Citizen Rating'}
              </span>
            </div>
          </div>

          {/* Performance Overview KPI Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-gradient-to-b from-emerald-50/80 to-white rounded-2xl border border-emerald-200 shadow-2xs">
              <span className="text-[10px] text-emerald-800 uppercase font-mono font-bold block">
                {t.budgetUtilizedLabel}
              </span>
              <span className="text-2xl font-black text-stone-900 font-mono mt-1 block">
                ₹{work.utilizedBudgetLakhs} <span className="text-xs font-bold text-stone-600">{language === 'mr' ? 'लाख' : 'L'}</span>
              </span>
              <span className="text-[11px] text-stone-600 font-mono mt-1 block">
                {work.budgetUtilizationPercent}% {language === 'mr' ? 'निधी खर्च' : 'budget spent'} (मंजूर: ₹{work.totalDevelopmentBudgetLakhs}L)
              </span>
              {/* Mini progress bar */}
              <div className="w-full bg-emerald-100 rounded-full h-1.5 mt-2 overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full"
                  style={{ width: `${work.budgetUtilizationPercent}%` }}
                />
              </div>
            </div>

            <div className="p-4 bg-gradient-to-b from-blue-50/80 to-white rounded-2xl border border-blue-200 shadow-2xs">
              <span className="text-[10px] text-blue-800 uppercase font-mono font-bold block">
                {language === 'mr' ? 'विकास प्रकल्प संख्या' : 'Development Projects'}
              </span>
              <span className="text-2xl font-black text-stone-900 font-mono mt-1 block">
                {work.completedWorksCount} <span className="text-xs font-bold text-emerald-700">{language === 'mr' ? 'पूर्ण' : 'Done'}</span>
              </span>
              <span className="text-[11px] text-stone-600 mt-1 block">
                + {work.ongoingWorksCount} {language === 'mr' ? 'कामे प्रगतीपथावर' : 'works ongoing'}
              </span>
              <div className="w-full bg-blue-100 rounded-full h-1.5 mt-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full"
                  style={{
                    width: `${Math.round((work.completedWorksCount / (work.completedWorksCount + work.ongoingWorksCount)) * 100)}%`
                  }}
                />
              </div>
            </div>

            <div className="p-4 bg-gradient-to-b from-amber-50/80 to-white rounded-2xl border border-amber-200 shadow-2xs">
              <span className="text-[10px] text-amber-800 uppercase font-mono font-bold block">
                {language === 'mr' ? 'ग्रामसभा व ठराव पूर्तता' : 'Gram Sabha Resolutions'}
              </span>
              <span className="text-2xl font-black text-stone-900 font-mono mt-1 block">
                {work.resolutionsImplemented} / {work.resolutionsPassed}
              </span>
              <span className="text-[11px] text-stone-600 mt-1 block">
                {work.gramSabhaMeetingsHeld} {language === 'mr' ? 'ग्रामसभांमध्ये मंजूर ठराव' : 'meetings conducted'}
              </span>
              <div className="w-full bg-amber-100 rounded-full h-1.5 mt-2 overflow-hidden">
                <div
                  className="bg-amber-600 h-full rounded-full"
                  style={{ width: `${Math.round((work.resolutionsImplemented / work.resolutionsPassed) * 100)}%` }}
                />
              </div>
            </div>

            <div className="p-4 bg-gradient-to-b from-purple-50/80 to-white rounded-2xl border border-purple-200 shadow-2xs">
              <span className="text-[10px] text-purple-800 uppercase font-mono font-bold block">
                {language === 'mr' ? 'तक्रार निवारण दर' : 'Grievance Redressal'}
              </span>
              <span className="text-2xl font-black text-stone-900 font-mono mt-1 block">
                {work.grievanceResolutionRatePercent}%
              </span>
              <span className="text-[11px] text-stone-600 mt-1 block">
                {language === 'mr' ? 'नागरिक अर्जांवर प्रत्यक्ष तोडगा' : 'Civil grievances closed'}
              </span>
              <div className="w-full bg-purple-100 rounded-full h-1.5 mt-2 overflow-hidden">
                <div
                  className="bg-purple-600 h-full rounded-full"
                  style={{ width: `${work.grievanceResolutionRatePercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Key Achievements Bullet Box */}
          <div className="bg-amber-50/70 rounded-2xl border border-amber-200/80 p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-orange-950 font-mono flex items-center gap-2">
              <Award className="w-4 h-4 text-orange-700" />
              <span>{t.keyAchievementsTitle}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-stone-800">
              {(language === 'mr' ? work.keyAchievementsMr : work.keyAchievementsEn).map((ach, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-white/90 p-2.5 rounded-xl border border-amber-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{ach}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Work Deliverables Filter & List */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <h3 className="text-base font-bold text-stone-950 font-serif">
                {t.allWorksDeliveredTitle}
              </h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={language === 'mr' ? 'कामे किंवा योजना शोधा...' : 'Search works or scheme...'}
                    className="pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-400 w-48 sm:w-60"
                  />
                </div>
              </div>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-orange-700 text-white shadow-2xs font-bold'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {language === 'mr' ? cat.labelMr : cat.labelEn}
                </button>
              ))}
            </div>

            {/* Work Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredWorks.map((item) => {
                const badge = getCategoryBadge(item.category);
                const IconComponent = badge.icon;
                return (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl border border-stone-200 hover:border-amber-300 bg-white hover:bg-amber-50/20 transition-all shadow-2xs space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border font-mono ${badge.bg}`}>
                          <IconComponent className="w-3 h-3" />
                          <span>{badge.label}</span>
                        </span>
                        <span className="text-[10px] font-mono text-stone-500">
                          {item.completionYear}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                          item.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {item.status === 'completed'
                          ? (language === 'mr' ? '✓ पूर्ण' : '✓ Completed')
                          : (language === 'mr' ? '⏳ सुरू' : '⏳ In Progress')}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-stone-950 font-serif leading-snug">
                      {language === 'mr' ? item.titleMr : item.titleEn}
                    </h4>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {language === 'mr' ? item.impactDescriptionMr : item.impactDescriptionEn}
                    </p>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-stone-500 block uppercase font-mono">
                          {language === 'mr' ? 'शासकीय योजना स्रोत' : 'Scheme Source'}
                        </span>
                        <span className="font-semibold text-stone-800 text-[11px]">
                          {language === 'mr' ? item.schemeSourceMr : item.schemeSourceEn}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-stone-500 block uppercase font-mono">
                          {language === 'mr' ? 'झालेला खर्च' : 'Funds Spent'}
                        </span>
                        <span className="font-mono font-bold text-emerald-700 text-sm">
                          ₹{item.spentFundsLakhs} {language === 'mr' ? 'लाख' : 'L'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECTION 4: GRAM PANCHAYAT WARD MEMBERS (PANCH COUNCIL) */}
        <div className="bg-white rounded-3xl border border-amber-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-stone-950 font-serif">
                  {t.panchayatMembersTitle}
                </h2>
                <p className="text-xs text-stone-600">
                  {language === 'mr'
                    ? 'गावातील सर्व प्रभागांमधून निवडून आलेले उपसरपंच व प्रभाग सदस्य (पंचांची संपूर्ण यादी व संपर्क).'
                    : 'Ward councilors and Up-Sarpanch representing all village divisions, their portfolios, and electoral margins.'}
                </p>
              </div>
            </div>
            <div className="text-xs font-mono font-bold text-stone-700 bg-stone-100 px-3 py-1 rounded-xl">
              {wardMembers.length} {language === 'mr' ? 'प्रभाग सदस्य' : 'Elected Councilors'}
            </div>
          </div>

          {/* Ward Members Table / Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {wardMembers.map((member) => {
              const isUpSarpanch = member.designationEn.toLowerCase().includes('up-sarpanch') || member.designationMr.includes('उपसरपंच');
              return (
                <div
                  key={member.wardNumber}
                  className={`p-5 rounded-2xl border transition-all text-xs space-y-3 ${
                    isUpSarpanch
                      ? 'bg-gradient-to-b from-amber-50/90 to-white border-amber-300 shadow-2xs ring-1 ring-amber-200'
                      : 'bg-white hover:bg-stone-50/80 border-stone-200 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full font-mono bg-stone-100 text-stone-800 border border-stone-200">
                      प्रभाग {member.wardNumber} (Ward {member.wardNumber})
                    </span>
                    {isUpSarpanch && (
                      <span className="text-[10px] font-black uppercase text-amber-900 bg-amber-200/90 px-2 py-0.5 rounded-full border border-amber-300 font-mono">
                        ⭐ {language === 'mr' ? 'उपसरपंच' : 'Up-Sarpanch'}
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-stone-950 font-serif">
                      {language === 'mr' ? member.memberNameMr : member.memberNameEn}
                    </h4>
                    <span className="text-[11px] font-medium text-stone-500 block mt-0.5">
                      {language === 'mr' ? member.wardNameMr : member.wardNameEn}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-1 border-t border-stone-100 text-[11px]">
                    <div className="flex items-center justify-between text-stone-700">
                      <span className="text-stone-500">{language === 'mr' ? 'प्रवर्ग आरक्षण:' : 'Reservation:'}</span>
                      <span className="font-semibold text-stone-900">
                        {language === 'mr' ? member.reservationCategoryMr : member.reservationCategoryEn}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-stone-700">
                      <span className="text-stone-500">{language === 'mr' ? 'मिळालेली मते:' : 'Votes Secured:'}</span>
                      <span className="font-mono font-bold text-emerald-800">
                        {member.votesSecured} {language === 'mr' ? 'मते' : 'votes'} (+{member.margin} margin)
                      </span>
                    </div>

                    <div className="pt-1 text-stone-700">
                      <span className="text-[10px] text-stone-500 block uppercase font-mono">
                        {language === 'mr' ? 'जबाबदारी व खाते:' : 'Portfolio & Duty:'}
                      </span>
                      <span className="font-medium text-stone-900 block mt-0.5">
                        {language === 'mr' ? member.keyResponsibilitiesMr : member.keyResponsibilitiesEn}
                      </span>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-stone-600 font-mono text-[11px]">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-stone-400" />
                        <span>{member.contactNumber}</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 5: AUDIT SOURCE & QUICK CITIZEN ACTION STRIP */}
        <div className="p-5 bg-stone-900 text-stone-300 rounded-2xl border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white font-mono uppercase tracking-wider text-[11px]">
                {language === 'mr' ? 'राज्य निवडणूक आयोग व ग्रामविकास विभाग नोंद' : 'State Election Commission & Rural Dev Desk'}
              </span>
            </div>
            <p className="text-stone-400 text-[11px]">
              {language === 'mr'
                ? 'सदर माहिती महाराष्ट्र ग्रामपंचायत अधिनियम व अधिकृत ग्रामसभा कार्यवृत्तांतावर आधारित आहे.'
                : 'Data verified under the Maharashtra Village Panchayats Act & certified Gram Sabha proceedings.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigateTo('report-issue')}
              className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-1.5 text-xs"
            >
              <span>{language === 'mr' ? 'नागरी समस्या नोंदवा' : 'Report Civic Issue'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigateTo('village-development')}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-bold rounded-xl transition-all cursor-pointer text-xs"
            >
              {language === 'mr' ? 'सविस्तर विकासकामे पहा' : 'View Full Civil Projects'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
