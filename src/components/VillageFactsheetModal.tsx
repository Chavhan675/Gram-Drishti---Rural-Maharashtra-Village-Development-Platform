import React from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Printer, X, ShieldCheck, MapPin, Phone, Building, Users, Droplets, CheckCircle2 } from 'lucide-react';

export const VillageFactsheetModal: React.FC = () => {
  const {
    language,
    selectedVillage,
    projects,
    facilities,
    isFactsheetModalOpen,
    setIsFactsheetModalOpen
  } = useApp();
  const t = getTranslation(language);

  if (!isFactsheetModalOpen) return null;

  const vName = language === 'mr' ? selectedVillage.nameMr : selectedVillage.nameEn;
  const tName = language === 'mr' ? selectedVillage.talukaMr : selectedVillage.talukaEn;
  const dName = language === 'mr' ? selectedVillage.districtMr : selectedVillage.districtEn;

  const villageProjects = projects.filter((p) => p.villageId === selectedVillage.id);
  const villageFacilities = facilities.filter((f) => f.villageId === selectedVillage.id);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-lg border border-stone-300 w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden print-container">
        {/* Modal Action Header (hidden in print) */}
        <div className="p-4 bg-stone-900 text-white flex items-center justify-between no-print border-b border-stone-800">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-amber-400">
              {language === 'mr' ? 'ग्राम माहिती पत्रक (प्रमाणित सारांश)' : 'Official Village Factsheet (Certified Summary)'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs rounded transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'प्रिंट / सेव्ह पीडीएफ' : 'Print / Save PDF'}</span>
            </button>
            <button
              onClick={() => setIsFactsheetModalOpen(false)}
              className="p-1.5 text-stone-400 hover:text-white rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Factsheet Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-stone-900">
          {/* Official Document Letterhead */}
          <div className="border-b-2 border-stone-900 pb-4 text-center space-y-1">
            <div className="text-[11px] font-semibold tracking-widest text-stone-600 uppercase">
              {language === 'mr' ? 'महाराष्ट्र शासन ग्रामीण माहिती संदर्भ व्यासपीठ' : 'Government of Maharashtra Rural Information Reference Platform'}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-950 tracking-tight">
              {selectedVillage.administration.gramPanchayatNameMr}
            </h1>
            <div className="text-xs text-stone-600">
              {language === 'mr'
                ? `तालुका: ${tName} · जिल्हा: ${dName} · महसुली विभाग: ${selectedVillage.divisionMr}`
                : `Taluka: ${tName} · District: ${dName} · Division: ${selectedVillage.divisionEn}`}
            </div>
            <div className="flex justify-center items-center gap-4 text-xs font-mono text-stone-500 pt-1">
              <span>LGD Code: {selectedVillage.lgdCode}</span>
              <span>·</span>
              <span>PIN: {selectedVillage.pincode}</span>
              <span>·</span>
              <span>{language === 'mr' ? 'नोंद दिनांक: सप्टेंबर २०२६' : 'Reference Date: Sept 2026'}</span>
            </div>
          </div>

          {/* Section 1: Demographics Matrix */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-800 border-b border-stone-200 pb-1 mb-2">
              १. {language === 'mr' ? 'लोकसंख्या व सामाजिक सांख्यिकी (Demographics)' : '1. Population & Demographics'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 bg-stone-50 rounded border border-stone-200">
                <span className="text-stone-500 block">{t.population}</span>
                <span className="font-bold text-stone-900 font-mono text-base tabular-nums">
                  {selectedVillage.demographics.totalPopulation}
                </span>
                <span className="text-[10px] text-stone-500 block mt-0.5">
                  {selectedVillage.demographics.malePopulation} M / {selectedVillage.demographics.femalePopulation} F
                </span>
              </div>

              <div className="p-2.5 bg-stone-50 rounded border border-stone-200">
                <span className="text-stone-500 block">{t.households}</span>
                <span className="font-bold text-stone-900 font-mono text-base tabular-nums">
                  {selectedVillage.demographics.households}
                </span>
                <span className="text-[10px] text-stone-500 block mt-0.5">
                  {language === 'mr' ? 'एकूण कुटुंबे' : 'Total Households'}
                </span>
              </div>

              <div className="p-2.5 bg-stone-50 rounded border border-stone-200">
                <span className="text-stone-500 block">{t.literacy}</span>
                <span className="font-bold text-stone-900 font-mono text-base tabular-nums">
                  {selectedVillage.demographics.literacyRate}%
                </span>
                <span className="text-[10px] text-stone-500 block mt-0.5">
                  M: {selectedVillage.demographics.maleLiteracyRate}% · F: {selectedVillage.demographics.femaleLiteracyRate}%
                </span>
              </div>

              <div className="p-2.5 bg-stone-50 rounded border border-stone-200">
                <span className="text-stone-500 block">{t.area}</span>
                <span className="font-bold text-stone-900 font-mono text-base tabular-nums">
                  {selectedVillage.demographics.areaHectares}
                </span>
                <span className="text-[10px] text-stone-500 block mt-0.5">
                  {language === 'mr' ? 'हेक्टर भौगोलिक क्षेत्र' : 'Hectares Total Area'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Key Administrative Contacts */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-800 border-b border-stone-200 pb-1 mb-2">
              २. {language === 'mr' ? 'ग्राम प्रशासन व संपर्क कक्ष (Administrative Desk)' : '2. Village Administration Desk'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-stone-50 rounded border border-stone-200">
                <span className="text-[10px] uppercase font-semibold text-stone-500 block">
                  {language === 'mr' ? 'सरपंच' : 'Sarpanch'}
                </span>
                <span className="font-bold text-stone-900 block mt-0.5">
                  {language === 'mr' ? selectedVillage.administration.sarpanchNameMr : selectedVillage.administration.sarpanchNameEn}
                </span>
                <span className="text-stone-600 font-mono text-[11px] block mt-1">
                  {selectedVillage.administration.sarpanchContact}
                </span>
              </div>

              <div className="p-3 bg-stone-50 rounded border border-stone-200">
                <span className="text-[10px] uppercase font-semibold text-stone-500 block">
                  {language === 'mr' ? 'ग्रामसेवक / ग्रामविकास अधिकारी' : 'Gram Sevak (VDO)'}
                </span>
                <span className="font-bold text-stone-900 block mt-0.5">
                  {language === 'mr' ? selectedVillage.administration.gramSevakNameMr : selectedVillage.administration.gramSevakNameEn}
                </span>
                <span className="text-stone-600 font-mono text-[11px] block mt-1">
                  {selectedVillage.administration.gramSevakContact}
                </span>
              </div>

              <div className="p-3 bg-stone-50 rounded border border-stone-200">
                <span className="text-[10px] uppercase font-semibold text-stone-500 block">
                  {language === 'mr' ? 'तलाठी (महसूल विभाग)' : 'Talathi (Revenue)'}
                </span>
                <span className="font-bold text-stone-900 block mt-0.5">
                  {language === 'mr' ? selectedVillage.administration.talathiNameMr : selectedVillage.administration.talathiNameEn}
                </span>
                <span className="text-stone-600 font-mono text-[11px] block mt-1">
                  {selectedVillage.administration.talathiContact}
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Ongoing Civil Works Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-800 border-b border-stone-200 pb-1 mb-2">
              ३. {language === 'mr' ? 'विकासकामे व मंजूर निधी (Civil Projects)' : '3. Civil Works & Budget Records'}
            </h2>
            <div className="border border-stone-200 rounded overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-100 text-stone-700 font-semibold border-b border-stone-200">
                  <tr>
                    <th className="py-2 px-3">{language === 'mr' ? 'प्रकल्पाचे नाव' : 'Project Title'}</th>
                    <th className="py-2 px-3">{language === 'mr' ? 'विभाग' : 'Dept'}</th>
                    <th className="py-2 px-3 font-mono">{language === 'mr' ? 'मंजूर निधी' : 'Budget'}</th>
                    <th className="py-2 px-3">{language === 'mr' ? 'स्थिती' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {villageProjects.map((prj) => (
                    <tr key={prj.id}>
                      <td className="py-2 px-3 font-medium text-stone-900">
                        {language === 'mr' ? prj.titleMr : prj.titleEn}
                      </td>
                      <td className="py-2 px-3 text-stone-600">
                        {language === 'mr' ? prj.departmentMr : prj.departmentEn}
                      </td>
                      <td className="py-2 px-3 font-mono text-stone-900">
                        ₹{prj.budgetLakhs} {language === 'mr' ? 'लाख' : 'Lakh'}
                      </td>
                      <td className="py-2 px-3 text-stone-700">
                        {prj.progressPercent}% ({prj.status})
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legal / Data Verification Footnote */}
          <div className="pt-4 border-t border-stone-300 text-[11px] text-stone-500 flex justify-between items-center">
            <span>
              {language === 'mr'
                ? 'माहिती संदर्भ: स्थानिक स्वराज्य संस्था, भारत सरकार LGD प्रणाली व ग्रामपंचायत अहवाल.'
                : 'Data references: Open Government Data, LGD portal, and village public administrative records.'}
            </span>
            <span className="font-mono">Gram Drishti Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};
