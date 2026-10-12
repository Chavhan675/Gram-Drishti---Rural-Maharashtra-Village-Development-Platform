import React from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  ShieldAlert,
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
  Building2,
  FileSpreadsheet,
  Globe,
  Database,
  ArrowRight
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { language, navigateTo } = useApp();
  const t = getTranslation(language);

  const dataSources = [
    {
      name: 'Local Government Directory (LGD)',
      authorityMr: 'पंचायती राज मंत्रालय, भारत सरकार',
      authorityEn: 'Ministry of Panchayati Raj, Govt of India',
      url: 'https://lgdirectory.gov.in',
      purposeMr: 'प्रमाणित गाव, तालुका, जिल्हा व ग्रामपंचायत संकेतांक (LGD Codes).',
      purposeEn: 'Standardized village, taluka, and district administrative codes.',
      period: '2025–26 Reference',
      updated: 'September 2026'
    },
    {
      name: 'Census of India (Village Directory)',
      authorityMr: 'रजिस्ट्रार जनरल व जनगणना आयुक्त',
      authorityEn: 'Office of the Registrar General & Census Commissioner',
      url: 'https://censusindia.gov.in',
      purposeMr: 'लोकसंख्या, कुटुंबे संख्या, स्त्री-पुरुष प्रमाण व साक्षरता दर सांख्यिकी.',
      purposeEn: 'Baseline demographics, households, gender ratio, and literacy rates.',
      period: 'Census & Projected Trends',
      updated: '2026 Verified'
    },
    {
      name: 'Open Government Data (OGD) Platform',
      authorityMr: 'राष्ट्रीय सूचना विज्ञान केंद्र (NIC / MeitY)',
      authorityEn: 'National Informatics Centre (data.gov.in)',
      url: 'https://data.gov.in',
      purposeMr: 'सार्वजनिक आरोग्य केंद्रे, शाळा व पिण्याच्या पाण्याच्या सुविधांची यादी.',
      purposeEn: 'Civic facility inventories, public schools, and water supply points.',
      period: '2025–26 Data',
      updated: 'August 2026'
    },
    {
      name: 'MahaDBT & Mahaswayam Portals',
      authorityMr: 'महाराष्ट्र शासन माहिती तंत्रज्ञान व कृषी विभाग',
      authorityEn: 'Govt of Maharashtra Information Technology & Agri Dept',
      url: 'https://mahadbt.maharashtra.gov.in',
      purposeMr: 'शेतकरी, महिला, विद्यार्थी व ज्येष्ठ नागरिकांच्या कल्याणकारी योजना तपशील.',
      purposeEn: 'Eligibility criteria, application links, and subsidy details.',
      period: 'FY 2025–26',
      updated: 'September 2026'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-16">
      <Breadcrumbs items={[{ label: t.navAbout }]} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="border-b border-amber-200 pb-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-orange-700 uppercase tracking-wider font-mono">
              {language === 'mr' ? '🚩 प्लॅटफॉर्म उद्दिष्ट व पारदर्शकता' : '🚩 Platform Mission & Transparency'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-stone-950 font-serif tracking-tight mt-0.5">
            {language === 'mr' ? 'ग्राम दृष्टी बद्दल व अधिकृत डेटा स्रोत' : 'About Gram Drishti & Verified Data Sources'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            {language === 'mr'
              ? 'ग्रामीण महाराष्ट्रातील नागरिकांच्या माहिती सक्षमीकरणासाठी आणि पारदर्शकतेसाठी समर्पित स्वतंत्र डिजिटल व्यासपीठ.'
              : 'Empowering rural citizens across Maharashtra with accessible, structured, and verified public information.'}
          </p>
        </div>

        {/* Mandatory Transparency & Independence Notice with Rich Amber-Saffron border */}
        <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50/60 rounded-2xl border-2 border-amber-300 p-6 sm:p-7 space-y-3.5 shadow-sm relative overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-orange-600 via-amber-400 to-emerald-600 rounded-t-2xl -mt-6 -mx-6 sm:-mt-7 sm:-mx-7 mb-4" />

          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-orange-800 shrink-0" />
            <h2 className="text-base sm:text-lg font-bold text-stone-950 font-serif">
              {language === 'mr' ? 'महत्त्वाचा कायदेशीर अस्वीकरण व स्वायत्तता' : 'Important Civic Disclaimer & Independence'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
            {language === 'mr'
              ? 'ग्राम दृष्टी (Gram Drishti) हे ग्रामीण माहिती सुलभतेसाठी आणि सार्वजनिक पारदर्शकतेसाठी विकसित केलेले एक स्वतंत्र नागरिक-केंद्री डिजिटल व्यासपीठ आहे. हा प्रकल्प कोणत्याही एका शासकीय विभागाचे एकमेव अधिकृत संकेतस्थळ असल्याचा दावा करत नाही. या प्लॅटफॉर्मवरील सर्व माहिती ही शासनाच्या सार्वजनिक व खुल्या डेटा संचांवर (Open Government Data), स्थानिक स्वराज्य संस्था डिरेक्टरी (LGD) आणि प्रकाशित अहवालांवर आधारित आहे. शासकीय योजनांचा थेट लाभ मिळवण्यासाठी किंवा अधिकृत अर्जासाठी नागरिकांनी संबंधित विभागाच्या अधिकृत संकेतस्थळाशी संपर्क साधावा.'
              : 'Gram Drishti is an independent civic-tech platform engineered to enhance transparency, public utility accessibility, and civic knowledge across rural Maharashtra. It is an independent public digital initiative built using open government records. All baseline information is aggregated from open government directories (LGD), Census records, and published departmental gazettes. For statutory benefits or legal entitlements, citizens must refer to the designated government departments.'}
          </p>
        </div>

        {/* Detailed Data Sources Table (Point 10 Feature) */}
        <div className="bg-white rounded-2xl border border-amber-200 p-6 sm:p-7 shadow-sm space-y-5 relative overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 rounded-t-2xl -mt-6 -mx-6 sm:-mt-7 sm:-mx-7 mb-4" />

          <div className="flex items-center gap-2.5 border-b border-amber-100 pb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-950 font-serif">
                {language === 'mr' ? 'माहितीचे अधिकृत डेटा स्रोत (Data Sources)' : 'Primary Data Sources & Provenance'}
              </h3>
              <p className="text-xs text-stone-500">
                {language === 'mr' ? 'प्रत्येक डेटा संचाचा संदर्भ, कालावधी व अधिकृत पोर्टल दुवे' : 'Official source links, data periods, and verification dates'}
              </p>
            </div>
          </div>

          <div className="divide-y divide-amber-100">
            {dataSources.map((source, idx) => (
              <div key={idx} className="py-4 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-bold text-stone-950 text-sm font-serif">{source.name}</span>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-orange-800 hover:text-orange-950 hover:underline inline-flex items-center gap-1 font-mono font-bold"
                  >
                    <span>View Official Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="text-xs text-stone-600">
                  <span className="font-bold text-stone-800">
                    {language === 'mr' ? source.authorityMr : source.authorityEn}
                  </span>
                  <p className="text-stone-500 mt-0.5">
                    {language === 'mr' ? source.purposeMr : source.purposeEn}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-stone-600 pt-1">
                  <span className="bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Period: {source.period}</span>
                  <span className="bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-emerald-900 font-semibold">Verified: {source.updated}</span>
                  <span className="text-orange-800 font-semibold">Open Public Access</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Accessibility Standards */}
        <div className="bg-white rounded-2xl border border-amber-200 p-6 sm:p-7 shadow-sm space-y-3 text-xs sm:text-sm text-stone-700">
          <h3 className="text-base font-bold text-stone-950 font-serif">
            {language === 'mr' ? 'सुलभता व डिजिटल समता (Accessibility)' : 'Accessibility (WCAG AA Compliance)'}
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed font-medium">
            {language === 'mr'
              ? 'ग्रामीण भागातील सर्व सामान्य नागरिक, महिला आणि ज्येष्ठांना सहज वाचन करता यावे म्हणून नोट सांश देवनागरी व प्लस जकार्ता संस फॉन्ट वापरले असून उच्च कॉन्ट्रास्ट व मोबाईल अनुकूल रचना करण्यात आली आहे.'
              : 'Designed with high visual contrast, Noto Sans Devanagari typography, mobile-first responsive architecture, zero-pill clarity, and offline resiliency to ensure universal rural accessibility.'}
          </p>
        </div>
      </div>
    </div>
  );
};
