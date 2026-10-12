import React from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { X, CheckCircle2, Clock, AlertCircle, Building2, Calendar, FileText, IndianRupee } from 'lucide-react';

export const ProjectDetailModal: React.FC = () => {
  const { language, selectedProjectModal, setSelectedProjectModal } = useApp();
  const t = getTranslation(language);

  if (!selectedProjectModal) return null;

  const project = selectedProjectModal;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {t.filterCompleted}
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
            <Clock className="w-3.5 h-3.5" />
            {t.filterInProgress}
          </span>
        );
      case 'planned':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
            <Calendar className="w-3.5 h-3.5" />
            {t.filterPlanned}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded border border-rose-200">
            <AlertCircle className="w-3.5 h-3.5" />
            {t.filterDelayed}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-lg max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-start justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {getStatusBadge(project.status)}
              <span className="text-xs text-slate-500 font-mono">ID: {project.id}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {language === 'mr' ? project.titleMr : project.titleEn}
            </h3>
          </div>
          <button
            onClick={() => setSelectedProjectModal(null)}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Progress bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>{t.progress}</span>
              <span className="font-mono">{project.progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
              <div
                className={`h-full transition-all ${
                  project.status === 'completed'
                    ? 'bg-emerald-600'
                    : project.progressPercent > 50
                    ? 'bg-amber-500'
                    : 'bg-sky-600'
                }`}
                style={{ width: `${project.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              {language === 'mr' ? 'प्रकल्पाचे तपशील' : 'Project Scope'}
            </h4>
            <p className="text-slate-800 leading-relaxed">
              {language === 'mr' ? project.descriptionMr : project.descriptionEn}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 bg-slate-50 p-4 rounded border border-slate-200">
            <div>
              <span className="text-xs text-slate-500 block">{t.budgetSanctioned}</span>
              <span className="text-base font-bold text-slate-900 font-mono flex items-center">
                <IndianRupee className="w-3.5 h-3.5 text-slate-500 mr-0.5" />
                {project.budgetLakhs} लाख (Lakh)
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">{t.expenditure}</span>
              <span className="text-base font-bold text-slate-900 font-mono flex items-center">
                <IndianRupee className="w-3.5 h-3.5 text-slate-500 mr-0.5" />
                {project.expenditureLakhs} लाख (Lakh)
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">
                {language === 'mr' ? 'कामाचा कालावधी' : 'Target Timeline'}
              </span>
              <span className="text-xs font-semibold text-slate-900 block mt-1">
                {project.startDate} — {project.targetDate}
              </span>
            </div>
          </div>

          {/* Institutional details list */}
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <div className="flex items-start gap-2.5">
              <Building2 className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
              <div>
                <span className="block text-xs text-slate-500 font-medium">
                  {language === 'mr' ? 'प्रशासकीय विभाग' : 'Governing Department'}
                </span>
                <span className="font-semibold text-slate-900">
                  {language === 'mr' ? project.departmentMr : project.departmentEn}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <FileText className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
              <div>
                <span className="block text-xs text-slate-500 font-medium">{t.sanctionOrder}</span>
                <span className="font-mono text-slate-800">{project.sanctionOrderNumber}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Building2 className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
              <div>
                <span className="block text-xs text-slate-500 font-medium">{t.contractorAgency}</span>
                <span className="text-slate-900">
                  {language === 'mr' ? project.contractorMr : project.contractorEn}
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-500 bg-amber-50/70 p-3 rounded border border-amber-200">
              <span className="font-semibold text-amber-900 block mb-0.5">
                {language === 'mr' ? 'माहिती पडताळणी स्रोत:' : 'Verification Source:'}
              </span>
              <span>{project.verifiedSource}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={() => setSelectedProjectModal(null)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
