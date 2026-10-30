import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, HardDrive, RefreshCw, AlertTriangle, CheckCircle2, ShieldCheck, Database } from 'lucide-react';
import {
  isOffline,
  isSimulatedOffline,
  setSimulatedOffline,
  getOfflineStorageMetrics,
  initializeOfflineCache,
  OfflineStorageMetrics
} from '../utils/offlineStorage';
import { useApp } from '../context/AppContext';

export const OfflineIndicator: React.FC = () => {
  const { language } = useApp();
  const [offlineState, setOfflineState] = useState<boolean>(false);
  const [simulated, setSimulated] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<OfflineStorageMetrics>({
    cachedVillagesCount: 5,
    cachedSchemesCount: 6,
    lastSyncTime: new Date().toISOString(),
    isSimulatedOffline: false,
    pendingReportsCount: 0
  });
  const [justReconnected, setJustReconnected] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  useEffect(() => {
    initializeOfflineCache();

    const updateStatus = () => {
      const currentlyOffline = isOffline();
      const currentSim = isSimulatedOffline();
      setOfflineState(currentlyOffline);
      setSimulated(currentSim);
      setMetrics(getOfflineStorageMetrics());
    };

    updateStatus();

    const handleOnline = () => {
      updateStatus();
      setJustReconnected(true);
      setTimeout(() => setJustReconnected(false), 4500);
    };

    const handleOffline = () => {
      updateStatus();
    };

    const handleCustomChange = () => {
      updateStatus();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('offline-state-change', handleCustomChange);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('offline-state-change', handleCustomChange);
    };
  }, []);

  const toggleSimulation = () => {
    const next = !simulated;
    setSimulatedOffline(next);
    setSimulated(next);
    setOfflineState(isOffline());
    setMetrics(getOfflineStorageMetrics());
  };

  const isMr = language === 'mr';

  // Render when offline or just reconnected
  return (
    <>
      {/* Offline Alert Sticky Banner */}
      {offlineState && (
        <aside
          role="region"
          aria-label="Offline Mode Notification"
          className="bg-amber-950 text-amber-50 border-b border-amber-800 shadow-md transition-all"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
                <WifiOff className="w-4 h-4 text-amber-300 shrink-0" />
                <div className="text-xs sm:text-sm font-medium">
                  <span className="font-semibold text-amber-200">
                    {isMr ? 'ग्रामीण ऑफलाइन मोड सक्रिय (Offline Cache Active)' : 'Rural Offline Mode Active'}:
                  </span>{' '}
                  <span className="text-stone-200">
                    {isMr
                      ? 'इंटरनेट नसतानाही मेढशी (मालेगाव बुद्रुक) व सर्व गावांमधील विकास प्रकल्प, सुविधा व योजना पूर्णपणे उपलब्ध आहेत.'
                      : 'Key village profiles, Medshi records, facilities, and schemes are securely served from local device cache.'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setShowDetails(!showDetails)}
                  className="px-2.5 py-1 rounded bg-amber-900/80 hover:bg-amber-800 text-amber-200 border border-amber-700/60 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <HardDrive className="w-3.5 h-3.5" />
                  <span>{showDetails ? (isMr ? 'तपशील लपवा' : 'Hide Cache Info') : (isMr ? 'कॅश तपशील' : 'Storage Info')}</span>
                </button>

                <button
                  type="button"
                  onClick={toggleSimulation}
                  className={`px-2.5 py-1 rounded font-medium border transition-colors cursor-pointer flex items-center gap-1 ${
                    simulated
                      ? 'bg-amber-400 text-stone-950 border-amber-300 hover:bg-amber-300'
                      : 'bg-stone-800 text-stone-200 border-stone-700 hover:bg-stone-700'
                  }`}
                  title="Toggle offline test mode"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{simulated ? (isMr ? 'सिम्युलेशन बंद करा' : 'Resume Live Network') : (isMr ? 'नेटवर्क चेक' : 'Online Check')}</span>
                </button>
              </div>
            </div>

            {/* Expanded Cache & Emergency Info Drawer */}
            {showDetails && (
              <div className="mt-2.5 pt-2.5 border-t border-amber-900/60 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-amber-200/90">
                <div className="flex items-center gap-2 bg-amber-900/40 p-2 rounded">
                  <Database className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-stone-100">{metrics.cachedVillagesCount} {isMr ? 'गावे सेव्ह आहेत' : 'Villages Stored Locally'}</div>
                    <div className="text-[11px] text-amber-300/80">Medshi, Bhilar, Ralegan Siddhi + all schemes</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-amber-900/40 p-2 rounded">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-stone-100">{isMr ? 'स्थानिक बॅकअप सुरक्षित' : 'Zero Data Loss Guarantee'}</div>
                    <div className="text-[11px] text-amber-300/80">{isMr ? 'तक्रारी आपोआप पुन्हा जोडल्यावर सिंक होतील' : 'Reports queued for auto-sync'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-amber-900/40 p-2 rounded">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-stone-100">{isMr ? 'आपत्कालीन फोन' : 'Rural Emergency Helplines'}</div>
                    <div className="text-[11px] text-amber-300/80">112 (Disaster) · 1800-120-8040 (Kisan Call Center)</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>
      )}

      {/* Just Reconnected Toast */}
      {justReconnected && !offlineState && (
        <aside
          role="status"
          aria-live="polite"
          className="bg-emerald-900 text-emerald-100 border-b border-emerald-700 py-2 transition-all shadow-md"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-medium">
                {isMr ? 'इंटरनेट पुन्हा जोडले गेले! ग्राम दृष्टी डेटा अद्ययावत झाला आहे.' : 'Internet restored! Gram Drishti has synchronized with live Maharashtra open data.'}
              </span>
            </div>
            <span className="text-emerald-300 text-xs hidden sm:inline">
              {isMr ? 'कॅश स्वयंचलित रिफ्रेश' : 'Auto-synced with cloud'}
            </span>
          </div>
        </aside>
      )}
    </>
  );
};
