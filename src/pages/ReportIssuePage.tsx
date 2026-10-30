import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  CheckCircle2,
  Send,
  Camera,
  MapPin,
  Phone,
  User,
  FileText,
  ArrowRight,
  Printer,
  Share2,
  Copy,
  Check,
  Clock,
  ShieldCheck,
  Building2,
  Sparkles,
  Info
} from 'lucide-react';
import { IssueReport } from '../types';
import { isOffline, queueOfflineCitizenReport } from '../utils/offlineStorage';

export const ReportIssuePage: React.FC = () => {
  const { language, selectedVillage, allVillages, addIssueReport, navigateTo } = useApp();
  const t = getTranslation(language);

  const [villageId, setVillageId] = useState(selectedVillage.id);
  const [category, setCategory] = useState<IssueReport['category']>('water');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [landmark, setLandmark] = useState('');
  const [citizenName, setCitizenName] = useState('');
  const [citizenPhone, setCitizenPhone] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const [generatedId, setGeneratedId] = useState<string | null>(null);
  const [submittedReport, setSubmittedReport] = useState<{
    id: string;
    villageName: string;
    taluka: string;
    district: string;
    category: string;
    title: string;
    description: string;
    landmark: string;
    citizenName: string;
    citizenPhone: string;
    timestamp: string;
    slaHours: number;
    officer: { name: string; role: string; phone: string };
    isOfflineSubmission?: boolean;
  } | null>(null);

  const [errorMessage, setErrorMessage] = useState('');
  const [copiedToken, setCopiedToken] = useState(false);

  // Quick problem templates for fast reporting
  const issuePresets = [
    {
      labelEn: 'Water Pipeline Burst',
      labelMr: 'मुख्य पाईपलाईन गळती',
      cat: 'water' as const,
      titleEn: 'Severe drinking water pipeline rupture near main tank',
      titleMr: 'मुख्य पाण्याच्या टाकीजवळ मोठी पाईपलाईन गळती',
      descEn: 'Treated drinking water is spilling onto the road for past 24 hours. Pressure to Ward 2 and 3 has drastically reduced.',
      descMr: 'गेल्या २४ तासांपासून मुख्य टाकीजवळील पाईपलाईन फुटल्याने पिण्याचे पाणी वाया जात असून वॉर्ड क्र. २ व ३ चा पाणीपुरवठा विस्कळीत झाला आहे.'
    },
    {
      labelEn: 'Streetlights Out',
      labelMr: 'पथदिवे बंद',
      cat: 'street-lights' as const,
      titleEn: 'Dark streetlights along temple approach road',
      titleMr: 'मंदिर परिसरातील सर्व पथदिवे बंद',
      descEn: 'All 8 solar and electrical street lamps on the main approach lane have stopped working, causing severe inconvenience at night.',
      descMr: 'मुख्य रस्त्यावरील सर्व ८ पथदिवे बंद असल्याने रात्रीच्या वेळी ग्रामस्थांना व महिलांना ये-जा करणे धोकादायक झाले आहे.'
    },
    {
      labelEn: 'Drainage Overflow',
      labelMr: 'नाली तुंबणे व घाण पाणी',
      cat: 'drainage' as const,
      titleEn: 'Blocked open drainage overflowing near weekly market',
      titleMr: 'आठवडे बाजार रस्त्यावरील बंदिस्त गटार तुंबून पाणी रस्त्यावर',
      descEn: 'Severe silt accumulation has caused gutter wastewater to flow directly on the pedestrian path, creating mosquito hazard.',
      descMr: 'गटारात गाळ साचल्यामुळे सांडपाणी रस्त्यावर वाहत असून डासांचा प्रादुर्भाव व दुर्गंधी पसरली आहे. त्वरित स्वच्छता करणे गरजेचे आहे.'
    },
    {
      labelEn: 'Dangerous Potholes',
      labelMr: 'रस्त्यावर खड्डे',
      cat: 'roads' as const,
      titleEn: 'Major potholes and asphalt erosion on bus route',
      titleMr: 'एसटी बस मार्गावर धोकादायक खड्डे',
      descEn: 'Deep potholes after monsoon have eroded asphalt over 200 meters. Two-wheelers frequently slip and fall.',
      descMr: 'पावसामुळे २०० मीटर अंतरावर मोठे खड्डे पडले असून दुचाकी घसरून अपघात होत आहेत. त्वरित डांबरी पॅचवर्क आवश्यक आहे.'
    }
  ];

  const handleApplyPreset = (p: typeof issuePresets[0]) => {
    setCategory(p.cat);
    setTitle(language === 'mr' ? p.titleMr : p.titleEn);
    setDescription(language === 'mr' ? p.descMr : p.descEn);
    if (!landmark) {
      setLandmark(language === 'mr' ? 'ग्रामपंचायत चौक / मुख्य रस्ता' : 'Gram Panchayat Chowk / Main Road');
    }
  };

  const getSlaHours = (cat: IssueReport['category']) => {
    switch (cat) {
      case 'water':
        return 48;
      case 'street-lights':
        return 72;
      case 'drainage':
        return 48;
      case 'healthcare':
        return 48;
      case 'education':
        return 120;
      case 'roads':
        return 168;
      default:
        return 96;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setErrorMessage(
        language === 'mr'
          ? 'कृपया समस्येचे सविस्तर वर्णन प्रविष्ट करा.'
          : 'Please enter a description of the issue.'
      );
      return;
    }

    setErrorMessage('');
    const curVillage = allVillages.find((v) => v.id === villageId) || selectedVillage;
    const finalTitle = title.trim() || description.slice(0, 50);

    const newId = addIssueReport({
      villageId,
      category,
      titleMr: finalTitle,
      titleEn: finalTitle,
      description,
      landmark: landmark.trim() || (language === 'mr' ? 'गाव परिसर' : 'Village area'),
      citizenName: citizenName.trim() || (language === 'mr' ? 'ग्रामस्थ नागरिक' : 'Resident Citizen'),
      citizenPhone: citizenPhone.trim() || '+91 98XXXXXXXX',
      photoUrl
    });

    const sla = getSlaHours(category);
    const dateFormatted = new Date().toLocaleString(language === 'mr' ? 'mr-IN' : 'en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    const isCurrentlyOffline = isOffline();
    if (isCurrentlyOffline) {
      queueOfflineCitizenReport({
        id: newId,
        villageId,
        category,
        title: finalTitle,
        description,
        landmark: landmark.trim() || 'Village area',
        citizenName: citizenName.trim() || 'Citizen',
        citizenPhone: citizenPhone.trim() || 'Confidential'
      });
    }

    setSubmittedReport({
      id: newId,
      villageName: language === 'mr' ? curVillage.nameMr : curVillage.nameEn,
      taluka: language === 'mr' ? curVillage.talukaMr : curVillage.talukaEn,
      district: language === 'mr' ? curVillage.districtMr : curVillage.districtEn,
      category,
      title: finalTitle,
      description,
      landmark: landmark.trim() || (language === 'mr' ? 'गाव परिसर' : 'Village area'),
      citizenName: citizenName.trim() || (language === 'mr' ? 'ग्रामस्थ नागरिक' : 'Resident Citizen'),
      citizenPhone: citizenPhone.trim() || 'Confidential (Notified via SMS)',
      timestamp: dateFormatted,
      slaHours: sla,
      officer: {
        name: language === 'mr' ? 'श्री. आर. व्ही. गायकवाड' : 'Shri. R. V. Gaikwad',
        role: language === 'mr' ? 'ग्रामविकास अधिकारी (Gram Sevak / PDO)' : 'Village Development Officer (Gram Sevak)',
        phone: '+91 94220 89145'
      },
      isOfflineSubmission: isCurrentlyOffline
    });

    setGeneratedId(newId);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyToken = () => {
    if (generatedId) {
      navigator.clipboard.writeText(generatedId);
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2000);
    }
  };

  const handleShareWhatsApp = () => {
    if (!submittedReport) return;
    const shareText =
      language === 'mr'
        ? `🚩 *महाराष्ट्र शासन - ग्रामपंचायत लोकसेवा हक्क तक्रार पावती*\n\n` +
          `*तक्रार क्र:* ${submittedReport.id}\n` +
          `*गाव:* ${submittedReport.villageName} (ता. ${submittedReport.taluka}, जि. ${submittedReport.district})\n` +
          `*विषय:* ${submittedReport.title}\n` +
          `*निवारण हमी (RTS SLA):* ${submittedReport.slaHours} तास\n` +
          `*तपासणी अधिकारी:* ${submittedReport.officer.name} (${submittedReport.officer.role})\n` +
          `*तक्रार नोंदणी:* ${submittedReport.timestamp}\n\n` +
          `ग्रामदृष्टी पोर्टलवर थेट ट्रॅक करा: GramDrishti Citizen Portal`
        : `🚩 *Govt of Maharashtra - Gram Panchayat Grievance Receipt*\n\n` +
          `*Token ID:* ${submittedReport.id}\n` +
          `*Village:* ${submittedReport.villageName} (Taluka: ${submittedReport.taluka}, Dist: ${submittedReport.district})\n` +
          `*Subject:* ${submittedReport.title}\n` +
          `*RTS Act Resolution SLA:* Within ${submittedReport.slaHours} Hours\n` +
          `*Assigned Officer:* ${submittedReport.officer.name} (${submittedReport.officer.role})\n` +
          `*Lodged On:* ${submittedReport.timestamp}\n\n` +
          `Track online anytime on GramDrishti Rural Portal.`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    try {
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      navigator.clipboard?.writeText(shareText);
    }
  };

  const handlePrintReceipt = () => {
    try {
      window.print();
    } catch (err) {
      console.warn('Print not supported:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-16">
      <Breadcrumbs items={[{ label: t.reportIssueTitle }]} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="border-b border-amber-200 pb-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-rose-800 uppercase tracking-wider font-mono">
              {language === 'mr' ? '🚩 नागरिक तक्रार निवारण कक्ष · RTS Act 2015' : '🚩 Citizen Grievance & Public Redressal · RTS Act 2015'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight font-serif mt-0.5">
            {t.reportIssueTitle}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            {language === 'mr'
              ? 'आपल्या गावातील पाणी, रस्ते, स्वच्छता व पथदिव्यांची अधिकृत तक्रार नोंदवा. महाराष्ट्र लोकसेवा हमी कायद्यानुसार वेळेत निवारण हमी.'
              : 'Submit village civic issues with statutory time-bound resolution guarantees under the Maharashtra Right to Public Services Act 2015.'}
          </p>
        </div>

        {/* Success Confirmation: Official Government Grievance Receipt Slip */}
        {generatedId && submittedReport ? (
          <div className="space-y-6">
            {/* The Printable Official Slip */}
            <div className="bg-white rounded-3xl border-2 border-stone-800 shadow-xl overflow-hidden relative print:border-none print:shadow-none">
              {/* Maharashtra Gov Tricolor Top Trim */}
              <div className="h-2 w-full bg-gradient-to-r from-orange-600 via-white to-emerald-600 border-b border-stone-200" />

              {/* Official Seal Header */}
              <div className="bg-gradient-to-b from-stone-50 to-amber-50/30 p-6 border-b border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 font-serif font-black text-2xl shadow-inner shrink-0">
                    🏛️
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs font-bold font-mono tracking-widest text-amber-900 uppercase block">
                      {language === 'mr'
                        ? 'महाराष्ट्र शासन · ग्रामविकास व पंचायतराज विभाग'
                        : 'Govt of Maharashtra · Rural Development Dept'}
                    </span>
                    <h2 className="text-lg sm:text-xl font-black text-stone-950 font-serif tracking-tight">
                      {language === 'mr'
                        ? 'डिजिटल तक्रार नोंदणी व लोकसेवा हमी पावती'
                        : 'Official Grievance Acknowledgment & RTS Guarantee Slip'}
                    </h2>
                    <span className="text-[11px] text-stone-600 font-medium block">
                      {submittedReport.villageName} ग्रामपंचायत · ता. {submittedReport.taluka}, जि. {submittedReport.district}
                    </span>
                  </div>
                </div>

                <div className="text-center sm:text-right shrink-0">
                  {submittedReport.isOfflineSubmission ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full border border-amber-300">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      <span>{language === 'mr' ? 'स्थानिक कॅशमध्ये जतन (Queued Offline)' : 'Queued Offline (Local Cache)'}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full border border-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{language === 'mr' ? 'नोंदणीकृत व सक्रिय' : 'Registered & Active'}</span>
                    </span>
                  )}
                  <span className="block text-[10px] text-stone-500 font-mono mt-1">
                    {submittedReport.timestamp}
                  </span>
                </div>
              </div>

              {/* Reference Token Badge */}
              <div className="p-6 bg-amber-50/50 border-b border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold text-stone-600 uppercase font-mono tracking-wider block">
                    {t.issueTrackingIdLabel}
                  </span>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-2xl sm:text-3xl font-mono font-black text-orange-950 tracking-wider">
                      {submittedReport.id}
                    </span>
                    <button
                      onClick={handleCopyToken}
                      className="px-2.5 py-1 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg text-xs font-bold text-stone-700 inline-flex items-center gap-1 transition-colors"
                      title="Copy Tracking ID"
                    >
                      {copiedToken ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Simulated QR Code / Barcode verification block */}
                <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-stone-300 shadow-2xs">
                  <div className="w-12 h-12 bg-stone-900 rounded-lg p-1 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div className="w-2.5 h-2.5 bg-white rounded-xs" />
                      <div className="w-2.5 h-2.5 bg-white rounded-xs" />
                    </div>
                    <div className="flex justify-center">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                    </div>
                    <div className="flex justify-between">
                      <div className="w-2.5 h-2.5 bg-white rounded-xs" />
                      <div className="w-2.5 h-2.5 bg-white rounded-xs" />
                    </div>
                  </div>
                  <div className="text-[11px] font-mono leading-tight text-left">
                    <span className="font-bold text-stone-900 block">RTS QR SECURE</span>
                    <span className="text-stone-500">DIGITAL SIGNED</span>
                    <span className="text-emerald-700 font-bold block">VERIFIED 2026</span>
                  </div>
                </div>
              </div>

              {/* Grievance & SLA Details Grid */}
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-stone-500 uppercase font-mono block">
                      {language === 'mr' ? 'समस्येचे नाव व श्रेणी' : 'Issue Title & Category'}
                    </span>
                    <p className="font-bold text-stone-950 mt-0.5 text-sm sm:text-base">
                      {submittedReport.title}
                    </p>
                    <span className="inline-block mt-1 px-2.5 py-0.5 bg-stone-100 text-stone-800 rounded font-semibold text-xs border border-stone-200 capitalize">
                      Category: {submittedReport.category}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-stone-500 uppercase font-mono block">
                      {language === 'mr' ? 'तपशीलवार वर्णन' : 'Description'}
                    </span>
                    <p className="text-stone-700 mt-0.5 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-200">
                      {submittedReport.description}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-stone-500 uppercase font-mono block">
                      {language === 'mr' ? 'स्थान व लँडमार्क' : 'Location & Landmark'}
                    </span>
                    <p className="font-medium text-stone-800 mt-0.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>{submittedReport.landmark}</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Statutory RTS SLA Box */}
                  <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-300">
                    <div className="flex items-center gap-1.5 text-emerald-900 font-bold font-mono text-xs uppercase mb-1">
                      <Clock className="w-4 h-4 text-emerald-700" />
                      <span>
                        {language === 'mr'
                          ? 'लोकसेवा हक्क कायदा २०१५ हमी'
                          : 'RTS Act 2015 SLA Resolution'}
                      </span>
                    </div>
                    <div className="text-2xl font-black text-emerald-950 font-mono">
                      {submittedReport.slaHours} {language === 'mr' ? 'तास' : 'Hours'}
                    </div>
                    <p className="text-[11px] text-emerald-800 font-medium mt-1">
                      {language === 'mr'
                        ? 'विहित मुदतीत निवारण न झाल्यास पंचायत समिती गट विकास अधिकारी (BDO) यांच्याकडे प्रथम अपील दाखल करता येते.'
                        : 'Statutory deadline for field inspection & repair. Escalates to Block Development Officer (BDO) if delayed.'}
                    </p>
                  </div>

                  {/* Assigned Officer Contact */}
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                    <span className="text-[10px] font-bold text-stone-500 uppercase font-mono block">
                      {language === 'mr' ? 'नियुक्त तपासणी अधिकारी' : 'Assigned Investigating Officer'}
                    </span>
                    <div>
                      <p className="font-bold text-stone-900 text-sm">
                        {submittedReport.officer.name}
                      </p>
                      <p className="text-xs text-stone-600 font-medium">
                        {submittedReport.officer.role}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-white border border-stone-300 rounded-lg text-xs font-mono font-bold text-stone-800 inline-flex items-center gap-1">
                          <Phone className="w-3 h-3 text-orange-600" />
                          <span>{submittedReport.officer.phone}</span>
                        </span>
                        <span className="text-[10px] text-stone-500">10:00 AM - 5:00 PM</span>
                      </div>
                    </div>
                  </div>

                  {/* Citizen details */}
                  <div className="text-xs text-stone-600">
                    <span className="text-[10px] font-bold text-stone-500 uppercase font-mono block">
                      {language === 'mr' ? 'तक्रारदार माहिती' : 'Complainant Reference'}
                    </span>
                    <p className="font-semibold text-stone-800 mt-0.5">
                      {submittedReport.citizenName} ({submittedReport.citizenPhone})
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Official Disclaimer */}
              <div className="px-6 py-3 bg-stone-100 border-t border-stone-200 text-[11px] text-stone-600 flex flex-col sm:flex-row items-center justify-between gap-2">
                <span>
                  महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५ अंतर्गत संगणकीकृत पावती · ग्रामपंचायत नोंद वही क्र. ४
                </span>
                <span className="font-mono font-semibold text-stone-700">
                  GRAMDRISHTI GOV SECURE
                </span>
              </div>
            </div>

            {/* Action Buttons for Citizen */}
            <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => navigateTo('track-issue')}
                  className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs rounded-xl transition-all inline-flex items-center gap-2 shadow-sm"
                >
                  <span>{t.trackNow}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleShareWhatsApp}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all inline-flex items-center gap-2 shadow-sm"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'व्हॉट्सअॅपवर पाठवा' : 'Share on WhatsApp'}</span>
                </button>

                <button
                  onClick={handlePrintReceipt}
                  className="px-4 py-2.5 bg-white hover:bg-amber-50 border border-stone-300 text-stone-800 font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-2"
                >
                  <Printer className="w-3.5 h-3.5 text-stone-600" />
                  <span>{language === 'mr' ? 'पावती प्रिंट करा / PDF' : 'Print Receipt Slip'}</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setGeneratedId(null);
                  setSubmittedReport(null);
                  setTitle('');
                  setDescription('');
                  setLandmark('');
                  setCitizenName('');
                  setCitizenPhone('');
                  setPhotoUrl('');
                }}
                className="px-4 py-2.5 text-stone-600 hover:text-stone-900 text-xs font-bold hover:underline"
              >
                {language === 'mr' ? '+ दुसरी तक्रार नोंदवा' : '+ File Another Grievance'}
              </button>
            </div>
          </div>
        ) : (
          /* Form with Quick Problem Templates & Festive Trim */
          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200 shadow-sm space-y-6 text-xs sm:text-sm text-stone-800 relative overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 rounded-t-3xl -mt-6 -mx-6 sm:-mt-8 sm:-mx-8 mb-5" />

            {/* Quick 1-Click Problem Templates */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50/40 p-4 rounded-2xl border border-amber-300 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orange-950 flex items-center gap-1.5 font-mono uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                  <span>{language === 'mr' ? 'वारंवार येणाऱ्या समस्या (एक क्लिक मध्ये भरा)' : 'Quick Problem Presets (1-Click Fill)'}</span>
                </span>
                <span className="text-[11px] text-stone-500 font-medium">
                  {language === 'mr' ? 'वेळ वाचवण्यासाठी क्लिक करा' : 'Auto-fills title & category'}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {issuePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    className="p-2.5 bg-white hover:bg-amber-100/60 border border-amber-200 hover:border-orange-400 rounded-xl text-left transition-all group shadow-2xs"
                  >
                    <span className="text-xs font-bold text-stone-900 group-hover:text-orange-700 block line-clamp-1">
                      {language === 'mr' ? preset.labelMr : preset.labelEn}
                    </span>
                    <span className="text-[10px] text-stone-500 font-mono capitalize">
                      {preset.cat}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {errorMessage && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold">
                {errorMessage}
              </div>
            )}

            {/* Village Selector */}
            <div>
              <label className="block font-bold text-stone-900 mb-1.5 font-mono text-xs uppercase">
                {language === 'mr' ? 'गाव निवडा' : 'Select Village'} <span className="text-rose-600">*</span>
              </label>
              <select
                value={villageId}
                onChange={(e) => setVillageId(e.target.value)}
                className="w-full p-3 bg-amber-50/50 border border-amber-300 rounded-xl text-stone-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm"
              >
                {allVillages.map((v) => (
                  <option key={v.id} value={v.id}>
                    {language === 'mr' ? v.nameMr : v.nameEn} (ता. {language === 'mr' ? v.talukaMr : v.talukaEn}, जि. {language === 'mr' ? v.districtMr : v.districtEn})
                  </option>
                ))}
              </select>
            </div>

            {/* Issue Category & Expected Resolution SLA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-stone-900 mb-1.5 font-mono text-xs uppercase">
                  {t.issueCategory} <span className="text-rose-600">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full p-3 bg-amber-50/50 border border-amber-300 rounded-xl text-stone-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm"
                >
                  <option value="water">{t.issCatWater} (48 hrs SLA)</option>
                  <option value="roads">{t.issCatRoads} (7 days SLA)</option>
                  <option value="street-lights">{t.issCatStreetlights} (72 hrs SLA)</option>
                  <option value="drainage">{t.issCatDrainage} (48 hrs SLA)</option>
                  <option value="education">{t.issCatSchool} (5 days SLA)</option>
                  <option value="healthcare">{t.issCatHealth} (48 hrs SLA)</option>
                  <option value="electricity">Electricity / Transformer (24 hrs SLA)</option>
                  <option value="sanitation">Sanitation / Garbage (48 hrs SLA)</option>
                  <option value="other">{t.issCatOther} (4 days SLA)</option>
                </select>
              </div>

              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 flex items-center gap-3">
                <Clock className="w-6 h-6 text-emerald-700 shrink-0" />
                <div>
                  <span className="text-[11px] font-bold text-emerald-950 uppercase font-mono block">
                    {language === 'mr' ? 'लोकसेवा हमी निवारण मुदत' : 'RTS Statutory Resolution SLA'}
                  </span>
                  <span className="text-xs font-bold text-emerald-900">
                    {getSlaHours(category)} {language === 'mr' ? 'तासांत निवारण अनिवार्य' : 'Hours Maximum Turnaround'}
                  </span>
                </div>
              </div>
            </div>

            {/* Title / Summary */}
            <div>
              <label className="block font-bold text-stone-900 mb-1.5 font-mono text-xs uppercase">
                {language === 'mr' ? 'समस्येचे संक्षिप्त शीर्षक' : 'Brief Issue Title'}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  language === 'mr'
                    ? 'उदा. वॉर्ड क्र. २ मधील मुख्य जलवाहिनी गळती'
                    : 'e.g., Water pipeline leakage in Ward 2'
                }
                className="w-full p-3 bg-amber-50/50 border border-amber-300 rounded-xl text-stone-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm placeholder:text-stone-400"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-bold text-stone-900 mb-1.5 font-mono text-xs uppercase">
                {t.issueDescription} <span className="text-rose-600">*</span>
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={
                  language === 'mr'
                    ? 'समस्येचे सविस्तर वर्णन करा. किती दिवसांपासून समस्या आहे?'
                    : 'Describe the issue clearly. How long has it been occurring?'
                }
                className="w-full p-3 bg-amber-50/50 border border-amber-300 rounded-xl text-stone-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm placeholder:text-stone-400"
              />
            </div>

            {/* Location / Landmark */}
            <div>
              <label className="block font-bold text-stone-900 mb-1.5 font-mono text-xs uppercase">
                {t.landmark} <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder={
                  language === 'mr'
                    ? 'उदा. जिल्हा परिषद शाळेजवळ, हनुमान मंदिराशेजारी, वॉर्ड क्र. १'
                    : 'e.g., Near ZP School gate, behind temple, Ward 1'
                }
                className="w-full p-3 bg-amber-50/50 border border-amber-300 rounded-xl text-stone-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm placeholder:text-stone-400"
              />
            </div>

            {/* Photo Attachment */}
            <div>
              <label className="block font-bold text-stone-900 mb-1.5 font-mono text-xs uppercase">
                {language === 'mr' ? 'फोटो जोडा (पर्यायी)' : 'Attach Field Photo (Optional)'}
              </label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-stone-800 rounded-xl border border-amber-300 inline-flex items-center gap-1.5 text-xs font-bold transition-colors">
                  <Camera className="w-4 h-4 text-orange-600" />
                  <span>{language === 'mr' ? 'फोटो निवडा' : 'Choose Photo'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
                {photoUrl && (
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    ✓ {language === 'mr' ? 'फोटो जोडला गेला आहे' : 'Photo Attached'}
                  </span>
                )}
              </div>
            </div>

            {/* Citizen Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-amber-100">
              <div>
                <label className="block font-bold text-stone-900 mb-1.5 font-mono text-xs uppercase">
                  {t.yourName} ({language === 'mr' ? 'पर्यायी' : 'Optional'})
                </label>
                <input
                  type="text"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  placeholder={language === 'mr' ? 'उदा. रमेश पाटील' : 'e.g., Ramesh Patil'}
                  className="w-full p-3 bg-amber-50/50 border border-amber-300 rounded-xl text-stone-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm placeholder:text-stone-400"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-900 mb-1.5 font-mono text-xs uppercase">
                  {t.yourMobile} ({language === 'mr' ? 'SMS अपडेटसाठी' : 'For SMS updates'})
                </label>
                <input
                  type="tel"
                  value={citizenPhone}
                  onChange={(e) => setCitizenPhone(e.target.value)}
                  placeholder="+91 98XXXX XXXX"
                  className="w-full p-3 bg-amber-50/50 border border-amber-300 rounded-xl text-stone-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm placeholder:text-stone-400"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-amber-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-stone-500 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>
                  {language === 'mr'
                    ? 'नोंदणीनंतर अधिकृत पावती, QR कोड व ट्रॅकिंग आयडी त्वरित मिळेल.'
                    : 'Instant official digital receipt slip with RTS guarantee and WhatsApp share.'}
                </span>
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all inline-flex items-center justify-center gap-2 shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>{t.btnSubmitIssue}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
