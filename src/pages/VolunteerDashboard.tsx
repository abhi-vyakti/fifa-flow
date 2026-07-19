import React, { useState } from 'react';
import { useLiveData } from '../contexts/LiveDataContext';
import { 
  Users, CheckCircle2, Image as ImageIcon, 
  MapPin, Clock, Trophy, Star, Sparkles 
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
      suggestedActions: ['Reroute secondary corridors', 'Establish physical barriers'],
      status: 'reported'
    });

    alert('Backup dispatch successfully transmitted. Responders routed.');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-sans tracking-wide text-on-surface">Volunteer Portal</h1>
          <p className="text-xs text-secondary font-medium">Shift diagnostics, task queues, and backup coordination.</p>
        </div>

        <button 
          onClick={handleRequestBackup}
          className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:brightness-105 text-white font-bold rounded-xl text-xs tracking-wider uppercase transition-all shadow-sm cursor-pointer active:scale-95"
        >
          ⚠️ Dispatch Volunteer Backup
        </button>
      </div>

      {/* Gamified Volunteer Badges Panel */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        
        {/* Completed Tasks */}
        <div className="glass-panel p-4 rounded-2xl border border-outline-variant/60 flex items-center space-x-3.5">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <span className="block text-[10px] text-secondary/80 font-mono font-bold uppercase tracking-wide">Tasks Done</span>
            <span className="text-xl font-extrabold text-on-surface">14</span>
          </div>
        </div>

        {/* Avg Response Time */}
        <div className="glass-panel p-4 rounded-2xl border border-outline-variant/60 flex items-center space-x-3.5">
          <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600">
            <Clock size={20} />
          </div>
          <div>
            <span className="block text-[10px] text-secondary/80 font-mono font-bold uppercase tracking-wide">Response Time</span>
            <span className="text-xl font-extrabold text-on-surface">1m 20s</span>
          </div>
        </div>

        {/* People Assisted */}
        <div className="glass-panel p-4 rounded-2xl border border-outline-variant/60 flex items-center space-x-3.5">
          <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-600">
            <Users size={20} />
          </div>
          <div>
            <span className="block text-[10px] text-secondary/80 font-mono font-bold uppercase tracking-wide">Fans Helped</span>
            <span className="text-xl font-extrabold text-on-surface">36</span>
          </div>
        </div>

        {/* AI Performance Score */}
        <div className="glass-panel p-4 rounded-2xl border border-outline-variant/60 flex items-center space-x-3.5">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600">
            <Star size={20} />
          </div>
          <div>
            <span className="block text-[10px] text-secondary/80 font-mono font-bold uppercase tracking-wide">AI Score</span>
            <span className="text-xl font-extrabold text-on-surface">95%</span>
          </div>
        </div>

        {/* Volunteer Tier Rank */}
        <div className="glass-panel p-4 rounded-2xl border border-primary/30 flex items-center space-x-3.5 col-span-2 md:col-span-1 bg-gradient-to-r from-primary/5 to-transparent shadow-sm">
          <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary animate-pulse">
            <Trophy size={20} />
          </div>
          <div>
            <span className="block text-[10px] text-secondary/80 font-mono font-bold uppercase tracking-wide">Rank Tier</span>
            <span className="text-xl font-black text-primary tracking-wide">GOLD</span>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Tasks Lists */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="glass-panel p-5 rounded-2xl border border-outline-variant/60 space-y-4">
            <div className="flex items-center space-x-2 border-b border-outline-variant/60 pb-2">
              <Sparkles className="text-primary" size={16} />
              <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider font-sans">Active AI-Generated Tasks</h3>
            </div>

            <div className="space-y-3">
              {activeTasks.map((t) => (
                <div key={t.id} className="bg-surface-container-low border border-outline-variant/45 p-4 rounded-xl flex items-center justify-between gap-4 hover:border-outline-variant transition-colors">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center space-x-2 flex-wrap gap-1">
                      <span className="font-extrabold text-on-surface">{t.title}</span>
                      <span className="text-[9px] bg-surface-container border border-outline-variant/40 text-secondary px-1.5 py-0.5 rounded font-mono font-semibold">{t.id}</span>
                    </div>
                    <div className="flex space-x-3 text-secondary text-[10px] font-medium font-mono">
                      <span>Location: {t.location}</span>
                      <span>Assigned: {t.time}</span>
                    </div>
                  </div>

                  <button 
                    disabled={t.status === 'completed'}
                    onClick={() => alert(`Completed task: ${t.id}`)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all shrink-0 cursor-pointer ${
                      t.status === 'completed' 
                        ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 cursor-not-allowed' 
                        : 'bg-primary hover:bg-primary/95 text-white shadow-sm'
                    }`}
                  >
                    {t.status === 'completed' ? 'Completed' : 'Mark Done'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Shift telemetries summaries */}
          <div className="glass-panel p-5 rounded-2xl border border-outline-variant/60 space-y-3">
            <div className="text-[10px] text-secondary font-bold font-mono uppercase tracking-wider">FLOW AI Shift Telemetry Briefing</div>
            <p className="text-xs text-secondary font-medium leading-relaxed font-sans bg-surface-container p-3 rounded-lg border border-outline-variant/30">
              Matches are progressing inside gameplay periods. Crowd congestion has peaked near Gate C exits. Volunteers should remain focused on directing fans away from Staircase B and pointing towards elevators or escalators on Concourse Level 2. High sustainability score (92%) maintained during energy optimizations.
            </p>
          </div>

        </div>

        {/* Right Side: Lost Item logger */}
        <div className="glass-panel p-5 rounded-2xl border border-outline-variant/60 space-y-4">
          <div className="flex items-center space-x-2 border-b border-outline-variant/60 pb-2">
            <ImageIcon className="text-primary" size={16} />
            <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider font-sans">Lost & Found Logger</h3>
          </div>

          <form onSubmit={handleLostItemSubmit} className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <label className="text-secondary font-bold block mb-1">Item Name / description</label>
              <input 
                type="text" 
                placeholder="e.g. Leather Wallet, Blue Backpack"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full bg-surface border border-outline-variant focus:border-primary rounded-lg px-3 py-2 text-on-surface outline-none font-sans"
              />
            </div>

            <div className="space-y-1">
              <label className="text-secondary font-bold block mb-1">Section Location Found</label>
              <select 
                value={itemLoc}
                onChange={(e) => setItemLoc(e.target.value)}
                className="w-full bg-surface border border-outline-variant focus:border-primary rounded-lg p-2 text-on-surface outline-none cursor-pointer font-bold"
              >
                <option value="Section A3">Section A3 (North lobby)</option>
                <option value="Section C2">Section C2 (South gates)</option>
                <option value="Section B1">Section B1 (East concourse)</option>
              </select>
            </div>

            <div className="space-y-1 border border-dashed border-outline-variant/60 p-4 rounded-lg text-center cursor-pointer hover:bg-surface-container-low transition-all">
              <ImageIcon className="mx-auto text-secondary/65 mb-1" size={24} />
              <span className="text-[10px] text-secondary block font-medium">Click to select item/child photo</span>
            </div>

            <button 
              type="submit" 
              disabled={!itemName.trim()}
              className="w-full text-center py-2.5 bg-primary hover:bg-primary/95 disabled:opacity-50 text-white font-bold rounded-lg transition-all cursor-pointer active:scale-98"
            >
              Catalogue Lost Item
            </button>
          </form>

          {uploadStatus && (
            <div className="bg-primary/5 border border-primary/10 p-2.5 rounded-lg text-[10px] text-primary italic font-semibold leading-normal">
              {uploadStatus}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
