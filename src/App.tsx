import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LiveDataProvider } from './contexts/LiveDataContext';
import { AIProvider } from './contexts/AIContext';
import { DashboardLayout } from './components/DashboardLayout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { OrganizerDashboard } from './pages/OrganizerDashboard';
import { FanAssistant } from './pages/FanAssistant';
import { VolunteerDashboard } from './pages/VolunteerDashboard';
import { SecurityDashboard } from './pages/SecurityDashboard';
import { MedicalDashboard } from './pages/MedicalDashboard';
import { AICommandCenter } from './pages/AICommandCenter';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <LiveDataProvider>
          <AIProvider>
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<OrganizerDashboard />} />
                <Route path="/fan" element={<FanAssistant />} />
                <Route path="/volunteer" element={<VolunteerDashboard />} />
                <Route path="/security" element={<SecurityDashboard />} />
                <Route path="/medical" element={<MedicalDashboard />} />
                <Route path="/commander" element={<AICommandCenter />} />
                <Route path="/architecture" element={<ArchitecturePage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </DashboardLayout>
          </AIProvider>
        </LiveDataProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
