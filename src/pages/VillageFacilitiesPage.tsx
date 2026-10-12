import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  HeartPulse,
  GraduationCap,
  Building2,
  Droplet,
  Wheat,
  Landmark,
  Phone,
  Clock,
  MapPin,
  CheckCircle2,
  Zap,
  Wifi,
  Filter
} from 'lucide-react';
import { FacilityCategory } from '../types';

export const VillageFacilitiesPage: React.FC = () => {
  const { language, selectedVillage, facilities, navigateTo } = useApp();
  const t = getTranslation(language);

  const [categoryFilter, setCategoryFilter] = useState<'all' | FacilityCategory>('all');

  const vName = language === 'mr' ? selectedVillage.nameMr : selectedVillage.nameEn;
  const tName = language === 'mr' ? selectedVillage.talukaMr : selectedVillage.talukaEn;
  const dName = language === 'mr' ? selectedVillage.districtMr : selectedVillage.districtEn;

  // Filter facilities belonging to this village
  const villageFacilities = facilities.filter((f) => f.villageId === selectedVillage.id);

  const filteredFacilities = villageFacilities.filter((f) => {
    if (categoryFilter !== 'all' && f.category !== categoryFilter) {
      return false;
    }
    return true;
  });

  const categories: { id: 'all' | FacilityCategory; label: string }[] = [
    { id: 'all', label: t.filterAll },
    { id: 'education', label: t.catEducation },
    { id: 'healthcare', label: t.catHealthcare },
    { id: 'civic', label: t.catPanchayat },
    { id: 'water', label: t.catWater },
    { id: 'agriculture', label: t.catAgriculture },
    { id: 'banking', label: t.catBanking }
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-16">
      <Breadcrumbs
        items={[
          { label: dName },
          { label: tName },
          { label: vName, page: 'village-overview' },
          { label: t.cardFacilitiesTitle }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="border-b border-amber-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-orange-700 uppercase tracking-wider font-mono">
                {language === 'mr' ? '🚩 सार्वजनिक सुविधा निर्देशिका' : '🚩 Public Infrastructure Directory'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight font-serif mt-0.5">
              {vName} — {t.facilitiesTitle}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {language === 'mr'
                ? 'शाळा, प्राथमिक आरोग्य केंद्र, पिण्याचे पाणी, बँक मित्र व ग्रामपंचायत कार्यालयाची पडताळणी केलेली माहिती.'
                : 'Verified inventory of primary schools, health posts, clean drinking water, banking kiosk, and civic services.'}
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

        {/* Category Filters with Vibrant Buttons */}
        <div className="bg-white p-3.5 rounded-2xl border border-amber-200 flex items-center gap-2 overflow-x-auto text-xs font-bold shadow-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                categoryFilter === cat.id
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs font-bold'
                  : 'text-stone-700 hover:bg-amber-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Facilities Grid with Festive Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredFacilities.map((facility) => {
            const fName = language === 'mr' ? facility.nameMr : facility.nameEn;
            const fType = language === 'mr' ? facility.typeMr : facility.typeEn;
            const fTimings = language === 'mr' ? facility.timingsMr : facility.timingsEn;
            const fStaff = language === 'mr' ? facility.capacityStaffMr : facility.capacityStaffEn;
            const fAddress = language === 'mr' ? facility.addressMr : facility.addressEn;

            return (
              <div
                key={facility.id}
                className="bg-white rounded-2xl border border-amber-200 p-6 shadow-sm hover:shadow-md hover:border-orange-400 transition-all space-y-4 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-orange-950 bg-amber-100/90 border border-amber-300 px-2.5 py-0.5 rounded-full font-mono">
                      {fType}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-900 bg-emerald-100/90 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{language === 'mr' ? 'सक्रिय / कार्यरत' : 'Active'}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-orange-950 transition-colors leading-snug font-serif">
                    {fName}
                  </h3>

                  <div className="space-y-2 text-xs text-stone-600 pt-1">
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-orange-600 mt-0.5 shrink-0" />
                      <span>
                        <strong className="text-stone-800">{t.timings}:</strong> {fTimings}
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>
                        <strong className="text-stone-800">{t.address}:</strong> {fAddress}
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      <Building2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <span>
                        <strong className="text-stone-800">{t.staffCapacity}:</strong> {fStaff}
                      </span>
                    </div>

                    {facility.contactNumber && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-purple-600 shrink-0" />
                        <span>
                          <strong className="text-stone-800">{t.contact}:</strong> {facility.contactNumber}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Utility Availability Badges */}
                <div className="pt-3 border-t border-amber-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-600 font-mono">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1 font-semibold ${
                        facility.hasElectricity ? 'text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200' : 'text-stone-400'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-600" />
                      <span>{language === 'mr' ? 'वीज' : 'Power'}</span>
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 font-semibold ${
                        facility.hasPipedWater ? 'text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200' : 'text-stone-400'
                      }`}
                    >
                      <Droplet className="w-3.5 h-3.5 text-blue-600" />
                      <span>{language === 'mr' ? 'नळ पाणी' : 'Water'}</span>
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 font-semibold ${
                        facility.hasInternet ? 'text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200' : 'text-stone-400'
                      }`}
                    >
                      <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{language === 'mr' ? 'इंटरनेट' : 'Internet'}</span>
                    </span>
                  </div>

                  <span className="text-stone-500 text-[10px]">
                    {t.lastUpdated}: {facility.verifiedDate}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
