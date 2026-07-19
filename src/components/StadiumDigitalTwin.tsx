import React, { useState } from 'react';
import { useLiveData } from '../contexts/LiveDataContext';
import type { SectionInfo } from '../types';
import { Users, AlertTriangle, Coffee, ShieldAlert, Sparkles, X, ChevronRight } from 'lucide-react';

export const StadiumDigitalTwin: React.FC = () => {
  const { state } = useLiveData();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  // Map density to tailwind colors
  const densityColorMap = {
    green: { bg: 'bg-emerald-50 border-emerald-200/50', fill: 'fill-emerald-500/20 stroke-emerald-600', text: 'text-emerald-700' },
    yellow: { bg: 'bg-amber-50 border-amber-200/50', fill: 'fill-amber-500/20 stroke-amber-600', text: 'text-amber-700' },
    orange: { bg: 'bg-orange-50 border-orange-200/50', fill: 'fill-orange-500/20 stroke-orange-600', text: 'text-orange-700' },
    red: { bg: 'bg-red-50 border-red-200/50', fill: 'fill-red-500/25 stroke-red-600 class-pulse', text: 'text-red-700' }
  };

  const getSectionColor = (sectId: string) => {
    const sect = state.sections[sectId];
    if (!sect) return densityColorMap.green;
    return densityColorMap[sect.crowdDensity];
  };

  const handleSectionClick = (sectId: string) => {
    setSelectedSection(sectId);
  };

  const currentSectionData = selectedSection ? state.sections[selectedSection] : null;

  return (
    <div className="bg-surface-container-low p-5 rounded-3xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-display font-black text-on-surface">Stadium Digital Twin</h2>
          <p className="text-xs text-secondary">Click sections to inspect live crowd, queue, security, and medical status.</p>
        </div>
        <div className="flex space-x-2 text-[10px] font-mono font-bold">
          <span className="flex items-center space-x-1"><span className="h-2.5 w-2.5 rounded bg-emerald-500/20 border border-emerald-500" /> <span className="text-secondary">Low</span></span>
          <span className="flex items-center space-x-1"><span className="h-2.5 w-2.5 rounded bg-amber-500/20 border border-amber-500" /> <span className="text-secondary">Mod</span></span>
          <span className="flex items-center space-x-1"><span className="h-2.5 w-2.5 rounded bg-orange-500/20 border border-orange-500" /> <span className="text-secondary">High</span></span>
          <span className="flex items-center space-x-1"><span className="h-2.5 w-2.5 rounded bg-red-500/20 border border-red-500 animate-pulse" /> <span className="text-secondary">Crit</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive SVG Map */}
        <div className="lg:col-span-2 flex items-center justify-center bg-surface-container border border-outline-variant/60 p-4 rounded-2xl relative overflow-hidden min-h-[350px] shadow-ultra-soft">
          
          {/* Centered Pitch details */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
            <div className="w-1/2 h-1/3 border-2 border-emerald-500 rounded flex items-center justify-center">
              <div className="w-1/2 h-full border-r border-emerald-500" />
            </div>
          </div>

          <svg viewBox="0 0 500 500" className="w-full max-w-[380px] h-auto drop-shadow-md">
            {/* 1. Pitch Center */}
            <rect x="175" y="175" width="150" height="150" fill="rgba(16, 185, 129, 0.05)" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="2" rx="4" />
            <circle cx="250" cy="250" r="30" fill="none" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="2" />
            <line x1="250" y1="175" x2="250" y2="325" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="2" />

            {/* 2. North Stand (A Sections: A1 - A4) */}
            <path d="M 160 50 L 340 50 L 320 160 L 180 160 Z" fill="none" stroke="currentColor" className="text-outline-variant/40" />
            {/* Section A1 */}
            <polygon points="160,50 205,50 215,160 180,160" className={`cursor-pointer transition-all duration-300 hover:brightness-105 ${getSectionColor('A1').fill} ${selectedSection === 'A1' ? 'stroke-primary stroke-[3px]' : 'stroke-1'}`} onClick={() => handleSectionClick('A1')} />
            {/* Section A2 */}
            <polygon points="205,50 250,50 250,160 215,160" className={`cursor-pointer transition-all duration-300 hover:brightness-105 ${getSectionColor('A2').fill} ${selectedSection === 'A2' ? 'stroke-primary stroke-[3px]' : 'stroke-1'}`} onClick={() => handleSectionClick('A2')} />
            {/* Section A3 */}
            <polygon points="250,50 295,50 285,160 250,160" className={`cursor-pointer transition-all duration-300 hover:brightness-105 ${getSectionColor('A3').fill} ${selectedSection === 'A3' ? 'stroke-primary stroke-[3px]' : 'stroke-1'}`} onClick={() => handleSectionClick('A3')} />
            {/* Section A4 */}
            <polygon points="295,50 340,50 320,160 285,160" className={`cursor-pointer transition-all duration-300 hover:brightness-105 ${getSectionColor('A4').fill} ${selectedSection === 'A4' ? 'stroke-primary stroke-[3px]' : 'stroke-1'}`} onClick={() => handleSectionClick('A4')} />

            {/* 3. East Stand (B Sections: B1 - B4) */}
            <path d="M 350 160 L 450 180 L 450 320 L 350 340 Z" fill="none" stroke="currentColor" className="text-outline-variant/40" />
            {/* Section B1 */}
            <polygon points="350,160 450,180 450,215 350,205" className={`cursor-pointer transition-all duration-300 hover:brightness-105 ${getSectionColor('B1').fill} ${selectedSection === 'B1' ? 'stroke-primary stroke-[3px]' : 'stroke-1'}`} onClick={() => handleSectionClick('B1')} />
            {/* Section B2 */}
            <polygon points="350,205 450,215 450,250 350,250" className={`cursor-pointer transition-all duration-300 hover:brightness-105 ${getSectionColor('B2').fill} ${selectedSection === 'B2' ? 'stroke-primary stroke-[3px]' : 'stroke-1'}`} onClick={() => handleSectionClick('B2')} />
            {/* Section B3 */}
            <polygon points="350,250 450,250 450,285 350,295" className={`cursor-pointer transition-all duration-300 hover:brightness-105 ${getSectionColor('B3').fill} ${selectedSection === 'B3' ? 'stroke-primary stroke-[3px]' : 'stroke-1'}`} onClick={() => handleSectionClick('B3')} />
            {/* Section B4 */}
            <polygon points="350,295 450,285 450,320 350,340" className={`cursor-pointer transition-all duration-300 hover:brightness-105 ${getSectionColor('B4').fill} ${selectedSection === 'B4' ? 'stroke-primary stroke-[3px]' : 'stroke-1'}`} onClick={() => handleSectionClick('B4')} />

            {/* 4. South Stand (C Sections: C1 - C4) */}
            {/* Section C1 */}
            <polygon points="320,340 340,450 295,450 285,340" className={`cursor-pointer transition-all duration-300 hover:brightness-105 ${getSectionColor('C1').fill} ${selectedSection === 'C1' ? 'stroke-primary stroke-[3px]' : 'stroke-1'}`} onClick={() => handleSectionClick('C1')} />
            {/* Section C2 */}
            <polygon points="285,340 295,450 250,450 250,340" className={`cursor-pointer transition-all duration-300 hover:brightness-105 ${getSectionColor('C2').fill} ${selectedSection === 'C2' ? 'stroke-primary stroke-[3px]' : 'stroke-1'}`} onClick={() => handleSectionClick('C2')} />
            {/* Section C3 */}
            <polygon points="250,340 250,450 205,450 215,340" className={`cursor-pointer transition-all duration-300 hover:brightness-105 ${getSectionColor('C3').fill} ${selectedSection === 'C3' ? 'stroke-primary stroke-[3px]' : 'stroke-1'}`} onClick={() => handleSectionClick('C3')} />
            {/* Section C4 */}
            <polygon points="215,340 205,450 160,450 180,340" className={`cursor-pointer transition-all duration-300 hover:brightness-105 ${getSectionColor('C4').fill} ${selectedSection === 'C4' ? 'stroke-primary stroke-[3px]' : 'stroke-1'}`} onClick={() => handleSectionClick('C4')} />

            {/* 5. West Stand (D Sections: D1 - D4) */}
            {/* Section D1 */}
            <polygon points="150,340 50,320 50,285 150,295" className={`cursor-pointer transition-all duration-300 hover:brightness-105 ${getSectionColor('D1').fill} ${selectedSection === 'D1' ? 'stroke-primary stroke-[3px]' : 'stroke-1'}`} onClick={() => handleSectionClick('D1')} />
            {/* Section D2 */}
            <polygon points="150,295 50,285 50,250 150,250" className={`cursor-pointer transition-all duration-300 hover:brightness-105 ${getSectionColor('D2').fill} ${selectedSection === 'D2' ? 'stroke-primary stroke-[3px]' : 'stroke-1'}`} onClick={() => handleSectionClick('D2')} />
            {/* Section D3 */}
            <polygon points="150,250 50,250 50,215 150,205" className={`cursor-pointer transition-all duration-300 hover:brightness-105 ${getSectionColor('D3').fill} ${selectedSection === 'D3' ? 'stroke-primary stroke-[3px]' : 'stroke-1'}`} onClick={() => handleSectionClick('D3')} />
            {/* Section D4 */}
            <polygon points="150,205 50,215 50,180 150,160" className={`cursor-pointer transition-all duration-300 hover:brightness-105 ${getSectionColor('D4').fill} ${selectedSection === 'D4' ? 'stroke-primary stroke-[3px]' : 'stroke-1'}`} onClick={() => handleSectionClick('D4')} />

            {/* LABELS (Charcoal text for maximum legibility) */}
            <text x="250" y="105" fill="#3a302a" fontSize="14" fontWeight="bold" textAnchor="middle" opacity="0.3" pointerEvents="none">NORTH STAND</text>
            <text x="390" y="255" fill="#3a302a" fontSize="14" fontWeight="bold" textAnchor="middle" opacity="0.3" pointerEvents="none" transform="rotate(90 390 255)">EAST STAND</text>
            <text x="250" y="405" fill="#3a302a" fontSize="14" fontWeight="bold" textAnchor="middle" opacity="0.3" pointerEvents="none">SOUTH STAND</text>
            <text x="110" y="255" fill="#3a302a" fontSize="14" fontWeight="bold" textAnchor="middle" opacity="0.3" pointerEvents="none" transform="rotate(-90 110 255)">WEST STAND</text>

            <text x="250" y="255" fill="#3a302a" fontSize="10" fontWeight="bold" textAnchor="middle" opacity="0.4" pointerEvents="none">FIELD OF PLAY</text>
          </svg>
        </div>

        {/* Section Metrics Panel */}
        <div className="flex flex-col justify-between">
          {selectedSection && currentSectionData ? (
            <div className="border border-outline-variant bg-surface-container-lowest p-4 rounded-2xl space-y-4 h-full flex flex-col justify-between shadow-ultra-soft">
              
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-outline-variant pb-2">
                  <span className="font-headline font-black text-on-surface text-md">
                    Section {selectedSection} Telemetry
                  </span>
                  <button onClick={() => setSelectedSection(null)} className="text-secondary hover:text-primary cursor-pointer p-1">
                    <X size={16} />
                  </button>
                </div>

                {/* State metrics */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  
                  <div className="bg-surface-container/50 p-2.5 rounded-xl border border-outline-variant/30">
                    <div className="text-secondary mb-1 flex items-center space-x-1">
                      <Users size={11} />
                      <span>Volunteers</span>
                    </div>
                    <div className="font-extrabold text-on-surface text-sm">
                      {currentSectionData.volunteers} Active
                    </div>
                  </div>

                  <div className="bg-surface-container/50 p-2.5 rounded-xl border border-outline-variant/30">
                    <div className="text-secondary mb-1 flex items-center space-x-1">
                      <Users size={11} />
                      <span>Security</span>
                    </div>
                    <div className="font-extrabold text-on-surface text-sm">
                      {currentSectionData.security} Active
                    </div>
                  </div>

                  <div className="bg-surface-container/50 p-2.5 rounded-xl border border-outline-variant/30 col-span-2 space-y-1">
                    <div className="text-secondary flex items-center space-x-1">
                      <Coffee size={11} />
                      <span>Food Supply</span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-1.5">
                      <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: `${currentSectionData.foodAvailability}%` }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-secondary font-bold">
                      <span>Inventory:</span>
                      <span>{currentSectionData.foodAvailability}%</span>
                    </div>
                  </div>

                  <div className="bg-surface-container/50 p-2.5 rounded-xl border border-outline-variant/30">
                    <div className="text-secondary mb-1">Queue Time</div>
                    <div className="font-extrabold text-on-surface text-sm">
                      {currentSectionData.queueLength} mins
                    </div>
                  </div>

                  <div className="bg-surface-container/50 p-2.5 rounded-xl border border-outline-variant/30">
                    <div className="text-secondary mb-1">Crowd Risk</div>
                    <div className={`font-extrabold text-xs uppercase ${getSectionColor(selectedSection).text}`}>
                      {currentSectionData.crowdDensity}
                    </div>
                  </div>

                </div>

                {/* Active Alerts inside section */}
                {currentSectionData.incidents > 0 && (
                  <div className="bg-red-50 border border-red-200/50 p-2.5 rounded-xl flex items-start space-x-2 text-xs">
                    <AlertTriangle className="text-error shrink-0 mt-0.5" size={14} />
                    <div>
                      <div className="font-bold text-error">ACTIVE INCIDENT DETECTED</div>
                      <p className="text-[11px] text-secondary">Responders are dispatched to Section {selectedSection}.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Dynamic Action Trigger */}
              <div className="pt-2 border-t border-outline-variant">
                <button 
                  onClick={() => handleSectionClick(selectedSection)}
                  className="w-full text-center py-2 bg-primary hover:bg-primary-container text-white font-bold rounded-xl text-xs transition-all shadow-ultra-soft flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <Sparkles size={12} />
                  <span>Run Section Diagnostic</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="border border-dashed border-outline-variant/60 p-6 rounded-2xl text-center flex flex-col items-center justify-center h-full text-secondary space-y-3 bg-surface-container-lowest shadow-ultra-soft">
              <Users size={32} className="text-secondary" />
              <div>
                <div className="text-xs font-bold text-on-surface">No Section Selected</div>
                <p className="text-[11px] text-secondary mt-1 max-w-[200px]">Click on any stadium quadrant to overlay live telemetry.</p>
              </div>
              <div className="text-[10px] bg-surface-container px-2.5 py-1 rounded-xl text-secondary font-mono">
                Simulated updates every 10s
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
