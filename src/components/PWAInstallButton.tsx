import React, { useState, useEffect } from 'react';
import { Download, Check, Share, Smartphone, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PWAInstallButton: React.FC<{ variant?: 'nav' | 'compact' | 'card' }> = ({ variant = 'nav' }) => {
  const { language } = useApp();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [showIOSTip, setShowIOSTip] = useState<boolean>(false);
  const [showDesktopTip, setShowDesktopTip] = useState<boolean>(false);
  const isMr = language === 'mr';

  useEffect(() => {
    // Check if already in standalone PWA mode
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Detect iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isStandaloneIos = (window.navigator as any).standalone === true;
    if (isIosDevice) {
      setIsIOS(true);
      if (isStandaloneIos) {
        setIsInstalled(true);
      }
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowIOSTip(false);
      setShowDesktopTip(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isInstalled) return;

    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          setIsInstalled(true);
        }
      } catch (err) {
        console.warn('Install prompt error:', err);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      setShowIOSTip(true);
    } else {
      setShowDesktopTip(true);
    }
  };

  if (isInstalled) {
    if (variant === 'compact') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
          <Check className="w-3 h-3" />
          <span>{isMr ? 'ऑफलाइन स्थापित' : 'App Installed'}</span>
        </span>
      );
    }
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        title={isMr ? 'ग्राम दृष्टी ऑफलाइन अॅप इन्स्टॉल करा' : 'Install Gram Drishti for 100% offline access'}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-xs transition-all cursor-pointer border border-amber-500/40"
      >
        <Download className="w-3.5 h-3.5 animate-bounce" />
        <span>{isMr ? 'अॅप इन्स्टॉल करा (ऑफलाइन)' : 'Install App (Offline)'}</span>
      </button>

      {/* iOS Installation Instruction Modal */}
      {showIOSTip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-5 text-stone-900 border border-stone-200 relative">
            <button
              type="button"
              onClick={() => setShowIOSTip(false)}
              className="absolute top-3 right-3 text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-3 text-amber-700 font-bold">
              <Smartphone className="w-5 h-5" />
              <span>{isMr ? 'आयफोन / आयपॅडवर इन्स्टॉल करा' : 'Install on iPhone / iPad'}</span>
            </div>
            <p className="text-xs text-stone-600 mb-3 leading-relaxed">
              {isMr
                ? 'सफारी ब्राउझरमध्ये खालील पायऱ्या वापरा जेणेकरून नेटवर्क नसतानाही गाव माहिती सहज उघडेल:'
                : 'To access Gram Drishti offline on iOS Safari, follow these 2 simple steps:'}
            </p>
            <ol className="text-xs space-y-2.5 text-stone-700 bg-stone-50 p-3 rounded-lg border border-stone-200">
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">1</span>
                <span>
                  {isMr ? 'सफारीच्या खालच्या पट्टीवरील ' : 'Tap the '}
                  <strong>{isMr ? 'शेअर बटणावर (Share)' : 'Share button'}</strong>
                  <Share className="inline w-3.5 h-3.5 mx-1 text-blue-600" />
                  {isMr ? 'क्लिक करा.' : 'at the bottom.'}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">2</span>
                <span>
                  {isMr ? 'खाली स्क्रोल करा आणि ' : 'Scroll down and tap '}
                  <strong>{isMr ? '"Add to Home Screen"' : '"Add to Home Screen"'}</strong>.
                </span>
              </li>
            </ol>
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setShowIOSTip(false)}
                className="w-full py-1.5 px-4 rounded bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800"
              >
                {isMr ? 'समजले' : 'Got it'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop / Other Browser Instruction Modal */}
      {showDesktopTip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-5 text-stone-900 border border-stone-200 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setShowDesktopTip(false)}
              className="absolute top-3 right-3 text-stone-400 hover:text-stone-700 p-1 rounded"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-3 text-amber-700 font-bold">
              <Download className="w-5 h-5" />
              <span>{isMr ? 'ग्राम दृष्टी अॅप स्थापित करा' : 'Install Gram Drishti App'}</span>
            </div>
            <p className="text-xs text-stone-600 mb-3 leading-relaxed">
              {isMr
                ? 'ग्राम दृष्टी अॅप स्थापित केल्यावर इंटरनेट नसतानाही (ऑफलाइन) सर्व गावाची विकासकामे, नकाशे व आकडेवारी त्वरित पाहता येईल.'
                : 'Installing Gram Drishti allows 100% offline access to all village data, interactive GIS, and emergency contacts even in remote areas.'}
            </p>
            <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3 text-xs text-stone-700 space-y-2">
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-800 shrink-0">1.</span>
                <span>{isMr ? 'ब्राउझरच्या उजव्या कोपऱ्यातील तीन ठिपके (⋮) किंवा अॅड्रेस बारवरील Install चिन्हावर क्लिक करा.' : 'Click the 3 dots (⋮) in your browser toolbar or the Install icon inside the address bar.'}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-800 shrink-0">2.</span>
                <span>{isMr ? '"Install Gram Drishti" किंवा "Add to Home screen" निवडा.' : 'Select "Install Gram Drishti" or "Add to Home Screen".'}</span>
              </div>
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setShowDesktopTip(false)}
                className="w-full py-2 px-4 rounded bg-amber-700 text-white text-xs font-semibold hover:bg-amber-800 transition-colors"
              >
                {isMr ? 'समजले, धन्यवाद' : 'Got it, thank you'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
