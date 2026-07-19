import React from 'react';
import { useLiveData } from '../contexts/LiveDataContext';
import { useThemeSettings } from '../contexts/ThemeContext';
import { 
  Activity, MapPin, CheckCircle2, Clock, PlusSquare 
} from 'lucide-react';

export const MedicalDashboard: React.FC = () => {
  const { state, resolveIncident } = useLiveData();
  const { t } = useThemeSettings();
  
  // Active medical incidents
  const medicalIncidents = state.incidents.filter(i => i.type === 'medical');

  // Available first aid posts resources
  const medicalPosts = [
    { name: 'First Aid Post A (North Plaza)', beds: '4/6 available', staff: '3 doctors, 4 nurses', status: 'GREEN' },
    { name: 'First Aid Post B (East Concourse)', beds: '2/6 available', staff: '2 doctors, 3 nurses', status: 'YELLOW' },
    { name: 'First Aid Post C (South Lobby)', beds: '5/6 available', staff: '2 doctors, 2 nurses', status: 'GREEN' }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black font-sans tracking-wide text-on-surface">{t.medicalTitle}</h1>
        <p className="text-xs text-secondary font-medium">{t.medicalDesc}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Medical Emergencies Queue */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="glass-panel p-5 rounded-2xl border border-outline-variant/60 space-y-4">
            <div className="flex items-center space-x-2 border-b border-outline-variant/60 pb-2">
              <Activity className="text-red-500 animate-pulse" size={16} />
              <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider">Active Triage Queue</h3>
            </div>

            <div className="space-y-3">
              {medicalIncidents.map((inc) => {
                let severityBadge = 'bg-secondary/10 text-secondary border-outline-variant/55';
                if (inc.severity === 'critical') severityBadge = 'bg-red-500/10 text-error border-red-500/30 animate-pulse';
                if (inc.severity === 'high') severityBadge = 'bg-red-500/10 text-error border-red-500/25';
                if (inc.severity === 'medium') severityBadge = 'bg-amber-500/10 text-amber-600 border-amber-500/25';

                return (
                  <div key={inc.id} className="bg-surface-container-low border border-outline-variant/45 p-4 rounded-xl space-y-3.5 hover:border-outline-variant transition-colors">
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="font-extrabold text-on-surface text-sm block">{inc.title}</span>
                        <span className="text-[10px] text-secondary font-mono">ID: {inc.id} &bull; Reported: {new Date(inc.reportedAt).toLocaleTimeString('en-US', { hour12: false })}</span>
                      </div>
                      <span className={`text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded border ${severityBadge}`}>
                        {inc.severity} Triage
                      </span>
                    </div>

                    <p className="text-xs text-secondary font-medium leading-normal">{inc.details}</p>

                    <div className="grid grid-cols-2 gap-3 text-xs bg-surface-container p-3 rounded-lg border border-outline-variant/30">
                      <div>
                        <span className="text-[10px] text-secondary font-semibold block">Patient Location</span>
                        <span className="font-extrabold text-on-surface flex items-center space-x-1 mt-0.5">
                          <MapPin size={12} className="text-primary" />
                          <span>{inc.location}</span>
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] text-secondary font-semibold block">Fastest Route (FLOW AI)</span>
                        <span className="font-extrabold text-emerald-600 flex items-center space-x-1 mt-0.5">
                          <Clock size={12} className="text-emerald-500 animate-pulse" />
                          <span>Corridor E-3 (2.4 min ETA)</span>
                        </span>
                      </div>

                      <div className="col-span-2 border-t border-outline-variant/30 pt-2">
                        <span className="text-[10px] text-secondary font-semibold block">Required Assets</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {inc.resourcesRequired.map((res, idx) => (
                            <span key={idx} className="bg-surface-container-high border border-outline-variant/40 text-on-surface px-2.5 py-0.5 rounded text-[10px] font-semibold">
                              {res}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {inc.status !== 'resolved' && (
                      <div className="flex justify-end pt-1">
                        <button 
                          onClick={() => resolveIncident(inc.id)}
                          className="px-4.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-lg transition-all flex items-center space-x-1 cursor-pointer active:scale-95 shadow-sm shadow-emerald-500/10"
                        >
                          <CheckCircle2 size={12} />
                          <span>Close Incident</span>
                        </button>
                      </div>
                    )}

                  </div>
                );
              })}

              {medicalIncidents.length === 0 && (
                <div className="border border-dashed border-outline-variant/60 p-8 rounded-xl text-center text-secondary flex flex-col items-center justify-center space-y-2">
                  <CheckCircle2 className="text-emerald-500" size={24} />
                  <div>
                    <span className="text-xs font-bold text-on-surface">All medical dispatch clear</span>
                    <p className="text-[10px] text-secondary mt-0.5">No active patient logs in queue.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Side: First Aid Post Bed capacity */}
        <div className="glass-panel p-5 rounded-2xl border border-outline-variant/60 space-y-4">
          <div className="flex items-center space-x-2 border-b border-outline-variant/60 pb-2">
            <PlusSquare className="text-primary" size={16} />
            <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider font-sans">First Aid Posts Capacity</h3>
          </div>

          <div className="space-y-4 text-xs">
            {medicalPosts.map((post, idx) => {
              let statusBadge = 'bg-emerald-500/10 text-emerald-600 border-emerald-500/25';
              if (post.status === 'YELLOW') statusBadge = 'bg-amber-500/10 text-amber-600 border-amber-500/25';

              return (
                <div key={idx} className="bg-surface-container-low border border-outline-variant/45 p-3 rounded-xl space-y-2.5 hover:border-outline-variant transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-on-surface block">{post.name}</span>
                    <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border ${statusBadge}`}>
                      {post.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-secondary">
                    <div>
                      <span className="text-[9px] text-secondary/80 block font-medium">Bed Load</span>
                      <span className="text-on-surface font-extrabold">{post.beds}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-secondary/80 block font-medium">Active Staff</span>
                      <span className="text-on-surface font-extrabold">{post.staff}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
