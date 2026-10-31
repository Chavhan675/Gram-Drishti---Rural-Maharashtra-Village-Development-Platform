import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  FileText,
  CheckCircle2,
  Clock,
  Download,
  Printer,
  Search,
  Filter,
  ShieldCheck,
  Building2,
  Phone,
  Home,
  Baby,
  DollarSign,
  Layers,
  HeartHandshake,
  Sparkles,
  Award,
  Users,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  QrCode,
  Calendar,
  Check,
  Copy,
  ChevronRight,
  X
} from 'lucide-react';
import { DocumentTypeInfo, CitizenDocumentApplication } from '../types';

export const ApplyDocumentPage: React.FC = () => {
  const {
    language,
    selectedVillage,
    allVillages,
    setSelectedVillageId,
    documentTypes,
    documentApplications,
    applyForDocument,
    updateDocumentStatus,
    navigateTo
  } = useApp();

  const t = getTranslation(language);

  const [activeTab, setActiveTab] = useState<'apply' | 'track'>('apply');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [trackingSearchTerm, setTrackingSearchTerm] = useState<string>('');

  // Selected document to apply for
  const [selectedDocForApply, setSelectedDocForApply] = useState<DocumentTypeInfo | null>(null);

  // Application form state
  const [applicantName, setApplicantName] = useState<string>('');
  const [applicantAadhaar, setApplicantAadhaar] = useState<string>('');
  const [applicantPhone, setApplicantPhone] = useState<string>('');
  const [applicantAddress, setApplicantAddress] = useState<string>('');
  const [wardNumber, setWardNumber] = useState<number>(1);
  const [purpose, setPurpose] = useState<string>('');
  const [urgency, setUrgency] = useState<'normal' | 'urgent'>('normal');
  const [deliveryMode, setDeliveryMode] = useState<'digital-download' | 'gram-panchayat-counter' | 'post'>('digital-download');
  const [checkedDocs, setCheckedDocs] = useState<string[]>([]);
  const [simulatedFileUploaded, setSimulatedFileUploaded] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');

  // Submission success receipt modal
  const [submittedReceipt, setSubmittedReceipt] = useState<CitizenDocumentApplication | null>(null);
  const [copiedId, setCopiedId] = useState<boolean>(false);

  // Certificate view modal
  const [viewingCertificate, setViewingCertificate] = useState<CitizenDocumentApplication | null>(null);

  const vName = language === 'mr' ? selectedVillage.nameMr : selectedVillage.nameEn;
  const tName = language === 'mr' ? selectedVillage.talukaMr : selectedVillage.talukaEn;
  const dName = language === 'mr' ? selectedVillage.districtMr : selectedVillage.districtEn;
  const admin = selectedVillage.administration;

  const categories = [
    { id: 'all', labelMr: 'सर्व दाखले (१०)', labelEn: 'All Documents (10)' },
    { id: 'civil', labelMr: 'रहिवासी व जन्म-मृत्यू', labelEn: 'Civil & Vital Records' },
    { id: 'revenue', labelMr: 'महसूल, ७/१२ व उत्पन्न', labelEn: 'Revenue, 7/12 & Income' },
    { id: 'noc', labelMr: 'ना-हरकत (NOC)', labelEn: 'NOC & Utilities' },
    { id: 'welfare', labelMr: 'कल्याण व अनुदान', labelEn: 'Welfare & Subsidy' }
  ];

  const filteredDocTypes = documentTypes.filter((doc) => {
    const matchesCat = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch =
      searchTerm.trim() === '' ||
      doc.nameMr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.shortDescMr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.shortDescEn.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredApplications = documentApplications.filter((app) => {
    if (!trackingSearchTerm.trim()) return true;
    const q = trackingSearchTerm.toLowerCase();
    return (
      app.id.toLowerCase().includes(q) ||
      app.applicantPhone.includes(q) ||
      app.applicantName.toLowerCase().includes(q) ||
      app.documentNameMr.toLowerCase().includes(q) ||
      app.documentNameEn.toLowerCase().includes(q)
    );
  });

  const handleStartApply = (doc: DocumentTypeInfo) => {
    setSelectedDocForApply(doc);
    setApplicantAddress(`प्रभाग १, ${vName}`);
    setCheckedDocs([]);
    setSimulatedFileUploaded(false);
    setFormError('');
  };

  const handleToggleDocCheck = (docName: string) => {
    setCheckedDocs((prev) =>
      prev.includes(docName) ? prev.filter((d) => d !== docName) : [...prev, docName]
    );
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDocForApply) return;

    if (!applicantName.trim()) {
      setFormError(language === 'mr' ? 'कृपया अर्जदाराचे पूर्ण नाव प्रविष्ट करा.' : 'Please enter applicant full name.');
      return;
    }
    if (!applicantPhone.trim() || applicantPhone.replace(/\D/g, '').length < 10) {
      setFormError(language === 'mr' ? 'कृपया १० अंकी वैध मोबाईल नंबर प्रविष्ट करा.' : 'Please enter a valid 10-digit mobile number.');
      return;
    }
    if (applicantAadhaar.trim() && applicantAadhaar.replace(/\D/g, '').length < 12) {
      setFormError(language === 'mr' ? 'कृपया १२ अंकी वैध आधार नंबर प्रविष्ट करा.' : 'Please enter a valid 12-digit Aadhaar number.');
      return;
    }

    const trackingId = applyForDocument({
      villageId: selectedVillage.id,
      documentTypeId: selectedDocForApply.id,
      applicantName,
      applicantAadhaar: applicantAadhaar.trim() || '123456789012',
      applicantPhone,
      applicantAddress: applicantAddress || `${vName}`,
      wardNumber,
      purpose: purpose || (language === 'mr' ? 'शासकीय व वैयक्तिक कामासाठी' : 'Official & Personal Verification'),
      urgency,
      deliveryMode,
      attachedDocs: checkedDocs.length > 0 ? checkedDocs : selectedDocForApply.requiredDocsMr.slice(0, 2)
    });

    // Find the newly submitted application
    const app = documentApplications.find((a) => a.id === trackingId) || {
      id: trackingId,
      villageId: selectedVillage.id,
      villageNameMr: selectedVillage.nameMr,
      villageNameEn: selectedVillage.nameEn,
      documentTypeId: selectedDocForApply.id,
      documentNameMr: selectedDocForApply.nameMr,
      documentNameEn: selectedDocForApply.nameEn,
      applicantName,
      applicantAadhaar: `XXXX-XXXX-${applicantAadhaar.slice(-4) || '7890'}`,
      applicantPhone,
      applicantAddress,
      wardNumber,
      purpose,
      urgency,
      deliveryMode,
      attachedDocs: checkedDocs,
      status: 'submitted',
      submittedAt: new Date().toLocaleDateString('mr-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      estimatedDeliveryDate: new Date(Date.now() + selectedDocForApply.serviceDays * 86400000).toLocaleDateString('mr-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      assignedOfficerNameMr: selectedDocForApply.category === 'revenue' ? admin.talathiNameMr : admin.gramSevakNameMr,
      assignedOfficerNameEn: selectedDocForApply.category === 'revenue' ? admin.talathiNameEn : admin.gramSevakNameEn,
      assignedOfficerContact: selectedDocForApply.category === 'revenue' ? admin.talathiContact : admin.gramSevakContact
    } as CitizenDocumentApplication;

    setSubmittedReceipt(app);
    setSelectedDocForApply(null);
    setApplicantName('');
    setApplicantAadhaar('');
    setApplicantPhone('');
    setPurpose('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const getDocIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return Home;
      case 'Baby':
        return Baby;
      case 'FileText':
        return FileText;
      case 'DollarSign':
        return DollarSign;
      case 'Layers':
        return Layers;
      case 'HeartHandshake':
        return HeartHandshake;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Sparkles':
        return Sparkles;
      case 'Award':
        return Award;
      default:
        return FileText;
    }
  };

  const getStatusBadge = (status: CitizenDocumentApplication['status']) => {
    switch (status) {
      case 'submitted':
        return {
          label: language === 'mr' ? 'अर्ज दाखल (Submitted)' : 'Submitted',
          bg: 'bg-blue-100 text-blue-900 border-blue-300'
        };
      case 'under-scrutiny':
        return {
          label: language === 'mr' ? 'कागदपत्रे तपासणी सुरू (Under Scrutiny)' : 'Under Scrutiny',
          bg: 'bg-amber-100 text-amber-900 border-amber-300'
        };
      case 'ready-for-download':
      case 'approved':
        return {
          label: language === 'mr' ? '✓ मंजूर व डाऊनलोड सज्ज (Approved & Issued)' : 'Approved & Issued',
          bg: 'bg-emerald-100 text-emerald-900 border-emerald-300'
        };
      case 'rejected':
        return {
          label: language === 'mr' ? 'अस्वीकृत (Rejected)' : 'Rejected',
          bg: 'bg-rose-100 text-rose-900 border-rose-300'
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-20">
      <Breadcrumbs
        items={[
          { label: dName },
          { label: tName },
          { label: vName, page: 'village-overview' },
          { label: language === 'mr' ? 'दाखले व ई-सेवा अर्ज' : 'Apply Documents' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page Top Header with RTS Guarantee Ribbon */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-amber-200 pb-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/90 px-3 py-0.5 rounded-full border border-emerald-300 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                {language === 'mr'
                  ? 'महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५ (RTS) हमी'
                  : 'Maharashtra Right to Public Services Act (RTS 2015)'}
              </span>
              <span className="text-xs text-orange-900 font-mono font-bold bg-orange-100/80 px-2 py-0.5 rounded border border-orange-200">
                ⚡ {language === 'mr' ? 'विनाअडथळा घरबसल्या अर्ज' : 'Zero-Hassle Direct Application'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-stone-950 font-serif tracking-tight">
              {vName} — {language === 'mr' ? 'ग्राम ई-सेवा व दाखले अर्ज केंद्र' : 'Citizen Document & Certificate Desk'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl">
              {language === 'mr'
                ? 'गावातील नागरिकांसाठी रहिवासी दाखला, जन्म-मृत्यू नोंद, डिजिटल ७/१२, उत्पन्नाचा दाखला, नाहरकत (NOC) व घरकुल/शौचालय अनुदानासाठी विहित मुदतीत सुलभ अर्ज व डिजिटल डाऊनलोड.'
                : 'Direct digital application desk for village residents to request domicile/residence, birth/death records, digital 7/12 land extracts, income certs, and utility NOCs with official tracking.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Village Selector Dropdown */}
            <div className="flex items-center gap-1.5 bg-white border border-amber-300 rounded-xl px-3 py-1.5 shadow-2xs">
              <span className="text-[11px] text-stone-500 font-semibold">{language === 'mr' ? 'गाव निवडा:' : 'Village:'}</span>
              <select
                aria-label={language === 'mr' ? 'गाव निवडा' : 'Select Village'}
                value={selectedVillage.id}
                onChange={(e) => setSelectedVillageId(e.target.value)}
                className="text-xs font-bold text-stone-900 bg-transparent focus:outline-none cursor-pointer"
              >
                {allVillages.map((v) => (
                  <option key={v.id} value={v.id}>
                    {language === 'mr' ? v.nameMr : v.nameEn} ({language === 'mr' ? v.districtMr : v.districtEn})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => navigateTo('village-overview')}
              className="px-4 py-1.5 bg-white hover:bg-amber-50 border border-amber-300 text-stone-800 text-xs font-bold rounded-xl transition-all shadow-2xs cursor-pointer"
            >
              {t.back}
            </button>
          </div>
        </div>

        {/* Responsible Village Desks Ribbon (Gram Sevak & Talathi) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Gram Sevak Desk */}
          <div className="p-4 bg-gradient-to-r from-emerald-50 via-white to-amber-50/50 rounded-2xl border border-emerald-200/90 shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-800 uppercase font-mono block">
                  {language === 'mr' ? 'नागरी दाखले व ग्रामपंचायत डेस्क' : 'Gram Panchayat Civil Certificates'}
                </span>
                <span className="font-bold text-stone-950 text-sm">
                  {language === 'mr' ? admin.gramSevakNameMr : admin.gramSevakNameEn}
                </span>
                <span className="text-[11px] text-stone-500 block">
                  {language === 'mr' ? 'ग्रामसेवक / ग्रामविकास अधिकारी' : 'Gram Sevak / Executive Officer'}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-stone-700 flex items-center gap-1 font-mono text-xs font-semibold">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>{admin.gramSevakContact}</span>
              </span>
              <span className="text-[10px] text-stone-500 block mt-0.5">
                {language === 'mr' ? 'रहिवासी, जन्म, मृत्यू, NOC' : 'Residence, Birth, Death, NOC'}
              </span>
            </div>
          </div>

          {/* Talathi Desk */}
          <div className="p-4 bg-gradient-to-r from-blue-50 via-white to-amber-50/50 rounded-2xl border border-blue-200/90 shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-blue-800 uppercase font-mono block">
                  {language === 'mr' ? 'महसूल व शेती दाखले डेस्क' : 'Revenue & Land Records Desk'}
                </span>
                <span className="font-bold text-stone-950 text-sm">
                  {language === 'mr' ? admin.talathiNameMr : admin.talathiNameEn}
                </span>
                <span className="text-[11px] text-stone-500 block">
                  {language === 'mr' ? 'तलाठी (सजा कार्यालय)' : 'Talathi (Revenue Officer)'}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-stone-700 flex items-center gap-1 font-mono text-xs font-semibold">
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>{admin.talathiContact}</span>
              </span>
              <span className="text-[10px] text-stone-500 block mt-0.5">
                {language === 'mr' ? '७/१२, ८-अ, उत्पन्न दाखला' : '7/12, 8-A, Income Certificate'}
              </span>
            </div>
          </div>
        </div>

        {/* Primary Tab Switcher */}
        <div className="flex border-b border-amber-200 gap-4">
          <button
            onClick={() => setActiveTab('apply')}
            className={`pb-3 text-sm font-bold transition-all relative flex items-center gap-2 cursor-pointer ${
              activeTab === 'apply' ? 'text-orange-900 font-extrabold' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <FileText className="w-4 h-4 text-orange-600" />
            <span>{language === 'mr' ? '१. नवीन दाखल्यासाठी अर्ज करा' : '1. Apply for New Certificate'}</span>
            {activeTab === 'apply' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('track')}
            className={`pb-3 text-sm font-bold transition-all relative flex items-center gap-2 cursor-pointer ${
              activeTab === 'track' ? 'text-orange-900 font-extrabold' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Clock className="w-4 h-4 text-orange-600" />
            <span>{language === 'mr' ? '२. अर्जाची स्थिती व दाखला डाऊनलोड' : '2. Track & Download Certificate'}</span>
            <span className="text-[10px] bg-orange-100 text-orange-900 font-mono px-2 py-0.5 rounded-full font-bold">
              {documentApplications.length}
            </span>
            {activeTab === 'track' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full" />
            )}
          </button>
        </div>

        {/* TAB 1: APPLY FOR NEW DOCUMENT */}
        {activeTab === 'apply' && (
          <div className="space-y-6">
            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-orange-700 text-white shadow-2xs font-bold'
                        : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                    }`}
                  >
                    {language === 'mr' ? cat.labelMr : cat.labelEn}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={language === 'mr' ? 'दाखल्याचे नाव शोधा...' : 'Search certificate name...'}
                  className="pl-8 pr-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-400 w-full sm:w-64 shadow-2xs"
                />
              </div>
            </div>

            {/* Document Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocTypes.map((doc) => {
                const IconComp = getDocIcon(doc.iconName);
                return (
                  <div
                    key={doc.id}
                    className="p-5 bg-white rounded-2xl border border-stone-200 hover:border-amber-400 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-orange-100/80 text-orange-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-mono">
                          ⏱️ {doc.serviceDays} {language === 'mr' ? 'दिवसात हमी' : 'Days RTS Guarantee'}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-stone-950 font-serif leading-snug group-hover:text-orange-950 transition-colors">
                          {language === 'mr' ? doc.nameMr : doc.nameEn}
                        </h3>
                        <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                          {language === 'mr' ? doc.shortDescMr : doc.shortDescEn}
                        </p>
                      </div>

                      {/* Required Docs Preview */}
                      <div className="p-3 bg-stone-50 rounded-xl text-[11px] space-y-1.5 text-stone-700 border border-stone-100">
                        <span className="text-[10px] text-stone-500 font-bold uppercase font-mono block">
                          {language === 'mr' ? '📋 आवश्यक कागदपत्रे:' : '📋 Required Documents:'}
                        </span>
                        <ul className="space-y-0.5">
                          {(language === 'mr' ? doc.requiredDocsMr : doc.requiredDocsEn).slice(0, 2).map((rd, i) => (
                            <li key={i} className="flex items-center gap-1.5 truncate">
                              <span className="w-1 h-1 rounded-full bg-orange-600 shrink-0" />
                              <span className="truncate">{rd}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                      <div className="text-stone-600">
                        <span className="text-[10px] text-stone-500 block font-mono">
                          {language === 'mr' ? 'शासकीय शुल्क' : 'Govt Fee'}
                        </span>
                        <span className="font-bold text-stone-900 font-mono">
                          {doc.governmentFee === 0 ? (language === 'mr' ? 'विनामूल्य (Free)' : 'Free') : `₹${doc.governmentFee}`}
                        </span>
                      </div>

                      <button
                        onClick={() => handleStartApply(doc)}
                        className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold rounded-xl shadow-2xs hover:shadow transition-all inline-flex items-center gap-1.5 cursor-pointer text-xs"
                      >
                        <span>{language === 'mr' ? 'अर्ज करा' : 'Apply Now'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: TRACK & DOWNLOAD CERTIFICATE */}
        {activeTab === 'track' && (
          <div className="space-y-6">
            {/* Search Track Bar */}
            <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50/50 rounded-2xl border border-amber-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 w-full sm:w-auto">
                <h3 className="text-base font-bold text-stone-950 font-serif">
                  {language === 'mr' ? 'अर्ज ट्रॅक करा किंवा पावती शोधा' : 'Track Application Status by Tracking ID'}
                </h3>
                <p className="text-xs text-stone-600">
                  {language === 'mr'
                    ? 'आपला अर्ज क्रमांक (उदा. MH-RTS-2026-1042) किंवा मोबाईल नंबर टाकून स्थिती तपासा.'
                    : 'Enter your RTS tracking ID or 10-digit mobile number to verify progress.'}
                </p>
              </div>

              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={trackingSearchTerm}
                  onChange={(e) => setTrackingSearchTerm(e.target.value)}
                  placeholder={language === 'mr' ? 'उदा. MH-RTS-2026... किंवा मोबाईल' : 'e.g. MH-RTS-2026... or phone'}
                  className="pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-500 w-full shadow-xs"
                />
              </div>
            </div>

            {/* Applications List */}
            <div className="space-y-4">
              {filteredApplications.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-stone-300 space-y-3">
                  <FileText className="w-10 h-10 text-stone-300 mx-auto" />
                  <p className="text-sm font-semibold text-stone-700">
                    {language === 'mr' ? 'कोणताही अर्ज सापडला नाही.' : 'No document applications found matching search.'}
                  </p>
                  <button
                    onClick={() => setActiveTab('apply')}
                    className="px-4 py-2 bg-orange-700 text-white font-bold text-xs rounded-xl"
                  >
                    {language === 'mr' ? 'नवीन दाखल्यासाठी अर्ज करा' : 'Apply for a Document Now'}
                  </button>
                </div>
              ) : (
                filteredApplications.map((app) => {
                  const statusInfo = getStatusBadge(app.status);
                  const isReady = app.status === 'ready-for-download' || app.status === 'approved';

                  return (
                    <div
                      key={app.id}
                      className="p-6 bg-white rounded-2xl border border-amber-200 shadow-2xs hover:shadow-md transition-all space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono font-black text-orange-900 text-sm bg-orange-100/90 px-2.5 py-0.5 rounded border border-orange-300 flex items-center gap-1.5">
                              <span>{app.id}</span>
                              <button
                                onClick={() => copyToClipboard(app.id)}
                                title="Copy ID"
                                className="text-orange-700 hover:text-orange-950 cursor-pointer"
                              >
                                {copiedId ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                              </button>
                            </span>
                            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border font-mono ${statusInfo.bg}`}>
                              {statusInfo.label}
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-stone-950 font-serif pt-1">
                            {language === 'mr' ? app.documentNameMr : app.documentNameEn}
                          </h4>
                          <p className="text-xs text-stone-600">
                            {language === 'mr' ? 'अर्जदार:' : 'Applicant:'}{' '}
                            <strong className="text-stone-900">{app.applicantName}</strong> · {app.applicantPhone}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          {isReady ? (
                            <button
                              onClick={() => setViewingCertificate(app)}
                              className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all inline-flex items-center gap-1.5 cursor-pointer"
                            >
                              <Download className="w-4 h-4" />
                              <span>{language === 'mr' ? 'दाखला पहा व डाऊनलोड करा' : 'View & Download Certificate'}</span>
                            </button>
                          ) : (
                            <div className="text-right">
                              <span className="text-[10px] text-stone-500 block uppercase font-mono">
                                {language === 'mr' ? 'अपेक्षित पूर्तता दिनांक' : 'Estimated Delivery'}
                              </span>
                              <span className="font-mono font-bold text-stone-900 text-xs">
                                {app.estimatedDeliveryDate}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Stepper Status Bar */}
                      <div className="grid grid-cols-4 gap-2 pt-1 text-center text-[10px] font-mono">
                        <div className="space-y-1">
                          <div className="w-full bg-emerald-500 h-1.5 rounded-full" />
                          <span className="font-bold text-emerald-800">{language === 'mr' ? '१. अर्ज दाखल' : '1. Submitted'}</span>
                        </div>
                        <div className="space-y-1">
                          <div
                            className={`w-full h-1.5 rounded-full ${
                              app.status !== 'submitted' ? 'bg-emerald-500' : 'bg-stone-200'
                            }`}
                          />
                          <span
                            className={app.status !== 'submitted' ? 'font-bold text-emerald-800' : 'text-stone-400'}
                          >
                            {language === 'mr' ? '२. कागदपत्रे तपासणी' : '2. Scrutiny'}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div
                            className={`w-full h-1.5 rounded-full ${
                              isReady ? 'bg-emerald-500' : 'bg-stone-200'
                            }`}
                          />
                          <span className={isReady ? 'font-bold text-emerald-800' : 'text-stone-400'}>
                            {language === 'mr' ? '३. सही व मंजुरी' : '3. Approval'}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div
                            className={`w-full h-1.5 rounded-full ${
                              isReady ? 'bg-emerald-600' : 'bg-stone-200'
                            }`}
                          />
                          <span className={isReady ? 'font-black text-emerald-900' : 'text-stone-400'}>
                            {language === 'mr' ? '४. डाऊनलोड सज्ज' : '4. Issued'}
                          </span>
                        </div>
                      </div>

                      {/* Officer & Remarks Strip */}
                      <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-stone-100">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-stone-500 text-[11px]">
                            {language === 'mr' ? 'सक्षम अधिकारी:' : 'Assigned Desk:'}
                          </span>
                          <span className="font-bold text-stone-900">
                            {language === 'mr' ? app.assignedOfficerNameMr : app.assignedOfficerNameEn}
                          </span>
                          <span className="text-stone-500 font-mono text-[11px]">({app.assignedOfficerContact})</span>
                        </div>
                        <div className="text-stone-600 text-[11px] italic">
                          "{language === 'mr' ? app.officerRemarksMr : app.officerRemarksEn}"
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* MODAL 1: INTERACTIVE APPLICATION FORM MODAL */}
        {selectedDocForApply && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl border-2 border-amber-300 max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between border-b border-amber-200 pb-4">
                <div>
                  <span className="text-[11px] font-bold text-orange-800 bg-orange-100 px-2.5 py-0.5 rounded-full border border-orange-200 font-mono uppercase">
                    🚩 {language === 'mr' ? 'दाखला मागणी अर्ज' : 'Document Application Form'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-stone-950 font-serif mt-1">
                    {language === 'mr' ? selectedDocForApply.nameMr : selectedDocForApply.nameEn}
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5">
                    {language === 'mr'
                      ? `ग्रामपंचायत: ${selectedVillage.nameMr} · सक्षम अधिकारी: ${selectedDocForApply.authorityMr}`
                      : `Gram Panchayat: ${selectedVillage.nameEn} · Competent Officer: ${selectedDocForApply.authorityEn}`}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedDocForApply(null)}
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-300 text-rose-800 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleSubmitApplication} className="space-y-5 text-xs">
                {/* RTS Guaranteed SLA Strip */}
                <div className="p-3.5 bg-emerald-50/80 rounded-xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-950">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span className="font-bold">
                      {language === 'mr' ? 'हमी कालावधी (SLA):' : 'Guaranteed Delivery:'}{' '}
                      <span className="font-mono">{selectedDocForApply.serviceDays} {language === 'mr' ? 'कामाचे दिवस' : 'working days'}</span>
                    </span>
                  </div>
                  <span className="font-mono font-bold bg-white px-2.5 py-1 rounded border border-emerald-300">
                    {selectedDocForApply.governmentFee === 0
                      ? (language === 'mr' ? 'विनामूल्य' : 'Free')
                      : `₹${selectedDocForApply.governmentFee} Nominal Fee`}
                  </span>
                </div>

                {/* Applicant Info Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-stone-900 block">
                      {language === 'mr' ? 'अर्जदाराचे पूर्ण नाव *' : 'Applicant Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder={language === 'mr' ? 'उदा. रमेश ज्ञानोबा पाटील' : 'e.g. Ramesh Gyanoba Patil'}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-amber-500 font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone-900 block">
                      {language === 'mr' ? 'मोबाईल नंबर (SMS सूचनांसाठी) *' : 'Mobile Number (for SMS Alerts) *'}
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      placeholder={language === 'mr' ? 'उदा. 9822100000' : 'e.g. 9822100000'}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-stone-900 block">
                      {language === 'mr' ? 'आधार कार्ड नंबर (१२ अंक)' : 'Aadhaar Number (12 digits)'}
                    </label>
                    <input
                      type="text"
                      maxLength={12}
                      value={applicantAadhaar}
                      onChange={(e) => setApplicantAadhaar(e.target.value)}
                      placeholder={language === 'mr' ? '१२ अंकी आधार क्रमांक' : '12-digit Aadhaar number'}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone-900 block">
                      {language === 'mr' ? 'गावातील प्रभाग (वार्ड)' : 'Village Ward'}
                    </label>
                    <select
                      value={wardNumber}
                      onChange={(e) => setWardNumber(Number(e.target.value))}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-amber-500 font-medium"
                    >
                      {selectedVillage.election.wardMembers.map((w) => (
                        <option key={w.wardNumber} value={w.wardNumber}>
                          प्रभाग {w.wardNumber} — {language === 'mr' ? w.wardNameMr : w.wardNameEn}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-900 block">
                    {language === 'mr' ? 'दाखल्याचे प्रयोजन / कशासाठी आवश्यक आहे' : 'Purpose of Document Request'}
                  </label>
                  <input
                    type="text"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder={
                      language === 'mr'
                        ? 'उदा. बँक कर्ज, शाळा प्रवेश, शिष्यवृत्ती, वीज मीटर'
                        : 'e.g. Bank loan, School admission, Scholarship, Electricity meter'
                    }
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Urgency & Delivery Preference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1">
                    <label className="font-bold text-stone-900 block">
                      {language === 'mr' ? 'अर्जाचे प्राधान्य' : 'Urgency Level'}
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setUrgency('normal')}
                        className={`flex-1 p-2 rounded-xl border text-center transition-all cursor-pointer font-semibold ${
                          urgency === 'normal'
                            ? 'bg-amber-100 text-amber-900 border-amber-400 font-bold'
                            : 'bg-stone-50 text-stone-700 border-stone-200'
                        }`}
                      >
                        {language === 'mr' ? 'सर्वसाधारण (Normal)' : 'Normal'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setUrgency('urgent')}
                        className={`flex-1 p-2 rounded-xl border text-center transition-all cursor-pointer font-semibold ${
                          urgency === 'urgent'
                            ? 'bg-orange-600 text-white border-orange-700 font-bold'
                            : 'bg-stone-50 text-stone-700 border-stone-200'
                        }`}
                      >
                        {language === 'mr' ? 'तात्काळ (Tatkal)' : 'Urgent (Tatkal)'}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone-900 block">
                      {language === 'mr' ? 'दाखला मिळवण्याची पद्धत' : 'Delivery Preference'}
                    </label>
                    <select
                      value={deliveryMode}
                      onChange={(e) => setDeliveryMode(e.target.value as any)}
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-amber-500 font-medium"
                    >
                      <option value="digital-download">
                        {language === 'mr' ? '१००% डिजिटल डाऊनलोड (PDF)' : 'Digital Download (PDF Extract)'}
                      </option>
                      <option value="gram-panchayat-counter">
                        {language === 'mr' ? 'ग्रामपंचायत खिडकीतून प्रत्यक्ष पावती' : 'Collect from GP Office Counter'}
                      </option>
                      <option value="post">
                        {language === 'mr' ? 'घरपोच टपाल (Postal Delivery)' : 'Registered Post Delivery'}
                      </option>
                    </select>
                  </div>
                </div>

                {/* Required Documents Checklist */}
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <span className="font-bold text-stone-900 block">
                    {language === 'mr' ? 'कागदपत्रे तपासणी (माझ्याकडे उपलब्ध आहेत):' : 'Enclosed Documents Checklist:'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(language === 'mr' ? selectedDocForApply.requiredDocsMr : selectedDocForApply.requiredDocsEn).map((doc, idx) => (
                      <label
                        key={idx}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-colors ${
                          checkedDocs.includes(doc)
                            ? 'bg-amber-50/90 border-amber-300 text-stone-950 font-semibold'
                            : 'bg-stone-50 border-stone-200 text-stone-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checkedDocs.includes(doc)}
                          onChange={() => handleToggleDocCheck(doc)}
                          className="w-4 h-4 text-orange-600 rounded"
                        />
                        <span className="text-[11px] leading-tight">{doc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Simulated File Attachment */}
                <div className="p-3 bg-stone-50 rounded-xl border border-dashed border-stone-300 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-stone-600">
                    <FileText className="w-4 h-4 text-stone-400" />
                    <span>
                      {simulatedFileUploaded
                        ? (language === 'mr' ? '✓ आधार व रेशन कार्ड फाइल जोडली (aadhaar_doc.pdf)' : '✓ Attached: aadhaar_doc.pdf (1.2 MB)')
                        : (language === 'mr' ? 'कागदपत्रांची प्रत / फोटो जोडा (पर्यायी)' : 'Attach scanned documents/photo (optional)')}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSimulatedFileUploaded(!simulatedFileUploaded)}
                    className="px-3 py-1 bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    {simulatedFileUploaded ? (language === 'mr' ? 'काढून टाका' : 'Remove') : (language === 'mr' ? 'फाइल निवडा' : 'Select File')}
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedDocForApply(null)}
                    className="px-4 py-2 border border-stone-300 text-stone-700 hover:bg-stone-100 rounded-xl font-bold cursor-pointer"
                  >
                    {t.back}
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold rounded-xl shadow-sm hover:shadow transition-all inline-flex items-center gap-2 cursor-pointer text-xs"
                  >
                    <span>{language === 'mr' ? 'अर्ज अधिकृतपणे सादर करा' : 'Submit Official Application'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 2: APPLICATION SUBMISSION SUCCESS & RECEIPT */}
        {submittedReceipt && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl border-2 border-emerald-400 max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200 text-xs">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-stone-950 font-serif">
                  {language === 'mr' ? 'दाखला अर्ज यशस्वीरीत्या दाखल झाला!' : 'Application Submitted Successfully!'}
                </h3>
                <p className="text-xs text-stone-600">
                  {language === 'mr'
                    ? 'आपला अर्ज ग्रामपंचायत अभिलेखात नोंदवला गेला असून संबंधित अधिकाऱ्यांकडे तपासणीसाठी सोपवला आहे.'
                    : 'Your application has been registered with the local Gram Panchayat desk under RTS Act 2015.'}
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-3 font-mono">
                <div className="flex items-center justify-between pb-2 border-b border-amber-200/80">
                  <span className="text-stone-500 text-[11px] uppercase">
                    {language === 'mr' ? 'अर्ज नोंदणी क्रमांक (Tracking ID):' : 'Tracking Number:'}
                  </span>
                  <span className="font-black text-orange-900 text-sm flex items-center gap-1.5">
                    <span>{submittedReceipt.id}</span>
                    <button onClick={() => copyToClipboard(submittedReceipt.id)} className="cursor-pointer">
                      <Copy className="w-3.5 h-3.5 text-stone-500" />
                    </button>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-700">
                  <div>
                    <span className="text-stone-500 block">{language === 'mr' ? 'दाखल्याचे नाव:' : 'Document:'}</span>
                    <span className="font-bold text-stone-950 font-sans">
                      {language === 'mr' ? submittedReceipt.documentNameMr : submittedReceipt.documentNameEn}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">{language === 'mr' ? 'अर्जदार:' : 'Applicant:'}</span>
                    <span className="font-bold text-stone-950 font-sans">{submittedReceipt.applicantName}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-700 pt-1">
                  <div>
                    <span className="text-stone-500 block">{language === 'mr' ? 'सक्षम अधिकारी:' : 'Desk Officer:'}</span>
                    <span className="font-semibold text-stone-900 font-sans">
                      {language === 'mr' ? submittedReceipt.assignedOfficerNameMr : submittedReceipt.assignedOfficerNameEn}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">{language === 'mr' ? 'अपेक्षित पूर्तता:' : 'Expected Date:'}</span>
                    <span className="font-bold text-emerald-800">{submittedReceipt.estimatedDeliveryDate}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 flex items-center gap-2">
                <QrCode className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>
                  {language === 'mr'
                    ? 'आपल्या मोबाईलवर एसएमएस पोहच पावती पाठवण्यात आली आहे. आपण कोणत्याही वेळी "ट्रॅक" टॅबमध्ये प्रगती पाहू शकता.'
                    : 'SMS confirmation has been dispatched. You can track status anytime under the Track tab.'}
                </span>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-end gap-2.5">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 border border-stone-300 hover:bg-stone-100 text-stone-800 rounded-xl font-bold cursor-pointer flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'पावती प्रिंट करा' : 'Print Receipt'}</span>
                </button>

                <button
                  onClick={() => {
                    setSubmittedReceipt(null);
                    setActiveTab('track');
                  }}
                  className="px-5 py-2 bg-orange-700 hover:bg-orange-800 text-white rounded-xl font-bold cursor-pointer"
                >
                  {language === 'mr' ? 'स्थिती तपासा (Track Status)' : 'Track Application'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 3: OFFICIAL MAHARASHTRA CERTIFICATE PREVIEW & PRINT MODAL */}
        {viewingCertificate && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl border-4 border-amber-400 max-w-2xl w-full p-6 sm:p-10 shadow-2xl space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200 max-h-[95vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-amber-200">
                <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-300">
                  ✓ {language === 'mr' ? 'अधिकृत डिजिटल स्वाक्षरीकृत प्रमाणपत्र' : 'Official Digitally Signed Certificate'}
                </span>
                <button
                  onClick={() => setViewingCertificate(null)}
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Printable Certificate Template */}
              <div className="p-8 border-4 border-double border-amber-800/80 rounded-2xl bg-[#FFFDF7] space-y-6 text-stone-950 font-serif relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 opacity-5 pointer-events-none">
                  <div className="w-full h-full rounded-full border-8 border-amber-950 flex items-center justify-center font-bold text-4xl">
                    MAHARASHTRA
                  </div>
                </div>

                {/* Government Header */}
                <div className="text-center space-y-1 pb-4 border-b-2 border-amber-900/40">
                  <div className="w-12 h-12 bg-amber-900 text-amber-100 rounded-full flex items-center justify-center mx-auto text-xs font-black shadow-sm font-sans">
                    GOV
                  </div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-amber-950 font-sans">
                    महाराष्ट्र शासन · ग्रामविकास विभाग
                  </h4>
                  <h3 className="text-xl sm:text-2xl font-black text-amber-950">
                    {language === 'mr' ? admin.gramPanchayatNameMr : admin.gramPanchayatNameEn}
                  </h3>
                  <p className="text-xs text-stone-700 font-sans">
                    तालुका: {tName} · जिल्हा: {dName} · पिन कोड: {admin.pincode}
                  </p>
                </div>

                {/* Title */}
                <div className="text-center py-2">
                  <span className="inline-block px-6 py-1 bg-amber-100/80 border-2 border-amber-800 text-amber-950 font-black text-lg sm:text-xl rounded-md uppercase tracking-wider">
                    {language === 'mr' ? viewingCertificate.documentNameMr : viewingCertificate.documentNameEn}
                  </span>
                  <div className="text-[11px] font-mono text-stone-600 mt-1">
                    प्रमाणपत्र क्रमांक: <strong className="text-stone-900">{viewingCertificate.digitalCertificateId || 'CERT-MH-2026-9021'}</strong>
                  </div>
                </div>

                {/* Certification Body Text */}
                <div className="text-sm leading-relaxed text-stone-900 space-y-3 font-serif">
                  <p className="text-justify indent-8">
                    {language === 'mr' ? (
                      <>
                        दाखला देण्यात येतो की, <strong>{viewingCertificate.applicantName}</strong> हे ग्रामपंचायत{' '}
                        <strong>{vName}</strong>, तालुका <strong>{tName}</strong>, जिल्हा <strong>{dName}</strong> येथील
                        स्थानिक रहिवासी असून त्यांचे नाव गावाच्या मतदार यादी व कुटुंब नोंदवहीत नोंदविलेले आहे.
                      </>
                    ) : (
                      <>
                        This is to certify that <strong>{viewingCertificate.applicantName}</strong> is a permanent and
                        bonafide resident of <strong>{vName}</strong>, Taluka <strong>{tName}</strong>, District{' '}
                        <strong>{dName}</strong> (Maharashtra).
                      </>
                    )}
                  </p>
                  <p className="text-justify indent-8">
                    {language === 'mr' ? (
                      <>
                        सदर दाखला अर्जदाराच्या विनंतीवरून <strong>{viewingCertificate.purpose || 'शासकीय कामकाजासाठी'}</strong> दिला
                        जात असून तो सर्व शासकीय, निमशासकीय व शैक्षणिक संस्थांमध्ये वैध आहे.
                      </>
                    ) : (
                      <>
                        This certificate is issued upon citizen application for the purpose of{' '}
                        <strong>{viewingCertificate.purpose || 'Official verification'}</strong> and holds valid legal authority.
                      </>
                    )}
                  </p>
                </div>

                {/* Signature and Verification Footer */}
                <div className="pt-6 border-t-2 border-amber-900/40 flex items-end justify-between text-xs">
                  <div className="space-y-1 font-mono text-[10px]">
                    <QrCode className="w-16 h-16 text-stone-800" />
                    <span className="block text-stone-500">QR Code Authenticated</span>
                    <span className="block text-stone-700">दिनांक: {viewingCertificate.submittedAt}</span>
                  </div>

                  <div className="text-center space-y-1">
                    <div className="w-24 h-8 border-b border-dashed border-stone-400 mx-auto" />
                    <span className="font-bold text-stone-950 block font-sans">
                      {language === 'mr' ? viewingCertificate.assignedOfficerNameMr : viewingCertificate.assignedOfficerNameEn}
                    </span>
                    <span className="text-[10px] text-stone-600 block font-sans">
                      {language === 'mr' ? 'ग्रामसेवक / सक्षम प्राधिकारी' : 'Gram Sevak / Authorized Signatory'}
                    </span>
                    <span className="text-[9px] text-emerald-800 font-mono block">
                      [Digitally Signed with e-Pramaan]
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setViewingCertificate(null)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 hover:bg-stone-100 rounded-xl font-bold cursor-pointer text-xs"
                >
                  {language === 'mr' ? 'बंद करा' : 'Close'}
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-6 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold rounded-xl shadow-md transition-all inline-flex items-center gap-2 cursor-pointer text-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>{language === 'mr' ? 'प्रमाणपत्र प्रिंट / PDF डाऊनलोड' : 'Print Certificate / Save PDF'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
