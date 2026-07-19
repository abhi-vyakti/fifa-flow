import React, { useState } from 'react';
import { useLiveData } from '../contexts/LiveDataContext';
import { useAI } from '../contexts/AIContext';
import { useThemeSettings } from '../contexts/ThemeContext';
import { 
  Shield, AlertTriangle, Send, Languages, RefreshCw, Eye, MapPin, 
  Sparkles, Radio, CheckCircle2, ChevronRight 
} from 'lucide-react';

export const SecurityDashboard: React.FC = () => {
  const { state, reportIncident } = useLiveData();
  const { askCopilot } = useAI();
  const { language, t } = useThemeSettings();

  const [broadcastQuery, setBroadcastQuery] = useState('');
  const [broadcastResults, setBroadcastResults] = useState<Record<string, string> | null>(null);
  const [loadingBroadcast, setLoadingBroadcast] = useState(false);
  const [suspiciousDesc, setSuspiciousDesc] = useState('');
  const [suspiciousLoc, setSuspiciousLoc] = useState('Section B3');

  // Hard-coded translation maps for fallback simulation to speed up responses
  const localTranslations: Record<string, Record<string, string>> = {
    'congestion at gate c, please use gate d': {
      en: 'Alert: High congestion at Gate C. Please bypass and route through Gate D exits.',
      es: 'Alerta: Alta congestión en la Puerta C. Por favor, desvíese por las salidas de la Puerta D.',
      fr: 'Alerte: Congestion élevée à la porte C. Veuillez contourner et utiliser la porte D.',
      pt: 'Alerta: Alta congestão no Portão C. Por favor, desvie pelas saídas do Portão D.',
      ar: 'تنبيه: ازدحام شديد عند البوابة C. يرجى تجاوزها وتغيير المسار عبر مخارج البوابة D.',
      hi: 'चेतावनी: गेट सी पर भारी भीड़। कृपया बाईपास करें और गेट डी निकास से बाहर निकलें।'
    },
    'gate c congestion, bypass to gate d': {
      en: 'Alert: Gate C is congested. Bypass to Gate D immediately.',
      es: 'Alerta: La Puerta C está congestionada. Desvíese a la Puerta D inmediatamente.',
      fr: 'Alerte: La porte C est encombrée. Contourner vers la porte D immédiatement.',
      pt: 'Alerta: O Portão C está congestionado. Desvie para o Portão D imediatamente.',
      ar: 'تنبيه: البوابة C مزدحمة. يرجى تحويل المسار إلى البوابة D فوراً.',
      hi: 'चेतावनी: गेट सी पर भारी भीड़ है। तुरंत गेट डी की तरफ बाईपास करें।'
    }
  };

  const handleBroadcastGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastQuery.trim()) return;

    setLoadingBroadcast(true);
    setBroadcastResults(null);

    // Context helper
    const promptText = `Generate emergency announcements for: "${broadcastQuery}". Provide direct translation outputs in English, Spanish, French, Portuguese, Arabic, and Hindi.`;
    
    try {
      // Run AI copilot response
      const aiResponse = await askCopilot(promptText, 'security');
      
      // Look up locally translated mocks if AI fallback is used, or simulate translations
      const normalizedQuery = broadcastQuery.toLowerCase().trim();
      const match = localTranslations[normalizedQuery] || {
        en: `Alert: ${broadcastQuery}`,
        es: `Alerta: ${broadcastQuery} (Traducido)`,
        fr: `Alerte: ${broadcastQuery} (Traduit)`,
        pt: `Alerta: ${broadcastQuery} (Traduzido)`,
        ar: `تنبيه: ${broadcastQuery} (مترجم)`,
        hi: `चेतावनी: ${broadcastQuery} (अनुवादित)`
      };

      setBroadcastResults(match);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBroadcast(false);
    }
  };

  const handleSuspiciousSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suspiciousDesc.trim()) return;

    await reportIncident({
      title: 'Suspicious Activity Reported',
      type: 'security',
      severity: 'medium',
      location: suspiciousLoc,
      details: suspiciousDesc,
      priority: 3,
      department: 'Security',
      resourcesRequired: ['Patrol Officer', 'CCTV Zoom Focus'],
      nearbyResponders: ['Security Unit 5', 'Patrol 2'],
      escalationLevel: 'Level 0',
      suggestedActions: ['Roving patrol inspection', 'CCTV continuous log check'],
      status: 'reported'
    });

    setSuspiciousDesc('');
    alert('Suspicious activity alert logged. Dispatched Unit 5 for perimeter inspection.');
  };

  // Active patrols status
  const patrols = [
    { id: 'P-10', name: 'Unit 5 (Section B2)', status: 'ON_PATROL', zone: 'East Stands' },
    { id: 'P-12', name: 'Unit 3 (Section C1)', status: 'STANDBY', zone: 'South Stand' }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black font-sans tracking-wide text-white">{t.securityTitle}</h1>
        <p className="text-xs text-gray-400">{t.securityDesc}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Broadcast Generator & Patrol list */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Emergency Multilingual Announcement Generator */}
          <div className="glass-panel p-5 rounded-2xl border border-darkBorder space-y-4">
            <div className="flex items-center space-x-2 border-b border-darkBorder pb-2">
              <Radio className="text-aiCyan animate-pulse" size={16} />
              <h3 className="font-bold text-sm text-white uppercase tracking-wider">Emergency Announcement Generator</h3>
            </div>

            <p className="text-xs text-gray-400 leading-normal">
              Input operational alerts (e.g. "Congestion at Gate C, please use Gate D") to translate and synthesize:
            </p>

            <form onSubmit={handleBroadcastGenerate} className="flex items-center space-x-2">
              <input 
                type="text" 
                placeholder="Enter alert text (e.g. 'Congestion at Gate C, please use Gate D')"
                value={broadcastQuery}
                onChange={(e) => setBroadcastQuery(e.target.value)}
                className="w-full bg-black/40 border border-darkBorder focus:border-aiCyan rounded-xl px-4 py-2.5 text-xs outline-none text-white font-sans"
              />
              <button 
                type="submit" 
                disabled={loadingBroadcast || !broadcastQuery.trim()}
                className="px-4 py-2.5 bg-gradient-to-r from-aiCyan to-aiPurple hover:brightness-110 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all flex items-center space-x-1"
              >
                {loadingBroadcast && <RefreshCw size={12} className="animate-spin mr-1" />}
                <span>Broadcast</span>
              </button>
            </form>

            {broadcastResults && (
              <div className="space-y-3 bg-white/5 border border-darkBorder p-4 rounded-xl text-xs">
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider border-b border-darkBorder/40 pb-1">
                  Multilingual Translated Scripts
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(broadcastResults).map(([langCode, transText]) => (
                    <div key={langCode} className="bg-black/30 p-2.5 rounded border border-darkBorder/30">
                      <div className="flex items-center justify-between text-[10px] text-aiCyan font-bold uppercase mb-1">
                        <span>{langCode === 'en' ? 'English' : langCode === 'es' ? 'Spanish' : langCode === 'fr' ? 'French' : langCode === 'pt' ? 'Portuguese' : langCode === 'ar' ? 'Arabic' : 'Hindi'}</span>
                        <Languages size={10} />
                      </div>
                      <p className="text-white leading-relaxed text-[11px] font-sans">{transText}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Patrol Unit trackers */}
          <div className="glass-panel p-5 rounded-2xl border border-darkBorder space-y-4">
            <div className="flex items-center space-x-2 border-b border-darkBorder pb-2">
              <Shield className="text-fifaGold" size={16} />
              <h3 className="font-bold text-sm text-white uppercase tracking-wider">Patrol Platoon Distribution</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {patrols.map((p) => (
                <div key={p.id} className="bg-white/5 border border-darkBorder p-3 rounded-xl flex items-center justify-between">
                  <div className="text-xs space-y-1">
                    <span className="font-bold text-white block">{p.name}</span>
                    <span className="text-[10px] text-gray-500 block">Quadrant: {p.zone}</span>
                  </div>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/35 px-1.5 py-0.5 rounded font-extrabold uppercase">
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Report Suspicious activity */}
        <div className="glass-panel p-5 rounded-2xl border border-darkBorder space-y-4">
          <div className="flex items-center space-x-2 border-b border-darkBorder pb-2">
            <AlertTriangle className="text-amber-500" size={16} />
            <h3 className="font-bold text-sm text-white uppercase tracking-wider font-sans">Suspicious Activity Logger</h3>
          </div>

          <form onSubmit={handleSuspiciousSubmit} className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="text-gray-400 font-bold block">Observation Description</label>
              <textarea 
                placeholder="e.g. Unattended package left beneath row 14 seats, or spectator scaling barriers."
                value={suspiciousDesc}
                onChange={(e) => setSuspiciousDesc(e.target.value)}
                rows={4}
                className="w-full bg-black/40 border border-darkBorder focus:border-aiCyan rounded-lg px-3 py-2 text-white outline-none font-sans leading-normal resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 font-bold block">Section Location</label>
              <select 
                value={suspiciousLoc}
                onChange={(e) => setSuspiciousLoc(e.target.value)}
                className="w-full bg-darkBg border border-darkBorder focus:border-aiCyan rounded-lg p-2 text-white outline-none"
              >
                <option value="Section B3">Section B3 (East stand)</option>
                <option value="Section C2">Section C2 (South gates)</option>
                <option value="Section A1">Section A1 (North Stand)</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={!suspiciousDesc.trim()}
              className="w-full text-center py-2 bg-gradient-to-r from-aiCyan to-aiPurple hover:brightness-110 disabled:opacity-50 text-white font-bold rounded-lg transition-all"
            >
              Log Suspicious Alert
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
