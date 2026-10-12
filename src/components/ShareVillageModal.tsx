import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { X, Share2, Copy, Check, Printer, MessageCircle } from 'lucide-react';

export const ShareVillageModal: React.FC = () => {
  const { language, selectedVillage, isShareModalOpen, setIsShareModalOpen } = useApp();
  const t = getTranslation(language);
  const [copied, setCopied] = useState(false);

  if (!isShareModalOpen) return null;

  const villageName = language === 'mr' ? selectedVillage.nameMr : selectedVillage.nameEn;
  const talukaName = language === 'mr' ? selectedVillage.talukaMr : selectedVillage.talukaEn;
  const districtName = language === 'mr' ? selectedVillage.districtMr : selectedVillage.districtEn;

  const shareText =
    language === 'mr'
      ? `🏛️ ग्राम दृष्टी — ${villageName} (ता. ${talukaName}, जि. ${districtName})\n\nगावातील लोकसंख्या: ${selectedVillage.demographics.totalPopulation}\nसाक्षरता दर: ${selectedVillage.demographics.literacyRate}%\nस्थानिक स्वराज्य संस्था कोड (LGD): ${selectedVillage.lgdCode}\n\nआपल्या गावाची विकासकामे, योजना आणि सुविधांची माहिती पहा: ${window.location.origin}`
      : `🏛️ Gram Drishti — ${villageName} (Taluka ${talukaName}, District ${districtName})\n\nPopulation: ${selectedVillage.demographics.totalPopulation}\nLiteracy Rate: ${selectedVillage.demographics.literacyRate}%\nLGD Code: ${selectedVillage.lgdCode}\n\nExplore village development, public facilities, and government schemes at: ${window.location.origin}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-lg max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-amber-600" />
            <h3 className="text-base font-bold text-slate-900">
              {language === 'mr' ? 'माझ्या गावाची माहिती शेअर करा' : 'Share Village Information'}
            </h3>
          </div>
          <button
            onClick={() => setIsShareModalOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-sm text-slate-700">
          <div className="p-3.5 bg-slate-50 rounded border border-slate-200 text-xs font-mono whitespace-pre-line text-slate-800">
            {shareText}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded text-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp वर पाठवा</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded text-xs transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'कॉपी झाले!' : 'मजकूर कॉपी करा'}</span>
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium rounded text-xs transition-colors border border-slate-200"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>{t.downloadSummary} (Print / PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
