import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  Building,
  CheckCircle2,
  Clock,
  Calendar,
  AlertCircle,
  Search,
  IndianRupee,
  FileText,
  ArrowRight,
  Filter
} from 'lucide-react';
import { ProjectStatus, DevelopmentProject } from '../types';

export const VillageDevelopmentPage: React.FC = () => {
  const {
    language,
    selectedVillage,
    projects,
    setSelectedProjectModal,
    navigateTo
  } = useApp();

  const t = getTranslation(language);

  const [activeFilter, setActiveFilter] = useState<'all' | ProjectStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const vName = language === 'mr' ? selectedVillage.nameMr : selectedVillage.nameEn;
  const tName = language === 'mr' ? selectedVillage.talukaMr : selectedVillage.talukaEn;
  const dName = language === 'mr' ? selectedVillage.districtMr : selectedVillage.districtEn;

  // Filter projects by current village
  const villageProjects = projects.filter((p) => p.villageId === selectedVillage.id);

  // Compute metrics
  const totalCount = villageProjects.length;
  const completedCount = villageProjects.filter((p) => p.status === 'completed').length;
  const inProgressCount = villageProjects.filter((p) => p.status === 'in-progress').length;
  const plannedCount = villageProjects.filter((p) => p.status === 'planned').length;

  const totalBudget = villageProjects.reduce((sum, p) => sum + p.budgetLakhs, 0).toFixed(1);
  const totalExp = villageProjects.reduce((sum, p) => sum + p.expenditureLakhs, 0).toFixed(1);

  // Filtered by active tab and search
  const filteredProjects = villageProjects.filter((p) => {
    if (activeFilter !== 'all' && p.status !== activeFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText =
        p.titleMr.toLowerCase().includes(q) ||
        p.titleEn.toLowerCase().includes(q) ||
        p.departmentMr.toLowerCase().includes(q) ||
        p.departmentEn.toLowerCase().includes(q) ||
        p.sanctionOrderNumber.toLowerCase().includes(q);
      if (!matchText) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-16">
      <Breadcrumbs
        items={[
          { label: dName },
          { label: tName },
          { label: vName, page: 'village-overview' },
          { label: t.cardDevelopmentTitle }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page Header */}
        <div className="border-b border-amber-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-orange-700 uppercase tracking-wider font-mono">
                {language === 'mr' ? '🚩 ग्राम विकास प्रकल्प व कामे' : '🚩 Civil Works & Public Infrastructure'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight font-serif mt-0.5">
              {vName} — {t.developmentTitle}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {language === 'mr'
                ? 'गावात मंजूर झालेले रस्ते, पाणी, शिक्षण व स्वच्छता प्रकल्प आणि त्यांचा प्रत्यक्ष प्रगती अहवाल.'
                : 'Sanctioned civil works, public tenders, expenditure audits, and physical progress records.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('village-overview')}
              className="px-4 py-2 bg-white hover:bg-amber-50 border border-amber-300 text-stone-800 text-xs font-bold rounded-xl transition-all shadow-2xs hover:shadow"
            >
              {t.back}
            </button>
          </div>
        </div>

        {/* Financial & Status Summary Cards with Authentic Maharashtra Jewel Tones */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-gradient-to-b from-orange-50/80 to-white p-4.5 rounded-2xl border border-orange-200 shadow-2xs">
            <span className="text-xs text-orange-900 font-bold block uppercase font-mono">
              {language === 'mr' ? 'एकूण विकासकामे' : 'Total Works'}
            </span>
            <span className="text-3xl font-black text-stone-900 font-mono mt-1 block">
              {totalCount}
            </span>
            <span className="text-[11px] text-orange-800 font-semibold mt-1 block">
              मंजूर निधी: ₹{totalBudget} लाख
            </span>
          </div>

          <div className="bg-gradient-to-b from-emerald-50/80 to-white p-4.5 rounded-2xl border border-emerald-200 shadow-2xs">
            <span className="text-xs text-emerald-900 font-bold block flex items-center gap-1 font-mono uppercase">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.filterCompleted}</span>
            </span>
            <span className="text-3xl font-black text-emerald-900 font-mono mt-1 block">
              {completedCount}
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
              १००% काम पूर्ण
            </span>
          </div>

          <div className="bg-gradient-to-b from-amber-50/80 to-white p-4.5 rounded-2xl border border-amber-200 shadow-2xs">
            <span className="text-xs text-amber-900 font-bold block flex items-center gap-1 font-mono uppercase">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.filterInProgress}</span>
            </span>
            <span className="text-3xl font-black text-amber-900 font-mono mt-1 block">
              {inProgressCount}
            </span>
            <span className="text-[11px] text-amber-800 font-semibold mt-1 block">
              प्रत्यक्ष काम सुरू
            </span>
          </div>

          <div className="bg-gradient-to-b from-blue-50/80 to-white p-4.5 rounded-2xl border border-blue-200 shadow-2xs">
            <span className="text-xs text-blue-900 font-bold block flex items-center gap-1 font-mono uppercase">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.filterPlanned}</span>
            </span>
            <span className="text-3xl font-black text-blue-900 font-mono mt-1 block">
              {plannedCount}
            </span>
            <span className="text-[11px] text-blue-800 font-semibold mt-1 block">
              निविदा / मान्यता
            </span>
          </div>
        </div>

        {/* Filter and Search Bar with Festive Accent */}
        <div className="bg-white p-4 rounded-2xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          {/* Status Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs font-semibold">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs font-bold'
                  : 'text-stone-700 hover:bg-amber-50'
              }`}
            >
              {t.filterAll} ({totalCount})
            </button>
            <button
              onClick={() => setActiveFilter('in-progress')}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                activeFilter === 'in-progress'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                  : 'text-stone-700 hover:bg-amber-50'
              }`}
            >
              {t.filterInProgress} ({inProgressCount})
            </button>
            <button
              onClick={() => setActiveFilter('completed')}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                activeFilter === 'completed'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-stone-700 hover:bg-amber-50'
              }`}
            >
              {t.filterCompleted} ({completedCount})
            </button>
            <button
              onClick={() => setActiveFilter('planned')}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                activeFilter === 'planned'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-stone-700 hover:bg-amber-50'
              }`}
            >
              {t.filterPlanned} ({plannedCount})
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-amber-600 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'mr' ? 'कामाचे नाव किंवा विभाग शोधा...' : 'Search project or dept...'}
              className="w-full pl-9 pr-3 py-2 bg-amber-50/50 border border-amber-300 rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
            />
          </div>
        </div>

        {/* Projects List with Colorful Borders */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-2xl border border-amber-200 p-12 text-center text-xs text-stone-500">
            {language === 'mr'
              ? 'या फिल्टरमध्ये कोणतेही विकासकाम आढळले नाही.'
              : 'No development projects match the selected filter.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredProjects.map((project) => {
              const pTitle = language === 'mr' ? project.titleMr : project.titleEn;
              const pDept = language === 'mr' ? project.departmentMr : project.departmentEn;
              const pAgency = language === 'mr' ? project.contractorMr : project.contractorEn;

              return (
                <div
                  key={project.id}
                  onClick={() => setSelectedProjectModal(project)}
                  className="bg-white rounded-2xl border border-amber-200 p-6 hover:border-orange-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-semibold bg-amber-50 text-orange-950 px-2 py-0.5 rounded-md border border-amber-200">
                        {project.sanctionOrderNumber}
                      </span>
                      {project.status === 'completed' ? (
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                          <span>{t.filterCompleted}</span>
                        </span>
                      ) : project.status === 'in-progress' ? (
                        <span className="text-[11px] font-bold text-amber-900 bg-amber-100/90 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-amber-300">
                          <Clock className="w-3.5 h-3.5 text-amber-700" />
                          <span>{t.filterInProgress}</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-blue-900 bg-blue-100/90 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-blue-300">
                          <Calendar className="w-3.5 h-3.5 text-blue-700" />
                          <span>{t.filterPlanned}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-stone-900 group-hover:text-orange-900 transition-colors leading-snug font-serif">
                      {pTitle}
                    </h3>

                    <p className="text-xs text-stone-600 font-medium">
                      {pDept}
                    </p>

                    {/* Progress Bar with vibrant fill */}
                    <div>
                      <div className="flex items-center justify-between text-xs text-stone-600 mb-1 font-mono">
                        <span className="font-semibold text-stone-800">{t.progress}</span>
                        <span className="font-bold text-orange-950">{project.progressPercent}%</span>
                      </div>
                      <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden border border-amber-200">
                        <div
                          className={`h-full transition-all rounded-full ${
                            project.status === 'completed'
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-600'
                              : project.progressPercent > 50
                              ? 'bg-gradient-to-r from-orange-500 to-amber-500'
                              : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                          }`}
                          style={{ width: `${project.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Quick Cost and Timeline */}
                    <div className="grid grid-cols-2 gap-2 pt-2.5 text-xs border-t border-amber-100 bg-amber-50/40 rounded-xl p-2.5">
                      <div>
                        <span className="text-stone-500 text-[10px] block font-mono uppercase">{t.budgetSanctioned}</span>
                        <span className="font-black text-stone-900 font-mono text-sm">
                          ₹{project.budgetLakhs} लाख
                        </span>
                      </div>
                      <div>
                        <span className="text-stone-500 text-[10px] block font-mono uppercase">
                          {language === 'mr' ? 'लक्ष्य तारीख' : 'Target Date'}
                        </span>
                        <span className="text-stone-800 font-semibold text-xs font-mono">
                          {project.targetDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-xs font-bold text-orange-800 group-hover:text-orange-950">
                    <span>{language === 'mr' ? 'सविस्तर आदेश व निधी तपशील पहा' : 'View Sanction Order & Details'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
