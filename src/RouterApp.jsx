import { Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import Layout from './Layout.jsx';
import { DashboardContent } from './components/DashboardContent.jsx';
import StudentsPage from './pages/StudentsPage.jsx';
import ModulesPage from './pages/ModulesPage.jsx';
import AnnouncementsPage from './pages/AnnouncementsPage.jsx';
import FeedbackPage from './pages/FeedbackPage.jsx';
import StatsPage from './pages/StatsPage.jsx';
import GamesPage from './pages/GamesPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

const RouterApp = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/dashboard" element={<Layout />}>
      <Route index element={<DashboardContent />} />
      <Route path="students" element={<StudentsPage />} />
      <Route path="modules" element={<ModulesPage />} />
      <Route path="announcements" element={<AnnouncementsPage />} />
      <Route path="feedback" element={<FeedbackPage />} />
      <Route path="stats" element={<StatsPage />} />
      <Route path="games" element={<GamesPage />} />
      <Route path="settings" element={<SettingsPage />} />
    </Route>
  </Routes>
);

export default RouterApp;
