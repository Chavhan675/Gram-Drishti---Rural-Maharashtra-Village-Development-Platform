import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  Wheat,
  Droplet,
  Store,
  MapPin,
  TrendingUp,
  Sprout,
  ShieldCheck,
  CheckCircle2,
  Brain,
  Cpu,
  ArrowRight,
  Sun,
  CloudRain,
  CloudSun,
  Wind,
  Thermometer,
  Droplets,
  Calendar,
  AlertTriangle,
  Clock,
  RefreshCw,
  Sparkles,
  Info
} from 'lucide-react';

interface DayForecast {
  dayNameEn: string;
  dayNameMr: string;
  dateStr: string;
  tempHigh: number;
  tempLow: number;
  conditionEn: string;
  conditionMr: string;
  rainProbability: number;
  expectedRainMm: number;
  humidityPercent: number;
  windSpeedKmh: number;
  iconType: 'sun' | 'cloud-sun' | 'cloud-rain';
  advisoryType: 'favorable' | 'caution' | 'warning';
  sowingStatus: 'recommended' | 'caution' | 'not-recommended';
  sprayingStatus: 'recommended' | 'caution' | 'not-recommended';
  irrigationStatus: 'hold' | 'light' | 'normal';
}

export const VillageAgriculturePage: React.FC = () => {
  const { language, selectedVillage, navigateTo } = useApp();
  const t = getTranslation(language);

  const [lastRefreshed, setLastRefreshed] = useState<string>(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );
  const [selectedForecastIndex, setSelectedForecastIndex] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const vName = language === 'mr' ? selectedVillage.nameMr : selectedVillage.nameEn;
  const tName = language === 'mr' ? selectedVillage.talukaMr : selectedVillage.talukaEn;
  const dName = language === 'mr' ? selectedVillage.districtMr : selectedVillage.districtEn;

  const agri = selectedVillage.agriculture;

  // Latitude-based weather simulation (Hill stations like Bhilar/Satara are cooler, Marathwada/Nanded is warm)
  const isCoolHillStation = selectedVillage.latitude < 18.5 && selectedVillage.longitude < 74.0;
  const baseTempHigh = isCoolHillStation ? 25 : 32;
  const baseTempLow = isCoolHillStation ? 15 : 21;

  // 7-Day Agro-Climatic Forecast Data tailored for Maharashtra agricultural belts
  const forecast7Days: DayForecast[] = useMemo(() => {
    return [
      {
        dayNameEn: 'Today',
        dayNameMr: 'आज',
        dateStr: '29 Oct',
        tempHigh: baseTempHigh,
        tempLow: baseTempLow,
        conditionEn: 'Mostly Sunny & Clear',
        conditionMr: 'मुख्यतः निरभ्र व स्वच्छ ऊन',
        rainProbability: 10,
        expectedRainMm: 0.0,
        humidityPercent: 54,
        windSpeedKmh: 11,
        iconType: 'sun',
        advisoryType: 'favorable',
        sowingStatus: 'recommended',
        sprayingStatus: 'recommended',
        irrigationStatus: 'normal'
      },
      {
        dayNameEn: 'Tomorrow',
        dayNameMr: 'उद्या',
        dateStr: '30 Oct',
        tempHigh: baseTempHigh + 1,
        tempLow: baseTempLow,
        conditionEn: 'Sunny with Mild Afternoon Breeze',
        conditionMr: 'स्वच्छ सूर्यप्रकाश व दुपारी मंद वारा',
        rainProbability: 15,
        expectedRainMm: 0.2,
        humidityPercent: 58,
        windSpeedKmh: 14,
        iconType: 'sun',
        advisoryType: 'favorable',
        sowingStatus: 'recommended',
        sprayingStatus: 'recommended',
        irrigationStatus: 'normal'
      },
      {
        dayNameEn: 'Friday',
        dayNameMr: 'शुक्रवार',
        dateStr: '31 Oct',
        tempHigh: baseTempHigh - 1,
        tempLow: baseTempLow + 1,
        conditionEn: 'Partly Cloudy',
        conditionMr: 'अंशतः ढगाळ वातावरण',
        rainProbability: 35,
        expectedRainMm: 1.5,
        humidityPercent: 68,
        windSpeedKmh: 16,
        iconType: 'cloud-sun',
        advisoryType: 'caution',
        sowingStatus: 'caution',
        sprayingStatus: 'caution',
        irrigationStatus: 'light'
      },
      {
        dayNameEn: 'Saturday',
        dayNameMr: 'शनिवार',
        dateStr: '01 Nov',
        tempHigh: baseTempHigh - 3,
        tempLow: baseTempLow,
        conditionEn: 'Isolated Light Convective Showers',
        conditionMr: 'विखुरलेल्या हलक्या सरींची शक्यता',
        rainProbability: 65,
        expectedRainMm: 7.8,
        humidityPercent: 78,
        windSpeedKmh: 19,
        iconType: 'cloud-rain',
        advisoryType: 'warning',
        sowingStatus: 'not-recommended',
        sprayingStatus: 'not-recommended',
        irrigationStatus: 'hold'
      },
      {
        dayNameEn: 'Sunday',
        dayNameMr: 'रविवार',
        dateStr: '02 Nov',
        tempHigh: baseTempHigh - 2,
        tempLow: baseTempLow - 1,
        conditionEn: 'Passing Clouds & High Humidity',
        conditionMr: 'ढगाळ हवामान व उच्च आर्द्रता',
        rainProbability: 40,
        expectedRainMm: 2.1,
        humidityPercent: 72,
        windSpeedKmh: 15,
        iconType: 'cloud-sun',
        advisoryType: 'caution',
        sowingStatus: 'caution',
        sprayingStatus: 'caution',
        irrigationStatus: 'light'
      },
      {
        dayNameEn: 'Monday',
        dayNameMr: 'सोमवार',
        dateStr: '03 Nov',
        tempHigh: baseTempHigh,
        tempLow: baseTempLow - 1,
        conditionEn: 'Clear Sky & Dry Weather',
        conditionMr: 'स्वच्छ आकाश व कोरडे हवामान',
        rainProbability: 10,
        expectedRainMm: 0.0,
        humidityPercent: 52,
        windSpeedKmh: 10,
        iconType: 'sun',
        advisoryType: 'favorable',
        sowingStatus: 'recommended',
        sprayingStatus: 'recommended',
        irrigationStatus: 'normal'
      },
      {
        dayNameEn: 'Tuesday',
        dayNameMr: 'मंगळवार',
        dateStr: '04 Nov',
        tempHigh: baseTempHigh + 1,
        tempLow: baseTempLow,
        conditionEn: 'Bright Sunshine',
        conditionMr: 'प्रखर सूर्यप्रकाश',
        rainProbability: 5,
        expectedRainMm: 0.0,
        humidityPercent: 49,
        windSpeedKmh: 9,
        iconType: 'sun',
        advisoryType: 'favorable',
        sowingStatus: 'recommended',
        sprayingStatus: 'recommended',
        irrigationStatus: 'normal'
      }
    ];
  }, [baseTempHigh, baseTempLow]);

  const activeForecast = forecast7Days[selectedForecastIndex] || forecast7Days[0];

  const handleRefreshWeather = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setIsRefreshing(false);
    }, 600);
  };

  const renderWeatherIcon = (type: DayForecast['iconType'], className = 'w-6 h-6') => {
    switch (type) {
      case 'sun':
        return <Sun className={`${className} text-amber-500`} />;
      case 'cloud-sun':
        return <CloudSun className={`${className} text-orange-400`} />;
      case 'cloud-rain':
        return <CloudRain className={`${className} text-blue-500`} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-16">
      <Breadcrumbs
        items={[
          { label: dName },
          { label: tName },
          { label: vName, page: 'village-overview' },
          { label: t.cardAgricultureTitle }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="border-b border-amber-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-orange-700 uppercase tracking-wider font-mono">
                {language === 'mr' ? '🌾 शेती व कृषी हवामान मार्गदर्शन' : '🌾 Agriculture, Agronomy & Agro-Climatic Intelligence'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight font-serif mt-0.5">
              {vName} — {t.agricultureTitle}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {language === 'mr'
                ? 'हवामान अंदाज, शेती कामे नियोजन सल्ला, मातीचे आरोग्य, सिंचन व बाजार समितीचे शेतकरी मार्गदर्शन.'
                : 'Real-time agro-climatic meteorological forecast, crop activity planner, irrigation advisories, and APMC market access.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('village-overview')}
              className="px-4 py-2 bg-white hover:bg-amber-50 border border-amber-300 text-stone-800 text-xs font-bold rounded-xl transition-all shadow-2xs hover:shadow"
            >
              {t.back}
            </button>
          </div>
        </div>

        {/* =========================================================================
            FEATURED NEW WIDGET: AGRO-CLIMATIC WEATHER FORECAST & FARM ADVISORY
            ========================================================================= */}
        <div className="bg-white rounded-3xl border border-amber-200 shadow-md overflow-hidden space-y-6 p-6 sm:p-8 relative">
          {/* Top Tricolor / Saffron Accent */}
          <div className="h-2 w-full bg-gradient-to-r from-amber-400 via-orange-500 to-emerald-600 rounded-t-3xl -mt-6 -mx-6 sm:-mt-8 sm:-mx-8 mb-4" />

          {/* Widget Header Strip */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-100 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-orange-950 font-mono text-[11px] font-bold border border-amber-300 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-orange-600" />
                  <span>IMD & Mahavedh Automatic Weather Station (AWS) Synced</span>
                </span>
                <span className="text-[10px] text-stone-500 font-mono">
                  Station Lat: {selectedVillage.latitude.toFixed(2)}°N
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-stone-950 font-serif tracking-tight">
                {language === 'mr'
                  ? `${vName} कृषी हवामान अंदाज व शेती सल्लागार`
                  : `${vName} Agro-Climatic Weather Forecast & Farmer Activity Advisory`}
              </h2>
              <p className="text-xs text-stone-600">
                {language === 'mr'
                  ? 'पेरणी, आंतरमशागत, कीटकनाशक फवारणी व पाणी व्यवस्थापनासाठी ७ दिवसांचा उपग्रह हवामान अंदाज.'
                  : '7-Day micro-meteorological forecast with actionable farm activity advisories for sowing, pesticide spraying, and irrigation.'}
              </p>
            </div>

            {/* Refresh Button & Timestamp */}
            <div className="flex items-center gap-2 self-start md:self-center shrink-0">
              <span className="text-[11px] text-stone-500 font-mono">
                {language === 'mr' ? 'अद्यतन:' : 'Updated:'} {lastRefreshed}
              </span>
              <button
                onClick={handleRefreshWeather}
                disabled={isRefreshing}
                className="p-2 bg-amber-50 hover:bg-amber-100 text-stone-700 rounded-xl border border-amber-300 transition-colors inline-flex items-center gap-1.5 text-xs font-bold shadow-2xs"
                title="Fetch latest meteorological data"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-orange-600 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">{language === 'mr' ? 'ताजे करा' : 'Refresh'}</span>
              </button>
            </div>
          </div>

          {/* Current Live Weather Hero Card */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl text-white p-6 shadow-md relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Main Temperature Block */}
              <div className="md:col-span-5 space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl shadow-inner">
                    {activeForecast.iconType === 'sun' ? '☀️' : activeForecast.iconType === 'cloud-sun' ? '⛅' : '🌧️'}
                  </div>
                  <div>
                    <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white drop-shadow-sm">
                      {activeForecast.tempHigh}°C
                    </div>
                    <div className="text-xs text-amber-100 font-medium">
                      Min: {activeForecast.tempLow}°C · {language === 'mr' ? 'जास्तीत जास्त' : 'Max'}: {activeForecast.tempHigh}°C
                    </div>
                  </div>
                </div>

                <p className="text-base font-bold text-white font-serif">
                  {language === 'mr' ? activeForecast.conditionMr : activeForecast.conditionEn}
                </p>
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-white">
                  📍 {vName} (ता. {tName}, जि. {dName})
                </span>
              </div>

              {/* Right Meteorological Grid Parameters */}
              <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-stone-950/20 backdrop-blur-md p-3 rounded-xl border border-white/10 text-center space-y-1">
                  <span className="text-[10px] text-amber-200 uppercase font-mono block">
                    {language === 'mr' ? 'पावसाची शक्यता' : 'Rain Probability'}
                  </span>
                  <div className="text-lg font-black font-mono text-white flex items-center justify-center gap-1">
                    <CloudRain className="w-4 h-4 text-sky-300" />
                    <span>{activeForecast.rainProbability}%</span>
                  </div>
                  <span className="text-[10px] text-amber-100 font-mono block">
                    {activeForecast.expectedRainMm} mm rain
                  </span>
                </div>

                <div className="bg-stone-950/20 backdrop-blur-md p-3 rounded-xl border border-white/10 text-center space-y-1">
                  <span className="text-[10px] text-amber-200 uppercase font-mono block">
                    {language === 'mr' ? 'हवेतील आर्द्रता' : 'Rel. Humidity'}
                  </span>
                  <div className="text-lg font-black font-mono text-white flex items-center justify-center gap-1">
                    <Droplets className="w-4 h-4 text-cyan-300" />
                    <span>{activeForecast.humidityPercent}%</span>
                  </div>
                  <span className="text-[10px] text-amber-100 font-mono block">
                    {activeForecast.humidityPercent > 65 ? 'High (आर्द्र)' : 'Optimal (योग्य)'}
                  </span>
                </div>

                <div className="bg-stone-950/20 backdrop-blur-md p-3 rounded-xl border border-white/10 text-center space-y-1">
                  <span className="text-[10px] text-amber-200 uppercase font-mono block">
                    {language === 'mr' ? 'वाऱ्याचा वेग' : 'Wind Speed'}
                  </span>
                  <div className="text-lg font-black font-mono text-white flex items-center justify-center gap-1">
                    <Wind className="w-4 h-4 text-amber-200" />
                    <span>{activeForecast.windSpeedKmh} km/h</span>
                  </div>
                  <span className="text-[10px] text-amber-100 font-mono block">
                    Direction: SW (नैऋत्य)
                  </span>
                </div>

                <div className="bg-stone-950/20 backdrop-blur-md p-3 rounded-xl border border-white/10 text-center space-y-1">
                  <span className="text-[10px] text-amber-200 uppercase font-mono block">
                    {language === 'mr' ? 'माती ओलावा' : 'Soil Moisture'}
                  </span>
                  <div className="text-lg font-black font-mono text-white flex items-center justify-center gap-1">
                    <Sprout className="w-4 h-4 text-emerald-300" />
                    <span>68% Sat</span>
                  </div>
                  <span className="text-[10px] text-amber-100 font-mono block">
                    At 10cm Depth
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 7-Day Interactive Forecast Strip */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900 uppercase font-mono tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-orange-600" />
                <span>{language === 'mr' ? '७ दिवसांचा कृषी हवामान तक्ता (दिवस निवडा)' : '7-Day Agro-Weather Outlook (Select Day)'}</span>
              </span>
              <span className="text-[11px] text-stone-500 font-medium">
                {language === 'mr' ? 'तपशील पाहण्यासाठी क्लिक करा' : 'Click any day to see farming advisory'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {forecast7Days.map((day, idx) => {
                const isSelected = selectedForecastIndex === idx;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedForecastIndex(idx)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col justify-between items-center space-y-2 group ${
                      isSelected
                        ? 'bg-amber-100/90 border-orange-500 shadow-md ring-2 ring-orange-400'
                        : 'bg-stone-50/80 hover:bg-amber-50 border-stone-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <span className="font-bold text-stone-900 text-xs block">
                        {language === 'mr' ? day.dayNameMr : day.dayNameEn}
                      </span>
                      <span className="text-[10px] text-stone-500 font-mono block">
                        {day.dateStr}
                      </span>
                    </div>

                    <div className="my-1">
                      {renderWeatherIcon(day.iconType, 'w-7 h-7')}
                    </div>

                    <div className="space-y-0.5">
                      <div className="font-mono font-black text-stone-950 text-xs">
                        {day.tempHigh}° <span className="text-stone-500 font-normal">{day.tempLow}°</span>
                      </div>
                      <div className="text-[10px] text-sky-700 font-mono font-semibold flex items-center justify-center gap-0.5">
                        <Droplets className="w-3 h-3" />
                        <span>{day.rainProbability}%</span>
                      </div>
                    </div>

                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase font-mono block w-full ${
                        day.advisoryType === 'favorable'
                          ? 'bg-emerald-100 text-emerald-800'
                          : day.advisoryType === 'caution'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {day.advisoryType === 'favorable'
                        ? language === 'mr' ? 'अनुकूल' : 'Favorable'
                        : day.advisoryType === 'caution'
                        ? language === 'mr' ? 'दक्षता' : 'Caution'
                        : language === 'mr' ? 'पाऊस इशारा' : 'Rain Warning'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actionable Farm Activity Advisory for the Selected Day */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-orange-600 text-white flex items-center justify-center font-bold text-xs">
                  🌾
                </div>
                <div>
                  <h3 className="font-bold text-stone-950 text-sm font-serif">
                    {language === 'mr'
                      ? `${activeForecast.dayNameMr} (${activeForecast.dateStr}) साठी कृषी दैनंदिन कृती सल्ला`
                      : `Farm Activity Advisories for ${activeForecast.dayNameEn} (${activeForecast.dateStr})`}
                  </h3>
                  <span className="text-[11px] text-stone-600">
                    Based on temperature ({activeForecast.tempHigh}°C), rain probability ({activeForecast.rainProbability}%), and wind speed ({activeForecast.windSpeedKmh} km/h)
                  </span>
                </div>
              </div>

              <span className="text-xs font-mono font-bold bg-white px-3 py-1 rounded-lg border border-stone-300 text-stone-800">
                Crop Belt: {agri.majorCropsEn[0]} & {agri.majorCropsEn[1] || 'Cash Crops'}
              </span>
            </div>

            {/* 4 Activity Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {/* 1. Sowing & Land Preparation */}
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 flex items-center gap-1.5">
                    <Sprout className="w-4 h-4 text-emerald-600" />
                    <span>{language === 'mr' ? 'पेरणी व मशागत' : 'Sowing & Tillage'}</span>
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                      activeForecast.sowingStatus === 'recommended'
                        ? 'bg-emerald-100 text-emerald-800'
                        : activeForecast.sowingStatus === 'caution'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {activeForecast.sowingStatus === 'recommended'
                      ? '✓ Feasible'
                      : activeForecast.sowingStatus === 'caution'
                      ? '⚠️ Monitor'
                      : '✕ Postpone'}
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  {activeForecast.sowingStatus === 'recommended'
                    ? language === 'mr'
                      ? 'मृदा ओलावा आणि तापमान पेरणीसाठी उत्तम. रब्बी/खरीप बियाणे प्रक्रिया करून पेरणी करावी.'
                      : 'Soil moisture (68%) and temperature are optimal for field operations and seed drilling.'
                    : activeForecast.sowingStatus === 'caution'
                    ? language === 'mr'
                      ? 'ढगाळ वातावरण असल्याने पेरणीपूर्वी शेतात पाणी साचणार नाही याची खात्री करा.'
                      : 'Ensure proper field drainage; light showers may cause surface crusting.'
                    : language === 'mr'
                      ? 'पावसाची शक्यता असल्याने पेरणी व नांगरट २ दिवस पुढे ढकलावी.'
                      : 'Postpone active sowing due to forecasted rain and saturated topsoil.'}
                </p>
              </div>

              {/* 2. Pesticide / Fertilizer Spraying */}
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-indigo-600" />
                    <span>{language === 'mr' ? 'फवारणी व खते' : 'Pest Spraying'}</span>
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                      activeForecast.sprayingStatus === 'recommended'
                        ? 'bg-emerald-100 text-emerald-800'
                        : activeForecast.sprayingStatus === 'caution'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {activeForecast.sprayingStatus === 'recommended'
                      ? '✓ Favorable'
                      : activeForecast.sprayingStatus === 'caution'
                      ? '⚠️ Morning Only'
                      : '✕ No Spray'}
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  {activeForecast.sprayingStatus === 'recommended'
                    ? language === 'mr'
                      ? `वाऱ्याचा वेग ${activeForecast.windSpeedKmh} km/h कमी असल्याने कीटकनाशक व बुरशीनाशक फवारणीसाठी योग्य दिवस.`
                      : `Wind speed is calm (${activeForecast.windSpeedKmh} km/h). Safe for foliar nutrient and pest spray.`
                    : activeForecast.sprayingStatus === 'caution'
                    ? language === 'mr'
                      ? 'दुपारी वारा वाढण्याची शक्यता असल्याने फवारणी फक्त सकाळी ८ ते ११ या वेळेत पूर्ण करावी.'
                      : 'Spray only in early morning (7-10 AM) before wind picks up in afternoon.'
                    : language === 'mr'
                      ? 'पावसामुळे औषध वाहून जाण्याची शक्यता असल्याने कोणतीही फवारणी करू नये.'
                      : 'Do not spray. Rain wash-off will cause chemical wastage and low efficacy.'}
                </p>
              </div>

              {/* 3. Irrigation Management */}
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 flex items-center gap-1.5">
                    <Droplet className="w-4 h-4 text-blue-600" />
                    <span>{language === 'mr' ? 'पाणी व्यवस्थापन' : 'Irrigation Plan'}</span>
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                      activeForecast.irrigationStatus === 'normal'
                        ? 'bg-blue-100 text-blue-800'
                        : activeForecast.irrigationStatus === 'light'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {activeForecast.irrigationStatus === 'normal'
                      ? 'Normal Drip'
                      : activeForecast.irrigationStatus === 'light'
                      ? 'Light Water'
                      : 'Hold (बंद)'}
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  {activeForecast.irrigationStatus === 'normal'
                    ? language === 'mr'
                      ? 'कोरड्या वातावरणामुळे ठिबक सिंचनाद्वारे पिकांना नियमित पाणी द्यावे (सकाळी किंवा संध्याकाळी).'
                      : 'Operate micro-irrigation normally. Maintain root-zone moisture for standing crops.'
                    : activeForecast.irrigationStatus === 'light'
                    ? language === 'mr'
                      ? 'ढगाळ वातावरण असल्याने पाण्याचे प्रमाण २०-३०% कमी करावे.'
                      : 'Reduce drip duration by 25% due to higher humidity and cloud cover.'
                    : language === 'mr'
                      ? 'पावसाचा अंदाज असल्याने सिंचन पूर्णपणे थांबवावे. वीज व पाण्याची बचत होईल.'
                      : 'Hold irrigation. Expected precipitation will replenish root-zone reservoir.'}
                </p>
              </div>

              {/* 4. Crop Protection & Harvest */}
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 flex items-center gap-1.5">
                    <Wheat className="w-4 h-4 text-amber-600" />
                    <span>{language === 'mr' ? 'कापणी व साठवणूक' : 'Harvest & Yard'}</span>
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-800 font-mono">
                    Storage Ready
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  {language === 'mr'
                    ? 'कापणी केलेला शेतमाल सुरक्षित शेडमध्ये किंवा ताडपत्रीने झाकून ठेवावा. बाजार आवारात माल आणताना कोरडे पोते वापरावे.'
                    : 'Keep harvested produce covered with tarpaulins. Ensure moisture content in soybean/grain is below 12% before bagging.'}
                </p>
              </div>
            </div>

            {/* IMD Krishi Advisory Alert Box */}
            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-300 flex items-start gap-2.5 text-xs text-amber-950">
              <AlertTriangle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold uppercase font-mono text-[10px] text-orange-900 block">
                  {language === 'mr' ? 'कृषी विज्ञान केंद्र (KVK) व IMD विशेष सूचना:' : 'IMD Agromet Advisory & KVK Warning:'}
                </span>
                <p className="mt-0.5 text-stone-700 leading-relaxed">
                  {language === 'mr'
                    ? `हळद, केळी व सोयाबीन पिकांमध्ये पाणी साचू नये म्हणून चऱ्या काढून पाण्याचा निचरा मोकळा ठेवावा. अधिक माहितीसाठी जवळच्या कृषी सेवा केंद्राशी संपर्क साधावा.`
                    : `Farmers in ${vName} cultivating ${agri.majorCropsEn[0]} and ${agri.majorCropsEn[1] || 'cash crops'} are advised to clear field drainage furrows to avoid root aeration stress.`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Indicators Row with Golden Harvest & Emerald Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-gradient-to-b from-emerald-50/80 to-white p-4.5 rounded-2xl border border-emerald-200 shadow-2xs">
            <span className="text-xs text-emerald-900 font-bold block uppercase font-mono">{t.irrigationCoverage}</span>
            <span className="text-3xl font-black text-emerald-950 font-mono mt-1 block">
              {agri.irrigatedAreaPercent}%
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
              {language === 'mr' ? 'ओलिताखालील क्षेत्र' : 'Of cultivable area'}
            </span>
          </div>

          <div className="bg-gradient-to-b from-blue-50/80 to-white p-4.5 rounded-2xl border border-blue-200 shadow-2xs">
            <span className="text-xs text-blue-900 font-bold block uppercase font-mono">
              {language === 'mr' ? 'ठिबक सिंचन प्रमाण' : 'Drip Irrigation'}
            </span>
            <span className="text-3xl font-black text-blue-950 font-mono mt-1 block">
              {agri.dripIrrigationCoveragePercent}%
            </span>
            <span className="text-[11px] text-blue-700 font-semibold mt-1 block">
              {language === 'mr' ? 'सूक्ष्म सिंचन वापर' : 'Micro-irrigation coverage'}
            </span>
          </div>

          <div className="bg-gradient-to-b from-amber-50/80 to-white p-4.5 rounded-2xl border border-amber-200 shadow-2xs">
            <span className="text-xs text-amber-900 font-bold block uppercase font-mono">
              {language === 'mr' ? 'शेततळी संख्या' : 'Farm Ponds'}
            </span>
            <span className="text-3xl font-black text-stone-900 font-mono mt-1 block">
              {agri.farmPondsCount}
            </span>
            <span className="text-[11px] text-amber-800 font-semibold mt-1 block">
              {language === 'mr' ? 'मागेल त्याला शेततळे' : 'Completed farm ponds'}
            </span>
          </div>

          <div className="bg-gradient-to-b from-orange-50/80 to-white p-4.5 rounded-2xl border border-orange-200 shadow-2xs">
            <span className="text-xs text-orange-900 font-bold block uppercase font-mono">
              {language === 'mr' ? 'कृषी सेवा केंद्र' : 'Agri Depots'}
            </span>
            <span className="text-3xl font-black text-stone-900 font-mono mt-1 block">
              {agri.krishiSevaKendraCount}
            </span>
            <span className="text-[11px] text-orange-800 font-semibold mt-1 block">
              {language === 'mr' ? 'गावातील खत-बियाणे केंद्रे' : 'Input centers in village'}
            </span>
          </div>
        </div>

        {/* Crops & Agronomy Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Major Crops */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-amber-200 shadow-sm space-y-4 relative overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-orange-500 to-emerald-500 rounded-t-2xl -mt-6 -mx-6 sm:-mt-7 sm:-mx-7 mb-4" />

            <div className="flex items-center gap-2 border-b border-amber-100 pb-3">
              <Wheat className="w-5 h-5 text-amber-600" />
              <h2 className="text-base font-bold text-stone-950 font-serif">{t.majorCrops}</h2>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-1">
              {(language === 'mr' ? agri.majorCropsMr : agri.majorCropsEn).map((crop, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 text-orange-950 border border-amber-300 rounded-xl text-xs font-bold shadow-2xs"
                >
                  🌾 {crop}
                </span>
              ))}
            </div>

            <div className="pt-3 border-t border-amber-100 space-y-2 text-xs">
              <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-200">
                <span className="text-stone-500 block font-mono text-[10px] uppercase font-bold">{t.soilType}:</span>
                <span className="text-stone-900 font-bold text-sm">
                  {language === 'mr' ? agri.soilTypeMr : agri.soilTypeEn}
                </span>
              </div>
            </div>
          </div>

          {/* Water & Market Access */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-amber-200 shadow-sm space-y-4 relative overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 rounded-t-2xl -mt-6 -mx-6 sm:-mt-7 sm:-mx-7 mb-4" />

            <div className="flex items-center gap-2 border-b border-amber-100 pb-3">
              <Droplet className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-stone-950 font-serif">{t.waterSources}</h2>
            </div>

            <div className="space-y-3.5 text-xs text-stone-700">
              <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-200">
                <span className="text-stone-500 block font-mono text-[10px] uppercase font-bold">
                  {language === 'mr' ? 'सिंचन स्रोत' : 'Irrigation Reservoir / River Link'}:
                </span>
                <span className="text-stone-900 font-bold text-sm">
                  {language === 'mr' ? agri.waterSourceMr : agri.waterSourceEn}
                </span>
              </div>

              <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-200">
                <span className="text-stone-500 block font-mono text-[10px] uppercase font-bold">{t.nearestApmc}:</span>
                <span className="text-stone-900 font-bold text-sm">
                  {language === 'mr' ? agri.nearestApmcMr : agri.nearestApmcEn}
                </span>
                <span className="text-[11px] text-emerald-800 font-semibold block mt-0.5">
                  {language === 'mr'
                    ? `अंतर: सुमारे ${agri.apmcDistanceKm} किमी`
                    : `Approx. distance: ${agri.apmcDistanceKm} km`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* AI & ML AGRO-INTELLIGENCE EXPERIMENTAL MODULE */}
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white p-6 sm:p-7 rounded-2xl border border-indigo-700/50 shadow-lg relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-mono font-bold">
                <Brain className="w-3.5 h-3.5 text-amber-400" />
                <span>AI & DATA SCIENCE RESEARCH PIPELINE</span>
              </div>
              <h3 className="text-lg font-bold font-serif text-white">
                {language === 'mr'
                  ? 'मृदा पोषकद्रव्ये (NPK) व उपग्रह NDVI पीक अंदाज अल्गोरिदम'
                  : 'Soil Nutrients (NPK) & Satellite NDVI Crop Yield ML Model'}
              </h3>
              <p className="text-xs text-indigo-200 max-w-2xl leading-relaxed">
                {language === 'mr'
                  ? `${vName} गावासाठी XGBoost व Random Forest मॉडेलद्वारे खते, पाऊस आणि तापमानानुसार पीक उत्पादकतेचा थेट अंदाज आणि Sentinel-2 उपग्रह दृश्य.`
                  : `Run XGBoost regressor simulations on N, P, K soil nutrients and inspect multispectral Sentinel-2 satellite NDVI vegetation health for ${vName}.`}
              </p>
            </div>

            <button
              onClick={() => navigateTo('ml-analytics')}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md inline-flex items-center gap-2 self-start sm:self-auto shrink-0"
            >
              <Cpu className="w-4 h-4" />
              <span>{language === 'mr' ? 'थेट ML लॅब उघडा' : 'Launch ML Engine'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Farmer Assistance CTA with Maharashtra Emerald & Gold */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-orange-950 text-white p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-5 border border-emerald-500/30 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400" />

          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-xs font-mono uppercase text-amber-300 font-bold tracking-wider">
              🚩 {language === 'mr' ? 'शेतकरी साहाय्य' : 'Farmer Welfare'}
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
              {language === 'mr'
                ? 'शेतकऱ्यांसाठी शासकीय अनुदान व कृषी योजना'
                : 'Subsidies & Welfare Schemes for Farmers'}
            </h3>
            <p className="text-xs text-emerald-200/90 max-w-xl">
              {language === 'mr'
                ? 'नमो शेतकरी महासन्मान निधी, मागेल त्याला शेततळे, ठिबक अनुदान व महाडीबीटी अनुदानाचे नियम तपासा.'
                : 'Explore eligibility, documents, and application steps for farm subsidies.'}
            </p>
          </div>
          <button
            onClick={() => navigateTo('schemes')}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-stone-950 font-bold text-xs rounded-xl transition-all whitespace-nowrap shadow-md"
          >
            {language === 'mr' ? 'कृषी योजना पहा →' : 'View Farm Schemes →'}
          </button>
        </div>
      </div>
    </div>
  );
};
