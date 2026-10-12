import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  FileText,
  AlertCircle,
  Calendar,
  Building2,
  ExternalLink,
  Search,
  Bell
} from 'lucide-react';
import { MOCK_ANNOUNCEMENTS } from '../data/mockData';

export const AnnouncementsPage: React.FC = () => {
  const { language } = useApp();
  const t = getTranslation(language);

  const [filterUrgentOnly, setFilterUrgentOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = MOCK_ANNOUNCEMENTS.filter((ann) => {
    if (filterUrgentOnly && !ann.isUrgent) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        ann.titleMr.toLowerCase().includes(q) ||
        ann.titleEn.toLowerCase().includes(q) ||
        ann.departmentMr.toLowerCase().includes(q) ||
        ann.departmentEn.toLowerCase().includes(q) ||
        ann.summaryMr.toLowerCase().includes(q) ||
        ann.summaryEn.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAFAF8] pb-16">
      <Breadcrumbs items={[{ label: t.announcementsTitle }]} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="border-b border-slate-200 pb-5">
          <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
            {language === 'mr' ? 'ग्रामसभा व शासकीय परिपत्रके' : 'Official Gram Sabha & Departmental Circulars'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-0.5">
            {t.announcementsTitle}
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            {language === 'mr'
              ? 'ग्रामसभा बैठका, रेशन वाटप, पीक विमा आणि आरोग्य लसीकरण शिबिरांच्या अधिकृत सूचना.'
              : 'Official public notifications, Gram Sabha assemblies, vaccination camps, and agricultural advisories.'}
          </p>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterUrgentOnly(!filterUrgentOnly)}
              className={`px-3 py-1.5 rounded transition-colors inline-flex items-center gap-1.5 ${
                filterUrgentOnly
                  ? 'bg-rose-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'केवळ तातडीच्या सूचना' : 'Urgent Notices Only'}</span>
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'mr' ? 'सूचना शोधा...' : 'Search notices...'}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {filtered.map((ann) => {
            const title = language === 'mr' ? ann.titleMr : ann.titleEn;
            const dept = language === 'mr' ? ann.departmentMr : ann.departmentEn;
            const summary = language === 'mr' ? ann.summaryMr : ann.summaryEn;

            return (
              <div
                key={ann.id}
                className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {dept}
                      </span>
                      {ann.isUrgent && (
                        <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{t.urgentNotice}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {title}
                    </h3>
                  </div>

                  <span className="text-xs text-slate-500 shrink-0 font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{ann.date}</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded border border-slate-100">
                  {summary}
                </p>

                {ann.sourceUrl && (
                  <div className="pt-2 flex items-center justify-end">
                    <a
                      href={ann.sourceUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-xs font-semibold text-amber-800 hover:underline inline-flex items-center gap-1"
                    >
                      <span>{t.officialPortal}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
