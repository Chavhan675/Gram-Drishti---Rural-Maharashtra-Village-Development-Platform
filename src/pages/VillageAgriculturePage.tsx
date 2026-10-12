import React from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  Wheat,
  Droplet,
  Store,
  MapPin,
  TrendingUp,
  Sprout,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const VillageAgriculturePage: React.FC = () => {
  const { language, selectedVillage, navigateTo } = useApp();
  const t = getTranslation(language);

  const vName = language === 'mr' ? selectedVillage.nameMr : selectedVillage.nameEn;
  const tName = language === 'mr' ? selectedVillage.talukaMr : selectedVillage.talukaEn;
  const dName = language === 'mr' ? selectedVillage.districtMr : selectedVillage.districtEn;

  const agri = selectedVillage.agriculture;

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-16">
      <Breadcrumbs
        items={[
          { label: dName },
          { label: tName },
          { label: vName, page: 'village-overview' },
          { label: t.cardAgricultureTitle }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="border-b border-amber-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-orange-700 uppercase tracking-wider font-mono">
                {language === 'mr' ? '🌾 शेती व स्थानिक अर्थव्यवस्था' : '🌾 Agriculture & Rural Agronomy'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight font-serif mt-0.5">
              {vName} — {t.agricultureTitle}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {language === 'mr'
                ? 'प्रमुख पिके, काळी-कसदार मृदा, जलसिंचन सुविधा व बाजार समिती विषयक शेतकरी मार्गदर्शन.'
                : 'Crop agronomy, soil characterization, irrigation metrics, and APMC market access.'}
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

        {/* Key Indicators Row with Golden Harvest & Emerald Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-gradient-to-b from-emerald-50/80 to-white p-4.5 rounded-2xl border border-emerald-200 shadow-2xs">
            <span className="text-xs text-emerald-900 font-bold block uppercase font-mono">{t.irrigationCoverage}</span>
            <span className="text-3xl font-black text-emerald-950 font-mono mt-1 block">
              {agri.irrigatedAreaPercent}%
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
              {language === 'mr' ? 'ओलिताखालील क्षेत्र' : 'Of cultivable area'}
            </span>
          </div>

          <div className="bg-gradient-to-b from-blue-50/80 to-white p-4.5 rounded-2xl border border-blue-200 shadow-2xs">
            <span className="text-xs text-blue-900 font-bold block uppercase font-mono">
              {language === 'mr' ? 'ठिबक सिंचन प्रमाण' : 'Drip Irrigation'}
            </span>
            <span className="text-3xl font-black text-blue-950 font-mono mt-1 block">
              {agri.dripIrrigationCoveragePercent}%
            </span>
            <span className="text-[11px] text-blue-700 font-semibold mt-1 block">
              {language === 'mr' ? 'सूक्ष्म सिंचन वापर' : 'Micro-irrigation coverage'}
            </span>
          </div>

          <div className="bg-gradient-to-b from-amber-50/80 to-white p-4.5 rounded-2xl border border-amber-200 shadow-2xs">
            <span className="text-xs text-amber-900 font-bold block uppercase font-mono">
              {language === 'mr' ? 'शेततळी संख्या' : 'Farm Ponds'}
            </span>
            <span className="text-3xl font-black text-stone-900 font-mono mt-1 block">
              {agri.farmPondsCount}
            </span>
            <span className="text-[11px] text-amber-800 font-semibold mt-1 block">
              {language === 'mr' ? 'मागेल त्याला शेततळे' : 'Completed farm ponds'}
            </span>
          </div>

          <div className="bg-gradient-to-b from-orange-50/80 to-white p-4.5 rounded-2xl border border-orange-200 shadow-2xs">
            <span className="text-xs text-orange-900 font-bold block uppercase font-mono">
              {language === 'mr' ? 'कृषी सेवा केंद्र' : 'Agri Depots'}
            </span>
            <span className="text-3xl font-black text-stone-900 font-mono mt-1 block">
              {agri.krishiSevaKendraCount}
            </span>
            <span className="text-[11px] text-orange-800 font-semibold mt-1 block">
              {language === 'mr' ? 'गावातील खत-बियाणे केंद्रे' : 'Input centers in village'}
            </span>
          </div>
        </div>

        {/* Crops & Agronomy Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Major Crops */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-amber-200 shadow-sm space-y-4 relative overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-orange-500 to-emerald-500 rounded-t-2xl -mt-6 -mx-6 sm:-mt-7 sm:-mx-7 mb-4" />

            <div className="flex items-center gap-2 border-b border-amber-100 pb-3">
              <Wheat className="w-5 h-5 text-amber-600" />
              <h2 className="text-base font-bold text-stone-950 font-serif">{t.majorCrops}</h2>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-1">
              {(language === 'mr' ? agri.majorCropsMr : agri.majorCropsEn).map((crop, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 text-orange-950 border border-amber-300 rounded-xl text-xs font-bold shadow-2xs"
                >
                  🌾 {crop}
                </span>
              ))}
            </div>

            <div className="pt-3 border-t border-amber-100 space-y-2 text-xs">
              <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-200">
                <span className="text-stone-500 block font-mono text-[10px] uppercase font-bold">{t.soilType}:</span>
                <span className="text-stone-900 font-bold text-sm">
                  {language === 'mr' ? agri.soilTypeMr : agri.soilTypeEn}
                </span>
              </div>
            </div>
          </div>

          {/* Water & Market Access */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-amber-200 shadow-sm space-y-4 relative overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 rounded-t-2xl -mt-6 -mx-6 sm:-mt-7 sm:-mx-7 mb-4" />

            <div className="flex items-center gap-2 border-b border-amber-100 pb-3">
              <Droplet className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-stone-950 font-serif">{t.waterSources}</h2>
            </div>

            <div className="space-y-3.5 text-xs text-stone-700">
              <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-200">
                <span className="text-stone-500 block font-mono text-[10px] uppercase font-bold">
                  {language === 'mr' ? 'सिंचन स्रोत' : 'Irrigation Reservoir / River Link'}:
                </span>
                <span className="text-stone-900 font-bold text-sm">
                  {language === 'mr' ? agri.waterSourceMr : agri.waterSourceEn}
                </span>
              </div>

              <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-200">
                <span className="text-stone-500 block font-mono text-[10px] uppercase font-bold">{t.nearestApmc}:</span>
                <span className="text-stone-900 font-bold text-sm">
                  {language === 'mr' ? agri.nearestApmcMr : agri.nearestApmcEn}
                </span>
                <span className="text-[11px] text-emerald-800 font-semibold block mt-0.5">
                  {language === 'mr'
                    ? `अंतर: सुमारे ${agri.apmcDistanceKm} किमी`
                    : `Approx. distance: ${agri.apmcDistanceKm} km`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Farmer Assistance CTA with Maharashtra Emerald & Gold */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-orange-950 text-white p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-5 border border-emerald-500/30 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400" />

          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-xs font-mono uppercase text-amber-300 font-bold tracking-wider">
              🚩 {language === 'mr' ? 'शेतकरी साहाय्य' : 'Farmer Welfare'}
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
              {language === 'mr'
                ? 'शेतकऱ्यांसाठी शासकीय अनुदान व कृषी योजना'
                : 'Subsidies & Welfare Schemes for Farmers'}
            </h3>
            <p className="text-xs text-emerald-200/90 max-w-xl">
              {language === 'mr'
                ? 'नमो शेतकरी महासन्मान निधी, मागेल त्याला शेततळे, ठिबक अनुदान व महाडीबीटी अनुदानाचे नियम तपासा.'
                : 'Explore eligibility, documents, and application steps for farm subsidies.'}
            </p>
          </div>
          <button
            onClick={() => navigateTo('schemes')}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-stone-950 font-bold text-xs rounded-xl transition-all whitespace-nowrap shadow-md"
          >
            {language === 'mr' ? 'कृषी योजना पहा →' : 'View Farm Schemes →'}
          </button>
        </div>
      </div>
    </div>
  );
};
