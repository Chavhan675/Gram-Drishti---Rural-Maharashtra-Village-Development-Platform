import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  FolderOpen,
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  Phone,
  ArrowRight,
  Filter,
  Wheat,
  Users,
  GraduationCap,
  HeartPulse,
  Home
} from 'lucide-react';
import { SchemeCategory, GovernmentScheme } from '../types';

export const SchemesPage: React.FC = () => {
  const { language, schemes, setSelectedSchemeModal } = useApp();
  const t = getTranslation(language);

  const [activeCategory, setActiveCategory] = useState<'all' | SchemeCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-16">
      <Breadcrumbs items={[{ label: t.schemesTitle }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="border-b border-amber-200 pb-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-orange-700 uppercase tracking-wider font-mono">
              {language === 'mr' ? '📋 कल्याणकारी शासकीय योजना' : '📋 Welfare Schemes & DBT Subsidies'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight font-serif mt-0.5">
            {t.schemesTitle}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            {language === 'mr'
              ? 'महाराष्ट्रातील शेतकरी, महिला, विद्यार्थी व कुटुंबांसाठी उपयुक्त योजनांची पडताळलेली माहिती, पात्रता आणि अर्ज प्रक्रिया.'
              : 'Verified directory of Maharashtra and Central welfare schemes with eligibility rules, documents required, and official application portals.'}
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs font-bold'
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
              className="w-full pl-9 pr-3 py-2 bg-amber-50/50 border border-amber-300 rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
            />
          </div>
        </div>

        {/* Schemes Grid */}
        {filteredSchemes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-amber-200 p-12 text-center text-xs text-stone-500 shadow-sm">
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
                  className="bg-white rounded-2xl border border-amber-200 p-6 hover:border-orange-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-orange-950 bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-300 font-mono">
                        {dept}
                      </span>
                      {scheme.isCentrallySponsored && (
                        <span className="text-[10px] font-bold text-blue-900 bg-blue-100/90 px-2 py-0.5 rounded-full border border-blue-200 font-mono">
                          GoI / केंद्र
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-stone-900 group-hover:text-orange-900 transition-colors leading-snug font-serif">
                      {name}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                      {desc}
                    </p>

                    <div className="pt-2.5 border-t border-amber-100 space-y-1.5 text-xs text-stone-700 bg-amber-50/40 rounded-xl p-2.5">
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate font-medium text-emerald-950">
                          {language === 'mr' ? 'पात्रता व कागदपत्रे पडताळलेली' : 'Eligibility guidelines verified'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <Phone className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                        <span className="font-mono text-stone-800 font-semibold">{scheme.helpline}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-amber-100 flex items-center justify-between text-xs font-bold text-orange-800 group-hover:text-orange-950">
                    <span>{language === 'mr' ? 'पात्रता व अर्ज कसा करावा →' : 'View Eligibility & Process →'}</span>
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
