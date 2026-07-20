import { describe, it, expect } from 'vitest';
import { getTranslation, translations } from './translations';
import type { AppLanguage } from '../contexts/ThemeContext';

describe('FIFA FLOW Translations Utility', () => {
  it('should return English translation dictionary by default or for "en"', () => {
    const enDict = getTranslation('en');
    expect(enDict.globalMissionControl).toBe('Global Mission Control');
    expect(enDict.osOnline).toBe('OS ONLINE');
    expect(enDict.live).toBe('LIVE');
  });

  it('should return Spanish translation dictionary for "es"', () => {
    const esDict = getTranslation('es');
    expect(esDict.globalMissionControl).toBe('Control de Misión Global');
    expect(esDict.osOnline).toBe('SO EN LÍNEA');
  });

  it('should return French translation dictionary for "fr"', () => {
    const frDict = getTranslation('fr');
    expect(frDict.globalMissionControl).toBe('Contrôle de Mission Global');
    expect(frDict.osOnline).toBe('SE EN LIGNE');
  });

  it('should return Portuguese translation dictionary for "pt"', () => {
    const ptDict = getTranslation('pt');
    expect(ptDict.globalMissionControl).toBe('Controle de Missão Global');
    expect(ptDict.osOnline).toBe('SO ONLINE');
  });

  it('should return Arabic translation dictionary for "ar"', () => {
    const arDict = getTranslation('ar');
    expect(arDict.globalMissionControl).toBe('التحكم في المهمة العالمية');
  });

  it('should return Hindi translation dictionary for "hi"', () => {
    const hiDict = getTranslation('hi');
    expect(hiDict.globalMissionControl).toBe('ग्लोबल मिशन कंट्रोल');
    expect(hiDict.osOnline).toBe('ओएस ऑनलाइन');
  });

  it('should fallback to English for unsupported languages', () => {
    const fallbackDict = getTranslation('unknown' as AppLanguage);
    expect(fallbackDict.globalMissionControl).toBe('Global Mission Control');
  });

  it('should contain all required keys across all supported language dictionaries', () => {
    const keys = Object.keys(translations.en) as (keyof typeof translations.en)[];
    const languages: AppLanguage[] = ['en', 'es', 'fr', 'pt', 'ar', 'hi'];

    languages.forEach(lang => {
      const dict = translations[lang];
      expect(dict).toBeDefined();
      keys.forEach(key => {
        expect(dict[key]).toBeDefined();
        expect(typeof dict[key]).toBe('string');
        expect(dict[key].length).toBeGreaterThan(0);
      });
    });
  });
});
