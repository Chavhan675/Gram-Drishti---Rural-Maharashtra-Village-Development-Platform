import React from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { ShieldAlert, ExternalLink, HelpCircle, PhoneCall, Info } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, navigateTo } = useApp();
  const t = getTranslation(language);

  return (
    <footer className="bg-stone-950 text-stone-300 text-sm mt-auto relative">
      {/* Maharashtra Cultural Festive Trim */}
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-600 via-amber-400 via-emerald-600 to-indigo-700" />

      {/* Upper disclaimer strip */}
      <div className="bg-stone-900 border-b border-stone-800/80 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-300">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {language === 'mr'
                ? 'महत्त्वाची सूचना: ग्राम दृष्टी हे ग्रामीण माहिती सुलभतेसाठीचे स्वतंत्र व्यासपीठ आहे. हे अधिकृत सरकारी पोर्टल नाही.'
                : 'Notice: Gram Drishti is an independent public digital platform for village transparency and is not an official Govt department portal.'}
            </span>
          </div>
          <div className="flex items-center gap-4 shrink-0 text-amber-200/80 font-mono text-[11px]">
            <span>
              {language === 'mr' ? 'आधार: महाराष्ट्र शासन सार्वजनिक आकडेवारी' : 'Source: Public Maharashtra Open Datasets'}
            </span>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <span className="text-emerald-400">2026 Edition</span>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Identity */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center font-bold text-xs ring-1 ring-amber-300 shadow-sm">
                ग़
              </div>
              <span className="text-lg font-bold text-white tracking-tight font-serif">
                {language === 'mr' ? 'ग्राम दृष्टी' : 'Gram Drishti'}
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              {language === 'mr'
                ? 'महाराष्ट्रातील ग्रामीण नागरिकांना आपल्या गावाची माहिती, सार्वजनिक सुविधा, विकासकामे आणि शासकीय योजना एकाच ठिकाणी सहज समजण्यासाठी समर्पित उपक्रम.'
                : 'Dedicated to empowering rural Maharashtra citizens with accessible, transparent, and verified village indicators, public works, and welfare schemes.'}
            </p>
            <div className="pt-2 text-xs">
              <span className="block font-semibold text-amber-400 font-mono text-[11px]">
                {language === 'mr' ? 'ध्येयवाक्य:' : 'Motto:'}
              </span>
              <span className="text-stone-200 font-serif">
                {language === 'mr' ? '“आपले गाव, आपली माहिती, आपल्या गावाची प्रगती”' : '“Your Village. Your Information. Your Progress.”'}
              </span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              {language === 'mr' ? 'मुख्य सेवा व दुवे' : 'Core Services'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigateTo('search')} className="hover:text-amber-400 transition-colors">
                  {t.navVillages}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('village-overview')} className="hover:text-amber-400 transition-colors">
                  {t.villageOverviewTitle}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('schemes')} className="hover:text-amber-400 transition-colors">
                  {t.navSchemes}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('report-issue')} className="hover:text-amber-400 transition-colors">
                  {t.navReportIssue}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('track-issue')} className="hover:text-amber-400 transition-colors">
                  {t.navTrackIssue}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Maharashtra Portals */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              {language === 'mr' ? 'अधिकृत शासकीय पोर्टल्स' : 'Government Portals'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href="https://aaplesarkar.mahaonline.gov.in"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-amber-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>आपले सरकार (Aaple Sarkar)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://mahadbt.maharashtra.gov.in"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-amber-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>MahaDBT शिष्यवृत्ती व शेतकरी पोर्टल</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://krishi.maharashtra.gov.in"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-amber-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>कृषी विभाग महाराष्ट्र शासन</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://rdd.maharashtra.gov.in"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-amber-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>ग्रामविकास विभाग, महाराष्ट्र</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Support */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              {language === 'mr' ? 'मदत व पारदर्शकता' : 'Support & Access'}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-slate-300 font-medium">
                    {language === 'mr' ? 'आपले सरकार हेल्पलाइन' : 'State Citizen Helpline'}
                  </span>
                  <span>1800 120 8040 (Toll Free)</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-slate-300 font-medium">
                    {language === 'mr' ? 'डेटा प्रमाणन' : 'Data Integrity'}
                  </span>
                  <span>LGD, Census 2011 & Dept Public Registries</span>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => navigateTo('about')}
                  className="text-amber-400 hover:underline font-medium inline-flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{t.navAbout}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal statement */}
        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Gram Drishti Platform. Built for rural citizen empowerment across Maharashtra.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigateTo('about')} className="hover:text-slate-300">
              Privacy & Disclaimer
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => navigateTo('admin')} className="hover:text-slate-300">
              Admin Login
            </button>
            <span aria-hidden="true">·</span>
            <span>Accessibility (WCAG AA)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
