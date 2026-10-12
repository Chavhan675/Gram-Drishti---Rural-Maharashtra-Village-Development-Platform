import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  AlertCircle,
  CheckCircle2,
  Send,
  Camera,
  MapPin,
  Phone,
  User,
  HelpCircle,
  FileText,
  ArrowRight
} from 'lucide-react';
import { IssueReport } from '../types';

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
  const [errorMessage, setErrorMessage] = useState('');

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
    const newId = addIssueReport({
      villageId,
      category,
      titleMr: title || description.slice(0, 50),
      titleEn: title || description.slice(0, 50),
      description,
      landmark,
      citizenName,
      citizenPhone,
      photoUrl
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

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-16">
      <Breadcrumbs items={[{ label: t.reportIssueTitle }]} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="border-b border-amber-200 pb-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-rose-800 uppercase tracking-wider font-mono">
              {language === 'mr' ? '🚩 नागरिक तक्रार निवारण कक्ष' : '🚩 Citizen Grievance & Public Redressal'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight font-serif mt-0.5">
            {t.reportIssueTitle}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            {language === 'mr'
              ? 'आपल्या गावातील रस्ते, पिण्याचे पाणी, पथदिवे किंवा सार्वजनिक समस्यांची नोंदणी करा व डिजिटल पाठपुरावा करा.'
              : 'Submit village civic issues directly to local administration with automated tracking numbers and transparent status updates.'}
          </p>
        </div>

        {/* Success Confirmation Modal / Card */}
        {generatedId ? (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-300 shadow-md text-center space-y-5 relative overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 rounded-t-2xl -mt-6 -mx-6 sm:-mt-8 sm:-mx-8 mb-4" />

            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center ring-4 ring-emerald-50">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl sm:text-2xl font-bold text-stone-950 font-serif">
                {t.issueSuccessTitle}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                {language === 'mr'
                  ? 'आपली समस्या स्थानिक ग्रामपंचायत व संबंधित उपविभागाकडे नोंदवली गेली असून पाठपुरावा सुरू झाला आहे.'
                  : 'Your grievance has been lodged and forwarded to the Panchayat engineering cell.'}
              </p>
            </div>

            <div className="bg-gradient-to-b from-amber-50 to-orange-50/40 p-5 rounded-2xl border border-amber-300 inline-block text-center max-w-sm w-full shadow-2xs">
              <span className="text-xs text-orange-950 font-bold block uppercase font-mono">
                {t.issueTrackingIdLabel}
              </span>
              <span className="text-3xl font-mono font-black text-orange-900 tracking-wider mt-1 block select-all">
                {generatedId}
              </span>
              <span className="text-[11px] text-stone-500 mt-1 block font-medium">
                {language === 'mr' ? 'हा क्रमांक जतन करा किंवा स्क्रीनशॉट काढा' : 'Keep this reference ID for tracking'}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => navigateTo('track-issue')}
                className="px-6 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs rounded-xl transition-all inline-flex items-center gap-2 shadow-sm"
              >
                <span>{t.trackNow}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setGeneratedId(null);
                  setTitle('');
                  setDescription('');
                  setLandmark('');
                  setCitizenName('');
                  setCitizenPhone('');
                  setPhotoUrl('');
                }}
                className="px-5 py-2.5 bg-white hover:bg-amber-50 border border-amber-300 text-stone-700 font-bold text-xs rounded-xl transition-colors"
              >
                {language === 'mr' ? 'दुसरी तक्रार नोंदवा' : 'Report Another Issue'}
              </button>
            </div>
          </div>
        ) : (
          /* Form with Festive Maharashtra Trim */
          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-amber-200 shadow-sm space-y-5 text-xs sm:text-sm text-stone-800 relative overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 rounded-t-2xl -mt-6 -mx-6 sm:-mt-8 sm:-mx-8 mb-4" />

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

            {/* Issue Category */}
            <div>
              <label className="block font-bold text-stone-900 mb-1.5 font-mono text-xs uppercase">
                {t.issueCategory} <span className="text-rose-600">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-3 bg-amber-50/50 border border-amber-300 rounded-xl text-stone-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm"
              >
                <option value="water">{t.issCatWater}</option>
                <option value="roads">{t.issCatRoads}</option>
                <option value="street-lights">{t.issCatStreetlights}</option>
                <option value="drainage">{t.issCatDrainage}</option>
                <option value="school">{t.issCatSchool}</option>
                <option value="health">{t.issCatHealth}</option>
                <option value="other">{t.issCatOther}</option>
              </select>
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
                    ? 'उदा. जिल्हा परिषद शाळेजवळ, हनुमान मंदिराशेजारी'
                    : 'e.g., Near ZP School gate, behind temple'
                }
                className="w-full p-3 bg-amber-50/50 border border-amber-300 rounded-xl text-stone-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm placeholder:text-stone-400"
              />
            </div>

            {/* Optional Photo Attachment */}
            <div>
              <label className="block font-bold text-stone-900 mb-1.5 font-mono text-xs uppercase">
                {language === 'mr' ? 'फोटो जोडा (पर्यायी)' : 'Attach Photo (Optional)'}
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

            {/* Citizen Details (2 Columns) */}
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
              <p className="text-xs text-stone-500">
                {language === 'mr'
                  ? 'नोंदणीनंतर आपल्याला त्वरित ट्रॅकिंग क्रमांक मिळेल.'
                  : 'You will receive an instant tracking ID upon submission.'}
              </p>
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
