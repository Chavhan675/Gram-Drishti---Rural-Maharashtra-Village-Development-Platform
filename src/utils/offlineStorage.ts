import { MOCK_VILLAGES, MOCK_SCHEMES } from '../data/mockData';
import { Village, GovernmentScheme } from '../types';

const CACHE_KEYS = {
  VILLAGES: 'gram_drishti_cached_villages',
  SCHEMES: 'gram_drishti_cached_schemes',
  LAST_SYNC: 'gram_drishti_last_sync_timestamp',
  SIMULATED_OFFLINE: 'gram_drishti_simulated_offline',
  PENDING_REPORTS: 'gram_drishti_pending_citizen_reports',
};

export interface OfflineStorageMetrics {
  cachedVillagesCount: number;
  cachedSchemesCount: number;
  lastSyncTime: string;
  isSimulatedOffline: boolean;
  pendingReportsCount: number;
}

/**
 * Initialize offline cache with default public datasets (Medshi, Bhilar, etc.)
 * Ensures immediate offline capability on first visit.
 */
export const initializeOfflineCache = (): void => {
  try {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem(CACHE_KEYS.VILLAGES)) {
      localStorage.setItem(CACHE_KEYS.VILLAGES, JSON.stringify(MOCK_VILLAGES));
    }
    if (!localStorage.getItem(CACHE_KEYS.SCHEMES)) {
      localStorage.setItem(CACHE_KEYS.SCHEMES, JSON.stringify(MOCK_SCHEMES));
    }
    if (!localStorage.getItem(CACHE_KEYS.LAST_SYNC)) {
      localStorage.setItem(CACHE_KEYS.LAST_SYNC, new Date().toISOString());
    }
  } catch (e) {
    console.warn('Unable to access localStorage for offline cache:', e);
  }
};

/**
 * Retrieve all cached villages from local storage with fallback to MOCK_VILLAGES
 */
export const getCachedVillages = (): Village[] => {
  try {
    const raw = localStorage.getItem(CACHE_KEYS.VILLAGES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading cached villages:', e);
  }
  return MOCK_VILLAGES;
};

/**
 * Retrieve cached schemes
 */
export const getCachedSchemes = (): GovernmentScheme[] => {
  try {
    const raw = localStorage.getItem(CACHE_KEYS.SCHEMES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading cached schemes:', e);
  }
  return MOCK_SCHEMES;
};

/**
 * Save newly fetched or edited village data to offline storage
 */
export const saveVillageToOfflineCache = (village: Village): void => {
  try {
    const villages = getCachedVillages();
    const index = villages.findIndex((v) => v.id === village.id);
    let updated: Village[];
    if (index >= 0) {
      updated = [...villages];
      updated[index] = village;
    } else {
      updated = [village, ...villages];
    }
    localStorage.setItem(CACHE_KEYS.VILLAGES, JSON.stringify(updated));
    localStorage.setItem(CACHE_KEYS.LAST_SYNC, new Date().toISOString());
  } catch (e) {
    console.error('Failed to save village to offline cache:', e);
  }
};

/**
 * Store citizen grievance reports made while offline so they can auto-sync on reconnect
 */
export const queueOfflineCitizenReport = (report: any): void => {
  try {
    const existing = JSON.parse(localStorage.getItem(CACHE_KEYS.PENDING_REPORTS) || '[]');
    existing.push({
      ...report,
      queuedAt: new Date().toISOString(),
    });
    localStorage.setItem(CACHE_KEYS.PENDING_REPORTS, JSON.stringify(existing));
  } catch (e) {
    console.error('Failed to queue offline citizen report:', e);
  }
};

export const getPendingCitizenReports = (): any[] => {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEYS.PENDING_REPORTS) || '[]');
  } catch {
    return [];
  }
};

export const clearPendingCitizenReports = (): void => {
  try {
    localStorage.removeItem(CACHE_KEYS.PENDING_REPORTS);
  } catch (e) {
    console.error('Failed to clear pending reports:', e);
  }
};

/**
 * Simulated offline mode for testing/demoing rural connectivity drops
 */
export const setSimulatedOffline = (enabled: boolean): void => {
  try {
    if (enabled) {
      localStorage.setItem(CACHE_KEYS.SIMULATED_OFFLINE, 'true');
    } else {
      localStorage.removeItem(CACHE_KEYS.SIMULATED_OFFLINE);
    }
    window.dispatchEvent(new Event('offline-state-change'));
  } catch (e) {
    console.warn('Failed to set simulated offline state:', e);
  }
};

export const isSimulatedOffline = (): boolean => {
  try {
    return localStorage.getItem(CACHE_KEYS.SIMULATED_OFFLINE) === 'true';
  } catch {
    return false;
  }
};

/**
 * Combined network and simulation check
 */
export const isOffline = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !navigator.onLine || isSimulatedOffline();
};

export const getOfflineStorageMetrics = (): OfflineStorageMetrics => {
  const villages = getCachedVillages();
  const schemes = getCachedSchemes();
  const pendingReports = getPendingCitizenReports();
  const lastSync = (typeof window !== 'undefined' && localStorage.getItem(CACHE_KEYS.LAST_SYNC)) || new Date().toISOString();

  return {
    cachedVillagesCount: villages.length,
    cachedSchemesCount: schemes.length,
    lastSyncTime: lastSync,
    isSimulatedOffline: isSimulatedOffline(),
    pendingReportsCount: pendingReports.length,
  };
};
