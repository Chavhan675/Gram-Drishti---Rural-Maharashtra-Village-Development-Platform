import React from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { X, CheckCircle, FileCheck, Phone, ExternalLink, ShieldCheck, HelpCircle } from 'lucide-react';

export const SchemeDetailModal: React.FC = () => {
  const { language, selectedSchemeModal, setSelectedSchemeModal } = useApp();
  const t = getTranslation(language);

  if (!selectedSchemeModal) return null;

  const scheme = selectedSchemeModal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-lg max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-start justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {language === 'mr' ? scheme.departmentMr : scheme.departmentEn}
              </span>
              {scheme.isCentrallySponsored && (
                <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  {language === 'mr' ? 'केंद्र पुरस्कृत' : 'Centrally Sponsored'}
                </span>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {language === 'mr' ? scheme.nameMr : scheme.nameEn}
            </h3>
          </div>
          <button
            onClick={() => setSelectedSchemeModal(null)}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Overview */}
          <div className="bg-amber-50/50 p-3.5 rounded border border-amber-200 text-slate-800 font-medium">
            {language === 'mr' ? scheme.shortDescMr : scheme.shortDescEn}
          </div>

          {/* Benefits */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2.5 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>{t.benefits}</span>
            </h4>
            <ul className="space-y-1.5 pl-1">
              {(language === 'mr' ? scheme.benefitsMr : scheme.benefitsEn).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-800">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Eligibility */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-slate-600" />
              <span>{t.eligibility}</span>
            </h4>
            <ul className="space-y-1.5 pl-1">
              {(language === 'mr' ? scheme.eligibilityMr : scheme.eligibilityEn).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-800">
                  <span className="text-slate-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Required Documents */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-slate-600" />
              <span>{t.requiredDocs}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(language === 'mr' ? scheme.documentsRequiredMr : scheme.documentsRequiredEn).map((doc, idx) => (
                <div key={idx} className="bg-slate-50 p-2.5 rounded border border-slate-200 text-xs text-slate-800 font-medium">
                  {doc}
                </div>
              ))}
            </div>
          </div>

          {/* Application Procedure */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-slate-600" />
              <span>{t.applyProcess}</span>
            </h4>
            <p className="text-slate-800 bg-slate-50 p-3 rounded border border-slate-200 leading-relaxed text-xs sm:text-sm">
              {language === 'mr' ? scheme.applicationProcessMr : scheme.applicationProcessEn}
            </p>
          </div>

          {/* Helpline & Source Verification */}
          <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-600" />
              <span>
                <strong className="text-slate-800">{t.helpline}:</strong> {scheme.helpline}
              </span>
            </div>
            <div>
              <span>
                {t.lastUpdated}: {scheme.lastVerifiedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <a
            href={scheme.officialPortalUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-amber-700 transition-colors"
          >
            <span>{t.officialPortal}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => setSelectedSchemeModal(null)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
