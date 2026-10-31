import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { VillageOverviewPage } from './pages/VillageOverviewPage';
import { VillageProfilePage } from './pages/VillageProfilePage';
import { VillageDevelopmentPage } from './pages/VillageDevelopmentPage';
import { VillageFacilitiesPage } from './pages/VillageFacilitiesPage';
import { VillageAgriculturePage } from './pages/VillageAgriculturePage';
import { VillageStatisticsPage } from './pages/VillageStatisticsPage';
import { SchemesPage } from './pages/SchemesPage';
import { ReportIssuePage } from './pages/ReportIssuePage';
import { TrackIssuePage } from './pages/TrackIssuePage';
import { MapPage } from './pages/MapPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AboutPage } from './pages/AboutPage';
import { MlAnalyticsPage } from './pages/MlAnalyticsPage';
import { PresentationPage } from './pages/PresentationPage';
import { Village3DDigitalTwinPage } from './pages/Village3DDigitalTwinPage';
import { AiChatbotPage } from './pages/AiChatbotPage';
import { GisPlannerPage } from './pages/GisPlannerPage';
import { VillageGovernancePage } from './pages/VillageGovernancePage';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { SchemeDetailModal } from './components/SchemeDetailModal';
import { ShareVillageModal } from './components/ShareVillageModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { VillageFactsheetModal } from './components/VillageFactsheetModal';
import { OfflineIndicator } from './components/OfflineIndicator';

const MainContent: React.FC = () => {
  const { currentPage } = useApp();

  return (
    <main className="flex-1">
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'search' && <SearchPage />}
      {currentPage === 'village-overview' && <VillageOverviewPage />}
      {currentPage === 'village-profile' && <VillageProfilePage />}
      {currentPage === 'village-governance' && <VillageGovernancePage />}
      {currentPage === 'village-development' && <VillageDevelopmentPage />}
      {currentPage === 'village-facilities' && <VillageFacilitiesPage />}
      {currentPage === 'village-agriculture' && <VillageAgriculturePage />}
      {currentPage === 'village-statistics' && <VillageStatisticsPage />}
      {currentPage === 'schemes' && <SchemesPage />}
      {currentPage === 'report-issue' && <ReportIssuePage />}
      {currentPage === 'track-issue' && <TrackIssuePage />}
      {currentPage === 'map' && <MapPage />}
      {currentPage === 'announcements' && <AnnouncementsPage />}
      {currentPage === 'admin' && <AdminDashboardPage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'ml-analytics' && <MlAnalyticsPage />}
      {currentPage === 'presentation' && <PresentationPage />}
      {currentPage === 'village-3d' && <Village3DDigitalTwinPage />}
      {currentPage === 'ai-chat' && <AiChatbotPage />}
      {currentPage === 'gis-planner' && <GisPlannerPage />}
    </main>
  );
};

export function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-amber-200">
        <OfflineIndicator />
        <Header />
        <MainContent />
        <Footer />

        {/* Global Portals / Modals */}
        <ProjectDetailModal />
        <SchemeDetailModal />
        <ShareVillageModal />
        <VillageFactsheetModal />
        <AiAssistantModal />
      </div>
    </AppProvider>
  );
}

export default App;
