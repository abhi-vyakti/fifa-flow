import React from 'react';
import { useLiveData } from '../contexts/LiveDataContext';
import { StadiumDigitalTwin } from '../components/StadiumDigitalTwin';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import { 
  Activity, Users, Zap, Droplet, Trash2, ShieldAlert, AlertTriangle, 
  MapPin, Clock, HelpCircle, FileDown, CheckCircle2
} from 'lucide-react';

export const OrganizerDashboard: React.FC = () => {
  const { state, resolveIncident } = useLiveData();

  // Create crowd and queue trends chart mock data
  const crowdTrendData = [
    { name: '12:00', Egress: 24, Ingress: 80, Queues: 12 },
    { name: '12:15', Egress: 30, Ingress: 95, Queues: 18 },
    { name: '12:30', Egress: 45, Ingress: 110, Queues: 25 },
    { name: '12:45', Egress: 55, Ingress: 92, Queues: 20 },
    { name: '13:00', Egress: 72, Ingress: 74, Queues: 15 },
    { name: '13:15', Egress: 85, Ingress: 60, Queues: 10 }
  ];

  // Food stall inventories data
  const foodInventoryData = Object.keys(state.foodStalls).map(key => ({
    name: key,
    stock: state.foodStalls[key].inventoryPercent,
    limit: 30 // low inventory warning line
  }));

  // Utility power and water consumption stats
  const utilityData = [
    { name: 'Match -2h', Power: 450, Water: 600 },
    { name: 'Match -1h', Power: 680, Water: 950 },
    { name: 'Kickoff', Power: 820, Water: 1200 },
    { name: 'Halftime', Power: 940, Water: 1750 },
    { name: 'Gameplay', Power: 840, Water: 1100 }
  ];

  // Report download simulation (Enterprise quality)
  const exportTelemetryReport = (format: 'JSON' | 'CSV') => {
    let content = '';
    let filename = `fifa-flow-telemetry-${Date.now()}`;
    
    if (format === 'JSON') {
      content = JSON.stringify(state, null, 2);
      filename += '.json';
    } else {
      // Simple CSV serialize
      content = 'Metric,Value,Threshold\n';
      content += `Health Score,${state.healthScore.overall},90\n`;
      content += `Current Occupancy,${state.occupancy.current},80000\n`;
      content += `Power Usage (kW),${state.sustainability.powerUsageKw},800\n`;
      content += `Water Consumption (LPM),${state.sustainability.waterConsumptionLpm},1500\n`;
      content += `Active Incidents,${state.incidents.length},0\n`;
      filename += '.csv';
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-sans tracking-wide text-white">Organizer Dashboard</h1>
          <p className="text-xs text-gray-400">Live operational telemetry, utility metrics, and sensor heatmaps.</p>
        </div>

        {/* Report downloads */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => exportTelemetryReport('JSON')}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/5 border border-darkBorder hover:border-darkBorderGlow rounded-lg text-xs font-semibold text-white transition-all"
          >
            <FileDown size={13} />
            <span>Export JSON</span>
          </button>

          <button 
            onClick={() => exportTelemetryReport('CSV')}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/5 border border-darkBorder hover:border-darkBorderGlow rounded-lg text-xs font-semibold text-white transition-all"
          >
            <FileDown size={13} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Primary Row - Stadium digital twin */}
      <StadiumDigitalTwin />

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Crowd flow trends */}
        <div className="glass-panel p-5 rounded-2xl border border-darkBorder space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white uppercase tracking-wider">Crowd Rate Trends</h3>
            <span className="text-[10px] text-gray-400">Fans/Min</span>
          </div>
          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={crowdTrendData}>
                <defs>
                  <linearGradient id="colorIngress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorQueues" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#0D1122', borderColor: 'rgba(255,255,255,0.08)', color: '#FFF' }} />
                <Legend />
                <Area type="monotone" dataKey="Ingress" stroke="#06b6d4" fillOpacity={1} fill="url(#colorIngress)" name="Ingress Rate" />
                <Area type="monotone" dataKey="Queues" stroke="#f59e0b" fillOpacity={1} fill="url(#colorQueues)" name="Avg Queue (mins)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Concession Stalls inventories */}
        <div className="glass-panel p-5 rounded-2xl border border-darkBorder space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white uppercase tracking-wider">Concession Stalls Stock Levels</h3>
            <span className="text-[10px] text-red-400 font-bold font-mono">30% MIN ALERT LIMIT</span>
          </div>
          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={foodInventoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#0D1122', borderColor: 'rgba(255,255,255,0.08)', color: '#FFF' }} />
                <Legend />
                <Bar dataKey="stock" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Inventory Percent (%)" />
                <Bar dataKey="limit" fill="#ef4444" radius={[4, 4, 0, 0]} name="Alert Level threshold" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Sustainability Utilities telemetries */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Power grid metrics */}
        <div className="glass-panel p-5 rounded-2xl border border-darkBorder space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-white">
              <Zap size={16} className="text-amber-400" />
              <h3 className="font-bold text-xs uppercase tracking-wider">Electrical Telemetry</h3>
            </div>
            <span className="text-[10px] text-gray-500 font-mono">Grid usage</span>
          </div>
          
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-white">{state.sustainability.powerUsageKw}</span>
            <span className="text-gray-400 text-xs">kW</span>
          </div>
          <p className="text-[11px] text-gray-500 leading-normal">
            Peak threshold set at 800kW. Halftime chiller surges account for current peaks.
          </p>

          <div className="h-28 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={utilityData}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Area type="monotone" dataKey="Power" stroke="#f59e0b" fill="rgba(245, 158, 11, 0.08)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Water loops telemetry */}
        <div className="glass-panel p-5 rounded-2xl border border-darkBorder space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-white">
              <Droplet size={16} className="text-cyan-400" />
              <h3 className="font-bold text-xs uppercase tracking-wider">Hydrologic Consumption</h3>
            </div>
            <span className="text-[10px] text-gray-500 font-mono">Flow loops</span>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-white">{state.sustainability.waterConsumptionLpm}</span>
            <span className="text-gray-400 text-xs">Liters/Min</span>
          </div>
          <p className="text-[11px] text-gray-500 leading-normal">
            Concourse bathroom vacuum flush pressure loops are reporting nominal.
          </p>

          <div className="h-28 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={utilityData}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Area type="monotone" dataKey="Water" stroke="#06b6d4" fill="rgba(6, 182, 212, 0.08)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Refuse and bins */}
        <div className="glass-panel p-5 rounded-2xl border border-darkBorder space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-darkBorder pb-2">
              <div className="flex items-center space-x-2 text-white">
                <Trash2 size={16} className="text-emerald-400" />
                <h3 className="font-bold text-xs uppercase tracking-wider">Refuse Management</h3>
              </div>
              <span className="text-[10px] text-gray-500 font-mono">Bins sensor</span>
            </div>

            <div className="flex items-baseline space-x-2 pt-2">
              <span className="text-3xl font-black text-white">{state.sustainability.wasteGenerationPercent}%</span>
              <span className="text-gray-400 text-xs">Mean Capacity</span>
            </div>
            
            <div className="w-full bg-white/5 rounded-full h-2 mt-3">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${state.sustainability.wasteGenerationPercent}%` }} />
            </div>
          </div>

          <div className="bg-emerald-950/10 border border-emerald-950/20 p-3 rounded-lg text-[10px] text-gray-400 mt-2 leading-relaxed">
            <span className="font-bold text-white block">Carbon Offset Tracking</span>
            4,250 kg of offsets logged through stadium composting, sorting, and volunteer recycling loops.
          </div>
        </div>

      </div>

      {/* Lower Row - Active Incidents logs list */}
      <div className="glass-panel p-5 rounded-2xl border border-darkBorder space-y-4">
        <div className="flex items-center justify-between border-b border-darkBorder pb-2">
          <div className="flex items-center space-x-2 text-white">
            <ShieldAlert size={16} className="text-red-500" />
            <h3 className="font-bold text-xs uppercase tracking-wider">Roving Incident Log</h3>
          </div>
          <span className="text-[10px] text-gray-400 font-mono">
            {state.incidents.filter(i => i.status !== 'resolved').length} ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {state.incidents.map((inc) => {
            let colorBorder = 'border-l-4 border-l-gray-500';
            if (inc.severity === 'critical') colorBorder = 'border-l-4 border-l-red-600';
            if (inc.severity === 'high') colorBorder = 'border-l-4 border-l-red-500';
            if (inc.severity === 'medium') colorBorder = 'border-l-4 border-l-amber-500';

            return (
              <div key={inc.id} className={`bg-white/5 border border-darkBorder rounded-xl p-4 flex flex-col justify-between ${colorBorder}`}>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{inc.title}</span>
                    <span className="text-[9px] bg-white/5 border border-darkBorder text-gray-400 px-1.5 py-0.5 rounded font-mono uppercase">
                      {inc.id}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400">{inc.details}</p>
                  <div className="flex flex-wrap gap-2 text-[10px] text-gray-500 pt-1">
                    <span className="bg-white/5 px-2 py-0.5 rounded">Location: {inc.location}</span>
                    <span className="bg-white/5 px-2 py-0.5 rounded">Status: {inc.status}</span>
                  </div>
                </div>

                {inc.status !== 'resolved' && (
                  <div className="flex justify-end pt-3">
                    <button 
                      onClick={() => resolveIncident(inc.id)}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold rounded-lg transition-all flex items-center space-x-1"
                    >
                      <CheckCircle2 size={12} />
                      <span>Resolve incident</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
