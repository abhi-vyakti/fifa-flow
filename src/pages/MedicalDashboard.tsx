import React from 'react';
import { useLiveData } from '../contexts/LiveDataContext';
import { useAI } from '../contexts/AIContext';
import { 
  Activity, Users, MapPin, AlertCircle, Heart, CheckCircle2, 
  Map, Clock, PlusSquare, ArrowRight 
} from 'lucide-react';

export const MedicalDashboard: React.FC = () => {
  const { state, resolveIncident } = useLiveData();
  
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
        <h1 className="text-2xl font-black font-sans tracking-wide text-white">Medical Dispatch Portal</h1>
        <p className="text-xs text-gray-400">Triage prioritization, fastest corridor navigation, and bed availability.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Medical Emergencies Queue */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="glass-panel p-5 rounded-2xl border border-darkBorder space-y-4">
            <div className="flex items-center space-x-2 border-b border-darkBorder pb-2">
              <Activity className="text-red-500" size={16} />
              <h3 className="font-bold text-sm text-white uppercase tracking-wider">Active Triage Queue</h3>
            </div>

            <div className="space-y-3">
              {medicalIncidents.map((inc) => {
                let severityBadge = 'bg-gray-500/10 text-gray-400 border-gray-500/20';
                if (inc.severity === 'critical') severityBadge = 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse';
                if (inc.severity === 'high') severityBadge = 'bg-red-500/15 text-red-400 border-red-500/30';
                if (inc.severity === 'medium') severityBadge = 'bg-amber-500/15 text-amber-400 border-amber-500/35';

                return (
                  <div key={inc.id} className="bg-white/5 border border-darkBorder p-4 rounded-xl space-y-3.5">
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="font-bold text-white text-xs block">{inc.title}</span>
                        <span className="text-[10px] text-gray-500 font-mono">ID: {inc.id} &bull; Reported: {new Date(inc.reportedAt).toLocaleTimeString('en-US', { hour12: false })}</span>
                      </div>
                      <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border ${severityBadge}`}>
                        {inc.severity} Triage
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 leading-normal">{inc.details}</p>

                    <div className="grid grid-cols-2 gap-3 text-xs bg-black/30 p-3 rounded-lg border border-darkBorder/40">
                      <div>
                        <span className="text-[10px] text-gray-500 block">Patient Location</span>
                        <span className="font-bold text-white flex items-center space-x-1 mt-0.5">
                          <MapPin size={12} className="text-aiCyan" />
                          <span>{inc.location}</span>
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] text-gray-500 block">Fastest Route (FLOW AI)</span>
                        <span className="font-bold text-emerald-400 flex items-center space-x-1 mt-0.5">
                          <Clock size={12} className="text-emerald-400" />
                          <span>Corridor E-3 (2.4 min ETA)</span>
                        </span>
                      </div>

                      <div className="col-span-2 border-t border-darkBorder/40 pt-2">
                        <span className="text-[10px] text-gray-500 block">Required Assets</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {inc.resourcesRequired.map((res, idx) => (
                            <span key={idx} className="bg-white/5 border border-darkBorder text-gray-400 px-2 py-0.5 rounded text-[10px]">
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
                          className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold rounded-lg transition-all flex items-center space-x-1 shadow-greenGlow"
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
                <div className="border border-dashed border-darkBorder p-8 rounded-xl text-center text-gray-400 flex flex-col items-center justify-center space-y-2">
                  <CheckCircle2 className="text-emerald-500" size={24} />
                  <div>
                    <span className="text-xs font-bold text-white">All medical dispatch clear</span>
                    <p className="text-[10px] text-gray-500 mt-0.5">No active patient logs in queue.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Side: First Aid Post Bed capacity */}
        <div className="glass-panel p-5 rounded-2xl border border-darkBorder space-y-4">
          <div className="flex items-center space-x-2 border-b border-darkBorder pb-2">
            <PlusSquare className="text-aiPurple" size={16} />
            <h3 className="font-bold text-sm text-white uppercase tracking-wider font-sans">First Aid Posts Capacity</h3>
          </div>

          <div className="space-y-4 text-xs">
            {medicalPosts.map((post, idx) => {
              let statusBadge = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/35';
              if (post.status === 'YELLOW') statusBadge = 'bg-amber-500/20 text-amber-400 border-amber-500/35';

              return (
                <div key={idx} className="bg-white/5 border border-darkBorder p-3 rounded-xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white block">{post.name}</span>
                    <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded border ${statusBadge}`}>
                      {post.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-gray-400">
                    <div>
                      <span className="text-[9px] block">Bed Load</span>
                      <span className="text-white font-semibold">{post.beds}</span>
                    </div>
                    <div>
                      <span className="text-[9px] block">Active Staff</span>
                      <span className="text-white font-semibold">{post.staff}</span>
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
