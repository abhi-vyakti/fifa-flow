import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LiveDataProvider, useLiveData } from './contexts/LiveDataContext';
import { AIProvider } from './contexts/AIContext';
import { useAtmosphereAudio } from './hooks/useAtmosphereAudio';
import { DashboardLayout } from './components/DashboardLayout';
import { LandingPage } from './pages/LandingPage';
import { PersonaSelectPage } from './pages/PersonaSelectPage';
import { AICommandCenter } from './pages/AICommandCenter';
import { FanAssistant } from './pages/FanAssistant';
import { VolunteerDashboard } from './pages/VolunteerDashboard';
import { MedicalDashboard } from './pages/MedicalDashboard';
import { AICopilot } from './components/AICopilot';
import { BroadcastIntro } from './components/BroadcastIntro';
import { SettingsPage } from './pages/SettingsPage';

// New Integrated Module Imports
import { GlobalMissionControl } from './pages/GlobalMissionControl';
import { MatchOperations } from './pages/MatchOperations';
import { LiveMatchControl } from './pages/LiveMatchControl';
import { StadiumDigitalTwin } from './pages/DigitalTwinPage';
import { BroadcastCenter } from './pages/BroadcastCenter';
import { SecurityCenter } from './pages/SecurityCenter';
import { DecisionSimulator } from './pages/DecisionSimulator';
import { ExecutiveIntelligence } from './pages/ExecutiveIntelligence';

// Full-screen pages (no sidebar/header)
const FULL_SCREEN_PATHS = ['/', '/select-persona'];

// Inner component that has access to navigate & contexts
const AppInner: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useLiveData();
  const { isPlaying: audioActive, toggleAudio: onToggleAudio } = useAtmosphereAudio();
  const [showIntro, setShowIntro] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
    navigate('/mission-control');
  };

  const isFullScreen = FULL_SCREEN_PATHS.includes(location.pathname);

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

      {isFullScreen ? (
        /* Full-screen pages render with FIFA stadium background */
        <div className="fifa-hero-bg min-h-screen text-on-surface">
          <div className="fifa-hex-grid" />
          <div className="fifa-spotlight" />
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/select-persona" element={<PersonaSelectPage />} />
            </Routes>
          </div>
        </div>
      ) : (
        /* Dashboard pages render inside the layout shell */
        <DashboardLayout onTriggerIntro={() => setShowIntro(true)}>
          <Routes>
            <Route path="/mission-control" element={<GlobalMissionControl />} />
            <Route path="/commander" element={<AICommandCenter />} />
            <Route path="/matches" element={<MatchOperations />} />
            <Route path="/live" element={<LiveMatchControl />} />
            <Route path="/digital-twin" element={<StadiumDigitalTwin />} />
            <Route path="/broadcast" element={<BroadcastCenter />} />
            <Route path="/security" element={<SecurityCenter />} />
            <Route path="/medical" element={<MedicalDashboard />} />
            <Route path="/volunteers" element={<VolunteerDashboard />} />
            <Route path="/fan" element={<FanAssistant />} />
            <Route path="/simulator" element={<DecisionSimulator />} />
            <Route path="/executive" element={<ExecutiveIntelligence />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </DashboardLayout>
      )}
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
