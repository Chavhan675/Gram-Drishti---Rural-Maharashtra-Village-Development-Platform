import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import {
  Search,
  Bot,
  Menu,
  X,
  FileText,
  ShieldCheck,
  ChevronDown,
  Building2,
  MapPin,
  FileSpreadsheet,
  AlertCircle,
  Clock,
  Layers,
  PhoneCall,
  ExternalLink,
  Wifi,
  WifiOff,
  Sparkles,
  Vote
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

export const Header: React.FC = () => {
  const { language, setLanguage, currentPage, navigateTo, setIsAiModalOpen } = useApp();
  const t = getTranslation(language);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'explore' | 'services' | 'report' | null>(null);

  const exploreRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        exploreRef.current && !exploreRef.current.contains(target) &&
        servicesRef.current && !servicesRef.current.contains(target) &&
        reportRef.current && !reportRef.current.contains(target)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name: 'explore' | 'services' | 'report') => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-stone-200/90 shadow-xs">
      {/* Executive National & State Public Data Ribbon */}
      <div className="bg-stone-900 text-stone-300 text-[11px] py-1.5 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20" />
            <span className="font-medium tracking-wide text-stone-200">
              {language === 'mr'
                ? 'महाराष्ट्र ग्रामीण डिजिटल माहिती व्यासपीठ · सार्वजनिक डेटा संच संदर्भ (LGD & Census 2026)'
                : 'Government of Maharashtra Open Data Standards · Rural Governance & Civic Intelligence Portal'}
            </span>
            <span className="hidden xl:inline-flex items-center gap-1 text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700/60 font-mono">
              ⚡ {language === 'mr' ? 'ऑफलाइन कॅशिंग सक्षम' : 'PWA Offline Cache Active'}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3 text-stone-300 font-medium text-xs">
            <button
              onClick={() => navigateTo('gis-planner')}
              className="hover:text-stone-950 transition-colors bg-gradient-to-r from-amber-400 to-orange-400 text-stone-950 font-bold px-2.5 py-0.5 rounded border border-amber-300 flex items-center gap-1.5 font-mono text-[11px] shadow-2xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-stone-950" />
              <span>{language === 'mr' ? 'AI जीआयएस (१० वैशिष्ट्ये)' : 'AI GIS Suite (10 Features)'}</span>
            </button>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <button
              onClick={() => navigateTo('village-3d')}
              className="hover:text-amber-200 transition-colors bg-emerald-950/90 text-emerald-300 px-2.5 py-0.5 rounded border border-emerald-600/50 flex items-center gap-1.5 font-mono text-[11px]"
            >
              <span className="text-xs">🌐</span>
              <span>{language === 'mr' ? '३डी डिजिटल ट्विन (Three.js)' : '3D Spatial Twin (Three.js)'}</span>
            </button>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <button
              onClick={() => navigateTo('presentation')}
              className="hover:bg-amber-300 transition-colors bg-amber-400 text-stone-950 font-bold px-2.5 py-0.5 rounded border border-amber-300 flex items-center gap-1.5 font-mono text-[11px] shadow-2xs"
            >
              <span>🎓</span>
              <span>{language === 'mr' ? 'प्रकल्प सादरीकरण (Sir)' : 'Project Defense for Sir (Sem VII)'}</span>
            </button>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <button
              onClick={() => navigateTo('ml-analytics')}
              className="hover:text-amber-300 transition-colors bg-indigo-950/80 text-amber-300 px-2.5 py-0.5 rounded border border-indigo-700/50 flex items-center gap-1.5 font-mono text-[11px]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>{language === 'mr' ? 'AI व ML संशोधन लॅब' : 'AI & ML Research Hub (Capstone)'}</span>
            </button>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <button
              onClick={() => navigateTo('about')}
              className="hover:text-white transition-colors underline-offset-2 hover:underline text-stone-400"
            >
              {language === 'mr' ? 'डेटा स्रोत व पारदर्शकता' : 'Data Sources & Transparency'}
            </button>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <button
              onClick={() => navigateTo('admin')}
              className="hover:text-white transition-colors text-stone-400 hover:underline"
            >
              {language === 'mr' ? 'प्रशासकीय कक्ष' : 'Admin Portal'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar: 3 Zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Wordmark with Institutional Crest */}
        <button
          onClick={() => navigateTo('home')}
          className="text-left group focus-visible:outline-none flex items-center gap-3"
        >
          <div className="w-9 h-9 bg-stone-900 border border-stone-800 text-amber-400 flex items-center justify-center font-bold text-sm rounded-lg shadow-sm group-hover:border-amber-500/50 transition-colors shrink-0">
            <span className="font-serif font-black tracking-tighter text-amber-400 text-base">GD</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-stone-950 font-serif group-hover:text-orange-900 transition-colors whitespace-nowrap">
                {language === 'mr' ? 'ग्राम दृष्टी' : 'Gram Drishti'}
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-100/70 text-amber-900 border border-amber-200">
                2026
              </span>
            </div>
            <span className="hidden sm:block text-[10px] font-semibold text-stone-500 uppercase tracking-widest -mt-0.5 font-mono">
              {language === 'mr' ? 'महाराष्ट्र ग्रामीण डिजिटल पोर्टल' : 'Maharashtra Rural Intelligence Portal'}
            </span>
          </div>
        </button>

        {/* Zone 2: Focused Categorized Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
          {/* Home */}
          <button
            onClick={() => navigateTo('home')}
            className={`transition-colors py-1 hover:text-orange-700 relative ${
              currentPage === 'home' ? 'text-orange-800 font-bold' : ''
            }`}
          >
            {t.navHome}
            {currentPage === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full" />
            )}
          </button>

          {/* Explore Dropdown */}
          <div ref={exploreRef} className="relative">
            <button
              onClick={() => toggleDropdown('explore')}
              className={`flex items-center gap-1 py-1 hover:text-orange-700 transition-colors ${
                ['search', 'village-overview', 'village-profile', 'map'].includes(currentPage)
                  ? 'text-orange-800 font-bold'
                  : ''
              }`}
            >
              <span>{language === 'mr' ? 'शोधा व गावे' : 'Explore'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-amber-600" />
            </button>

            {openDropdown === 'explore' && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-amber-200 rounded-xl shadow-xl py-2 z-50 text-xs ring-1 ring-black/5">
                <button
                  onClick={() => {
                    navigateTo('search');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-orange-50 flex items-center gap-2.5 text-stone-800 transition-colors"
                >
                  <div className="w-6 h-6 rounded bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
                    <Search className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold block text-stone-900">{language === 'mr' ? 'गाव शोधा' : 'Find Village'}</span>
                    <span className="text-[10px] text-stone-500 block">{language === 'mr' ? 'नाव किंवा पिन कोडद्वारे' : 'By name or PIN'}</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    navigateTo('village-overview');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-emerald-50 flex items-center gap-2.5 text-stone-800 border-t border-stone-100 transition-colors"
                >
                  <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Building2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold block text-stone-900">{language === 'mr' ? 'निवडलेले गाव पहा' : 'Village Overview'}</span>
                    <span className="text-[10px] text-stone-500 block">{language === 'mr' ? 'सविस्तर ग्राम केंद्र' : 'Current active village'}</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    navigateTo('village-governance');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-orange-50 flex items-center gap-2.5 text-stone-800 border-t border-stone-100 transition-colors"
                >
                  <div className="w-6 h-6 rounded bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
                    <Vote className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold block text-stone-900">{language === 'mr' ? 'निवडणूक व कामकाज' : 'Elections & Governance'}</span>
                    <span className="text-[10px] text-stone-500 block">{language === 'mr' ? 'सरपंच निकाल, मते व पूर्ण कामे' : 'Head, votes & work audit'}</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    navigateTo('map');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-blue-50 flex items-center gap-2.5 text-stone-800 border-t border-stone-100 transition-colors"
                >
                  <div className="w-6 h-6 rounded bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold block text-stone-900">{language === 'mr' ? 'गाव नकाशा' : 'Geographical Map'}</span>
                    <span className="text-[10px] text-stone-500 block">{language === 'mr' ? 'सुविधांचे स्थान' : 'Cartography & pins'}</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    navigateTo('gis-planner');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-amber-50 flex items-center gap-2.5 text-stone-800 border-t border-stone-100 transition-colors"
                >
                  <div className="w-6 h-6 rounded bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-stone-900">{language === 'mr' ? 'AI जीआयएस व सुविधा नियोजन' : 'AI GIS & Facility Planner'}</span>
                      <span className="text-[9px] bg-amber-200 text-amber-950 font-bold px-1 rounded">10 Features</span>
                    </div>
                    <span className="text-[10px] text-amber-800 block">{language === 'mr' ? 'वंचित वाड्या शोध, पूर धोका व स्थान शिफारस' : 'Underserved detection, flood risk & site AI'}</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    navigateTo('village-3d');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-emerald-50 flex items-center gap-2.5 text-stone-800 border-t border-stone-100 transition-colors"
                >
                  <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold">3D</span>
                  </div>
                  <div>
                    <span className="font-semibold block text-stone-900">{language === 'mr' ? '३डी डिजिटल ट्विन' : '3D Spatial Twin'}</span>
                    <span className="text-[10px] text-emerald-700 block">{language === 'mr' ? 'Three.js मॉडेल व इन्फ्रास्ट्रक्चर' : 'Three.js Rural Infrastructure'}</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Services Dropdown */}
          <div ref={servicesRef} className="relative">
            <button
              onClick={() => toggleDropdown('services')}
              className={`flex items-center gap-1 py-1 hover:text-orange-700 transition-colors ${
                ['schemes', 'village-facilities', 'apply-document'].includes(currentPage)
                  ? 'text-orange-800 font-bold'
                  : ''
              }`}
            >
              <span>{language === 'mr' ? 'सुविधा व दाखले' : 'Services & Docs'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-amber-600" />
            </button>

            {openDropdown === 'services' && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-amber-200 rounded-xl shadow-xl py-2 z-50 text-xs ring-1 ring-black/5">
                <button
                  onClick={() => {
                    navigateTo('apply-document');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-emerald-50 flex items-center gap-2.5 text-stone-800 transition-colors"
                >
                  <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold block text-stone-900">{language === 'mr' ? 'दाखले व प्रमाणपत्रे अर्ज करा' : 'Apply for Documents'}</span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1 rounded">RTS 2015</span>
                    </div>
                    <span className="text-[10px] text-stone-500 block">{language === 'mr' ? 'रहिवासी, जन्म, मृत्यू, उत्पन्न व ७/१२' : 'Residence, birth, income, 7/12 & NOC'}</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    navigateTo('schemes');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-amber-50 flex items-center gap-2.5 text-stone-800 border-t border-stone-100 transition-colors"
                >
                  <div className="w-6 h-6 rounded bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold block text-stone-900">{language === 'mr' ? 'शासकीय योजना' : 'Government Schemes'}</span>
                    <span className="text-[10px] text-stone-500 block">{language === 'mr' ? 'शेतकरी, महिला, विद्यार्थी योजना' : 'Farmers, women & youth grants'}</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    navigateTo('village-facilities');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-teal-50 flex items-center gap-2.5 text-stone-800 border-t border-stone-100 transition-colors"
                >
                  <div className="w-6 h-6 rounded bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                    <Building2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold block text-stone-900">{language === 'mr' ? 'सार्वजनिक सुविधा' : 'Public Facilities'}</span>
                    <span className="text-[10px] text-stone-500 block">{language === 'mr' ? 'शाळा, दवाखाने, पाणी, बँकिंग' : 'Schools, clinics, water, banking'}</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Development */}
          <button
            onClick={() => navigateTo('village-development')}
            className={`transition-colors py-1 hover:text-orange-700 relative ${
              currentPage === 'village-development' ? 'text-orange-800 font-bold' : ''
            }`}
          >
            {t.navDevelopment}
            {currentPage === 'village-development' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full" />
            )}
          </button>

          {/* Elections & Governance Work */}
          <button
            onClick={() => navigateTo('village-governance')}
            className={`transition-colors py-1 hover:text-orange-700 relative flex items-center gap-1 ${
              currentPage === 'village-governance' ? 'text-orange-800 font-bold' : ''
            }`}
          >
            <span>{language === 'mr' ? 'निवडणूक व कामे' : 'Elections & Work'}</span>
            {currentPage === 'village-governance' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full" />
            )}
          </button>

          {/* Report Issue Dropdown */}
          <div ref={reportRef} className="relative">
            <button
              onClick={() => toggleDropdown('report')}
              className={`flex items-center gap-1 py-1 hover:text-orange-700 transition-colors ${
                ['report-issue', 'track-issue'].includes(currentPage)
                  ? 'text-orange-800 font-bold'
                  : ''
              }`}
            >
              <span>{t.navReportIssue}</span>
              <ChevronDown className="w-3.5 h-3.5 text-amber-600" />
            </button>

            {openDropdown === 'report' && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-rose-200 rounded-xl shadow-xl py-2 z-50 text-xs ring-1 ring-black/5">
                <button
                  onClick={() => {
                    navigateTo('report-issue');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-rose-50 flex items-center gap-2.5 text-stone-800 transition-colors"
                >
                  <div className="w-6 h-6 rounded bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold block text-stone-900">{t.navReportIssue}</span>
                    <span className="text-[10px] text-stone-500 block">{language === 'mr' ? 'रस्ते, पाणी, वीज समस्या' : 'Submit road, water issues'}</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    navigateTo('track-issue');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-stone-50 flex items-center gap-2.5 text-stone-800 border-t border-stone-100 transition-colors"
                >
                  <div className="w-6 h-6 rounded bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold block text-stone-900">{t.navTrackIssue}</span>
                    <span className="text-[10px] text-stone-500 block">{language === 'mr' ? 'नोंदणी आयडीने स्थिती तपासा' : 'Check status by tracking ID'}</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* 🌐 3D Digital Twin */}
          <button
            onClick={() => navigateTo('village-3d')}
            className={`transition-colors py-1 hover:text-emerald-800 text-xs font-semibold relative ${
              currentPage === 'village-3d' ? 'text-emerald-900 font-bold' : 'text-stone-700'
            }`}
          >
            <span>{language === 'mr' ? '३डी ट्विन' : '3D Twin'}</span>
            {currentPage === 'village-3d' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
            )}
          </button>

          {/* ✨ AI GIS & Facility Location Decision Suite */}
          <button
            onClick={() => navigateTo('gis-planner')}
            className={`transition-colors py-1 hover:text-amber-800 text-xs font-semibold relative flex items-center gap-1 ${
              currentPage === 'gis-planner' ? 'text-amber-900 font-bold' : 'text-stone-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{language === 'mr' ? 'AI जीआयएस' : 'GIS Suite'}</span>
            <span className="text-[9px] bg-amber-200 text-amber-950 font-bold px-1 rounded">10</span>
            {currentPage === 'gis-planner' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
            )}
          </button>

          {/* 🧠 AI & ML Research Lab */}
          <button
            onClick={() => navigateTo('ml-analytics')}
            className={`transition-colors py-1 hover:text-indigo-800 text-xs font-semibold relative ${
              currentPage === 'ml-analytics' ? 'text-indigo-900 font-bold' : 'text-stone-700'
            }`}
          >
            <span>{language === 'mr' ? 'AI व ML लॅब' : 'AI & ML Lab'}</span>
            {currentPage === 'ml-analytics' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
            )}
          </button>

          {/* 🎓 Project Defense for Sir */}
          <button
            onClick={() => navigateTo('presentation')}
            className={`transition-colors py-1 hover:text-amber-800 text-xs font-semibold relative ${
              currentPage === 'presentation' ? 'text-amber-900 font-bold' : 'text-stone-700'
            }`}
          >
            <span>{language === 'mr' ? 'प्रकल्प सादरीकरण' : 'Project Defense (Sir)'}</span>
            {currentPage === 'presentation' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: Actions (PWA Offline Install + Language Toggle + Search) */}
        <div className="flex items-center gap-2">
          {/* PWA Offline Install Button */}
          <div className="hidden sm:block">
            <PWAInstallButton variant="nav" />
          </div>

          {/* Language Toggle - Crisp Segmented Control (English first) */}
          <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200 shadow-2xs">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                language === 'en'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLanguage('mr')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                language === 'mr'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              मराठी
            </button>
          </div>

          {/* Search Shortcut */}
          <button
            onClick={() => navigateTo('search')}
            aria-label="Search village"
            className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors border border-stone-200"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="lg:hidden p-2 text-stone-700 hover:text-orange-700 hover:bg-orange-50 rounded-lg"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 shadow-xl space-y-2">
          <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 flex items-center justify-between mb-2">
            <div>
              <span className="font-semibold text-xs text-stone-900 block">
                {language === 'mr' ? 'ऑफलाइन ॲप वापरा' : 'Offline Access Ready'}
              </span>
              <span className="text-[11px] text-stone-600 block">
                {language === 'mr' ? 'इंटरनेट नसतानाही मेढशी व इतर गावे चालेल' : 'Works without mobile data or WiFi'}
              </span>
            </div>
            <PWAInstallButton variant="nav" />
          </div>
          <button
            onClick={() => {
              navigateTo('home');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded hover:bg-stone-50"
          >
            {t.navHome}
          </button>

          <button
            onClick={() => {
              navigateTo('search');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded hover:bg-stone-50"
          >
            {language === 'mr' ? 'गाव शोधा (Find Village)' : 'Find Village'}
          </button>

          <button
            onClick={() => {
              navigateTo('village-overview');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded hover:bg-stone-50"
          >
            {language === 'mr' ? 'गावाची माहिती (Village Overview)' : 'Village Overview'}
          </button>

          <button
            onClick={() => {
              navigateTo('village-governance');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-bold text-orange-900 bg-orange-50/80 rounded hover:bg-orange-100/80"
          >
            🗳️ {language === 'mr' ? 'निवडणूक निकाल व कामकाज (Elections & Work)' : 'Elections & Governance Work'}
          </button>

          <button
            onClick={() => {
              navigateTo('apply-document');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-bold text-emerald-950 bg-emerald-50/90 border border-emerald-300 rounded hover:bg-emerald-100/90 flex items-center justify-between"
          >
            <span>📜 {language === 'mr' ? 'दाखले अर्ज करा (ई-सेवा RTS)' : 'Apply for Documents (RTS)'}</span>
            <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded font-mono font-bold">10 Services</span>
          </button>

          <button
            onClick={() => {
              navigateTo('schemes');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded hover:bg-stone-50"
          >
            {t.navSchemes}
          </button>

          <button
            onClick={() => {
              navigateTo('village-development');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded hover:bg-stone-50"
          >
            {t.navDevelopment}
          </button>

          <button
            onClick={() => {
              navigateTo('village-facilities');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded hover:bg-stone-50"
          >
            {t.navFacilities}
          </button>

          <button
            onClick={() => {
              navigateTo('report-issue');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded hover:bg-stone-50"
          >
            {t.navReportIssue}
          </button>

          <button
            onClick={() => {
              navigateTo('track-issue');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded hover:bg-stone-50"
          >
            {t.navTrackIssue}
          </button>

          <button
            onClick={() => {
              navigateTo('gis-planner');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-bold rounded bg-amber-50 text-amber-950 border border-amber-300 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>{language === 'mr' ? '✨ AI जीआयएस व सुविधा नियोजन कक्ष' : '✨ AI GIS & Facility Location Planner'}</span>
            </span>
            <span className="text-[10px] font-mono bg-amber-200 text-amber-950 px-1.5 py-0.5 rounded font-bold">10 Features</span>
          </button>

          <button
            onClick={() => {
              navigateTo('village-3d');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-bold rounded bg-emerald-50 text-emerald-950 border border-emerald-300 flex items-center justify-between"
          >
            <span>{language === 'mr' ? '🌐 ३डी डिजिटल ट्विन (Three.js)' : '🌐 3D Digital Twin (Three.js)'}</span>
            <span className="text-[10px] font-mono bg-emerald-200 text-emerald-950 px-1.5 py-0.5 rounded font-bold">Live PBR</span>
          </button>

          <button
            onClick={() => {
              navigateTo('presentation');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-bold rounded bg-amber-50 text-amber-950 border border-amber-300 flex items-center justify-between"
          >
            <span>{language === 'mr' ? '🎓 प्रकल्प सादरीकरण (Project Defense)' : '🎓 Project Defense for Sir'}</span>
            <span className="text-[10px] font-mono bg-amber-200 text-amber-950 px-1.5 py-0.5 rounded font-bold">Sem VII Viva</span>
          </button>

          <button
            onClick={() => {
              navigateTo('ml-analytics');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-bold rounded bg-indigo-50 text-indigo-900 border border-indigo-200 flex items-center justify-between"
          >
            <span>{language === 'mr' ? '🧠 AI व ML लॅब (कॉलेज प्रोजेक्ट)' : '🧠 AI & ML Research Lab'}</span>
            <span className="text-[10px] font-mono bg-indigo-200 text-indigo-950 px-1.5 py-0.5 rounded">Python & ML</span>
          </button>

          <button
            onClick={() => {
              navigateTo('ai-chat');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-bold rounded bg-amber-50 text-amber-950 border border-amber-300 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-amber-600" />
              <span>{language === 'mr' ? '🤖 जेमिनी चॅटबॉट (४ रोल्स)' : '🤖 Gemini Multi-Turn Chatbot'}</span>
            </span>
            <span className="text-[10px] font-mono bg-amber-200 text-amber-950 px-1.5 py-0.5 rounded font-bold">
              3.8 Flash
            </span>
          </button>

          <button
            onClick={() => {
              navigateTo('about');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded hover:bg-stone-50 text-stone-500"
          >
            {language === 'mr' ? 'डेटा स्रोत व अस्वीकरण' : 'Data Sources & Disclaimer'}
          </button>
        </div>
      )}
    </header>
  );
};
