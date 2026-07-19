import React from 'react';
import { useThemeSettings } from '../contexts/ThemeContext';
import { 
  TrendingUp, Award, DollarSign, Activity, Users, Shield, Cpu, Zap
} from 'lucide-react';

export const ExecutiveIntelligence: React.FC = () => {
  const { emergencyMode, t } = useThemeSettings();

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans">
      
      {/* AI OS Action Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/60 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase font-mono tracking-wider">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            AI OS &bull; {t.executiveIntelligence}
          </div>
          <h1 className="font-display font-black text-3xl text-on-surface mt-1.5 leading-tight">
            {emergencyMode 
              ? "AI detected emergency posture. Strategy reports updated for event mitigation." 
              : t.executiveIntelligence
            }
          </h1>
          <p className="text-secondary text-xs sm:text-[13px] font-medium mt-1">
            {t.contextAwareIntelligence}
          </p>
        </div>
      </div>

      {/* 1. TOP HERO - Tournament Brain Stats */}
      <section className="bg-surface-container-low rounded-3xl p-6 md:p-8 border border-outline-variant/60 shadow-ultra-soft text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10" />
        <div className="relative z-10 max-w-xl mx-auto space-y-3.5">
          <div className="flex justify-center items-center gap-2">
            <Award className="text-primary animate-pulse" size={24} />
            <span className="font-mono text-xs uppercase tracking-wider text-primary font-bold">Tournament Brain Active</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-on-surface">{t.executiveIntelligence}</h2>
          <p className="text-xs sm:text-sm text-secondary/90 leading-relaxed font-medium">
            Real-time analytics aggregating telemetry nodes across all stadiums to compile carbon metrics, attendee satisfactions, and security logs.
          </p>
        </div>
      </section>

      {/* 2. End Summary Card - tournament brain overview */}
      <section className="glass-panel rounded-3xl p-6 md:p-8 border-l-4 border-primary shadow-ultra-soft space-y-6">
        <div>
          <span className="font-mono text-[10px] bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded uppercase font-bold tracking-wider">
            Tournament End Summary
          </span>
          <h3 className="font-display font-black text-2xl text-on-surface mt-3">FIFA FLOW Tournament Impact Index</h3>
          <p className="text-secondary text-xs sm:text-[13px] font-medium mt-1">Cumulative operations summary representing tournament brain outputs.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Card 1: AI Decisions */}
          <div className="bg-surface-container/60 border border-outline-variant/30 p-4 rounded-2xl flex flex-col justify-between hover:border-primary/45 transition-colors group">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-secondary text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider">AI Decisions Made</span>
              <Cpu size={14} className="text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-primary font-mono leading-none mb-1.5">247</div>
              <span className="text-[10.5px] font-semibold text-secondary/90">Acknowledge rate: 94%</span>
            </div>
          </div>

          {/* Card 2: Incidents Blocked */}
          <div className="bg-surface-container/60 border border-outline-variant/30 p-4 rounded-2xl flex flex-col justify-between hover:border-primary/45 transition-colors group">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-secondary text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider">Incidents Blocked</span>
              <Shield size={14} className="text-emerald-600 opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono leading-none mb-1.5">19</div>
              <span className="text-[10.5px] font-semibold text-secondary/90">Zero major outages</span>
            </div>
          </div>

          {/* Card 3: Resources Optimized */}
          <div className="bg-surface-container/60 border border-outline-variant/30 p-4 rounded-2xl flex flex-col justify-between hover:border-primary/45 transition-colors group">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-secondary text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider">Resources Optimized</span>
              <Zap size={14} className="text-on-surface opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-on-surface font-mono leading-none mb-1.5">12%</div>
              <span className="text-[10.5px] font-semibold text-secondary/90">Sustainability index</span>
            </div>
          </div>

          {/* Card 4: Fans Guided */}
          <div className="bg-surface-container/60 border border-outline-variant/30 p-4 rounded-2xl flex flex-col justify-between hover:border-primary/45 transition-colors group">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-secondary text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider">Fans Guided</span>
              <Users size={14} className="text-on-surface opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-on-surface font-mono leading-none mb-1.5">1.2M</div>
              <span className="text-[10.5px] font-semibold text-secondary/90">Through Fan App</span>
            </div>
          </div>

          {/* Card 5: Uptime Feed */}
          <div className="bg-surface-container/60 border border-outline-variant/30 p-4 rounded-2xl flex flex-col justify-between hover:border-primary/45 transition-colors group">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-secondary text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider">Uptime Feed</span>
              <Activity size={14} className="text-emerald-600 opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono leading-none mb-1.5">99.99%</div>
              <span className="text-[10.5px] font-semibold text-secondary/90">Global UHD links</span>
            </div>
          </div>

          {/* Card 6: Cost Saved */}
          <div className="bg-surface-container/60 border border-outline-variant/30 p-4 rounded-2xl flex flex-col justify-between hover:border-primary/45 transition-colors group">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-secondary text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider">Cost Saved</span>
              <DollarSign size={14} className="text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-primary font-mono leading-none mb-1.5">$4.8M</div>
              <span className="text-[10.5px] font-semibold text-secondary/90">Estimated direct savings</span>
            </div>
          </div>

          {/* Card 7: AI Confidence Avg */}
          <div className="bg-surface-container/60 border border-outline-variant/30 p-4 rounded-2xl flex flex-col justify-between hover:border-primary/45 transition-colors group">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-secondary text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider">AI Confidence Avg</span>
              <Award size={14} className="text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-primary font-mono leading-none mb-1.5">98.9%</div>
              <span className="text-[10.5px] font-semibold text-secondary/90">Explainable metrics</span>
            </div>
          </div>

          {/* Card 8: Volunteers Active */}
          <div className="bg-surface-container/60 border border-outline-variant/30 p-4 rounded-2xl flex flex-col justify-between hover:border-primary/45 transition-colors group">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-secondary text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider">Volunteers Active</span>
              <Users size={14} className="text-on-surface opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-on-surface font-mono leading-none mb-1.5">1,450</div>
              <span className="text-[10.5px] font-semibold text-secondary/90">Assigned dynamically</span>
            </div>
          </div>

        </div>
      </section>

      {/* Strategy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="glass-panel p-5 rounded-3xl space-y-3 shadow-ultra-soft hover:border-primary/30 transition-all duration-200">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-on-surface uppercase font-mono">
            <TrendingUp size={14} className="text-primary" />
            <span>Economic Index</span>
          </div>
          <p className="text-xs sm:text-[13px] text-secondary leading-relaxed font-medium">
            FIFA FLOW AI resource planning matches volunteer shifts with outer crowd queues. Reduced staffing waste leads to an estimated $4.8M in savings.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-3xl space-y-3 shadow-ultra-soft hover:border-primary/30 transition-all duration-200">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-on-surface uppercase font-mono">
            <Users size={14} className="text-primary" />
            <span>Spectator Satisfaction</span>
          </div>
          <p className="text-xs sm:text-[13px] text-secondary leading-relaxed font-medium">
            Real-time rerouting of crowd flows at MetLife Stadium and Azteca Stadium has reduced peak queue bottlenecks from 18 minutes to 4 minutes.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-3xl space-y-3 shadow-ultra-soft hover:border-primary/30 transition-all duration-200">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-on-surface uppercase font-mono">
            <Cpu size={14} className="text-primary" />
            <span>Edge AI Resilience</span>
          </div>
          <p className="text-xs sm:text-[13px] text-secondary leading-relaxed font-medium">
            Explainable decision trees built on DeepSeek and Llama-3.3 provide security stewards with actionable dispatch steps and low rollback risk.
          </p>
        </div>

      </div>

    </div>
  );
};
