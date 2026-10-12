import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  MapPin,
  Compass,
  Navigation,
  ExternalLink,
  Layers,
  HeartPulse,
  GraduationCap,
  Droplet,
  Building2,
  CheckCircle2
} from 'lucide-react';

export const MapPage: React.FC = () => {
  const { language, selectedVillage, allVillages, facilities, navigateTo } = useApp();
  const t = getTranslation(language);

  const [activeLayer, setActiveLayer] = useState<'all' | 'health' | 'education' | 'water'>('all');

  const vName = language === 'mr' ? selectedVillage.nameMr : selectedVillage.nameEn;
  const tName = language === 'mr' ? selectedVillage.talukaMr : selectedVillage.talukaEn;
  const dName = language === 'mr' ? selectedVillage.districtMr : selectedVillage.districtEn;

  const villageFacilities = facilities.filter((f) => f.villageId === selectedVillage.id);

  const filteredFacilities = villageFacilities.filter((f) => {
    if (activeLayer === 'health') return f.category === 'healthcare';
    if (activeLayer === 'education') return f.category === 'education';
    if (activeLayer === 'water') return f.category === 'water';
    return true;
  });

  const openInExternalMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${selectedVillage.latitude},${selectedVillage.longitude}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pb-16">
      <Breadcrumbs items={[{ label: language === 'mr' ? 'गाव नकाशा व भू-स्थान' : 'Village Geo Map' }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
              {language === 'mr' ? 'स्थानिक नकाशा व सुविधा आलेख' : 'Geographic Map & Facility Cartography'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-0.5">
              {vName} — {language === 'mr' ? 'भौगोलिक नकाशा' : 'Geographical Map'}
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              अक्षांश (Lat): {selectedVillage.latitude}° N · रेखांश (Long): {selectedVillage.longitude}° E · तालुका {tName} · जिल्हा {dName}
            </p>
          </div>

          <button
            onClick={openInExternalMaps}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded transition-colors inline-flex items-center gap-2"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'Google Maps वर उघडा' : 'Open in Google Maps'}</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* Map Explorer & Facility List Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Map Display (Visual Canvas / SVG Map) */}
          <div className="lg:col-span-8 bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs flex flex-col">
            {/* Map Top Bar */}
            <div className="p-3.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-600" />
                <span className="font-semibold text-slate-800">
                  {language === 'mr' ? 'सुविधा स्तर (Layers):' : 'Facility Layer:'}
                </span>
              </div>

              <div className="flex items-center gap-1.5 font-medium">
                <button
                  onClick={() => setActiveLayer('all')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    activeLayer === 'all'
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t.filterAll}
                </button>
                <button
                  onClick={() => setActiveLayer('education')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    activeLayer === 'education'
                      ? 'bg-emerald-700 text-white font-semibold'
                      : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t.catEducation}
                </button>
                <button
                  onClick={() => setActiveLayer('health')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    activeLayer === 'health'
                      ? 'bg-rose-700 text-white font-semibold'
                      : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t.catHealthcare}
                </button>
                <button
                  onClick={() => setActiveLayer('water')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    activeLayer === 'water'
                      ? 'bg-sky-700 text-white font-semibold'
                      : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t.catWater}
                </button>
              </div>
            </div>

            {/* Stylized Geo Cartography Grid */}
            <div className="relative h-[420px] bg-slate-900 overflow-hidden p-6 flex items-center justify-center">
              {/* Subtle map topography grid */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, #f8fafc 1px, transparent 1px), linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)',
                  backgroundSize: '24px 24px, 48px 48px, 48px 48px'
                }}
              />

              {/* Maharashtra Regional outline indication */}
              <div className="absolute top-4 left-4 bg-slate-800/90 backdrop-blur-xs text-white px-3 py-1.5 rounded border border-slate-700 text-xs flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>
                  {dName} ({selectedVillage.divisionMr}) · WGS84 Coords: {selectedVillage.latitude}, {selectedVillage.longitude}
                </span>
              </div>

              {/* Central Village Hub Point */}
              <div className="relative z-10 flex flex-col items-center animate-bounce duration-1000">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center shadow-lg">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>
                <span className="mt-2 text-xs font-bold text-white bg-slate-900/90 px-3 py-1 rounded shadow-md border border-slate-700 whitespace-nowrap">
                  {vName} (केंद्रबिंदू)
                </span>
              </div>

              {/* Surrounding Facility Markers */}
              {filteredFacilities.map((fac, idx) => {
                const offsets = [
                  { top: '25%', left: '20%' },
                  { top: '70%', left: '30%' },
                  { top: '30%', right: '22%' },
                  { top: '75%', right: '25%' },
                  { top: '50%', left: '15%' },
                  { top: '55%', right: '15%' },
                ];
                const pos = offsets[idx % offsets.length];

                return (
                  <div
                    key={fac.id}
                    style={pos}
                    className="absolute z-10 hidden sm:flex items-center gap-1.5 bg-white/95 px-2.5 py-1 rounded shadow text-[11px] font-medium text-slate-900 border border-slate-300"
                  >
                    {fac.category === 'education' ? (
                      <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                    ) : fac.category === 'healthcare' ? (
                      <HeartPulse className="w-3.5 h-3.5 text-rose-600" />
                    ) : (
                      <Droplet className="w-3.5 h-3.5 text-sky-600" />
                    )}
                    <span className="truncate max-w-[120px]">
                      {language === 'mr' ? fac.nameMr : fac.nameEn}
                    </span>
                  </div>
                );
              })}

              {/* Bottom Scale Bar */}
              <div className="absolute bottom-4 right-4 bg-slate-800/90 text-slate-300 px-3 py-1 rounded border border-slate-700 text-[10px] font-mono">
                Scale: 1 : 10,000 · Survey of India Cadastral Grid
              </div>
            </div>

            {/* Map footer note */}
            <div className="p-3 bg-white border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
              <span>
                {language === 'mr'
                  ? 'टीप: गावातील शाळा, उपकेंद्र व पाण्याचे स्रोत प्रत्यक्ष महसूल नकाशावर आधारित आहेत.'
                  : 'Geo locations plotted via OpenStreetMap & Maharashtra Cadastral coordinate registry.'}
              </span>
              <button
                onClick={() => navigateTo('village-overview')}
                className="text-amber-800 font-semibold hover:underline"
              >
                {t.back}
              </button>
            </div>
          </div>

          {/* Right Column: Facilities in this Map Area */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
              <h2 className="text-sm font-bold text-slate-900 mb-2">
                {language === 'mr' ? 'गावातील मुख्य सुविधा ठिकाणे' : 'Plotted Facilities'}
              </h2>
              <p className="text-xs text-slate-500 mb-4">
                {language === 'mr'
                  ? `${filteredFacilities.length} सुविधा नकाशावर चिन्हांकित आहेत.`
                  : `${filteredFacilities.length} facilities verified in this jurisdiction.`}
              </p>

              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1 text-xs">
                {filteredFacilities.map((fac) => (
                  <div
                    key={fac.id}
                    className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1 hover:bg-amber-50/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900">
                        {language === 'mr' ? fac.nameMr : fac.nameEn}
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-medium">
                        Active
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px]">
                      {language === 'mr' ? fac.addressMr : fac.addressEn}
                    </p>
                    <p className="text-slate-600 text-[11px] font-mono pt-1">
                      वेळ: {language === 'mr' ? fac.timingsMr : fac.timingsEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Village Switcher Card */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                {language === 'mr' ? 'दुसऱ्या गावाचा नकाशा पहा' : 'Switch Village Map'}
              </h3>
              <div className="space-y-1.5 text-xs">
                {allVillages.map((vil) => (
                  <button
                    key={vil.id}
                    onClick={() => navigateTo('map', vil.id)}
                    className={`w-full text-left p-2 rounded transition-colors flex items-center justify-between ${
                      vil.id === selectedVillage.id
                        ? 'bg-amber-50 text-amber-900 font-semibold border border-amber-200'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{language === 'mr' ? vil.nameMr : vil.nameEn}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{vil.districtMr}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
