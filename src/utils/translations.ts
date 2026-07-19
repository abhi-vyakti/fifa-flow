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

  // Header & Status
  osOnline: string;
  live: string;
  emergencyHud: string;
  emergency: string;
  stable: string;
  aiPipelineStatus: string;
  liveEngineTelemetry: string;
  contextAwareIntelligence: string;

  // Command Center & Situation Room
  aiCommandCenter: string;
  commandCenterDesc: string;
  continuousTelemetry: string;
  situationRoomTab: string;
  whatIfSimulatorTab: string;
  systemThreatLevel: string;
  transitIngressSurge: string;
  dispatchedAlarms: string;
  healthBreakout: string;
  safetySecurity: string;
  transportation: string;
  concessionsFood: string;
  medicalDispatch: string;
  accessibility: string;
  sustainability: string;
  aiDecisionPath: string;
  noSectionSelected: string;
  clickQuadrantToOverlay: string;

  // Common Actions & Dashboard Cards
  enterPlatform: string;
  selectWorkspace: string;
  spectatorCompanion: string;
  operationsCommand: string;
  openCompanion: string;
  enterCommand: string;
  healthScore: string;
  stadiumOccupancy: string;
  activeIncidents: string;
  weatherCondition: string;
  refreshTelemetry: string;
  dispatchResponder: string;
  resolveIncident: string;
  downloadReport: string;
  runSimulation: string;
  searchPlaceholder: string;
  filterAll: string;
  statusLabel: string;
  priorityLabel: string;
  locationLabel: string;

  // Page Specific Headers & Descriptions
  fanAssistantTitle: string;
  fanAssistantDesc: string;
  findSeatButton: string;
  foodQueueTitle: string;
  accessibleRouteTitle: string;
  sosEmergencyButton: string;

  securityTitle: string;
  securityDesc: string;
  crowdDensityTitle: string;
  broadcastAnnouncementTitle: string;
  logIncidentTitle: string;

  medicalTitle: string;
  medicalDesc: string;
  aidStationCapacityTitle: string;
  ambulanceCorridorsTitle: string;

  volunteerTitle: string;
  volunteerDesc: string;
  assignedTasksTitle: string;
  volunteerTierTitle: string;

  digitalTwinTitle: string;
  digitalTwinDesc: string;
  northStand: string;
  eastStand: string;
  southStand: string;
  westStand: string;

  settingsTitle: string;
  settingsDesc: string;
  activePersonaLabel: string;
  interfaceLanguageLabel: string;
  accessibilityPreferencesLabel: string;
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
    stable: 'STABLE',
    aiPipelineStatus: 'AI Pipeline Status',
    liveEngineTelemetry: 'Live Engine Telemetry',
    contextAwareIntelligence: 'Context-aware command intelligence.',

    aiCommandCenter: 'AI Command Center',
    commandCenterDesc: 'Predictive crowd intelligence and situational analytics. Use the floating orb (bottom-right) for the AI Copilot.',
    continuousTelemetry: 'Continuous Telemetry Active',
    situationRoomTab: 'Situation Room',
    whatIfSimulatorTab: 'What-If Simulator',
    systemThreatLevel: 'System Threat Level',
    transitIngressSurge: 'Transit Ingress Surge',
    dispatchedAlarms: 'Dispatched Alarms',
    healthBreakout: 'Health Breakout',
    safetySecurity: 'Safety & Security',
    transportation: 'Transportation',
    concessionsFood: 'Concessions / Food',
    medicalDispatch: 'Medical Dispatch',
    accessibility: 'Accessibility',
    sustainability: 'Sustainability',
    aiDecisionPath: 'AI Decision Path',
    noSectionSelected: 'No Section Selected',
    clickQuadrantToOverlay: 'Click on any stadium quadrant to overlay live telemetry.',

    enterPlatform: 'Enter Operations Platform',
    selectWorkspace: 'Select Your Workspace',
    spectatorCompanion: 'Spectator Fan Companion',
    operationsCommand: 'Operations Command Control',
    openCompanion: 'Open Companion',
    enterCommand: 'Enter Command',
    healthScore: 'Overall Stadium Health',
    stadiumOccupancy: 'Stadium Occupancy',
    activeIncidents: 'Active Safety Incidents',
    weatherCondition: 'Weather Condition',
    refreshTelemetry: 'Refresh Telemetry',
    dispatchResponder: 'Dispatch Responder',
    resolveIncident: 'Resolve Incident',
    downloadReport: 'Download Operations Report',
    runSimulation: 'Run Simulation Scenario',
    searchPlaceholder: 'Search incidents, locations, or commands...',
    filterAll: 'All Categories',
    statusLabel: 'Status',
    priorityLabel: 'Priority',
    locationLabel: 'Location',

    fanAssistantTitle: 'FIFA Spectator Assistant',
    fanAssistantDesc: 'Accessible navigation, queue tracking, and emergency SOS for stadium guests.',
    findSeatButton: 'Find My Seat',
    foodQueueTitle: 'Concession & Food Stall Queues',
    accessibleRouteTitle: 'Wheelchair Accessible Navigation',
    sosEmergencyButton: 'Trigger Emergency SOS',

    securityTitle: 'Security Control & Crowd Patrols',
    securityDesc: 'Monitor perimeter sensors, crowd density thresholds, and multilingual safety broadcasts.',
    crowdDensityTitle: 'Crowd Density & Bottlenecks',
    broadcastAnnouncementTitle: 'Multilingual Security Announcement',
    logIncidentTitle: 'Log New Security Incident',

    medicalTitle: 'Medical Triage & Emergency Response',
    medicalDesc: 'Track aid bed capacity, dispatch medical units, and clear fast emergency corridors.',
    aidStationCapacityTitle: 'First Aid Station Bed Capacity',
    ambulanceCorridorsTitle: 'Fast Emergency Evacuation Corridors',

    volunteerTitle: 'Volunteer Operations Portal',
    volunteerDesc: 'Manage field assignments, log lost items, and track shift performance rewards.',
    assignedTasksTitle: 'Assigned Field Tasks',
    volunteerTierTitle: 'Volunteer Rank & Tier',

    digitalTwinTitle: 'Interactive Stadium Digital Twin',
    digitalTwinDesc: 'Visual floor plan of stadium stands with real-time crowd heatmap telemetries.',
    northStand: 'North Stand',
    eastStand: 'East Stand',
    southStand: 'South Stand',
    westStand: 'West Stand',

    settingsTitle: 'System Settings & Accessibility',
    settingsDesc: 'Customize interface persona, language localization, and high-contrast preferences.',
    activePersonaLabel: 'Active User Persona',
    interfaceLanguageLabel: 'Interface Language',
    accessibilityPreferencesLabel: 'Accessibility Preferences'
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
    stable: 'ESTABLE',
    aiPipelineStatus: 'Estado del Pipeline IA',
    liveEngineTelemetry: 'Telemetría del Motor en Vivo',
    contextAwareIntelligence: 'Inteligencia de mando contextual.',

    aiCommandCenter: 'Centro de Mando IA',
    commandCenterDesc: 'Inteligencia predictiva de multitud y analítica situacional.',
    continuousTelemetry: 'Telemetría Continua Activa',
    situationRoomTab: 'Sala de Situación',
    whatIfSimulatorTab: 'Simulador Qué-Pasaría-Si',
    systemThreatLevel: 'Nivel de Amenaza del Sistema',
    transitIngressSurge: 'Surge de Ingresos de Tránsito',
    dispatchedAlarms: 'Alarmas Despachadas',
    healthBreakout: 'Desglose de Salud',
    safetySecurity: 'Seguridad y Protección',
    transportation: 'Transporte',
    concessionsFood: 'Concesiones / Alimentos',
    medicalDispatch: 'Despacho Médico',
    accessibility: 'Accesibilidad',
    sustainability: 'Sostenibilidad',
    aiDecisionPath: 'Ruta de Decisión IA',
    noSectionSelected: 'Ninguna Sección Seleccionada',
    clickQuadrantToOverlay: 'Haga clic en cualquier cuadrante del estadio para superponer telemetría.',

    enterPlatform: 'Entrar a la Plataforma',
    selectWorkspace: 'Selecciona tu Espacio de Trabajo',
    spectatorCompanion: 'Compañero para Aficionados',
    operationsCommand: 'Control de Comando de Operaciones',
    openCompanion: 'Abrir Compañero',
    enterCommand: 'Entrar al Comando',
    healthScore: 'Salud General del Estadio',
    stadiumOccupancy: 'Ocupación del Estadio',
    activeIncidents: 'Incidentes de Seguridad Activos',
    weatherCondition: 'Condición Meteorológica',
    refreshTelemetry: 'Actualizar Telemetría',
    dispatchResponder: 'Despachar Respondedor',
    resolveIncident: 'Resolver Incidente',
    downloadReport: 'Descargar Informe de Operaciones',
    runSimulation: 'Ejecutar Escenario de Simulación',
    searchPlaceholder: 'Buscar incidentes, ubicaciones o comandos...',
    filterAll: 'Todas las Categorías',
    statusLabel: 'Estado',
    priorityLabel: 'Prioridad',
    locationLabel: 'Ubicación',

    fanAssistantTitle: 'Asistente de Espectadores FIFA',
    fanAssistantDesc: 'Navegación accesible, seguimiento de colas y SOS de emergencia para invitados.',
    findSeatButton: 'Buscar Mi Asiento',
    foodQueueTitle: 'Colas de Comida y Concesiones',
    accessibleRouteTitle: 'Navegación Accesible para Sillas de Ruedas',
    sosEmergencyButton: 'Activar SOS de Emergencia',

    securityTitle: 'Control de Seguridad y Patrullas',
    securityDesc: 'Monitorear sensores perimetrales, umbrales de densidad y avisos multilenguaje.',
    crowdDensityTitle: 'Densidad de Multitud y Embotellamientos',
    broadcastAnnouncementTitle: 'Anuncio Multilingüe de Seguridad',
    logIncidentTitle: 'Registrar Nuevo Incidente de Seguridad',

    medicalTitle: 'Triage Médico y Respuesta de Emergencia',
    medicalDesc: 'Rastrear capacidad de camas de auxilio, despachar unidades y despejar corredores.',
    aidStationCapacityTitle: 'Capacidad de Camas en Puestos de Primeros Auxilios',
    ambulanceCorridorsTitle: 'Corredores Rápidos de Evacuación de Emergencia',

    volunteerTitle: 'Portal de Operaciones de Voluntarios',
    volunteerDesc: 'Gestionar tareas asignadas, registrar objetos perdidos y rastrear recompensas.',
    assignedTasksTitle: 'Tareas de Campo Asignadas',
    volunteerTierTitle: 'Rango y Nivel del Voluntario',

    digitalTwinTitle: 'Gemelo Digital Interactivo del Estadio',
    digitalTwinDesc: 'Plano visual de tribunas del estadio con mapas de calor de multitud en tiempo real.',
    northStand: 'Tribuna Norte',
    eastStand: 'Tribuna Este',
    southStand: 'Tribuna Sur',
    westStand: 'Tribuna Oeste',

    settingsTitle: 'Configuración del Sistema y Accesibilidad',
    settingsDesc: 'Personalizar el perfil de usuario, localización de idioma y contraste.',
    activePersonaLabel: 'Perfil de Usuario Activo',
    interfaceLanguageLabel: 'Idioma de la Interfaz',
    accessibilityPreferencesLabel: 'Preferencias de Accesibilidad'
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
    stable: 'STABLE',
    aiPipelineStatus: 'Statut du Pipeline IA',
    liveEngineTelemetry: 'Télémétrie Moteur en Direct',
    contextAwareIntelligence: 'Intelligence de commande contextuelle.',

    aiCommandCenter: 'Centre de Commandement IA',
    commandCenterDesc: 'Intelligence prédictive de la foule et analyse situationnelle.',
    continuousTelemetry: 'Télémétrie Continue Active',
    situationRoomTab: 'Salle de Situation',
    whatIfSimulatorTab: 'Simulateur De Scénarios',
    systemThreatLevel: 'Niveau de Menace du Système',
    transitIngressSurge: 'Surge d\'Ingress de Transit',
    dispatchedAlarms: 'Alarmes Déployées',
    healthBreakout: 'Répartition de la Santé',
    safetySecurity: 'Sécurité & Sûreté',
    transportation: 'Transports',
    concessionsFood: 'Restauration / Nourriture',
    medicalDispatch: 'Dépêche Médicale',
    accessibility: 'Accessibilité',
    sustainability: 'Durabilité',
    aiDecisionPath: 'Chemin de Décision IA',
    noSectionSelected: 'Aucune Section Sélectionnée',
    clickQuadrantToOverlay: 'Cliquez sur un quadrant du stade pour afficher la télémétrie.',

    enterPlatform: 'Accéder à la Plateforme',
    selectWorkspace: 'Sélectionnez votre Espace de Travail',
    spectatorCompanion: 'Compagnon des Supporters',
    operationsCommand: 'Contrôle des Opérations',
    openCompanion: 'Ouvrir le Compagnon',
    enterCommand: 'Entrer la Commande',
    healthScore: 'Santé Globale du Stade',
    stadiumOccupancy: 'Occupation du Stade',
    activeIncidents: 'Incidents de Sécurité Actifs',
    weatherCondition: 'Conditions Météorologiques',
    refreshTelemetry: 'Actualiser la Télémétrie',
    dispatchResponder: 'Déployer un Intervenant',
    resolveIncident: 'Résoudre l\'Incident',
    downloadReport: 'Télécharger le Rapport d\'Opérations',
    runSimulation: 'Lancer le Scénario de Simulation',
    searchPlaceholder: 'Rechercher des incidents, lieux ou commandes...',
    filterAll: 'Toutes les Catégories',
    statusLabel: 'Statut',
    priorityLabel: 'Priorité',
    locationLabel: 'Emplacement',

    fanAssistantTitle: 'Assistant des Spectateurs FIFA',
    fanAssistantDesc: 'Navigation accessible, suivi des files d\'attente et SOS d\'urgence.',
    findSeatButton: 'Trouver Mon Siège',
    foodQueueTitle: 'Files d\'Attente Restauration',
    accessibleRouteTitle: 'Navigation Accessible en Fauteuil Roulant',
    sosEmergencyButton: 'Déclencher le SOS d\'Urgence',

    securityTitle: 'Contrôle de Sécurité & Patrouilles',
    securityDesc: 'Surveiller les capteurs de périmètre et les alertes multilingues de sécurité.',
    crowdDensityTitle: 'Densité de la Foule & Goulots d\'Étranglement',
    broadcastAnnouncementTitle: 'Annonce de Sécurité Multilingue',
    logIncidentTitle: 'Enregistrer un Nouvel Incident de Sécurité',

    medicalTitle: 'Triage Médical & Intervention d\'Urgence',
    medicalDesc: 'Suivre la capacité en lits et dégager les couloirs d\'évacuation rapide.',
    aidStationCapacityTitle: 'Capacité en Lits des Postes de Secours',
    ambulanceCorridorsTitle: 'Couloirs d\'Évacuation d\'Urgence Rapide',

    volunteerTitle: 'Portail des Opérations des Bénévoles',
    volunteerDesc: 'Gérer les missions sur le terrain, enregistrer les objets trouvés et les récompenses.',
    assignedTasksTitle: 'Tâches de Terrain Assignées',
    volunteerTierTitle: 'Rang & Niveau du Bénévole',

    digitalTwinTitle: 'Jumeau Numérique Interactif du Stade',
    digitalTwinDesc: 'Plan visuel des tribunes du stade avec cartes thermiques en temps réel.',
    northStand: 'Tribune Nord',
    eastStand: 'Tribune Est',
    southStand: 'Tribune Sud',
    westStand: 'Tribune Ouest',

    settingsTitle: 'Paramètres du Système & Accessibilité',
    settingsDesc: 'Personnaliser le profil d\'utilisateur, la langue et le contraste élevé.',
    activePersonaLabel: 'Profil d\'Utilisateur Actif',
    interfaceLanguageLabel: 'Langue de l\'Interface',
    accessibilityPreferencesLabel: 'Préférences d\'Accessibilité'
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
    stable: 'ESTÁVEL',
    aiPipelineStatus: 'Status do Pipeline IA',
    liveEngineTelemetry: 'Telemetria do Motor ao Vivo',
    contextAwareIntelligence: 'Inteligência de comando contextual.',

    aiCommandCenter: 'Centro de Comando IA',
    commandCenterDesc: 'Inteligência preditiva de multidão e análise situacional.',
    continuousTelemetry: 'Telemetria Contínua Ativa',
    situationRoomTab: 'Sala de Situação',
    whatIfSimulatorTab: 'Simulador O Que Aconteceria Se',
    systemThreatLevel: 'Nível de Ameaça do Sistema',
    transitIngressSurge: 'Surto de Ingressos de Trânsito',
    dispatchedAlarms: 'Alarmes Despachados',
    healthBreakout: 'Detalhamento da Saúde',
    safetySecurity: 'Segurança & Proteção',
    transportation: 'Transporte',
    concessionsFood: 'Alimentação / Lanchonetes',
    medicalDispatch: 'Despacho Médico',
    accessibility: 'Acessibilidade',
    sustainability: 'Sustentabilidade',
    aiDecisionPath: 'Caminho de Decisão IA',
    noSectionSelected: 'Nenhuma Seção Selecionada',
    clickQuadrantToOverlay: 'Clique em qualquer quadrante para sobrepor a telemetria.',

    enterPlatform: 'Entrar na Plataforma',
    selectWorkspace: 'Selecione seu Espaço de Trabalho',
    spectatorCompanion: 'Guia do Torcedor',
    operationsCommand: 'Controle de Comando de Operações',
    openCompanion: 'Abrir Guia',
    enterCommand: 'Entrar no Comando',
    healthScore: 'Saúde Geral do Estádio',
    stadiumOccupancy: 'Ocupação do Estádio',
    activeIncidents: 'Incidentes de Segurança Ativos',
    weatherCondition: 'Condições Meteorológicas',
    refreshTelemetry: 'Atualizar Telemetria',
    dispatchResponder: 'Despachar Socorrista',
    resolveIncident: 'Resolver Incidente',
    downloadReport: 'Baixar Relatório de Operações',
    runSimulation: 'Executar Cenário de Simulação',
    searchPlaceholder: 'Pesquisar incidentes, locais ou comandos...',
    filterAll: 'Todas as Categorias',
    statusLabel: 'Status',
    priorityLabel: 'Prioridade',
    locationLabel: 'Localização',

    fanAssistantTitle: 'Assistente de Torcedores FIFA',
    fanAssistantDesc: 'Navegação acessível, monitoramento de filas e SOS de emergência.',
    findSeatButton: 'Encontrar Meu Assento',
    foodQueueTitle: 'Filas de Alimentação e Concessões',
    accessibleRouteTitle: 'Navegação Acessível para Cadeira de Rodas',
    sosEmergencyButton: 'Acionar SOS de Emergência',

    securityTitle: 'Controle de Segurança e Patrulhas',
    securityDesc: 'Monitorar sensores perimetrais, limites de densidade e avisos multilíngues.',
    crowdDensityTitle: 'Densidade de Multidão e Gargalos',
    broadcastAnnouncementTitle: 'Anúncio Multilíngue de Segurança',
    logIncidentTitle: 'Registrar Novo Incidente de Segurança',

    medicalTitle: 'Triagem Médica e Resposta de Emergência',
    medicalDesc: 'Rastrear capacidade de leitos, despachar unidades e liberar corredores.',
    aidStationCapacityTitle: 'Capacidade de Leitos no Posto de Primeiros Socorros',
    ambulanceCorridorsTitle: 'Corredores Rápidos de Evacuação de Emergência',

    volunteerTitle: 'Portal de Operações de Voluntários',
    volunteerDesc: 'Gerenciar tarefas atribuídas, registrar achados e perdidos e recompensas.',
    assignedTasksTitle: 'Tarefas de Campo Atribuídas',
    volunteerTierTitle: 'Nível e Nível do Voluntário',

    digitalTwinTitle: 'Gêmeo Digital Interativo do Estádio',
    digitalTwinDesc: 'Plano visual das arquibancadas com mapa de calor de multidão em tempo real.',
    northStand: 'Arquibancada Norte',
    eastStand: 'Arquibancada Leste',
    southStand: 'Arquibancada Sul',
    westStand: 'Arquibancada Oeste',

    settingsTitle: 'Configurações do Sistema e Acessibilidade',
    settingsDesc: 'Personalizar perfil do usuário, localização de idioma e contraste alto.',
    activePersonaLabel: 'Perfil de Usuário Ativo',
    interfaceLanguageLabel: 'Idioma da Interface',
    accessibilityPreferencesLabel: 'Preferências de Acessibilidade'
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
    stable: 'مستقر',
    aiPipelineStatus: 'حالة مسار الذكاء الاصطناعي',
    liveEngineTelemetry: 'بيانات المحرك المباشرة',
    contextAwareIntelligence: 'ذكاء القيادة المرتبط بالسياق.',

    aiCommandCenter: 'مركز قيادة الذكاء الاصطناعي',
    commandCenterDesc: 'الذكاء التنبؤي للحشود والتحليلات الظرفية.',
    continuousTelemetry: 'القياس المباشر التلقائي نشط',
    situationRoomTab: 'غرفة الوضع',
    whatIfSimulatorTab: 'محاكي السيناريوهات',
    systemThreatLevel: 'مستوى تهديد النظام',
    transitIngressSurge: 'تدفق حركة النقل',
    dispatchedAlarms: 'إنذارات الاستجابة',
    healthBreakout: 'تفاصيل الصحة',
    safetySecurity: 'السلامة والأمن',
    transportation: 'المواصلات',
    concessionsFood: 'الأغذية والمأكولات',
    medicalDispatch: 'الإرسال الطبي',
    accessibility: 'إمكانية الوصول',
    sustainability: 'الاستدامة',
    aiDecisionPath: 'مسار قرار الذكاء الاصطناعي',
    noSectionSelected: 'لم يتم تحديد أي قسم',
    clickQuadrantToOverlay: 'انقر فوق أي ربع في الملعب لعرض البيانات المباشرة.',

    enterPlatform: 'الدخول إلى منصة العمليات',
    selectWorkspace: 'اختر مساحة العمل الخاصة بك',
    spectatorCompanion: 'دليل المشجعين',
    operationsCommand: 'التحكم في قيادة العمليات',
    openCompanion: 'فتح الدليل',
    enterCommand: 'الدخول إلى القيادة',
    healthScore: 'الصحة العامة للملعب',
    stadiumOccupancy: 'نسبة إشغال الملعب',
    activeIncidents: 'حوادث السلامة النشطة',
    weatherCondition: 'الحالة الجوية',
    refreshTelemetry: 'تحديث البيانات المباشرة',
    dispatchResponder: 'إرسال فرقة الاستجابة',
    resolveIncident: 'حل الحادثة',
    downloadReport: 'تحميل تقرير العمليات',
    runSimulation: 'تشغيل محاكاة سيناريو',
    searchPlaceholder: 'البحث عن حوادث أو مواقع أو أوامر...',
    filterAll: 'جميع الفئات',
    statusLabel: 'الحالة',
    priorityLabel: 'الأولوية',
    locationLabel: 'الموقع',

    fanAssistantTitle: 'مساعد المشجعين لبطولة كأس العالم',
    fanAssistantDesc: 'ملاحة سهلة، متابعة الطوابير وطلب الطوارئ للمشجعين.',
    findSeatButton: 'البحث عن مقعدي',
    foodQueueTitle: 'طوابير المطاعم والمأكولات',
    accessibleRouteTitle: 'مسارات كراسي المتحرك الميسرة',
    sosEmergencyButton: 'إطلاق نداء طوارئ SOS',

    securityTitle: 'التحكم الأمني والدوريات',
    securityDesc: 'مراقبة مستشعرات المحيط، كثافة الحشود وإذاعة تعليمات السلامة متعددة اللغات.',
    crowdDensityTitle: 'كثافة الحشود ونقاط الاختناق',
    broadcastAnnouncementTitle: 'إعلان سلامة متعدد اللغات',
    logIncidentTitle: 'تسجيل حادث أمني جديد',

    medicalTitle: 'الفرز الطبي واستجابة الطوارئ',
    medicalDesc: 'متابعة سعة أسرة الإسعاف وإرسال الفرق الطبية وفتح ممرات الإخلاء.',
    aidStationCapacityTitle: 'سعة أسرة محطات الإسعافات الأولية',
    ambulanceCorridorsTitle: 'ممرات الإخلاء الطبي السريع',

    volunteerTitle: 'بوابة عمليات المتطوعين',
    volunteerDesc: 'إدارة المهام الميدانية، تسجيل المفقودات ومتابعة المكافآت.',
    assignedTasksTitle: 'المهام الميدانية الموحدة',
    volunteerTierTitle: 'رتبة ومستوى المتطوع',

    digitalTwinTitle: 'التوأم الرقمي التفاعلي للملعب',
    digitalTwinDesc: 'مخطط بصري لمدرجات الملعب مع الخريطة الحرارية للحشود في الوقت الفعلي.',
    northStand: 'المدرج الشمالي',
    eastStand: 'المدرج الشرقي',
    southStand: 'المدرج الجنوبي',
    westStand: 'المدرج الغربي',

    settingsTitle: 'إعدادات النظام وإمكانية الوصول',
    settingsDesc: 'تخصيص هوية المستخدم، ترجمة اللغة وتباين الألوان العالي.',
    activePersonaLabel: 'هوية المستخدم النشطة',
    interfaceLanguageLabel: 'لغة الواجهة',
    accessibilityPreferencesLabel: 'تفضيلات إمكانية الوصول'
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
    stable: 'स्थिर',
    aiPipelineStatus: 'एआई पाइपलाइन स्थिति',
    liveEngineTelemetry: 'लाइव इंजन टेलीमेट्री',
    contextAwareIntelligence: 'संदर्भ-जागरूक कमांड बुद्धिमत्ता।',

    aiCommandCenter: 'एआई कमांड सेंटर',
    commandCenterDesc: 'पूर्वानुमानित भीड़ बुद्धिमत्ता और स्थिति संबंधी विश्लेषण।',
    continuousTelemetry: 'निरंतर टेलीमेट्री सक्रिय',
    situationRoomTab: 'सिचुएशन रूम',
    whatIfSimulatorTab: 'व्हाट-इफ सिमुलेटर',
    systemThreatLevel: 'सिस्टम खतरा स्तर',
    transitIngressSurge: 'ट्रांजिट इनग्रेस सर्ज',
    dispatchedAlarms: 'भेजी गई अलार्म',
    healthBreakout: 'स्वास्थ्य ब्रेकआउट',
    safetySecurity: 'सुरक्षा और सुरक्षा',
    transportation: 'परिवहन',
    concessionsFood: 'रियायतें / भोजन',
    medicalDispatch: 'मेडिकल प्रेषण',
    accessibility: 'सुगमता',
    sustainability: 'सततता',
    aiDecisionPath: 'एआई निर्णय पथ',
    noSectionSelected: 'कोई अनुभाग चयनित नहीं',
    clickQuadrantToOverlay: 'लाइव टेलीमेट्री देखने के लिए किसी भी स्टेडियम क्वाड्रेंट पर क्लिक करें।',

    enterPlatform: 'ऑपरेशंस प्लेटफॉर्म में प्रवेश करें',
    selectWorkspace: 'अपना वर्कस्पेस चुनें',
    spectatorCompanion: 'दर्शकों का फैन साथी',
    operationsCommand: 'ऑपरेशंस कमांड कंट्रोल',
    openCompanion: 'साथी खोलें',
    enterCommand: 'कमांड दर्ज करें',
    healthScore: 'स्टेडियम का समग्र स्वास्थ्य',
    stadiumOccupancy: 'स्टेडियम की उपस्थिति',
    activeIncidents: 'सक्रिय सुरक्षा घटनाएं',
    weatherCondition: 'मौसम की स्थिति',
    refreshTelemetry: 'टेलीमेट्री रीफ्रेश करें',
    dispatchResponder: 'रेस्पोंडर भेजें',
    resolveIncident: 'घटना हल करें',
    downloadReport: 'ऑपरेशंस रिपोर्ट डाउनलोड करें',
    runSimulation: 'सिमुलेशन परिदृश्य चलाएं',
    searchPlaceholder: 'घटनाएं, स्थान या कमांड खोजें...',
    filterAll: 'सभी श्रेणियां',
    statusLabel: 'स्थिति',
    priorityLabel: 'प्राथमिकता',
    locationLabel: 'स्थान',

    fanAssistantTitle: 'फीफा दर्शक सहायक',
    fanAssistantDesc: 'सुगम नेविगेशन, कतार ट्रैकिंग और आपातकालीन SOS।',
    findSeatButton: 'मेरी सीट खोजें',
    foodQueueTitle: 'भोजन और स्नैक्स की कतारें',
    accessibleRouteTitle: 'व्हीलचेयर सुगम मार्ग',
    sosEmergencyButton: 'आपातकालीन SOS सक्रिय करें',

    securityTitle: 'सुरक्षा नियंत्रण और गश्त',
    securityDesc: 'सुरक्षा सेंसर, भीड़ घनत्व और बहुभाषी घोषणाओं की निगरानी करें।',
    crowdDensityTitle: 'भीड़ का घनत्व और अड़चनें',
    broadcastAnnouncementTitle: 'बहुभाषी सुरक्षा घोषणा',
    logIncidentTitle: 'नई सुरक्षा घटना दर्ज करें',

    medicalTitle: 'मेडिकल ट्राइएज और आपातकालीन प्रतिक्रिया',
    medicalDesc: 'फर्स्ट एड बेड क्षमता ट्रैक करें और आपातकालीन मार्ग खोलें।',
    aidStationCapacityTitle: 'प्राथमिक चिकित्सा केंद्र बेड क्षमता',
    ambulanceCorridorsTitle: 'त्वरित आपातकालीन निकासी गलियारे',

    volunteerTitle: 'वोलंटियर ऑपरेशंस पोर्टल',
    volunteerDesc: 'मैदानी कार्य प्रबंधित करें, खोई वस्तुएं दर्ज करें और पुरस्कार पाएं।',
    assignedTasksTitle: 'आवंटित मैदानी कार्य',
    volunteerTierTitle: 'वोलंटियर रैंक और श्रेणी',

    digitalTwinTitle: 'इंटरैक्टिव स्टेडियम डिजिटल ट्विन',
    digitalTwinDesc: 'वास्तविक समय भीड़ हीटमैप टेलीमेट्री के साथ स्टेडियम स्टैंड का दृश्य मानचित्र।',
    northStand: 'उत्तर स्टैंड',
    eastStand: 'पूर्व स्टैंड',
    southStand: 'दक्षिण स्टैंड',
    westStand: 'पश्चिम स्टैंड',

    settingsTitle: 'सिस्टम सेटिंग्स और सुगमता',
    settingsDesc: 'उपयोगकर्ता प्रोफ़ाइल, भाषा स्थानीकरण और उच्च कंट्रास्ट अनुकूलित करें।',
    activePersonaLabel: 'सक्रिय उपयोगकर्ता प्रोफ़ाइल',
    interfaceLanguageLabel: 'इंटरफ़ेस भाषा',
    accessibilityPreferencesLabel: 'सुगमता प्राथमिकताएं'
  }
};

export function getTranslation(lang: AppLanguage): TranslationDictionary {
  return translations[lang] || translations.en;
}
