import type { AppLanguage } from '../contexts/ThemeContext';

export interface TranslationDictionary {
  // Nav groups
  systemControl: string;
  operations: string;
  config: string;

  // Nav items
  globalMissionControl: string;
  aiSituationRoom: string;
  matchOperations: string;
  liveMatchControl: string;
  stadiumDigitalTwin: string;
  broadcastCenter: string;
  securityCenter: string;
  medicalCenter: string;
  volunteerCommand: string;
  fanExperience: string;
  aiDecisionSimulator: string;
  executiveIntelligence: string;
  settingsOptions: string;

  // Roles
  commander: string;
  fan: string;
  volunteer: string;
  security: string;
  medical: string;
  activeSession: string;

  // Header
  osOnline: string;
  live: string;
  emergencyHud: string;
  emergency: string;

  // Common UI
  enterPlatform: string;
  selectWorkspace: string;
  spectatorCompanion: string;
  operationsCommand: string;
  openCompanion: string;
  enterCommand: string;
  liveEngineTelemetry: string;
  contextAwareIntelligence: string;
  aiPipelineStatus: string;
  stable: string;
}

export const translations: Record<AppLanguage, TranslationDictionary> = {
  en: {
    systemControl: 'SYSTEM CONTROL',
    operations: 'OPERATIONS',
    config: 'CONFIG',

    globalMissionControl: 'Global Mission Control',
    aiSituationRoom: 'AI Situation Room',
    matchOperations: 'Match Operations',
    liveMatchControl: 'Live Match Control',
    stadiumDigitalTwin: 'Stadium Digital Twin',
    broadcastCenter: 'Broadcast Center',
    securityCenter: 'Security Center',
    medicalCenter: 'Medical Center',
    volunteerCommand: 'Volunteer Command',
    fanExperience: 'Fan Experience',
    aiDecisionSimulator: 'AI Decision Simulator',
    executiveIntelligence: 'Executive Intelligence',
    settingsOptions: 'Settings Options',

    commander: 'Commander',
    fan: 'Fan',
    volunteer: 'Volunteer',
    security: 'Security',
    medical: 'Medical',
    activeSession: 'Active Session',

    osOnline: 'OS ONLINE',
    live: 'LIVE',
    emergencyHud: 'Emergency HUD',
    emergency: 'EMERGENCY',

    enterPlatform: 'Enter Operations Platform',
    selectWorkspace: 'Select Your Workspace',
    spectatorCompanion: 'Spectator Fan Companion',
    operationsCommand: 'Operations Command Control',
    openCompanion: 'Open Companion',
    enterCommand: 'Enter Command',
    liveEngineTelemetry: 'Live Engine Telemetry',
    contextAwareIntelligence: 'Context-aware command intelligence.',
    aiPipelineStatus: 'AI Pipeline Status',
    stable: 'STABLE'
  },
  es: {
    systemControl: 'CONTROL DEL SISTEMA',
    operations: 'OPERACIONES',
    config: 'CONFIGURACIÓN',

    globalMissionControl: 'Control de Misión Global',
    aiSituationRoom: 'Sala de Situación IA',
    matchOperations: 'Operaciones del Partido',
    liveMatchControl: 'Control del Partido en Vivo',
    stadiumDigitalTwin: 'Gemelo Digital del Estadio',
    broadcastCenter: 'Centro de Transmisión',
    securityCenter: 'Centro de Seguridad',
    medicalCenter: 'Centro Médico',
    volunteerCommand: 'Comando de Voluntarios',
    fanExperience: 'Experiencia del Fan',
    aiDecisionSimulator: 'Simulador de Decisiones IA',
    executiveIntelligence: 'Inteligencia Ejecutiva',
    settingsOptions: 'Opciones de Configuración',

    commander: 'Comandante',
    fan: 'Aficionado',
    volunteer: 'Voluntario',
    security: 'Seguridad',
    medical: 'Médico',
    activeSession: 'Sesión Activa',

    osOnline: 'SO EN LÍNEA',
    live: 'EN VIVO',
    emergencyHud: 'HUD de Emergencia',
    emergency: 'EMERGENCIA',

    enterPlatform: 'Entrar a la Plataforma',
    selectWorkspace: 'Selecciona tu Espacio de Trabajo',
    spectatorCompanion: 'Compañero para Aficionados',
    operationsCommand: 'Control de Comando de Operaciones',
    openCompanion: 'Abrir Compañero',
    enterCommand: 'Entrar al Comando',
    liveEngineTelemetry: 'Telemetría del Motor en Vivo',
    contextAwareIntelligence: 'Inteligencia de mando contextual.',
    aiPipelineStatus: 'Estado del Pipeline IA',
    stable: 'ESTABLE'
  },
  fr: {
    systemControl: 'CONTRÔLE DU SYSTÈME',
    operations: 'OPÉRATIONS',
    config: 'CONFIGURATION',

    globalMissionControl: 'Contrôle de Mission Global',
    aiSituationRoom: 'Salle de Situation IA',
    matchOperations: 'Opérations du Match',
    liveMatchControl: 'Contrôle du Match en Direct',
    stadiumDigitalTwin: 'Jumeau Numérique du Stade',
    broadcastCenter: 'Centre de Diffusion',
    securityCenter: 'Centre de Sécurité',
    medicalCenter: 'Centre Médical',
    volunteerCommand: 'Commandement des Bénévoles',
    fanExperience: 'Expérience des Supporters',
    aiDecisionSimulator: 'Simulateur de Décisions IA',
    executiveIntelligence: 'Intelligence Exécutive',
    settingsOptions: 'Options de Configuration',

    commander: 'Commandant',
    fan: 'Supporter',
    volunteer: 'Bénévole',
    security: 'Sécurité',
    medical: 'Médical',
    activeSession: 'Session Active',

    osOnline: 'SE EN LIGNE',
    live: 'EN DIRECT',
    emergencyHud: 'HUD d\'Urgence',
    emergency: 'URGENCE',

    enterPlatform: 'Accéder à la Plateforme',
    selectWorkspace: 'Sélectionnez votre Espace de Travail',
    spectatorCompanion: 'Compagnon des Supporters',
    operationsCommand: 'Contrôle des Opérations',
    openCompanion: 'Ouvrir le Compagnon',
    enterCommand: 'Entrer la Commande',
    liveEngineTelemetry: 'Télémétrie Moteur en Direct',
    contextAwareIntelligence: 'Intelligence de commande contextuelle.',
    aiPipelineStatus: 'Statut du Pipeline IA',
    stable: 'STABLE'
  },
  pt: {
    systemControl: 'CONTROLE DO SISTEMA',
    operations: 'OPERAÇÕES',
    config: 'CONFIGURAÇÃO',

    globalMissionControl: 'Controle de Missão Global',
    aiSituationRoom: 'Sala de Situação IA',
    matchOperations: 'Operações do Jogo',
    liveMatchControl: 'Controle do Jogo ao Vivo',
    stadiumDigitalTwin: 'Gêmeo Digital do Estádio',
    broadcastCenter: 'Centro de Transmissão',
    securityCenter: 'Centro de Segurança',
    medicalCenter: 'Centro Médico',
    volunteerCommand: 'Comando de Voluntários',
    fanExperience: 'Experiência do Torcedor',
    aiDecisionSimulator: 'Simulador de Decisão IA',
    executiveIntelligence: 'Inteligência Executiva',
    settingsOptions: 'Opções de Configuração',

    commander: 'Comandante',
    fan: 'Torcedor',
    volunteer: 'Voluntário',
    security: 'Segurança',
    medical: 'Médico',
    activeSession: 'Sessão Ativa',

    osOnline: 'SO ONLINE',
    live: 'AO VIVO',
    emergencyHud: 'HUD de Emergência',
    emergency: 'EMERGÊNCIA',

    enterPlatform: 'Entrar na Plataforma',
    selectWorkspace: 'Selecione seu Espaço de Trabalho',
    spectatorCompanion: 'Guia do Torcedor',
    operationsCommand: 'Controle de Comando de Operações',
    openCompanion: 'Abrir Guia',
    enterCommand: 'Entrar no Comando',
    liveEngineTelemetry: 'Telemetria do Motor ao Vivo',
    contextAwareIntelligence: 'Inteligência de comando contextual.',
    aiPipelineStatus: 'Status do Pipeline IA',
    stable: 'ESTÁVEL'
  },
  ar: {
    systemControl: 'التحكم في النظام',
    operations: 'العمليات',
    config: 'الإعدادات',

    globalMissionControl: 'التحكم في المهمة العالمية',
    aiSituationRoom: 'غرفة وضع الذكاء الاصطناعي',
    matchOperations: 'عمليات المباراة',
    liveMatchControl: 'التحكم في المباراة المباشرة',
    stadiumDigitalTwin: 'التوأم الرقمي للملعب',
    broadcastCenter: 'مركز البث',
    securityCenter: 'مركز الأمن',
    medicalCenter: 'المركز الطبي',
    volunteerCommand: 'قيادة المتطوعين',
    fanExperience: 'تجربة المشجعين',
    aiDecisionSimulator: 'محاكي قرارات الذكاء الاصطناعي',
    executiveIntelligence: 'الذكاء التنفيذي',
    settingsOptions: 'خيارات الإعدادات',

    commander: 'القائد',
    fan: 'مشجع',
    volunteer: 'متطوع',
    security: 'الأمن',
    medical: 'طبي',
    activeSession: 'الجلسة النشطة',

    osOnline: 'النظام متصل',
    live: 'مباشر',
    emergencyHud: 'شاشة الطوارئ',
    emergency: 'طوارئ',

    enterPlatform: 'الدخول إلى منصة العمليات',
    selectWorkspace: 'اختر مساحة العمل الخاصة بك',
    spectatorCompanion: 'دليل المشجعين',
    operationsCommand: 'التحكم في قيادة العمليات',
    openCompanion: 'فتح الدليل',
    enterCommand: 'الدخول إلى القيادة',
    liveEngineTelemetry: 'بيانات المحرك المباشرة',
    contextAwareIntelligence: 'ذكاء القيادة المرتبط بالسياق.',
    aiPipelineStatus: 'حالة مسار الذكاء الاصطناعي',
    stable: 'مستقر'
  },
  hi: {
    systemControl: 'सिस्टम कंट्रोल',
    operations: 'ऑपरेशंस',
    config: 'कॉन्फ़िगर',

    globalMissionControl: 'ग्लोबल मिशन कंट्रोल',
    aiSituationRoom: 'एआई सिचुएशन रूम',
    matchOperations: 'मैच ऑपरेशंस',
    liveMatchControl: 'लाइव मैच कंट्रोल',
    stadiumDigitalTwin: 'स्टेडियम डिजिटल ट्विन',
    broadcastCenter: 'ब्रॉडकास्ट सेंटर',
    securityCenter: 'सिक्योरिटी सेंटर',
    medicalCenter: 'मेडिकल सेंटर',
    volunteerCommand: 'वोलंटियर कमांड',
    fanExperience: 'फैन एक्सपीरियंस',
    aiDecisionSimulator: 'एआई निर्णय सिमुलेटर',
    executiveIntelligence: 'एग्जीक्यूटिव इंटेलिजेंस',
    settingsOptions: 'सेटिंग्स ऑप्शंस',

    commander: 'कमांडर',
    fan: 'फैन',
    volunteer: 'वोलंटियर',
    security: 'सुरक्षा',
    medical: 'मेडिकल',
    activeSession: 'सक्रिय सत्र',

    osOnline: 'ओएस ऑनलाइन',
    live: 'लाइव',
    emergencyHud: 'इमरजेंसी HUD',
    emergency: 'आपातकाल',

    enterPlatform: 'ऑपरेशंस प्लेटफॉर्म में प्रवेश करें',
    selectWorkspace: 'अपना वर्कस्पेस चुनें',
    spectatorCompanion: 'दर्शकों का फैन साथी',
    operationsCommand: 'ऑपरेशंस कमांड कंट्रोल',
    openCompanion: 'साथी खोलें',
    enterCommand: 'कमांड दर्ज करें',
    liveEngineTelemetry: 'लाइव इंजन टेलीमेट्री',
    contextAwareIntelligence: 'संदर्भ-जागरूक कमांड बुद्धिमत्ता।',
    aiPipelineStatus: 'एआई पाइपलाइन स्थिति',
    stable: 'स्थिर'
  }
};

export function getTranslation(lang: AppLanguage): TranslationDictionary {
  return translations[lang] || translations.en;
}
