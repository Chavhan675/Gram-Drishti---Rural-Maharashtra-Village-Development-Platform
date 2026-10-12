import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  MapPin,
  Building2,
  Calendar,
  Phone,
  UserCheck
} from 'lucide-react';
import { IssueReport } from '../types';

export const TrackIssuePage: React.FC = () => {
  const { language, issues } = useApp();
  const t = getTranslation(language);

  const [inputTrackingId, setInputTrackingId] = useState('');
  const [activeIssue, setActiveIssue] = useState<IssueReport | null>(issues[0] || null);
  const [searchError, setSearchError] = useState('');

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputTrackingId.trim();
    if (!query) return;

    const found = issues.find(
      (iss) => iss.id.toLowerCase() === query.toLowerCase()
    );

    if (found) {
      setActiveIssue(found);
      setSearchError('');
    } else {
      setSearchError(
        language === 'mr'
          ? `तक्रार क्र. ${query} सापडला नाही. कृपया योग्य क्रमांक प्रविष्ट करा.`
          : `Grievance ID ${query} not found. Please verify the code.`
      );
    }
  };

  const getStepStatus = (currentStatus: string, stepName: string) => {
    const order = ['submitted', 'under-review', 'in-progress', 'resolved'];
    const currentIndex = order.indexOf(currentStatus);
    const stepIndex = order.indexOf(stepName);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  const steps = [
    { id: 'submitted', labelMr: 'तक्रार नोंदणी', labelEn: 'Submitted' },
    { id: 'under-review', labelMr: 'प्रशासकीय पाहणी', labelEn: 'Under Review' },
    { id: 'in-progress', labelMr: 'दुरुस्ती / काम सुरू', labelEn: 'In Progress' },
    { id: 'resolved', labelMr: 'समस्या निवारण', labelEn: 'Resolved' }
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-16">
      <Breadcrumbs items={[{ label: t.trackIssueTitle }]} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="border-b border-amber-200 pb-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-orange-700 uppercase tracking-wider font-mono">
              {language === 'mr' ? '🚩 तक्रार स्थिती व पाठपुरावा' : '🚩 Grievance Status Tracking'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight font-serif mt-0.5">
            {t.trackIssueTitle}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            {language === 'mr'
              ? 'आपला तक्रार क्रमांक प्रविष्ट करून संबंधित विभागाची शेरे नोंद व सद्यस्थिती तपासा.'
              : 'Enter your tracking reference number to inspect assigned department actions, field officer remarks, and physical resolution.'}
          </p>
        </div>

        {/* Tracking Input Bar with Festive Trim */}
        <form onSubmit={handleSearch} className="bg-white p-5 sm:p-6 rounded-2xl border border-amber-200 shadow-sm relative overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-orange-600 via-amber-400 to-emerald-600 rounded-t-2xl -mt-5 -mx-5 sm:-mt-6 sm:-mx-6 mb-4" />

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={inputTrackingId}
                onChange={(e) => setInputTrackingId(e.target.value)}
                placeholder={t.placeholderTrackingId}
                className="w-full pl-11 pr-3 py-3 bg-amber-50/50 border border-amber-300 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono uppercase font-bold placeholder:font-sans placeholder:font-normal placeholder:text-stone-400"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm"
            >
              {t.btnSearchIssue}
            </button>
          </div>

          {searchError && (
            <p className="text-xs text-rose-600 mt-2 font-semibold">{searchError}</p>
          )}

          {/* Quick Demo links */}
          <div className="mt-3.5 pt-3 border-t border-amber-100 flex flex-wrap items-center gap-2 text-xs text-stone-600 font-mono">
            <span className="font-sans font-medium text-stone-700">{language === 'mr' ? 'नमुना क्रमांक निवडा:' : 'Quick samples:'}</span>
            {issues.slice(0, 3).map((iss) => (
              <button
                type="button"
                key={iss.id}
                onClick={() => {
                  setInputTrackingId(iss.id);
                  setActiveIssue(iss);
                  setSearchError('');
                }}
                className="text-orange-950 hover:underline font-mono bg-amber-100/80 px-2.5 py-1 rounded-lg border border-amber-300 font-bold transition-colors"
              >
                {iss.id}
              </button>
            ))}
          </div>
        </form>

        {/* Active Grievance Card */}
        {activeIssue && (
          <div className="bg-white rounded-2xl border border-amber-200 shadow-md overflow-hidden">
            {/* Top status band with Rich Maharashtra Saffron/Indigo */}
            <div className="p-6 bg-gradient-to-r from-stone-950 via-slate-900 to-orange-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/20">
              <div>
                <div className="flex items-center gap-2 mb-1.5 font-mono text-xs">
                  <span className="font-bold text-amber-300 bg-white/10 px-2.5 py-0.5 rounded border border-white/20">
                    ID: {activeIssue.id}
                  </span>
                  <span className="text-amber-100 font-sans font-semibold">
                    {language === 'mr' ? activeIssue.villageNameMr : activeIssue.villageNameEn}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
                  {language === 'mr' ? activeIssue.titleMr : activeIssue.titleEn}
                </h2>
              </div>

              <div className="shrink-0">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-400 to-orange-400 text-stone-950 shadow-sm">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {activeIssue.status === 'resolved'
                      ? t.statusResolved
                      : activeIssue.status === 'in-progress'
                      ? t.statusInProgress
                      : activeIssue.status === 'under-review'
                      ? t.statusUnderReview
                      : t.statusSubmitted}
                  </span>
                </span>
              </div>
            </div>

            {/* Stepper Timeline with Jewel Tones */}
            <div className="p-6 border-b border-amber-100 bg-amber-50/30">
              <h3 className="text-xs font-bold uppercase tracking-wider text-orange-950 font-mono mb-4">
                🚩 {language === 'mr' ? 'निवारण प्रगती टप्पे (Lifecycle Tracker)' : 'Grievance Progress Pipeline'}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {steps.map((step, idx) => {
                  const state = getStepStatus(activeIssue.status, step.id);
                  const isCompleted = state === 'completed';
                  const isCurrent = state === 'current';

                  return (
                    <div
                      key={step.id}
                      className={`p-3.5 rounded-xl border text-xs shadow-2xs ${
                        isCurrent
                          ? 'bg-amber-100/90 border-amber-400 text-amber-950 font-bold'
                          : isCompleted
                          ? 'bg-emerald-100/80 border-emerald-300 text-emerald-950 font-semibold'
                          : 'bg-white border-amber-200 text-stone-400'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                        ) : isCurrent ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-orange-600 shrink-0 animate-ping" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-stone-300 shrink-0" />
                        )}
                        <span className="text-[10px] uppercase font-mono tracking-wider font-bold">
                          टप्पा {idx + 1}
                        </span>
                      </div>
                      <span className="block font-medium">
                        {language === 'mr' ? step.labelMr : step.labelEn}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Metadata Grid */}
            <div className="p-6 space-y-5 text-xs sm:text-sm text-stone-700">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 font-mono mb-1.5">
                  {t.issueDescription}
                </h4>
                <p className="text-stone-800 leading-relaxed bg-amber-50/40 p-4 rounded-xl border border-amber-200 font-medium">
                  {activeIssue.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-amber-50/40 rounded-xl border border-amber-200 space-y-1">
                  <span className="text-xs text-stone-500 block font-mono font-bold uppercase">{t.landmark}</span>
                  <span className="text-stone-900 font-semibold flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>{activeIssue.landmark}</span>
                  </span>
                </div>

                <div className="p-4 bg-amber-50/40 rounded-xl border border-amber-200 space-y-1">
                  <span className="text-xs text-stone-500 block font-mono font-bold uppercase">
                    {language === 'mr' ? 'तक्रार दाखल दिनांक' : 'Lodged Date'}
                  </span>
                  <span className="text-stone-900 font-semibold flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{activeIssue.submittedAt}</span>
                  </span>
                </div>
              </div>

              {/* Assigned Department & Official Remarks */}
              <div className="p-5 bg-gradient-to-b from-amber-50/80 to-white rounded-xl border border-amber-300 space-y-3 text-xs sm:text-sm shadow-2xs">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-orange-700 shrink-0" />
                  <span className="font-bold text-orange-950">
                    {language === 'mr' ? 'नियुक्त विभाग:' : 'Assigned Department:'}{' '}
                    {language === 'mr' ? activeIssue.assignedDepartmentMr : activeIssue.assignedDepartmentEn}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-stone-600 font-bold block mb-1">
                    {t.officerRemarks}:
                  </span>
                  <p className="text-stone-800 bg-white p-3.5 rounded-lg border border-amber-200 leading-relaxed font-medium">
                    {activeIssue.assignedOfficerRemarks ||
                      (language === 'mr' ? 'सध्या तपासणी व क्षेत्रीय पाहणी सुरू आहे.' : 'Case under verification & field inspection.')}
                  </p>
                </div>

                <div className="pt-1 text-[11px] text-stone-500 text-right font-mono">
                  {t.lastUpdated}: {activeIssue.updatedAt}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
