import React from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  Users,
  Building2,
  Phone,
  ShieldCheck,
  FileText,
  MapPin,
  Calendar,
  Briefcase,
  CheckCircle2,
  Landmark
} from 'lucide-react';

export const VillageProfilePage: React.FC = () => {
  const { language, selectedVillage, navigateTo } = useApp();
  const t = getTranslation(language);

  const vName = language === 'mr' ? selectedVillage.nameMr : selectedVillage.nameEn;
  const tName = language === 'mr' ? selectedVillage.talukaMr : selectedVillage.talukaEn;
  const dName = language === 'mr' ? selectedVillage.districtMr : selectedVillage.districtEn;

  const demo = selectedVillage.demographics;
  const admin = selectedVillage.administration;

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-16">
      <Breadcrumbs
        items={[
          { label: dName },
          { label: tName },
          { label: vName, page: 'village-overview' },
          { label: t.cardProfileTitle }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page Header with Vibrant Maharashtra Trim */}
        <div className="border-b border-amber-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-orange-700 uppercase tracking-wider font-mono">
                {language === 'mr' ? '🚩 सविस्तर ग्राम रूपरेषा' : '🚩 Comprehensive Village Profile'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight font-serif mt-0.5">
              {vName} — {language === 'mr' ? 'लोकसंख्या व प्रशासन' : 'Demographics & Governance'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              तालुका: <span className="font-semibold text-stone-800">{tName}</span> · जिल्हा: <span className="font-semibold text-stone-800">{dName}</span> · विभाग: <span className="font-semibold text-orange-900">{selectedVillage.divisionMr}</span>
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

        {/* Section 1: Demographics Breakdown with Festive Accent */}
        <div className="bg-white rounded-2xl border border-amber-200 p-6 sm:p-7 shadow-sm space-y-6 relative overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-orange-600 via-amber-400 to-emerald-600 rounded-t-2xl -mt-6 -mx-6 sm:-mt-7 sm:-mx-7 mb-5" />

          <div className="flex items-center gap-2.5 border-b border-amber-100 pb-3">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-stone-950 font-serif">
              {language === 'mr' ? 'लोकसंख्या व सामाजिक सांख्यिकी (Census Profile)' : 'Demographics & Social Census Statistics'}
            </h2>
          </div>

          {/* Demographic Metrics in Maharashtra Jewel Tones */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-gradient-to-b from-orange-50/80 to-white rounded-xl border border-orange-200 shadow-2xs">
              <span className="text-[10px] text-orange-800 block uppercase font-mono font-bold">{t.population}</span>
              <span className="text-2xl font-black text-stone-900 font-mono mt-1 block">
                {demo.totalPopulation}
              </span>
              <span className="text-[11px] text-stone-600 mt-1 block font-mono">
                {demo.malePopulation} {language === 'mr' ? 'पुरुष' : 'Male'} · {demo.femalePopulation} {language === 'mr' ? 'स्त्रिया' : 'Female'}
              </span>
            </div>

            <div className="p-4 bg-gradient-to-b from-amber-50/80 to-white rounded-xl border border-amber-200 shadow-2xs">
              <span className="text-[10px] text-amber-800 block uppercase font-mono font-bold">{t.households}</span>
              <span className="text-2xl font-black text-stone-900 font-mono mt-1 block">
                {demo.households}
              </span>
              <span className="text-[11px] text-stone-600 mt-1 block">
                {language === 'mr' ? 'सरासरी ५.२ सदस्य/कुटुंब' : 'Avg 5.2 members/household'}
              </span>
            </div>

            <div className="p-4 bg-gradient-to-b from-emerald-50/80 to-white rounded-xl border border-emerald-200 shadow-2xs">
              <span className="text-[10px] text-emerald-800 block uppercase font-mono font-bold">{t.literacy}</span>
              <span className="text-2xl font-black text-stone-900 font-mono mt-1 block">
                {demo.literacyRate}%
              </span>
              <span className="text-[11px] text-stone-600 mt-1 block font-mono">
                {language === 'mr' ? 'पुरुष' : 'Male'}: {demo.maleLiteracyRate}% · {language === 'mr' ? 'स्त्री' : 'Female'}: {demo.femaleLiteracyRate}%
              </span>
            </div>

            <div className="p-4 bg-gradient-to-b from-blue-50/80 to-white rounded-xl border border-blue-200 shadow-2xs">
              <span className="text-[10px] text-blue-800 block uppercase font-mono font-bold">{t.area}</span>
              <span className="text-2xl font-black text-stone-900 font-mono mt-1 block">
                {demo.areaHectares}
              </span>
              <span className="text-[11px] text-stone-600 mt-1 block">
                {language === 'mr' ? 'हेक्टर (Geographic Area)' : 'Hectares Total'}
              </span>
            </div>
          </div>

          {/* Social and Working Population Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-orange-950 font-mono mb-3">
                {language === 'mr' ? 'कार्यरत लोकसंख्या (Employment Composition)' : 'Occupational Distribution'}
              </h3>
              <div className="border border-amber-200 rounded-xl overflow-hidden text-xs shadow-2xs">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-amber-100">
                    <tr className="bg-amber-50/70">
                      <td className="p-3 font-semibold text-stone-800">
                        {language === 'mr' ? 'एकूण कार्यरत लोकसंख्या' : 'Total Working Population'}
                      </td>
                      <td className="p-3 font-bold font-mono text-stone-950 text-right">
                        {demo.workingPopulation}
                      </td>
                    </tr>
                    <tr className="hover:bg-amber-50/30">
                      <td className="p-3 text-stone-700">
                        {language === 'mr' ? 'मुख्य शेतकरी (Cultivators)' : 'Cultivators / Landholders'}
                      </td>
                      <td className="p-3 font-mono font-bold text-orange-900 text-right">{demo.cultivators}</td>
                    </tr>
                    <tr className="hover:bg-amber-50/30">
                      <td className="p-3 text-stone-700">
                        {language === 'mr' ? 'शेतमजूर (Agricultural Laborers)' : 'Agricultural Labourers'}
                      </td>
                      <td className="p-3 font-mono font-bold text-emerald-900 text-right">{demo.agriculturalLaborers}</td>
                    </tr>
                    <tr className="hover:bg-amber-50/30">
                      <td className="p-3 text-stone-700">
                        {language === 'mr' ? 'इतर कारागीर व सेवा क्षेत्र' : 'Other Crafts & Services'}
                      </td>
                      <td className="p-3 font-mono font-bold text-blue-900 text-right">
                        {demo.workingPopulation - (demo.cultivators + demo.agriculturalLaborers)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-orange-950 font-mono mb-3">
                {language === 'mr' ? 'सामाजिक प्रवर्ग रचना (Social Category)' : 'Social Group Representation'}
              </h3>
              <div className="border border-amber-200 rounded-xl overflow-hidden text-xs shadow-2xs">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-amber-100">
                    <tr className="bg-amber-50/70">
                      <td className="p-3 font-semibold text-stone-800">
                        {language === 'mr' ? 'अनुसूचित जाती (SC Population)' : 'Scheduled Castes (SC)'}
                      </td>
                      <td className="p-3 font-bold font-mono text-stone-950 text-right">
                        {demo.scPopulation}
                      </td>
                    </tr>
                    <tr className="hover:bg-amber-50/30">
                      <td className="p-3 text-stone-700">
                        {language === 'mr' ? 'अनुसूचित जमाती (ST Population)' : 'Scheduled Tribes (ST)'}
                      </td>
                      <td className="p-3 font-bold font-mono text-stone-950 text-right">
                        {demo.stPopulation}
                      </td>
                    </tr>
                    <tr className="hover:bg-amber-50/30">
                      <td className="p-3 text-stone-700">
                        {language === 'mr' ? 'इतर सामाजिक वर्ग (General / OBC)' : 'General / OBC Groups'}
                      </td>
                      <td className="p-3 font-bold font-mono text-stone-950 text-right">
                        {demo.totalPopulation - (demo.scPopulation + demo.stPopulation)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Administrative Governance & Panchayat Representatives */}
        <div className="bg-white rounded-2xl border border-amber-200 p-6 sm:p-7 shadow-sm space-y-6 relative overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 via-amber-400 to-orange-600 rounded-t-2xl -mt-6 -mx-6 sm:-mt-7 sm:-mx-7 mb-5" />

          <div className="flex items-center gap-2.5 border-b border-amber-100 pb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Landmark className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-stone-950 font-serif">
              {language === 'mr' ? 'स्थानिक स्वराज्य संस्था व प्रशासन' : 'Local Panchayat Administration & Representation'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Sarpanch - Saffron Theme with Voting Details */}
            <div className="p-5 bg-gradient-to-b from-orange-50/90 to-white rounded-2xl border-2 border-orange-200/90 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-orange-900 bg-orange-100/90 px-2.5 py-1 rounded-full border border-orange-300 inline-block font-mono">
                  🚩 {language === 'mr' ? 'सरपंच (लोकप्रतिनिधी)' : 'Sarpanch (Elected Head)'}
                </span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-mono">
                  +{selectedVillage.election.sarpanchElection.victoryMargin} {language === 'mr' ? 'मताधिक्य' : 'Margin'}
                </span>
              </div>
              <h4 className="text-base font-bold text-stone-950 pt-1 font-serif">
                {language === 'mr' ? admin.sarpanchNameMr : admin.sarpanchNameEn}
              </h4>
              <p className="text-stone-700 flex items-center gap-1.5 font-mono text-xs">
                <Phone className="w-3.5 h-3.5 text-orange-600" />
                <span>{admin.sarpanchContact}</span>
              </p>
              <div className="p-2.5 bg-orange-100/60 rounded-xl text-[11px] text-stone-700 space-y-1">
                <div className="flex justify-between font-mono">
                  <span>{language === 'mr' ? 'मिळालेली मते:' : 'Votes Polled:'}</span>
                  <span className="font-bold text-orange-950">
                    {selectedVillage.election.sarpanchElection.votesSecured.toLocaleString('en-IN')}{' '}
                    ({selectedVillage.election.sarpanchElection.voteSharePercent}%)
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>{language === 'mr' ? 'कार्यकाळ:' : 'Term:'}</span>
                  <span className="font-semibold text-stone-900">{selectedVillage.election.termPeriod}</span>
                </div>
              </div>
              <button
                onClick={() => navigateTo('village-governance')}
                className="w-full mt-1 py-1.5 px-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>{language === 'mr' ? 'निवडणूक निकाल व कामे पहा →' : 'View Voting & Work Audit →'}</span>
              </button>
            </div>

            {/* Gram Sevak - Emerald Theme */}
            <div className="p-5 bg-gradient-to-b from-emerald-50/90 to-white rounded-2xl border border-emerald-200 shadow-2xs space-y-2.5">
              <span className="text-[11px] font-bold text-emerald-900 bg-emerald-100/90 px-2.5 py-1 rounded-full border border-emerald-300 inline-block font-mono">
                🏛️ {language === 'mr' ? 'ग्रामसेवक / ग्रामविकास अधिकारी' : 'Gram Sevak (Executive Officer)'}
              </span>
              <h4 className="text-base font-bold text-stone-950 pt-1 font-serif">
                {language === 'mr' ? admin.gramSevakNameMr : admin.gramSevakNameEn}
              </h4>
              <p className="text-stone-700 flex items-center gap-1.5 font-mono text-xs">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>{admin.gramSevakContact}</span>
              </p>
              <p className="text-[11px] text-stone-500 pt-1">
                {language === 'mr' ? 'प्रशासकीय प्रमुख, जन्म-मृत्यू नोंद व दाखले' : 'Administrative head, vital registers & civil desk'}
              </p>
            </div>

            {/* Talathi - Royal Blue Theme */}
            <div className="p-5 bg-gradient-to-b from-blue-50/90 to-white rounded-2xl border border-blue-200 shadow-2xs space-y-2.5">
              <span className="text-[11px] font-bold text-blue-900 bg-blue-100/90 px-2.5 py-1 rounded-full border border-blue-300 inline-block font-mono">
                📜 {language === 'mr' ? 'तलाठी (महसूल विभाग)' : 'Talathi (Revenue Desk)'}
              </span>
              <h4 className="text-base font-bold text-stone-950 pt-1 font-serif">
                {language === 'mr' ? admin.talathiNameMr : admin.talathiNameEn}
              </h4>
              <p className="text-stone-700 flex items-center gap-1.5 font-mono text-xs">
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>{admin.talathiContact}</span>
              </p>
              <p className="text-[11px] text-stone-500 pt-1">
                {language === 'mr' ? 'जमीन महसूल, ७/१२ नोंद व फेरफार' : 'Land revenue, 7/12 land records & mutation'}
              </p>
            </div>
          </div>

          {/* Institutional Identifiers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-amber-100 text-xs text-stone-700">
            <div className="p-2.5 bg-amber-50/50 rounded-xl border border-amber-200">
              <span className="text-stone-500 text-[10px] block font-mono uppercase">{t.lgdCodeLabel}</span>
              <span className="font-mono font-bold text-stone-900 text-sm">{admin.lgdCode}</span>
            </div>
            <div className="p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-200">
              <span className="text-stone-500 text-[10px] block font-mono uppercase">{t.pincodeLabel}</span>
              <span className="font-mono font-bold text-stone-900 text-sm">{admin.pincode}</span>
            </div>
            <div className="p-2.5 bg-blue-50/50 rounded-xl border border-blue-200">
              <span className="text-stone-500 text-[10px] block font-mono uppercase">
                {language === 'mr' ? 'विधानसभा मतदारसंघ' : 'Assembly Constituency'}
              </span>
              <span className="font-semibold text-stone-900 text-xs">
                {language === 'mr' ? admin.assemblyConstituencyMr : admin.assemblyConstituencyEn}
              </span>
            </div>
            <div className="p-2.5 bg-purple-50/50 rounded-xl border border-purple-200">
              <span className="text-stone-500 text-[10px] block font-mono uppercase">
                {language === 'mr' ? 'लोकसभा मतदारसंघ' : 'Lok Sabha Constituency'}
              </span>
              <span className="font-semibold text-stone-900 text-xs">
                {language === 'mr' ? admin.lokSabhaConstituencyMr : admin.lokSabhaConstituencyEn}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
