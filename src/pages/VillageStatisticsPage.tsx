import React from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  BarChart3,
  Award,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Droplet,
  HeartPulse,
  GraduationCap,
  Building,
  Wheat,
  Users,
  Brain,
  Cpu,
  ArrowRight
} from 'lucide-react';

export const VillageStatisticsPage: React.FC = () => {
  const { language, selectedVillage, navigateTo } = useApp();
  const t = getTranslation(language);

  const vName = language === 'mr' ? selectedVillage.nameMr : selectedVillage.nameEn;
  const tName = language === 'mr' ? selectedVillage.talukaMr : selectedVillage.talukaEn;
  const dName = language === 'mr' ? selectedVillage.districtMr : selectedVillage.districtEn;

  const sc = selectedVillage.scorecard;

  const scoreItems = [
    { key: 'education', data: sc.education, icon: GraduationCap, color: 'emerald' },
    { key: 'healthcare', data: sc.healthcare, icon: HeartPulse, color: 'rose' },
    { key: 'infrastructure', data: sc.infrastructure, icon: Building, color: 'amber' },
    { key: 'waterSanitation', data: sc.waterSanitation, icon: Droplet, color: 'sky' },
    { key: 'electricityConnectivity', data: sc.electricityConnectivity, icon: Zap, color: 'indigo' },
    { key: 'agriculture', data: sc.agriculture, icon: Wheat, color: 'emerald' },
    { key: 'socialDevelopment', data: sc.socialDevelopment, icon: Users, color: 'purple' },
  ];

  // Calculate overall average index
  const avgScore = Math.round(
    scoreItems.reduce((acc, item) => acc + item.data.score, 0) / scoreItems.length
  );

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-16">
      <Breadcrumbs
        items={[
          { label: dName },
          { label: tName },
          { label: vName, page: 'village-overview' },
          { label: t.cardStatisticsTitle }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="border-b border-amber-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-orange-700 uppercase tracking-wider font-mono">
                {language === 'mr' ? '📊 ग्राम विकास निर्देशांक व प्रगती' : '📊 Village Development Scorecard'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight font-serif mt-0.5">
              {vName} — {t.scorecardTitle}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {language === 'mr'
                ? 'शिक्षण, आरोग्य, रस्ते, पाणी आणि सामाजिक घटकांचे प्रमाणित मूल्यांकन व प्रगती स्कोअर.'
                : 'Benchmark indicators evaluating public infrastructure, civic hygiene, and quality of life.'}
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

        {/* Overall Index Banner with Rich Saffron-Marigold & Emerald Colors */}
        <div className="bg-gradient-to-r from-orange-950 via-slate-900 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-amber-400/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-amber-400 via-emerald-500 to-indigo-500" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono block">
                🚩 {language === 'mr' ? 'एकत्रित ग्राम विकास निर्देशांक' : 'Composite Gram Drishti Score'}
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-black text-white font-mono drop-shadow-sm">
                  {avgScore} / १००
                </span>
                <span className="text-xs font-bold text-emerald-900 bg-emerald-200 px-3 py-1 rounded-full border border-emerald-400 shadow-xs">
                  {avgScore >= 80 ? (language === 'mr' ? '🌟 अ श्रेणी (उत्कृष्ट प्रगती)' : '🌟 Grade A (High Progress)') : (language === 'mr' ? '⭐ ब श्रेणी (मध्यम प्रगती)' : '⭐ Grade B (Moderate)')}
                </span>
              </div>
            </div>

            <p className="text-xs text-amber-100/90 max-w-md leading-relaxed bg-white/10 p-3.5 rounded-xl border border-white/15">
              {language === 'mr'
                ? 'हा निर्देशांक शासकीय सर्वेक्षण, जल जीवन मिशन कव्हरेज, शाळा नोंदणी, साक्षरता आणि वीजपुरवठ्याच्या निकषांवर आधारित आहे.'
                : 'Composite index weighted across verified public utilities, Jal Jeevan Mission density, school retention, and rural electrification.'}
            </p>
          </div>
        </div>

        {/* 7 Scorecard Dimensions Grid with Authentic Cultural Color Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {scoreItems.map((item) => {
            const IconComp = item.icon;
            const title = language === 'mr' ? item.data.titleMr : item.data.titleEn;
            const rating = language === 'mr' ? item.data.ratingMr : item.data.ratingEn;
            const highlights = language === 'mr' ? item.data.highlightsMr : item.data.highlightsEn;

            return (
              <div
                key={item.key}
                className="bg-white rounded-2xl border border-amber-200 p-6 shadow-sm hover:shadow-md hover:border-orange-400 transition-all space-y-4 flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center shadow-xs">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-bold text-stone-950 font-serif">{title}</h3>
                    </div>
                    <span className="text-sm font-black text-orange-950 font-mono bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                      {item.data.score} / १००
                    </span>
                  </div>

                  {/* Progress Meter with Glowing Gradients */}
                  <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden border border-amber-200">
                    <div
                      className={`h-full transition-all rounded-full ${
                        item.data.score >= 85
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600'
                          : item.data.score >= 75
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500'
                          : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                      }`}
                      style={{ width: `${item.data.score}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-stone-600 mt-2 font-mono">
                    <span>
                      {language === 'mr' ? 'श्रेणी:' : 'Rating:'}{' '}
                      <strong className="text-orange-900 font-sans font-bold">{rating}</strong>
                    </span>
                    <span className="font-bold text-stone-800">{item.data.score}% प्रगती</span>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-4 pt-3.5 border-t border-amber-100 bg-amber-50/40 rounded-xl p-3">
                    <span className="text-[10px] font-bold text-orange-900 uppercase font-mono tracking-wider block mb-1.5">
                      {language === 'mr' ? 'महत्त्वाच्या बाबी:' : 'Key Highlights:'}
                    </span>
                    <ul className="space-y-1.5 text-xs text-stone-700">
                      {highlights.map((hl, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span className="font-medium">{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* MACHINE LEARNING CLUSTERING & PREDICTIVE ANALYTICS CTA */}
        <div className="mt-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white p-6 sm:p-8 rounded-2xl border border-indigo-700/50 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-mono font-bold">
                <Brain className="w-3.5 h-3.5 text-amber-400" />
                <span>UNSUPERVISED ML & ECONOMETRICS FORECASTING</span>
              </div>
              <h3 className="text-xl font-bold font-serif text-white">
                {language === 'mr'
                  ? 'महाराष्ट्र ग्राम सामाजिक-आर्थिक क्लस्टरिंग (PCA व K-Means)'
                  : 'Socio-Economic Village Clustering (PCA & K-Means Model)'}
              </h3>
              <p className="text-xs text-indigo-200 leading-relaxed">
                {language === 'mr'
                  ? '४३,०००+ गावांच्या लोकसंख्या, रस्ते, साक्षरता आणि जलसुरक्षा निर्देशांकांवर आधारित Principal Component Analysis (2D Projection) आणि क्लस्टर सेंट्रॉइड्सचे थेट प्रात्यक्षिक.'
                  : 'Discover how this village clusters against 43,665 Maharashtra Panchayats using 2D PCA dimensionality reduction, Silhouette score validation, and ARIMA hydrological models.'}
              </p>
            </div>

            <button
              onClick={() => navigateTo('ml-analytics')}
              className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md inline-flex items-center gap-2 shrink-0 self-start sm:self-auto"
            >
              <Cpu className="w-4 h-4" />
              <span>{language === 'mr' ? 'थेट क्लस्टरिंग लॅब उघडा' : 'Explore ML Clustering'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
