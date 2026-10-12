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
  ExternalLink
} from 'lucide-react';

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
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-amber-100 shadow-xs">
      {/* Vibrant Maharashtra Cultural Ribbon */}
      <div className="bg-gradient-to-r from-orange-700 via-amber-600 to-emerald-800 text-white text-[11px] py-1.5 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-300 ring-2 ring-white/30 animate-pulse" />
            <span className="font-semibold tracking-wide text-white drop-shadow-xs">
              {language === 'mr'
                ? '🚩 ग्राम दृष्टी · ग्रामीण महाराष्ट्र माहिती व विकास व्यासपीठ · सार्वजनिक डेटा संच संदर्भ'
                : '🚩 Gram Drishti · Rural Maharashtra Information & Development Platform · Public Datasets'}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-amber-100 font-medium text-xs">
            <span className="text-amber-200">
              {language === 'mr' ? 'नागरिक संदर्भ कक्ष' : 'Citizen Reference Desk'}
            </span>
            <span aria-hidden="true" className="text-amber-300/60">·</span>
            <button
              onClick={() => navigateTo('about')}
              className="hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              {language === 'mr' ? 'डेटा स्रोत व पारदर्शकता' : 'Data Sources & Transparency'}
            </button>
            <span aria-hidden="true" className="text-amber-300/60">·</span>
            <button
              onClick={() => navigateTo('admin')}
              className="hover:text-white transition-colors bg-white/10 px-2 py-0.5 rounded border border-white/20"
            >
              {language === 'mr' ? 'प्रशासकीय कक्ष' : 'Admin'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar: 3 Zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Wordmark with Saffron-Gold Emblem */}
        <button
          onClick={() => navigateTo('home')}
          className="text-left group focus-visible:outline-none flex items-center gap-2.5"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-orange-600 via-amber-500 to-orange-700 text-white flex items-center justify-center font-bold text-sm rounded-lg shadow-sm ring-2 ring-amber-300/80 group-hover:scale-105 transition-transform">
            ग़
          </div>
          <div>
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-orange-700 via-amber-700 to-emerald-800 bg-clip-text text-transparent group-hover:from-orange-600 group-hover:to-emerald-700 transition-colors whitespace-nowrap font-serif">
              {language === 'mr' ? 'ग्राम दृष्टी' : 'Gram Drishti'}
            </span>
            <span className="hidden sm:block text-[10px] font-semibold text-emerald-800 uppercase tracking-widest -mt-1 font-mono">
              {language === 'mr' ? 'महाराष्ट्र ग्रामीण पोर्टल' : 'Maharashtra Rural Portal'}
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
              </div>
            )}
          </div>

          {/* Services Dropdown */}
          <div ref={servicesRef} className="relative">
            <button
              onClick={() => toggleDropdown('services')}
              className={`flex items-center gap-1 py-1 hover:text-orange-700 transition-colors ${
                ['schemes', 'village-facilities'].includes(currentPage)
                  ? 'text-orange-800 font-bold'
                  : ''
              }`}
            >
              <span>{language === 'mr' ? 'सुविधा व योजना' : 'Services'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-amber-600" />
            </button>

            {openDropdown === 'services' && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-amber-200 rounded-xl shadow-xl py-2 z-50 text-xs ring-1 ring-black/5">
                <button
                  onClick={() => {
                    navigateTo('schemes');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-amber-50 flex items-center gap-2.5 text-stone-800 transition-colors"
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
        </nav>

        {/* Zone 3: 2 Primary Actions (Ask Gram Mitra + Language Toggle) */}
        <div className="flex items-center gap-3">
          {/* Ask Gram Mitra Button - Vibrant Saffron-Marigold */}
          <button
            onClick={() => setIsAiModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 hover:from-orange-700 hover:to-amber-600 rounded-full transition-all whitespace-nowrap shadow-sm hover:shadow-md ring-1 ring-orange-400"
            title="Ask Gram Mitra AI"
          >
            <span className="text-sm">🤖</span>
            <span>{language === 'mr' ? 'ग्राम मित्राला विचारा' : 'Ask Gram Mitra'}</span>
          </button>

          {/* Language Toggle */}
          <div className="flex items-center bg-amber-50 p-0.5 rounded-lg border border-amber-200">
            <button
              type="button"
              onClick={() => setLanguage('mr')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                language === 'mr'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs'
                  : 'text-stone-700 hover:text-orange-800'
              }`}
            >
              मराठी
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                language === 'en'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs'
                  : 'text-stone-700 hover:text-orange-800'
              }`}
            >
              English
            </button>
          </div>

          {/* Search Shortcut */}
          <button
            onClick={() => navigateTo('search')}
            aria-label="Search village"
            className="p-2 text-stone-700 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors border border-transparent hover:border-orange-200"
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
