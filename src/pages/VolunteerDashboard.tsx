import React, { useState } from 'react';
import { useLiveData } from '../contexts/LiveDataContext';
import { 
  Users, CheckCircle2, AlertTriangle, Image as ImageIcon, 
  MapPin, Clock, Award, Trophy, Star, Sparkles, Send 
} from 'lucide-react';

export const VolunteerDashboard: React.FC = () => {
  const { state, reportIncident } = useLiveData();
  
  const [itemName, setItemName] = useState('');
  const [itemLoc, setItemLoc] = useState('Section A3');
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // Active tasks for volunteer
  const activeTasks = [
    { id: 'T-801', title: 'Direct crowd flows near Concourse C Elevators', location: 'Section C2', time: '14:12', status: 'pending' },
    { id: 'T-802', title: 'Replenish informational flyers at Gate A kiosk', location: 'Gate A', time: '13:40', status: 'completed' }
  ];

  const handleLostItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim()) return;

    setUploadStatus('Uploading simulated item image to Supabase Bucket...');
    
    setTimeout(() => {
      setUploadStatus('Lost item record catalogued with FLOW AI.');
      setItemName('');
    }, 1500);
  };

  const handleRequestBackup = async () => {
    const confirmBackup = window.confirm('Are you sure you want to request backup? FLOW AI will dispatch nearby idle volunteers to your current section.');
    if (!confirmBackup) return;

    await reportIncident({
      title: 'Volunteer Requested Backup',
      type: 'general',
      severity: 'medium',
      location: 'Section C2',
      details: 'Volunteer Maria G. requested backup crowd control assistance at Sector C2.',
      priority: 3,
      department: 'Volunteers',
      resourcesRequired: ['Crowd Support Team'],
      nearbyResponders: ['Volunteer John D.', 'Volunteer Yusuf A.'],
      escalationLevel: 'Level 0',
      suggestedActions: ['Reroute secondary corridors', 'Establish physical barriers']
    });

    alert('Backup dispatch successfully transmitted. Responders routed.');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-sans tracking-wide text-white">Volunteer Portal</h1>
          <p className="text-xs text-gray-400">Shift diagnostics, task queues, and backup coordination.</p>
        </div>

        <button 
          onClick={handleRequestBackup}
          className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold rounded-xl text-xs tracking-wider uppercase transition-all shadow-glow"
        >
          ⚠️ Dispatch Volunteer Backup
        </button>
      </div>

      {/* Gamified Volunteer Badges Panel */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        
        {/* Completed Tasks */}
        <div className="glass-panel p-4 rounded-2xl border border-darkBorder flex items-center space-x-3.5">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <span className="block text-[10px] text-gray-400 uppercase tracking-wide">Tasks Done</span>
            <span className="text-xl font-extrabold text-white">14</span>
          </div>
        </div>

        {/* Avg Response Time */}
        <div className="glass-panel p-4 rounded-2xl border border-darkBorder flex items-center space-x-3.5">
          <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Clock size={20} />
          </div>
          <div>
            <span className="block text-[10px] text-gray-400 uppercase tracking-wide">Response Time</span>
            <span className="text-xl font-extrabold text-white">1m 20s</span>
          </div>
        </div>

        {/* People Assisted */}
        <div className="glass-panel p-4 rounded-2xl border border-darkBorder flex items-center space-x-3.5">
          <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Users size={20} />
          </div>
          <div>
            <span className="block text-[10px] text-gray-400 uppercase tracking-wide">Fans Helped</span>
            <span className="text-xl font-extrabold text-white">36</span>
          </div>
        </div>

        {/* AI Performance Score */}
        <div className="glass-panel p-4 rounded-2xl border border-darkBorder flex items-center space-x-3.5">
          <div className="h-10 w-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
            <Star size={20} />
          </div>
          <div>
            <span className="block text-[10px] text-gray-400 uppercase tracking-wide">AI Score</span>
            <span className="text-xl font-extrabold text-white">95%</span>
          </div>
        </div>

        {/* Volunteer Tier Rank */}
        <div className="glass-panel p-4 rounded-2xl border border-darkBorder flex items-center space-x-3.5 col-span-2 md:col-span-1 bg-gradient-to-r from-fifaGold/10 to-transparent border-fifaGold/35 shadow-glass">
          <div className="h-10 w-10 rounded-xl bg-fifaGold/10 border border-fifaGold/30 flex items-center justify-center text-fifaGold animate-pulse">
            <Trophy size={20} />
          </div>
          <div>
            <span className="block text-[10px] text-gray-400 uppercase tracking-wide">Rank Tier</span>
            <span className="text-xl font-black text-fifaGold tracking-wide">GOLD</span>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Tasks Lists */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="glass-panel p-5 rounded-2xl border border-darkBorder space-y-4">
            <div className="flex items-center space-x-2 border-b border-darkBorder pb-2">
              <Sparkles className="text-aiCyan" size={16} />
              <h3 className="font-bold text-sm text-white uppercase tracking-wider font-sans">Active AI-Generated Tasks</h3>
            </div>

            <div className="space-y-3">
              {activeTasks.map((t) => (
                <div key={t.id} className="bg-white/5 border border-darkBorder p-4 rounded-xl flex items-center justify-between gap-4">
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white">{t.title}</span>
                      <span className="text-[9px] bg-white/5 border border-darkBorder text-gray-400 px-1 rounded">{t.id}</span>
                    </div>
                    <div className="flex space-x-3 text-gray-500 text-[10px]">
                      <span>Location: {t.location}</span>
                      <span>Assigned: {t.time}</span>
                    </div>
                  </div>

                  <button 
                    disabled={t.status === 'completed'}
                    onClick={() => alert(`Completed task: ${t.id}`)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all shrink-0 ${t.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400 cursor-not-allowed border border-emerald-500/20' : 'bg-gradient-to-r from-aiCyan to-aiPurple hover:brightness-110 text-white shadow-glow'}`}
                  >
                    {t.status === 'completed' ? 'Completed' : 'Mark Done'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Shift telemetries summaries */}
          <div className="glass-panel p-5 rounded-2xl border border-darkBorder space-y-3">
            <div className="text-[10px] text-gray-400 uppercase font-mono">FLOW AI Shift Telemetry Briefing</div>
            <p className="text-xs text-gray-300 leading-relaxed font-sans bg-black/35 p-3 rounded-lg border border-darkBorder/40">
              Matches are progressing inside gameplay periods. Crowd congestion has peaked near Gate C exits. Volunteers should remain focused on directing fans away from Staircase B and pointing towards elevators or escalators on Concourse Level 2. High sustainability score (92%) maintained during energy optimizations.
            </p>
          </div>

        </div>

        {/* Right Side: Lost Item logger */}
        <div className="glass-panel p-5 rounded-2xl border border-darkBorder space-y-4">
          <div className="flex items-center space-x-2 border-b border-darkBorder pb-2">
            <ImageIcon className="text-aiPurple" size={16} />
            <h3 className="font-bold text-sm text-white uppercase tracking-wider font-sans">Lost & Found Logger</h3>
          </div>

          <form onSubmit={handleLostItemSubmit} className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="text-gray-400 font-bold block">Item Name / description</label>
              <input 
                type="text" 
                placeholder="e.g. Leather Wallet, Blue Backpack"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full bg-black/40 border border-darkBorder focus:border-aiCyan rounded-lg px-3 py-2 text-white outline-none font-sans"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 font-bold block">Section Location Found</label>
              <select 
                value={itemLoc}
                onChange={(e) => setItemLoc(e.target.value)}
                className="w-full bg-darkBg border border-darkBorder focus:border-aiCyan rounded-lg p-2 text-white outline-none"
              >
                <option value="Section A3">Section A3 (North lobby)</option>
                <option value="Section C2">Section C2 (South gates)</option>
                <option value="Section B1">Section B1 (East concourse)</option>
              </select>
            </div>

            <div className="space-y-1 border border-dashed border-darkBorder p-4 rounded-lg text-center cursor-pointer hover:bg-white/5 transition-all">
              <ImageIcon className="mx-auto text-gray-500 mb-1" size={24} />
              <span className="text-[10px] text-gray-500 block">Click to select item/child photo</span>
            </div>

            <button 
              type="submit" 
              disabled={!itemName.trim()}
              className="w-full text-center py-2 bg-gradient-to-r from-aiCyan to-aiPurple hover:brightness-110 disabled:opacity-50 text-white font-bold rounded-lg transition-all"
            >
              Catalogue Lost Item
            </button>
          </form>

          {uploadStatus && (
            <div className="bg-white/5 border border-darkBorder p-2.5 rounded-lg text-[10px] text-aiCyan italic leading-normal">
              {uploadStatus}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
