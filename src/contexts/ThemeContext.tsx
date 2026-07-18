import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'organizer' | 'fan' | 'security' | 'volunteer' | 'medical';
export type AppLanguage = 'en' | 'es' | 'fr' | 'pt' | 'ar' | 'hi';

interface AccessibilityPreferences {
  wheelchair: boolean;
  elderly: boolean;
  lowVision: boolean;
  hearingImpaired: boolean;
  largeText: boolean;
}

interface ThemeContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  colorBlindSafe: boolean;
  setColorBlindSafe: (val: boolean) => void;
  voiceOutput: boolean;
  setVoiceOutput: (val: boolean) => void;
  accessibility: AccessibilityPreferences;
  updateAccessibility: (key: keyof AccessibilityPreferences, val: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('organizer');
  const [language, setLanguage] = useState<AppLanguage>('en');
  const [highContrast, setHighContrast] = useState(false);
  const [colorBlindSafe, setColorBlindSafe] = useState(false);
  const [voiceOutput, setVoiceOutput] = useState(false);
  const [accessibility, setAccessibility] = useState<AccessibilityPreferences>({
    wheelchair: false,
    elderly: false,
    lowVision: false,
    hearingImpaired: false,
    largeText: false
  });

  // Keep body class synced with accessibility choices
  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (accessibility.largeText) {
      root.style.fontSize = '18px';
    } else {
      root.style.fontSize = '16px';
    }
  }, [highContrast, accessibility.largeText]);

  const updateAccessibility = (key: keyof AccessibilityPreferences, val: boolean) => {
    setAccessibility(prev => ({ ...prev, [key]: val }));
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    // Add audio confirmation if voice output is enabled
    if (voiceOutput) {
      const speech = new SpeechSynthesisUtterance(`Role switched to ${newRole}`);
      window.speechSynthesis.speak(speech);
    }
  };

  return (
    <ThemeContext.Provider value={{
      role,
      setRole,
      language,
      setLanguage,
      highContrast,
      setHighContrast,
      colorBlindSafe,
      setColorBlindSafe,
      voiceOutput,
      setVoiceOutput,
      accessibility,
      updateAccessibility
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeSettings = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) throw new Error('useThemeSettings must be used within ThemeProvider');
  return context;
};
