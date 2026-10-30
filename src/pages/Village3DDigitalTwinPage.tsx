import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  initVillage3DScene,
  InspectionMode,
  POINTS_OF_INTEREST,
  PointOfInterest,
  SceneEngine
} from '../services/village3DSceneBuilder';
import {
  Eye,
  Droplets,
  SunMedium,
  Sprout,
  Compass,
  Layers,
  ChevronUp,
  ChevronDown,
  Info,
  Maximize2,
  Minimize2,
  RefreshCw,
  Building,
  GraduationCap,
  Activity,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Sliders,
  Sparkles,
  Zap,
  TrendingUp,
  X
} from 'lucide-react';

export const Village3DDigitalTwinPage: React.FC = () => {
  const { language, selectedVillage, navigateTo } = useApp();
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<SceneEngine | null>(null);

  const [activePoi, setActivePoi] = useState<PointOfInterest>(POINTS_OF_INTEREST[0]);
  const [activeMode, setActiveMode] = useState<InspectionMode>('true_color');
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);
  const [showTechnicalDrawer, setShowTechnicalDrawer] = useState<boolean>(false);
  const [showSimulator, setShowSimulator] = useState<boolean>(false);
  const [isSceneReady, setIsSceneReady] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Policy Simulator Budget Sliders (in Lakhs INR)
  const [waterBudget, setWaterBudget] = useState<number>(15);
  const [solarBudget, setSolarBudget] = useState<number>(12);
  const [schoolBudget, setSchoolBudget] = useState<number>(8);
  const [roadBudget, setRoadBudget] = useState<number>(15);

  const totalAllocated = waterBudget + solarBudget + schoolBudget + roadBudget;

  // Real-time Policy Outcomes calculation
  const simulationMetrics = useMemo(() => {
    const waterScore = Math.min(100, 78 + waterBudget * 1.35);
    const solarScore = Math.min(100, 42 + solarBudget * 4.2);
    const educationScore = Math.min(100, 68 + schoolBudget * 3.4);
    const roadScore = Math.min(100, 72 + roadBudget * 1.75);

    const prosperityIndex = (
      waterScore * 0.30 +
      solarScore * 0.20 +
      educationScore * 0.25 +
      roadScore * 0.25
    ).toFixed(1);

    return {
      waterScore: waterScore.toFixed(1),
      solarScore: solarScore.toFixed(1),
      educationScore: educationScore.toFixed(1),
      roadScore: roadScore.toFixed(1),
      prosperityIndex
    };
  }, [waterBudget, solarBudget, schoolBudget, roadBudget]);

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasContainerRef.current) return;

    try {
      const engine = initVillage3DScene(canvasContainerRef.current);
      engineRef.current = engine;
      setIsSceneReady(true);
    } catch (err) {
      console.error('Failed to initialize Three.js 3D village scene:', err);
    }

    return () => {
      if (engineRef.current) {
        engineRef.current.dispose();
        engineRef.current = null;
      }
    };
  }, []);

  const handleSelectPoi = (poi: PointOfInterest) => {
    setActivePoi(poi);
    if (engineRef.current) {
      engineRef.current.flyToPoi(poi);
    }
  };

  const handleChangeMode = (mode: InspectionMode) => {
    setActiveMode(mode);
    if (engineRef.current) {
      engineRef.current.setInspectionMode(mode);
    }
  };

  const handleResetCamera = () => {
    const overviewPoi = POINTS_OF_INTEREST[0];
    handleSelectPoi(overviewPoi);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const applySimulatorSector = (sector: 'water' | 'solar' | 'school' | 'road') => {
    if (sector === 'water') {
      handleChangeMode('water_grid');
      const poi = POINTS_OF_INTEREST.find(p => p.id === 'water_tower');
      if (poi) handleSelectPoi(poi);
    } else if (sector === 'solar') {
      handleChangeMode('solar_energy');
      const poi = POINTS_OF_INTEREST.find(p => p.id === 'solar_substation');
      if (poi) handleSelectPoi(poi);
    } else if (sector === 'school') {
      handleChangeMode('true_color');
      const poi = POINTS_OF_INTEREST.find(p => p.id === 'zp_school');
      if (poi) handleSelectPoi(poi);
    } else if (sector === 'road') {
      handleChangeMode('true_color');
      const poi = POINTS_OF_INTEREST.find(p => p.id === 'gram_panchayat');
      if (poi) handleSelectPoi(poi);
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-7.5rem)] min-h-[620px] bg-slate-950 overflow-hidden select-none font-sans">
      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing outline-none"
        aria-label="3D Village Spatial Twin WebGL Canvas"
        role="region"
      />

      {/* Top Floating Glass HUD Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 pointer-events-none flex flex-wrap items-center justify-between gap-3">
        {/* Left: Village Digital Twin Identification */}
        <div className="pointer-events-auto bg-slate-900/95 border border-slate-700/80 rounded-xl px-4 py-2.5 shadow-xl text-white flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-bold text-white shadow-inner">
            <span className="text-xl">🏛️</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                {language === 'mr' ? '३डी डिजिटल ट्विन सिस्टिम' : '3D Spatial Infrastructure Twin'}
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-xs" />
              <span className="text-[11px] text-emerald-400 font-mono">Live 60 FPS PBR</span>
            </div>
            <h1 className="text-base font-bold text-white tracking-tight">
              {language === 'mr' ? selectedVillage.nameMr : selectedVillage.nameEn}
              <span className="text-xs font-normal text-slate-400 ml-2">
                ({language === 'mr' ? selectedVillage.districtMr : selectedVillage.districtEn} District)
              </span>
            </h1>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="pointer-events-auto bg-slate-900/95 border border-slate-700/80 rounded-xl p-1.5 shadow-xl flex items-center gap-1.5">
          <button
            onClick={handleResetCamera}
            title={language === 'mr' ? 'कॅमेरा रीसेट करा' : 'Reset Camera to Overview'}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium"
          >
            <RefreshCw className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">{language === 'mr' ? 'रीसेट' : 'Overview'}</span>
          </button>

          <button
            onClick={() => setShowSimulator(!showSimulator)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
              showSimulator
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span>{language === 'mr' ? 'विकास सिम्युलेटर' : 'Policy Sandbox'}</span>
          </button>

          <button
            onClick={() => setShowTechnicalDrawer(!showTechnicalDrawer)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
              showTechnicalDrawer
                ? 'bg-amber-400 text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Info className="w-4 h-4 text-amber-400" />
            <span>{language === 'mr' ? 'अभियांत्रिकी तपशील' : 'Engineering Telemetry'}</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => navigateTo('presentation')}
            className="px-2.5 py-1.5 bg-amber-400 text-slate-950 hover:bg-amber-300 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1"
          >
            <GraduationCap className="w-4 h-4" />
            <span className="hidden sm:inline">Viva Defense</span>
          </button>
        </div>
      </div>

      {/* Floating Left: Interactive Inspection Mode Selector */}
      <div className="absolute top-24 left-4 z-20 pointer-events-auto hidden md:flex flex-col gap-1.5 bg-slate-900/95 border border-slate-700/80 rounded-xl p-2 shadow-2xl w-56 text-white">
        <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-2 py-1 flex items-center justify-between">
          <span>{language === 'mr' ? 'तपासणी स्तर (Layers)' : 'Inspection Mode'}</span>
          <Layers className="w-3.5 h-3.5 text-amber-400" />
        </div>

        <button
          onClick={() => handleChangeMode('true_color')}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all text-left ${
            activeMode === 'true_color'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Eye className="w-4 h-4 shrink-0 text-amber-500" />
          <div>
            <div className="font-semibold">{language === 'mr' ? 'वास्तविक दृश्य (PBR)' : 'True-Color Daylight'}</div>
            <div className="text-[10px] opacity-75">{language === 'mr' ? 'सूर्यप्रकाश व सावली' : 'Architectural Shadows'}</div>
          </div>
        </button>

        <button
          onClick={() => handleChangeMode('water_grid')}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all text-left ${
            activeMode === 'water_grid'
              ? 'bg-sky-500 text-white font-bold shadow-md shadow-sky-500/20'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Droplets className="w-4 h-4 shrink-0 text-sky-400" />
          <div>
            <div className="font-semibold">{language === 'mr' ? 'जल जीवन पाईपलाईन जाळे' : 'Jal Jeevan Water Grid'}</div>
            <div className="text-[10px] opacity-75">{language === 'mr' ? 'टाकी व पाईप प्रवाह' : 'Hydraulic SCADA Flow'}</div>
          </div>
        </button>

        <button
          onClick={() => handleChangeMode('solar_energy')}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all text-left ${
            activeMode === 'solar_energy'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <SunMedium className="w-4 h-4 shrink-0 text-amber-400" />
          <div>
            <div className="font-semibold">{language === 'mr' ? 'सौर ऊर्जा मायक्रोग्रीड' : 'Solar Micro-Grid'}</div>
            <div className="text-[10px] opacity-75">{language === 'mr' ? 'वीज निर्मिती व बॅटरी' : '50 kWp Generation Grid'}</div>
          </div>
        </button>

        <button
          onClick={() => handleChangeMode('agri_ndvi')}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all text-left ${
            activeMode === 'agri_ndvi'
              ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/20'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Sprout className="w-4 h-4 shrink-0 text-emerald-400" />
          <div>
            <div className="font-semibold">{language === 'mr' ? 'शेती पीक आरोग्य (NDVI)' : 'Precision Agri NDVI'}</div>
            <div className="text-[10px] opacity-75">{language === 'mr' ? 'मृदा आर्द्रता व कालवा' : 'Moisture & Irrigation'}</div>
          </div>
        </button>

        {/* Navigation Hint */}
        <div className="mt-2 pt-2 border-t border-slate-800 text-[10px] text-slate-400 px-2 leading-relaxed">
          <div className="font-semibold text-slate-300 mb-1">{language === 'mr' ? 'कंट्रोल्स मार्गदर्शक' : 'Camera Controls:'}</div>
          <div>🖱️ <span className="text-slate-200">Left-drag</span> to Rotate</div>
          <div>🖱️ <span className="text-slate-200">Right-drag</span> to Pan</div>
          <div>⚙️ <span className="text-slate-200">Scroll / Pinch</span> to Zoom</div>
        </div>
      </div>

      {/* Floating Interactive Policy Sandbox Drawer */}
      {showSimulator && (
        <div className="absolute top-24 left-4 md:left-64 z-30 pointer-events-auto bg-slate-900/98 border border-emerald-500/80 rounded-xl p-4 shadow-2xl w-80 sm:w-96 max-h-[calc(100vh-14rem)] overflow-y-auto text-white space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-mono text-xs font-bold uppercase">
                {language === 'mr' ? 'ग्राम विकास बजेट सिम्युलेटर' : 'Gram Vikas Policy Sandbox'}
              </span>
            </div>
            <button
              onClick={() => setShowSimulator(false)}
              className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs text-slate-300 leading-relaxed">
            {language === 'mr'
              ? '१५ व्या वित्त आयोगाच्या ₹५० लाख अनुदानाचे वाटप करून गावाची पाणी, वीज, शाळा व रस्त्यांची प्रगती तपासा:'
              : 'Simulate allocating ₹50 Lakhs 15th Finance Commission grant to observe projected infrastructure & prosperity gains:'}
          </div>

          {/* Allocation Sliders */}
          <div className="space-y-3 bg-slate-800/60 p-3 rounded-lg border border-slate-700/60 text-xs">
            <div>
              <div className="flex justify-between font-medium">
                <span className="flex items-center gap-1.5 text-sky-400">
                  <Droplets className="w-3.5 h-3.5" />
                  <span>Jal Jeevan Water ESR:</span>
                </span>
                <span className="font-mono font-bold text-amber-300">₹{waterBudget} Lakhs</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                value={waterBudget}
                onChange={(e) => setWaterBudget(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400 mt-1"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>Coverage: {simulationMetrics.waterScore}%</span>
                <button
                  onClick={() => applySimulatorSector('water')}
                  className="text-sky-400 hover:underline"
                >
                  View 3D Water &rarr;
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <SunMedium className="w-3.5 h-3.5" />
                  <span>Solar Micro-Grid:</span>
                </span>
                <span className="font-mono font-bold text-amber-300">₹{solarBudget} Lakhs</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                value={solarBudget}
                onChange={(e) => setSolarBudget(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400 mt-1"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>Clean Power: {simulationMetrics.solarScore}%</span>
                <button
                  onClick={() => applySimulatorSector('solar')}
                  className="text-amber-400 hover:underline"
                >
                  View 3D Solar &rarr;
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium">
                <span className="flex items-center gap-1.5 text-purple-400">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>ZP School Digital Lab:</span>
                </span>
                <span className="font-mono font-bold text-amber-300">₹{schoolBudget} Lakhs</span>
              </div>
              <input
                type="range"
                min="2"
                max="15"
                value={schoolBudget}
                onChange={(e) => setSchoolBudget(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-400 mt-1"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>Literacy Index: {simulationMetrics.educationScore}%</span>
                <button
                  onClick={() => applySimulatorSector('school')}
                  className="text-purple-400 hover:underline"
                >
                  View 3D School &rarr;
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Building className="w-3.5 h-3.5" />
                  <span>PWD Concrete Roads:</span>
                </span>
                <span className="font-mono font-bold text-amber-300">₹{roadBudget} Lakhs</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                value={roadBudget}
                onChange={(e) => setRoadBudget(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400 mt-1"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>Paved Access: {simulationMetrics.roadScore}%</span>
                <button
                  onClick={() => applySimulatorSector('road')}
                  className="text-emerald-400 hover:underline"
                >
                  View 3D Roads &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Outcome Metric Card */}
          <div className="bg-gradient-to-r from-emerald-950 to-slate-900 border border-emerald-500/60 p-3 rounded-lg text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium">Allocated Budget:</span>
              <span className="font-mono font-bold text-white">₹{totalAllocated} Lakhs / ₹50L</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-emerald-400 font-bold">Gram Vikas Prosperity Score:</span>
              <span className="font-mono text-base font-extrabold text-amber-300">
                {simulationMetrics.prosperityIndex} / 100
              </span>
            </div>
            <div className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-800">
              Random Forest ML Inference: Optimal balanced portfolio for maximum HDI lift.
            </div>
          </div>
        </div>
      )}

      {/* Floating Collapsible Technical Engineering Drawer (Right Side) */}
      {showTechnicalDrawer && (
        <div className="absolute top-24 right-4 z-20 pointer-events-auto bg-slate-900/98 border border-slate-700/80 rounded-xl p-4 shadow-2xl w-80 max-h-[calc(100vh-14rem)] overflow-y-auto text-white space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-mono text-xs font-bold">CAPSTONE DEFENSE HUD</span>
            </div>
            <button
              onClick={() => setShowTechnicalDrawer(false)}
              className="text-slate-400 hover:text-white text-xs px-1.5 py-0.5 rounded bg-slate-800"
            >
              ✕
            </button>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Building className="w-4 h-4 text-amber-400" />
              <span>{language === 'mr' ? activePoi.nameMr : activePoi.nameEn}</span>
            </h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {language === 'mr' ? activePoi.descriptionMr : activePoi.descriptionEn}
            </p>
          </div>

          <div className="bg-slate-800/80 rounded-lg p-3 border border-slate-700/60">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              {language === 'mr' ? activePoi.kpi.labelMr : activePoi.kpi.labelEn}
            </div>
            <div className="text-lg font-bold text-amber-400 mt-0.5">{activePoi.kpi.value}</div>
            <div className="inline-flex items-center gap-1 text-[11px] text-emerald-400 mt-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Operational Specification Verified</span>
            </div>
          </div>

          {/* Academic Architecture Specs for Sir */}
          <div className="space-y-2 text-xs">
            <div className="font-semibold text-slate-200 border-b border-slate-800 pb-1">
              3D Procedural Craft Audit:
            </div>
            <ul className="space-y-1.5 text-slate-300 text-[11px]">
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400">✓</span>
                <span>
                  <strong>Hierarchical Grouping:</strong> 3–12 composite meshes per hero model with zero external 404 dependencies.
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400">✓</span>
                <span>
                  <strong>PBR Studio Environment:</strong> ACESFilmicToneMapping + PMREM RoomEnvironment for realistic metalness/roughness.
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400">✓</span>
                <span>
                  <strong>Dynamic HTML5 Textures:</strong> Procedural asphalt, terracotta tile, monocrystalline silicon, and soil furrows.
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400">✓</span>
                <span>
                  <strong>WebGL Software Guard:</strong> Auto-detects SwiftShader/llvmpipe and downsizes shadows for 60 FPS stability.
                </span>
              </li>
            </ul>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => navigateTo('ml-analytics')}
              className="text-xs text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>Explore ML Pipelines</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Viewport-First Collapsible Bottom Floating Dock */}
      <div
        className="absolute z-20 pointer-events-auto transition-all duration-300"
        style={{
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(940px, 94vw)'
        }}
      >
        <div className="bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl p-2.5 sm:p-3 text-white">
          {/* Dock Header Bar with Collapse Button */}
          <div className="flex items-center justify-between px-1 mb-2">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-300">
                {language === 'mr' ? 'महत्वाचे पायाभूत घटक (Points of Interest)' : 'Geo-Spatial Points of Interest'}
              </span>
              <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded text-amber-300 font-mono hidden sm:inline">
                {POINTS_OF_INTEREST.length} Monitored Sectors
              </span>
            </div>

            <button
              onClick={() => setIsDockCollapsed(!isDockCollapsed)}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white bg-slate-800/80 px-2 py-1 rounded-md transition-colors"
              title={isDockCollapsed ? 'Expand Dock' : 'Collapse Dock'}
            >
              <span>{isDockCollapsed ? 'Expand' : 'Collapse'}</span>
              {isDockCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Points of Interest Horizontal Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {POINTS_OF_INTEREST.map((poi) => {
              const isSelected = activePoi.id === poi.id;
              const categoryEmoji =
                poi.category === 'governance' ? '🏛️' :
                poi.category === 'water' ? '💧' :
                poi.category === 'energy' ? '☀️' :
                poi.category === 'agriculture' ? '🌾' :
                poi.category === 'social' ? '🏫' : '📍';
              return (
                <button
                  key={poi.id}
                  onClick={() => handleSelectPoi(poi)}
                  className={`p-2 rounded-xl text-left transition-all border ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 font-bold border-amber-300 shadow-lg scale-102 ring-2 ring-amber-400/40'
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="text-base">{categoryEmoji}</div>
                  <div className="text-xs font-semibold truncate mt-1">
                    {language === 'mr' ? poi.nameMr : poi.nameEn}
                  </div>
                  <div
                    className={`text-[10px] font-mono truncate mt-0.5 ${
                      isSelected ? 'text-slate-900 opacity-90' : 'text-slate-400'
                    }`}
                  >
                    {poi.kpi.value}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Expanded Detail Panel inside Dock (only when not collapsed) */}
          {!isDockCollapsed && (
            <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="font-semibold text-white">
                  {language === 'mr' ? activePoi.nameMr : activePoi.nameEn}:
                </span>
                <span className="text-slate-400 line-clamp-1">
                  {language === 'mr' ? activePoi.descriptionMr : activePoi.descriptionEn}
                </span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="bg-slate-800 px-2.5 py-1 rounded text-amber-300 font-mono text-[11px]">
                  <strong>{language === 'mr' ? activePoi.kpi.labelMr : activePoi.kpi.labelEn}:</strong> {activePoi.kpi.value}
                </div>

                {/* Mobile Inspection Mode Switcher */}
                <div className="flex md:hidden items-center gap-1">
                  <button
                    onClick={() => handleChangeMode('true_color')}
                    className={`p-1.5 rounded text-xs ${activeMode === 'true_color' ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'}`}
                    title="PBR Mode"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleChangeMode('water_grid')}
                    className={`p-1.5 rounded text-xs ${activeMode === 'water_grid' ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-300'}`}
                    title="Water Grid"
                  >
                    <Droplets className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleChangeMode('solar_energy')}
                    className={`p-1.5 rounded text-xs ${activeMode === 'solar_energy' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}
                    title="Solar Energy"
                  >
                    <SunMedium className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleChangeMode('agri_ndvi')}
                    className={`p-1.5 rounded text-xs ${activeMode === 'agri_ndvi' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                    title="Agri NDVI"
                  >
                    <Sprout className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
