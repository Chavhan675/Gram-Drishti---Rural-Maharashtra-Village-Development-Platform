import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  Search,
  MapPin,
  ArrowRight,
  Filter,
  CheckCircle,
  Building,
  Users
} from 'lucide-react';
import {
  MAHARASHTRA_DIVISIONS,
  MAHARASHTRA_DISTRICTS,
  MAHARASHTRA_TALUKAS
} from '../data/mockData';

export const SearchPage: React.FC = () => {
  const { language, navigateTo, allVillages } = useApp();
  const t = getTranslation(language);

  const [textQuery, setTextQuery] = useState('');
  const [selectedDiv, setSelectedDiv] = useState('');
  const [selectedDist, setSelectedDist] = useState('');
  const [selectedTal, setSelectedTal] = useState('');

  const filteredDistricts = MAHARASHTRA_DISTRICTS.filter(
    (d) => !selectedDiv || d.divisionId === selectedDiv
  );
  const filteredTalukas = MAHARASHTRA_TALUKAS.filter(
    (tl) => !selectedDist || tl.districtId === selectedDist
  );

  // Filter villages by dropdowns AND text query (name, pincode, lgd)
  const results = allVillages.filter((v) => {
    if (selectedDist && !v.id.includes(selectedDist) && !v.districtMr.includes(selectedDist)) {
      // check district match
      const distObj = MAHARASHTRA_DISTRICTS.find((d) => d.id === selectedDist);
      if (distObj && !v.districtMr.includes(distObj.nameMr) && !v.districtEn.toLowerCase().includes(distObj.nameEn.toLowerCase())) {
        return false;
      }
    }

    if (textQuery.trim()) {
      const q = textQuery.trim().toLowerCase();
      const matchName =
        v.nameMr.toLowerCase().includes(q) ||
        v.nameEn.toLowerCase().includes(q) ||
        v.talukaMr.toLowerCase().includes(q) ||
        v.talukaEn.toLowerCase().includes(q) ||
        v.districtMr.toLowerCase().includes(q) ||
        v.districtEn.toLowerCase().includes(q) ||
        v.pincode.includes(q) ||
        v.lgdCode.includes(q);

      if (!matchName) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-16">
      <Breadcrumbs items={[{ label: t.ctaSearchVillage }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header Title with Maharashtra Accent */}
        <div className="border-b border-amber-200 pb-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-orange-700 uppercase tracking-wider font-mono">
              {language === 'mr' ? '🚩 गाव शोध व निर्देशिका' : '🚩 Village Directory Search'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight font-serif">
            {language === 'mr' ? 'महाराष्ट्रातील आपले गाव शोधा' : 'Discover Your Village in Maharashtra'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            {language === 'mr'
              ? 'गावाचे नाव, तालुका, जिल्हा, पिन कोड किंवा स्थानिक स्वराज्य संस्था (LGD) कोड प्रविष्ट करा.'
              : 'Search across 43,665+ villages by name, taluka, district, PIN code, or Local Government Directory (LGD) code.'}
          </p>
        </div>

        {/* Search & Filter Box with Festive Trim */}
        <div className="bg-white p-5 sm:p-7 rounded-2xl border border-amber-200 shadow-md space-y-5 relative overflow-hidden">
          {/* Top Maharashtra Tricolor Accent Line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-orange-600 via-amber-400 via-emerald-600 to-indigo-600 rounded-t-2xl -mt-5 -mx-5 sm:-mt-7 sm:-mx-7 mb-4" />

          {/* Main search bar */}
          <div className="relative">
            <Search className="w-5 h-5 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={textQuery}
              onChange={(e) => setTextQuery(e.target.value)}
              placeholder={t.heroSearchPlaceholder}
              className="w-full pl-11 pr-16 py-3.5 bg-amber-50/50 border border-amber-300 rounded-xl text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium placeholder:text-stone-400"
            />
            {textQuery && (
              <button
                onClick={() => setTextQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 px-2 py-0.5 text-xs text-stone-500 hover:text-stone-800 bg-amber-100 hover:bg-amber-200 rounded-md transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Cascading Filter Rows */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div>
              <label className="block text-xs font-bold text-orange-950 mb-1.5 font-mono">
                {t.selectDivision}
              </label>
              <select
                value={selectedDiv}
                onChange={(e) => {
                  setSelectedDiv(e.target.value);
                  setSelectedDist('');
                  setSelectedTal('');
                }}
                className="w-full p-2.5 bg-amber-50/60 border border-amber-300 rounded-xl text-xs text-stone-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">{language === 'mr' ? 'सर्व विभाग (All Divisions)' : 'All Divisions'}</option>
                {MAHARASHTRA_DIVISIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {language === 'mr' ? d.nameMr : d.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-orange-950 mb-1.5 font-mono">
                {t.selectDistrict}
              </label>
              <select
                value={selectedDist}
                onChange={(e) => {
                  setSelectedDist(e.target.value);
                  setSelectedTal('');
                }}
                className="w-full p-2.5 bg-amber-50/60 border border-amber-300 rounded-xl text-xs text-stone-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">{language === 'mr' ? 'सर्व जिल्हे (All Districts)' : 'All Districts'}</option>
                {filteredDistricts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {language === 'mr' ? d.nameMr : d.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-orange-950 mb-1.5 font-mono">
                {t.selectTaluka}
              </label>
              <select
                value={selectedTal}
                onChange={(e) => setSelectedTal(e.target.value)}
                className="w-full p-2.5 bg-amber-50/60 border border-amber-300 rounded-xl text-xs text-stone-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">{language === 'mr' ? 'सर्व तालुके (All Talukas)' : 'All Talukas'}</option>
                {filteredTalukas.map((tl) => (
                  <option key={tl.id} value={tl.id}>
                    {language === 'mr' ? tl.nameMr : tl.nameEn}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Search Results Summary */}
        <div className="flex items-center justify-between text-xs text-stone-600 px-1 font-mono">
          <span className="font-semibold text-stone-800">
            {language === 'mr'
              ? `🚩 एकूण आढळलेली गावे: ${results.length}`
              : `🚩 Villages identified: ${results.length}`}
          </span>
          <span className="text-orange-800 font-sans">
            {language === 'mr' ? 'गावावर क्लिक करून सविस्तर माहिती उघडा' : 'Click any village to explore full records'}
          </span>
        </div>

        {/* Results List or Empty State */}
        {results.length === 0 ? (
          <div className="bg-white rounded-2xl border border-amber-200 p-12 text-center space-y-3.5 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-orange-700 mx-auto flex items-center justify-center ring-4 ring-amber-50">
              <Filter className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 font-serif">
              {language === 'mr'
                ? 'आपल्या शोधाशी संबंधित गाव सापडले नाही.'
                : 'No villages matched your search.'}
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              {language === 'mr'
                ? 'कृपया गावाचे स्पेलिंग, तालुका किंवा जिल्हा तपासा. आपण इंग्रजी किंवा मराठी दोन्ही भाषेत शोधू शकता.'
                : 'Please check your spelling, taluka or district selection. You can search in Marathi or English.'}
            </p>
            <button
              onClick={() => {
                setTextQuery('');
                setSelectedDiv('');
                setSelectedDist('');
                setSelectedTal('');
              }}
              className="mt-2 px-5 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
            >
              {language === 'mr' ? 'सर्व फिल्टर्स रीसेट करा' : 'Reset All Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map((village) => {
              const vName = language === 'mr' ? village.nameMr : village.nameEn;
              const tName = language === 'mr' ? village.talukaMr : village.talukaEn;
              const dName = language === 'mr' ? village.districtMr : village.districtEn;

              return (
                <div
                  key={village.id}
                  className="bg-white rounded-2xl border border-amber-200 p-5 hover:border-orange-400 hover:shadow-lg transition-all flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Subtle decorative corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-orange-100/60 to-transparent rounded-bl-full pointer-events-none" />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span className="font-mono bg-amber-100 text-orange-950 px-2 py-0.5 rounded-md font-semibold border border-amber-200">
                        LGD: {village.lgdCode}
                      </span>
                      <span className="font-mono bg-emerald-100 text-emerald-950 px-2 py-0.5 rounded-md font-semibold border border-emerald-200">
                        PIN: {village.pincode}
                      </span>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-stone-900 group-hover:text-orange-900 transition-colors font-serif">
                        {vName}
                      </h2>
                      <p className="text-xs text-stone-600 mt-1 flex items-center gap-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                        <span>ता. {tName} · जि. {dName}</span>
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-amber-100 text-center text-xs bg-amber-50/40 rounded-xl px-2">
                      <div>
                        <span className="text-[10px] text-orange-800 block uppercase font-mono font-bold">{t.population}</span>
                        <span className="font-black text-stone-900 font-mono text-sm block mt-0.5">
                          {village.demographics.totalPopulation}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-amber-800 block uppercase font-mono font-bold">{t.households}</span>
                        <span className="font-black text-stone-900 font-mono text-sm block mt-0.5">
                          {village.demographics.households}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-emerald-800 block uppercase font-mono font-bold">{t.literacy}</span>
                        <span className="font-black text-stone-900 font-mono text-sm block mt-0.5">
                          {village.demographics.literacyRate}%
                        </span>
                      </div>
                    </div>

                    <div className="text-[11px] text-stone-600 pt-0.5">
                      <span className="font-semibold text-stone-800">
                        {language === 'mr' ? 'ग्रामपंचायत:' : 'Gram Panchayat:'}
                      </span>{' '}
                      {language === 'mr' ? village.administration.gramPanchayatNameMr : village.administration.gramPanchayatNameEn}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-amber-100">
                    <button
                      onClick={() => navigateTo('village-overview', village.id)}
                      className="w-full py-2.5 px-4 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm group-hover:shadow-md"
                    >
                      <span>{t.btnViewVillage}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
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
