import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LiveDataProvider, useLiveData } from './contexts/LiveDataContext';
import { AIProvider } from './contexts/AIContext';
import { DashboardLayout } from './components/DashboardLayout';
import { BroadcastIntro } from './components/BroadcastIntro';
import { AICopilot } from './components/AICopilot';
import { useAtmosphereAudio } from './hooks/useAtmosphereAudio';

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

// Inner component that has access to navigate & contexts
const AppInner: React.FC = () => {
  const navigate = useNavigate();
  const { startJudgeDemo } = useLiveData();
  const { isPlaying: audioActive, toggleAudio: onToggleAudio } = useAtmosphereAudio();
  const [showIntro, setShowIntro] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
    startJudgeDemo();
    navigate('/commander');
  };

  return (
    <>
      {/* Global cinematic intro overlay — renders above EVERYTHING */}
      {showIntro && (
        <BroadcastIntro
          onComplete={handleIntroComplete}
          onToggleAudio={onToggleAudio}
          audioActive={audioActive}
        />
      )}

      {/* Global floating AI HUD Copilot orb — available on all pages */}
      <AICopilot />

      <DashboardLayout onTriggerIntro={() => setShowIntro(true)}>
        <Routes>
          <Route path="/" element={<LandingPage onTriggerIntro={() => setShowIntro(true)} />} />
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
    </>
  );
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <LiveDataProvider>
          <AIProvider>
            <AppInner />
          </AIProvider>
        </LiveDataProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
