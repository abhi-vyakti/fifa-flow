import React, { useState, useEffect } from 'react';
import { useLiveData } from '../contexts/LiveDataContext';
import { useThemeSettings } from '../contexts/ThemeContext';
import { 
  Tv, Radio, Wifi, Video, Volume2, Globe, Heart, Shield, CheckCircle2, 
  ArrowRight, Activity, CloudLightning, Satellite, Play, Pause, 
  Eye, Cpu, Sparkles
} from 'lucide-react';

export const BroadcastCenter: React.FC = () => {
  const { state } = useLiveData();
  const { emergencyMode, t } = useThemeSettings();

  // State controls for broadcast simulation
  const [selectedCamIndex, setSelectedCamIndex] = useState(0);
  const [showHUD, setShowHUD] = useState(true);
  const [showCV, setShowCV] = useState(true);
  const [showTelemetry, setShowTelemetry] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeCommentator, setActiveCommentator] = useState<'english' | 'spanish'>('english');
  const [tick, setTick] = useState(0);

  // Animation frame loop driven by play state
  useEffect(() => {
    if (!isPlaying) return;
    let animationId: number;
    const update = () => {
      setTick(prev => (prev + 1) % 10000);
      animationId = requestAnimationFrame(update);
    };
    animationId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationId);
  }, [isPlaying]);

  // --- CAMERA SIMULATORS ---

  // CAM 01 - Main Pitch Side (Tactical Passing Network)
  const renderCam1 = () => {
    const players = [
      { id: 'USA 10', x: 120, y: 110, team: 'USA', num: '10' },
      { id: 'USA 8', x: 230, y: 80, team: 'USA', num: '8' },
      { id: 'USA 7', x: 300, y: 200, team: 'USA', num: '7' },
      { id: 'ENG 4', x: 340, y: 130, team: 'ENG', num: '4' },
      { id: 'ENG 5', x: 200, y: 190, team: 'ENG', num: '5' },
      { id: 'USA 9', x: 420, y: 140, team: 'USA', num: '9' }
    ];
    
    const cycle = tick % 270;
    let ballX = 120, ballY = 110, actionText = 'USA Possession', activeId = 'USA 10';
    if (cycle < 60) {
      const p = cycle / 60;
      ballX = 120 + (230 - 120) * p;
      ballY = 110 + (80 - 110) * p;
      actionText = 'Pass: USA #10 ➔ USA #8';
      activeId = 'USA 10';
    } else if (cycle < 120) {
      const p = (cycle - 60) / 60;
      ballX = 230 + (300 - 230) * p;
      ballY = 80 + (200 - 80) * p;
      actionText = 'Pass: USA #8 ➔ USA #7';
      activeId = 'USA 8';
    } else if (cycle < 160) {
      const p = (cycle - 120) / 40;
      ballX = 300 + (340 - 300) * p;
      ballY = 200 + (130 - 200) * p;
      actionText = 'Intercept: ENG #4 Pressing';
      activeId = 'ENG 4';
    } else if (cycle < 220) {
      const p = (cycle - 160) / 60;
      ballX = 340 + (200 - 340) * p;
      ballY = 130 + (190 - 130) * p;
      actionText = 'Pass: ENG #4 ➔ ENG #5';
      activeId = 'ENG 4';
    } else {
      const p = (cycle - 220) / 50;
      ballX = 200 + (120 - 200) * p;
      ballY = 190 + (110 - 190) * p;
      actionText = 'Tackle: USA #10 Challenge';
      activeId = 'USA 10';
    }

    return (
      <svg viewBox="0 0 500 300" className="w-full h-full bg-[#143d2f] select-none rounded-3xl">
        <rect x="0" y="0" width="500" height="300" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <line x1="250" y1="0" x2="250" y2="300" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <circle cx="250" cy="150" r="45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <circle cx="250" cy="150" r="3" fill="rgba(255,255,255,0.4)" />
        
        <rect x="0" y="60" width="70" height="180" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <rect x="430" y="60" width="70" height="180" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        
        {showHUD && (
          <g stroke="rgba(194, 101, 42, 0.15)" strokeWidth="0.5" strokeDasharray="2,4">
            <line x1="0" y1="75" x2="500" y2="75" />
            <line x1="0" y1="150" x2="500" y2="150" />
            <line x1="0" y1="225" x2="500" y2="225" />
            <line x1="125" y1="0" x2="125" y2="300" />
            <line x1="375" y1="0" x2="375" y2="300" />
          </g>
        )}

        {showHUD && (
          <g opacity="0.6">
            <line x1="120" y1="110" x2="230" y2="80" stroke="rgba(194,101,42,0.4)" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="230" y1="80" x2="300" y2="200" stroke="rgba(194,101,42,0.4)" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="300" y1="200" x2="420" y2="140" stroke="rgba(194,101,42,0.4)" strokeWidth="1.5" strokeDasharray="3,3" />
            {cycle < 60 && (
              <line x1="120" y1="110" x2="230" y2="80" stroke="#c2652a" strokeWidth="2" />
            )}
            {cycle >= 60 && cycle < 120 && (
              <line x1="230" y1="80" x2="300" y2="200" stroke="#c2652a" strokeWidth="2" />
            )}
          </g>
        )}

        {players.map((p, idx) => {
          const isTeamUSA = p.team === 'USA';
          const fillCol = isTeamUSA ? '#c2652a' : '#2563EB';
          const isActive = activeId === p.id;
          
          return (
            <g key={idx}>
              {isActive && showHUD && (
                <circle cx={p.x} cy={p.y} r={12 + Math.sin(tick * 0.1) * 3} fill="none" stroke={fillCol} strokeWidth="1.5" opacity="0.6" />
              )}
              
              <circle cx={p.x} cy={p.y} r={7} fill={fillCol} stroke="white" strokeWidth="1.5" />
              <text x={p.x} y={p.y + 2.5} fill="white" fontSize="7" fontWeight="bold" textAnchor="middle">{p.num}</text>
              
              {showHUD && (
                <g>
                  <rect x={p.x - 20} y={p.y - 17} width="40" height="8" rx="2" fill="rgba(0,0,0,0.6)" />
                  <text x={p.x} y={p.y - 11} fill="white" fontSize="5" fontWeight="bold" textAnchor="middle">{p.id}</text>
                </g>
              )}
            </g>
          );
        })}

        <g>
          <circle cx={ballX + 2} cy={ballY + 3} r="4" fill="rgba(0,0,0,0.4)" />
          <circle cx={ballX} cy={ballY} r="4.5" fill="white" stroke="black" strokeWidth="1" />
          <circle cx={ballX} cy={ballY} r="1.5" fill="black" />
          {showHUD && (
            <circle cx={ballX} cy={ballY} r={10 + Math.sin(tick * 0.1) * 2} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="1,2" />
          )}
        </g>

        <rect x="10" y="270" width="160" height="20" rx="4" fill="rgba(0,0,0,0.7)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        <circle cx="20" cy="280" r="3" fill="#10B981" className="animate-pulse" />
        <text x="32" y="284" fill="white" fontSize="8" fontFamily="monospace" fontWeight="bold">{actionText}</text>
      </svg>
    );
  };

  // CAM 02 - Goal Line South (Goal post depth and shoot overlay)
  const renderCam2 = () => {
    const cycle = tick % 150;
    const isGoal = Math.floor(tick / 150) % 2 === 0;
    const goalieX = 250 + Math.sin(tick * 0.05) * 55;
    const goalieY = 160;
    
    const shootTargetX = isGoal ? 160 : goalieX + 5;
    const shootTargetY = isGoal ? 100 : goalieY - 10;
    
    let ballX = 250, ballY = 270, ballSize = 14, status = 'PREPARE';
    if (cycle < 30) {
      ballX = 250;
      ballY = 270;
      ballSize = 14;
      status = 'PREPARE';
    } else if (cycle < 75) {
      const p = (cycle - 30) / 45;
      ballX = 250 + (shootTargetX - 250) * p;
      ballY = 270 + (shootTargetY - 270) * p;
      ballSize = 14 - p * 8;
      status = 'FLIGHT';
    } else {
      ballX = shootTargetX;
      ballY = shootTargetY;
      ballSize = 6;
      status = isGoal ? 'GOAL' : 'SAVED';
    }

    return (
      <svg viewBox="0 0 500 300" className="w-full h-full bg-[#1b4430] select-none rounded-3xl">
        <polygon points="0,300 120,170 380,170 500,300" fill="#1b4d35" />
        <polygon points="120,170 140,170 100,220 0,220" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <polygon points="380,170 360,170 400,220 500,220" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        
        <line x1="80" y1="210" x2="80" y2="70" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <line x1="420" y1="210" x2="420" y2="70" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <line x1="80" y1="70" x2="420" y2="70" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        
        <line x1="100" y1="230" x2="100" y2="80" stroke="white" strokeWidth="5" strokeLinecap="round" />
        <line x1="400" y1="230" x2="400" y2="80" stroke="white" strokeWidth="5" strokeLinecap="round" />
        <line x1="98" y1="80" x2="402" y2="80" stroke="white" strokeWidth="5" strokeLinecap="round" />
        
        <g stroke="rgba(255,255,255,0.15)" strokeWidth="0.5">
          {Array.from({ length: 17 }).map((_, idx) => {
            const xFront = 100 + idx * 18.75;
            const xBack = 80 + idx * 21.25;
            return <line key={idx} x1={xFront} y1="80" x2={xBack} y2="70" />;
          })}
          {Array.from({ length: 6 }).map((_, idx) => {
            const y = 80 + idx * 25;
            return <line key={idx} x1="100" y1={y} x2="400" y2={y} />;
          })}
        </g>

        <g>
          <ellipse cx={goalieX} cy={goalieY + 30} rx="15" ry="5" fill="rgba(0,0,0,0.3)" />
          <ellipse cx={goalieX} cy={goalieY + 12} rx="12" ry="15" fill="#10B981" stroke="white" strokeWidth="1.5" />
          <circle cx={goalieX} cy={goalieY - 8} r="6" fill="#FDBA74" stroke="white" strokeWidth="1" />
          <path d={`M ${goalieX - 12} ${goalieY + 5} Q ${goalieX - 25} ${goalieY - 5} ${goalieX - 30} ${goalieY - 12}`} fill="none" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
          <path d={`M ${goalieX + 12} ${goalieY + 5} Q ${goalieX + 25} ${goalieY - 5} ${goalieX + 30} ${goalieY - 12}`} fill="none" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
          <circle cx={goalieX - 30} cy={goalieY - 12} r="3" fill="#000" />
          <circle cx={goalieX + 30} cy={goalieY - 12} r="3" fill="#000" />
          <rect x={goalieX - 8} y={goalieY + 25} width="5" height="8" fill="#1F2937" />
          <rect x={goalieX + 3} y={goalieY + 25} width="5" height="8" fill="#1F2937" />
        </g>

        {status !== 'SAVED' || cycle < 85 ? (
          <g>
            <circle cx={ballX + 2} cy={ballY + ballSize/2} r={ballSize * 0.8} fill="rgba(0,0,0,0.3)" />
            <circle cx={ballX} cy={ballY} r={ballSize} fill="white" stroke="black" strokeWidth="1.5" />
            <path d={`M ${ballX - ballSize/2} ${ballY} Q ${ballX} ${ballY - ballSize/2} ${ballX + ballSize/2} ${ballY}`} fill="none" stroke="black" strokeWidth="1" />
            <path d={`M ${ballX - ballSize/2} ${ballY} Q ${ballX} ${ballY + ballSize/2} ${ballX + ballSize/2} ${ballY}`} fill="none" stroke="black" strokeWidth="1" />
          </g>
        ) : (
          <g>
            <circle cx={goalieX} cy={goalieY} r="5" fill="white" stroke="black" strokeWidth="1" />
          </g>
        )}

        {showHUD && status === 'FLIGHT' && (
          <g>
            <rect x={ballX - ballSize - 3} y={ballY - ballSize - 3} width={ballSize*2 + 6} height={ballSize*2 + 6} stroke="#f0a878" strokeWidth="1.5" fill="none" />
            <text x={ballX + ballSize + 5} y={ballY - 5} fill="#f0a878" fontSize="8" fontFamily="monospace" fontWeight="bold">BALL TRACKING</text>
            <text x={ballX + ballSize + 5} y={ballY + 5} fill="white" fontSize="7" fontFamily="monospace">VEL: 112 km/h</text>
            
            <line x1={ballX} y1={ballY} x2={shootTargetX} y2={shootTargetY} stroke="#ff4d4d" strokeWidth="1" strokeDasharray="2,2" />
            <circle cx={shootTargetX} cy={shootTargetY} r="3" fill="none" stroke="#ff4d4d" strokeWidth="1" />
          </g>
        )}

        {cycle >= 75 && (
          <g>
            <rect x="120" y="110" width="260" height="80" rx="8" fill="rgba(0,0,0,0.85)" stroke={isGoal ? '#10B981' : '#c2652a'} strokeWidth="2" />
            <text x="250" y="140" fill={isGoal ? '#10B981' : '#f0a878'} fontSize="18" fontWeight="bold" fontFamily="monospace" textAnchor="middle" letterSpacing="2">
              {isGoal ? '⚽ GOAL' : '👐 SAVED'}
            </text>
            <text x="250" y="160" fill="white" fontSize="8" fontFamily="sans-serif" textAnchor="middle">
              {isGoal ? 'Hawk-Eye Decision: GOAL CONFIRMED' : 'Hawk-Eye Decision: NO GOAL'}
            </text>
            <text x="250" y="175" fill="rgba(255,255,255,0.6)" fontSize="7" fontFamily="monospace" textAnchor="middle">
              BALL COORDINATES: X:{(shootTargetX).toFixed(1)} Y:{(shootTargetY).toFixed(1)} Z:0.0
            </text>
          </g>
        )}
      </svg>
    );
  };

  // CAM 03 - VAR Center Feed (Offside keypoint skeleton analysis)
  const renderCam3 = () => {
    const cycle = tick % 200;
    const playbackPercent = Math.min(100, Math.floor((cycle / 170) * 100));
    
    const defenderX = 280;
    const attackerX = 240 + Math.sin(tick * 0.02) * 15;

    return (
      <svg viewBox="0 0 500 300" className="w-full h-full bg-[#1e1e1e] select-none text-white rounded-3xl">
        <rect x="0" y="0" width="500" height="24" fill="#000" />
        <text x="15" y="16" fill="#ff4d4d" fontSize="9" fontWeight="bold" fontFamily="monospace" letterSpacing="1">🚨 AI VAR SYNCHRONIZED CALIBRATION</text>
        <text x="440" y="15" fill="#888" fontSize="8" fontFamily="monospace">CAM_03_VAR</text>

        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect x="0" y="24" width="500" height="246" fill="url(#grid)" />
        <line x1="250" y1="24" x2="250" y2="270" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="5,5" />

        <g>
          <rect x="0" y="24" width="250" height="246" fill="rgba(16, 185, 129, 0.05)" />
          <text x="125" y="42" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace" textAnchor="middle">2D TACTICAL PROJECTION</text>
          
          <circle cx={attackerX} cy="140" r="8" fill="#c2652a" stroke="white" strokeWidth="1.5" />
          <text x={attackerX} y="143" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">9</text>
          <text x={attackerX} y="176" fill="#c2652a" fontSize="7" fontWeight="bold" textAnchor="middle">USA</text>

          <circle cx={defenderX} cy="160" r="8" fill="#2563EB" stroke="white" strokeWidth="1.5" />
          <text x={defenderX} y="163" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">3</text>
          <text x={defenderX} y="176" fill="#2563EB" fontSize="7" fontWeight="bold" textAnchor="middle">ENG</text>

          {showHUD && (
            <g>
              <line x1={defenderX} y1="40" x2={defenderX} y2="250" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3,3" />
              <text x={defenderX + 5} y="55" fill="#EF4444" fontSize="7" fontFamily="monospace" fontWeight="bold">DEFENDER LINE (ENG)</text>
              
              <line x1={attackerX} y1="40" x2={attackerX} y2="250" stroke="#3B82F6" strokeWidth="1.5" />
              <text x={attackerX - 5} y="245" fill="#3B82F6" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="end">ATTACKER SKELETON (USA)</text>
              
              <line x1={attackerX} y1="110" x2={defenderX} y2="110" stroke="#FBBF24" strokeWidth="1" />
              <rect x={(attackerX + defenderX)/2 - 25} y="103" width="50" height="12" rx="2" fill="rgba(0,0,0,0.8)" stroke="#FBBF24" strokeWidth="0.5" />
              <text x={(attackerX + defenderX)/2} y="112" fill="#FBBF24" fontSize="7" fontFamily="monospace" textAnchor="middle">
                {attackerX < defenderX ? `+${((defenderX - attackerX)*0.5).toFixed(1)}cm` : `-${((attackerX - defenderX)*0.5).toFixed(1)}cm`}
              </text>
            </g>
          )}
        </g>

        <g transform="translate(250, 0)">
          <rect x="0" y="24" width="250" height="246" fill="rgba(0,0,0,0.2)" />
          <text x="125" y="42" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace" textAnchor="middle">AI BODY KEYPOINT CAPTURE</text>

          <g transform="translate(80, 100)" stroke="#c2652a" strokeWidth="2" fill="none" strokeLinecap="round">
            <line x1="30" y1="25" x2="25" y2="60" />
            <line x1="25" y1="60" x2="10" y2="90" />
            <line x1="10" y1="90" x2="5" y2="110" strokeWidth="3" stroke="#EF4444" />
            <line x1="25" y1="60" x2="35" y2="85" />
            <line x1="35" y1="85" x2="45" y2="105" />
            <line x1="30" y1="25" x2="10" y2="40" />
            <line x1="30" y1="25" x2="45" y2="35" />
            <circle cx="32" cy="12" r="7" fill="#1e1e1e" stroke="#c2652a" strokeWidth="2" />
            
            <circle cx="30" cy="25" r="2.5" fill="#fff" />
            <circle cx="25" cy="60" r="2.5" fill="#fff" />
            <circle cx="10" cy="90" r="2.5" fill="#fff" />
            <circle cx="5" cy="110" r="3" fill="#EF4444" stroke="#fff" strokeWidth="0.5" />
            <text x="12" y="118" fill="#EF4444" fontSize="6" fontFamily="monospace" stroke="none">OFFSIDE POINT</text>
          </g>

          {showHUD && (
            <g transform="translate(10, 190)">
              <rect x="0" y="0" width="120" height="52" rx="4" fill="rgba(0,0,0,0.7)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              <text x="8" y="12" fill="#c2652a" fontSize="6" fontFamily="monospace">MODEL: YOLOV8-POSE-FIFA</text>
              <text x="8" y="22" fill="#10B981" fontSize="6" fontFamily="monospace">BODY SENSORS: LOCK (17/17)</text>
              <text x="8" y="32" fill="white" fontSize="6" fontFamily="monospace">LATENCY: 4.8ms</text>
              <text x="8" y="42" fill="white" fontSize="6" fontFamily="monospace">AUTO-CALIBRATION: OK</text>
            </g>
          )}
        </g>

        {showHUD && (
          <g>
            <rect x="175" y="210" width="150" height="30" rx="4" fill="rgba(0,0,0,0.9)" stroke="#EF4444" strokeWidth="1.5" />
            <circle cx="190" cy="225" r="3" fill="#EF4444" className="animate-pulse" />
            <text x="200" y="228" fill="#EF4444" fontSize="10" fontWeight="bold" fontFamily="monospace">AI OFFSIDE VERDICT</text>
          </g>
        )}

        <rect x="0" y="270" width="500" height="30" fill="#000" />
        <g transform="translate(10, 270)">
          <circle cx="15" cy="15" r="7" fill="rgba(255,255,255,0.1)" />
          <polygon points="13,11 19,15 13,19" fill="white" />
          <line x1="35" y1="15" x2="400" y2="15" stroke="rgba(255,255,255,0.2)" strokeWidth="3" strokeLinecap="round" />
          <line x1="35" y1="15" x2={35 + (365 * playbackPercent / 100)} y2="15" stroke="#c2652a" strokeWidth="3" strokeLinecap="round" />
          <circle cx={35 + (365 * playbackPercent / 100)} cy="15" r="5" fill="#c2652a" stroke="white" strokeWidth="1" />
          <text x="415" y="18" fill="white" fontSize="8" fontFamily="monospace">FRAME {120 + Math.floor(playbackPercent*0.4)}/160 [0.25x]</text>
        </g>
      </svg>
    );
  };

  // CAM 04 - Aerial Drone W (Orthographic heatmap view)
  const renderCam4 = () => {
    const radarAngle = (tick * 0.015) % (2 * Math.PI);
    const radarX = 250 + Math.cos(radarAngle) * 160;
    const radarY = 150 + Math.sin(radarAngle) * 160;

    const hotspots = [
      { x: 180, y: 110, r: 25, val: 'HIGH', col: 'rgba(239, 68, 68, 0.4)' },
      { x: 320, y: 190, r: 35, val: 'CRITICAL', col: 'rgba(239, 68, 68, 0.5)' },
      { x: 150, y: 210, r: 20, val: 'MED', col: 'rgba(245, 158, 11, 0.3)' },
      { x: 340, y: 90, r: 18, val: 'LOW', col: 'rgba(16, 185, 129, 0.2)' }
    ];

    return (
      <svg viewBox="0 0 500 300" className="w-full h-full bg-[#0d1b15] select-none text-white rounded-3xl">
        <ellipse cx="250" cy="150" rx="200" ry="120" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
        <ellipse cx="250" cy="150" rx="170" ry="100" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <ellipse cx="250" cy="150" rx="140" ry="80" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <ellipse cx="250" cy="150" rx="100" ry="60" fill="none" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="2" />
        
        <rect x="180" y="110" width="140" height="80" rx="3" fill="rgba(16, 185, 129, 0.05)" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1" />
        <circle cx="250" cy="150" r="18" fill="none" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1" />

        {showCV && hotspots.map((h, idx) => (
          <g key={idx}>
            <circle cx={h.x} cy={h.y} r={h.r + Math.sin(tick * 0.04 + idx) * 3} fill={h.col} />
            <circle cx={h.x} cy={h.y} r="2" fill="white" opacity="0.8" />
            {showHUD && (
              <text x={h.x} y={h.y - 6} fill="white" fontSize="6" fontFamily="monospace" fontWeight="bold" textAnchor="middle" opacity="0.8">{h.val}</text>
            )}
          </g>
        ))}

        {showHUD && (
          <g>
            <line x1="250" y1="150" x2={radarX} y2={radarY} stroke="#c2652a" strokeWidth="1.5" opacity="0.8" />
            <path d={`M 250 150 L ${radarX} ${radarY} A 160 160 0 0 0 ${250 + Math.cos(radarAngle - 0.2) * 160} ${150 + Math.sin(radarAngle - 0.2) * 160} Z`} fill="rgba(194, 101, 42, 0.05)" />
            <circle cx="250" cy="150" r="160" fill="none" stroke="rgba(194, 101, 42, 0.2)" strokeWidth="1" />
            {Array.from({ length: 8 }).map((_, idx) => {
              const angle = (idx * Math.PI) / 4;
              return <line key={idx} x1={250 + Math.cos(angle) * 155} y1={150 + Math.sin(angle) * 155} x2={250 + Math.cos(angle) * 165} y2={150 + Math.sin(angle) * 165} stroke="rgba(194,101,42,0.4)" strokeWidth="1" />;
            })}
          </g>
        )}

        <line x1="0" y1={50 + (200 * (tick % 250) / 250)} x2="500" y2={50 + (200 * (tick % 250) / 250)} stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" opacity="0.6" />

        <g transform="translate(20, 30)">
          <rect x="0" y="0" width="130" height="70" rx="4" fill="rgba(0,0,0,0.75)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          <text x="8" y="14" fill="#c2652a" fontSize="7" fontFamily="monospace" fontWeight="bold">DRONE TELEMETRY GRID</text>
          <text x="8" y="26" fill="white" fontSize="6.5" fontFamily="monospace">ALTITUDE: {(85.4 + Math.sin(tick * 0.02) * 1.5).toFixed(1)} m</text>
          <text x="8" y="36" fill="white" fontSize="6.5" fontFamily="monospace">AIR_SPEED: 18.4 km/h</text>
          <text x="8" y="46" fill="white" fontSize="6.5" fontFamily="monospace">BATTERY: {Math.max(10, 82 - Math.floor(tick/1000))}%</text>
          <text x="8" y="56" fill="white" fontSize="6.5" fontFamily="monospace">SAT_LINK: LOCKED (8/8)</text>
          <circle cx="115" cy="46" r="3" fill="#10B981" className="animate-pulse" />
        </g>
        
        {showHUD && (
          <text x="480" y="280" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="end">
            COORDINATES: 40.7484° N, 74.0060° W // AZIMUTH: {(radarAngle * 180 / Math.PI).toFixed(0)}°
          </text>
        )}
      </svg>
    );
  };

  // CAM 05 - West Gate Crowds (Ingress Turnstile flow check)
  const renderCam5 = () => {
    const lanes = [70, 160, 250, 340, 430];
    
    const people = Array.from({ length: 8 }).map((_, idx) => {
      const seed = idx * 23;
      const laneIndex = (idx + Math.floor(tick / 150)) % 5;
      const speed = 1.5 + (seed % 3) * 0.4;
      const y = 280 - (((tick * speed + seed) % 240));
      const x = lanes[laneIndex] + Math.sin(tick * 0.03 + seed) * 4;
      
      const inScanner = y > 120 && y < 160;
      const passedScanner = y <= 120;
      
      return { x, y, inScanner, passedScanner };
    });

    return (
      <svg viewBox="0 0 500 300" className="w-full h-full bg-[#161a1d] select-none text-white rounded-3xl">
        <rect x="0" y="0" width="500" height="300" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <line x1="0" y1="130" x2="500" y2="130" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
        
        {lanes.map((l, idx) => (
          <g key={idx}>
            <rect x={l - 15} y="120" width="30" height="20" fill="#2d3748" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <circle cx={l} cy="115" r="2.5" fill={tick % 40 < 30 ? '#10B981' : '#EF4444'} />
            <text x={l} y="110" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle">GATE {idx+1}</text>
          </g>
        ))}

        {people.map((p, idx) => (
          <g key={idx}>
            <circle cx={p.x} cy={p.y} r="5.5" fill={p.passedScanner ? '#4A5568' : '#c2652a'} stroke="white" strokeWidth="1" />
            
            {showCV && p.inScanner && (
              <g>
                <rect x={p.x - 10} y={p.y - 12} width="20" height="24" rx="2" fill="none" stroke="#10B981" strokeWidth="1.5" />
                <text x={p.x} y={p.y - 16} fill="#10B981" fontSize="5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">SPECTATOR 98%</text>
                <text x={p.x} y={p.y + 18} fill="#10B981" fontSize="4.5" fontFamily="monospace" textAnchor="middle">VALID TICK</text>
              </g>
            )}

            {showCV && showHUD && !p.inScanner && p.y > 160 && (
              <g>
                <rect x={p.x - 8} y={p.y - 10} width="16" height="20" rx="1.5" fill="none" stroke="rgba(194, 101, 42, 0.4)" strokeWidth="0.8" />
                <text x={p.x} y={p.y - 12} fill="rgba(194,101,42,0.7)" fontSize="4.5" fontFamily="monospace" textAnchor="middle">TRACKING</text>
              </g>
            )}
          </g>
        ))}

        {showHUD && (
          <g transform="translate(15, 30)">
            <rect x="0" y="0" width="135" height="56" rx="4" fill="rgba(0,0,0,0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            <text x="8" y="12" fill="#c2652a" fontSize="7" fontFamily="monospace" fontWeight="bold">CV QUEUE DIAGNOSTICS</text>
            <text x="8" y="24" fill="white" fontSize="6.5" fontFamily="monospace">GATE FLOW: 48.2 spect/min</text>
            <text x="8" y="34" fill="white" fontSize="6.5" fontFamily="monospace">AVG WAIT TIME: 12 min</text>
            <text x="8" y="44" fill="white" fontSize="6.5" fontFamily="monospace">CONGESTION DETECTED: MED</text>
            <circle cx="120" cy="41" r="3" fill="#FBBF24" className="animate-pulse" />
          </g>
        )}

        <line x1="0" y1="130" x2="500" y2="130" stroke="#10B981" strokeWidth="1" strokeDasharray="3,6" opacity="0.5" />
      </svg>
    );
  };

  // CAM 06 - Press Room (Interview speaker equalizer and subtitles)
  const renderCam6 = () => {
    const subtitles = [
      "Journalist: Coach Martin, how did the dynamic tactical dashboard assist your decisions in the second half?",
      "Coach: Extremely helpful. Having real-time field data allowed us to adjust our defensive lines immediately.",
      "Journalist: The attendance shows 142M views worldwide. What is the impact?",
      "Coach: Stunning number. The players feel the global support, and the AI helps ensure a safe, efficient event."
    ];

    const subIndex = Math.floor(tick / 180) % subtitles.length;
    const rawSub = subtitles[subIndex];
    
    const charLimit = Math.floor((tick % 180) * 1.6);
    const activeSub = rawSub.slice(0, charLimit);

    const eqCount = 24;

    return (
      <svg viewBox="0 0 500 300" className="w-full h-full bg-[#1e2229] select-none text-white rounded-3xl">
        <g opacity="0.1">
          {Array.from({ length: 6 }).map((_, row) => 
            Array.from({ length: 6 }).map((_, col) => (
              <g key={`${row}-${col}`} transform={`translate(${col * 85 + 20}, ${row * 40 + 30})`}>
                <rect x="0" y="0" width="60" height="20" rx="3" fill="none" stroke="white" strokeWidth="1" />
                <text x="30" y="13" fill="white" fontSize="6" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">FIFA FLOW</text>
              </g>
            ))
          )}
        </g>

        <g transform="translate(150, 100)">
          <rect x="0" y="40" width="200" height="60" fill="#2d3748" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <rect x="20" y="50" width="160" height="35" rx="3" fill="#1a202c" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          <text x="100" y="72" fill="#c2652a" fontSize="11" fontFamily="sans-serif" textAnchor="middle" fontWeight="black" letterSpacing="1.5">FIFA PRESS CONFERENCE</text>
          
          <g stroke="#718096" strokeWidth="2.5" fill="none">
            <line x1="40" y1="40" x2="60" y2="20" />
            <line x1="160" y1="40" x2="140" y2="20" />
          </g>
          <circle cx="60" cy="20" r="3.5" fill="black" />
          <circle cx="140" cy="20" r="3.5" fill="black" />

          <path d="M 50 40 C 50 15, 90 15, 90 40 Z" fill="#4A5568" opacity="0.9" />
          <circle cx="70" cy="18" r="7" fill="#4A5568" opacity="0.9" />
          
          <path d="M 110 40 C 110 15, 150 15, 150 40 Z" fill="#c2652a" opacity="0.8" />
          <circle cx="130" cy="18" r="7" fill="#c2652a" opacity="0.8" />
          <text x="130" y="38" fill="white" fontSize="5" fontWeight="bold" textAnchor="middle">COACH</text>
        </g>

        <g transform="translate(100, 205)">
          {showHUD && Array.from({ length: eqCount }).map((_, idx) => {
            const activeChar = activeSub.length > 0 && activeSub.length < rawSub.length;
            const amplitude = activeChar ? (15 + Math.sin(tick * 0.15 + idx) * 12 + Math.random() * 8) : (2 + Math.random() * 4);
            return (
              <rect
                key={idx}
                x={idx * 12.5}
                y={40 - amplitude}
                width="6.5"
                height={amplitude}
                fill={idx % 2 === 0 ? '#c2652a' : '#f0a878'}
                rx="1.5"
              />
            );
          })}
          {showHUD && (
            <text x="-80" y="24" fill="#c2652a" fontSize="7" fontFamily="monospace" fontWeight="bold">SPEECH ANALYZER // MIC_01</text>
          )}
        </g>

        <g transform="translate(25, 225)">
          <rect x="0" y="0" width="450" height="50" rx="6" fill="rgba(0,0,0,0.85)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          
          <circle cx="20" cy="18" r="3.5" fill="#EF4444" className="animate-pulse" />
          <text x="32" y="21" fill="#EF4444" fontSize="7.5" fontWeight="bold" fontFamily="monospace">LIVE SUBTITLES</text>
          
          <text x="20" y="36" fill="white" fontSize="8" fontFamily="sans-serif" width="410">
            {activeSub}
          </text>
        </g>
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* AI OS Action Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/60 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase font-mono tracking-wider">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            AI OS &bull; {t.broadcastCenter}
          </div>
          <h1 className="font-display font-black text-3xl text-on-surface mt-1">
            {emergencyMode 
              ? "AI detected transmission failure risk. Switching to standby satellite path." 
              : t.broadcastCenter
            }
          </h1>
          <p className="text-secondary text-xs font-sans mt-0.5">
            {t.contextAwareIntelligence}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        
        {/* Left Column: Commentary & Feed Status (Span 3) */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          
          {/* Commentary Booth card */}
          <div className="bg-surface-container-low p-5 rounded-3xl border border-outline-variant/60 shadow-ultra-soft space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-display font-black text-lg text-on-surface flex items-center gap-2">
                <Radio className="text-primary" size={18} />
                <span>Commentary Booth</span>
              </h3>
              <span className="text-[9px] font-mono font-bold bg-primary/20 text-primary px-1.5 py-0.5 rounded uppercase">
                {activeCommentator === 'english' ? 'ENG Active' : 'SPA Active'}
              </span>
            </div>
            
            <div className="space-y-3 text-xs">
              {/* English Commentator */}
              <div 
                onClick={() => setActiveCommentator('english')}
                className={`flex items-center justify-between p-2.5 rounded-2xl border transition-all cursor-pointer ${
                  activeCommentator === 'english' 
                    ? 'bg-surface-container border-primary/40 shadow-sm' 
                    : 'border-transparent hover:bg-surface-container/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black transition-all ${
                    activeCommentator === 'english' ? 'bg-primary text-white shadow-glow' : 'bg-surface-container-high text-secondary'
                  }`}>
                    AM
                  </div>
                  <div>
                    <p className="text-[9px] text-secondary uppercase font-mono">Lead English</p>
                    <p className="font-bold text-on-surface">Alvaro Martin</p>
                  </div>
                </div>
                {activeCommentator === 'english' ? (
                  <div className="flex items-end gap-0.5 h-6 px-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span 
                        key={i} 
                        style={{ height: `${4 + Math.sin(tick * 0.2 + i) * 12 + Math.random() * 6}px` }} 
                        className="w-0.5 bg-primary rounded-full transition-all duration-75"
                      />
                    ))}
                  </div>
                ) : (
                  <button className="text-[9px] font-bold text-primary font-mono hover:underline uppercase px-2">
                    Listen
                  </button>
                )}
              </div>

              {/* Spanish Commentator */}
              <div 
                onClick={() => setActiveCommentator('spanish')}
                className={`flex items-center justify-between p-2.5 rounded-2xl border transition-all cursor-pointer ${
                  activeCommentator === 'spanish' 
                    ? 'bg-surface-container border-primary/40 shadow-sm' 
                    : 'border-transparent hover:bg-surface-container/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black transition-all ${
                    activeCommentator === 'spanish' ? 'bg-primary text-white shadow-glow' : 'bg-surface-container-high text-secondary'
                  }`}>
                    JP
                  </div>
                  <div>
                    <p className="text-[9px] text-secondary uppercase font-mono">Lead Spanish</p>
                    <p className="font-bold text-on-surface">Sorín Sorín</p>
                  </div>
                </div>
                {activeCommentator === 'spanish' ? (
                  <div className="flex items-end gap-0.5 h-6 px-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span 
                        key={i} 
                        style={{ height: `${4 + Math.sin(tick * 0.2 + i) * 12 + Math.random() * 6}px` }} 
                        className="w-0.5 bg-primary rounded-full transition-all duration-75"
                      />
                    ))}
                  </div>
                ) : (
                  <button className="text-[9px] font-bold text-primary font-mono hover:underline uppercase px-2">
                    Listen
                  </button>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-outline-variant/40 space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-secondary uppercase">AUDIO CHANNELS</span>
                <span className="bg-primary/20 text-primary px-2 py-0.5 rounded font-bold">12 ACTIVE</span>
              </div>
              <p className="text-[10px] text-secondary italic leading-relaxed">
                English, Spanish, Portuguese, French, Arabic, Hindi, Mandarin, German...
              </p>
            </div>
          </div>

          <div className="bg-surface-container-low p-5 rounded-3xl border border-outline-variant/60 shadow-ultra-soft space-y-3">
            <h3 className="font-display font-black text-lg text-on-surface">Match Milestones</h3>
            <div className="space-y-3.5 text-xs">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-surface-container-high flex items-center justify-center text-secondary font-mono text-[9px] font-bold">
                  ✓
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-secondary font-mono">Completed</p>
                  <p className="font-bold text-on-surface">Pre-Match Setup</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white text-[9px] font-bold animate-pulse">
                  78'
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-primary font-mono font-bold">LIVE NOW</p>
                  <p className="font-bold text-on-surface">Second Half Action</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Center: Live Hero Video & Camera Grid (Span 6) */}
        <div className="col-span-12 lg:col-span-6 space-y-6">
          
          {/* Main stream box */}
          <div className="relative rounded-3xl overflow-hidden aspect-video border border-outline-variant/60 shadow-ultra-soft bg-black flex flex-col justify-end">
            
            {/* Interactive simulated viewports */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
              {selectedCamIndex === 0 && renderCam1()}
              {selectedCamIndex === 1 && renderCam2()}
              {selectedCamIndex === 2 && renderCam3()}
              {selectedCamIndex === 3 && renderCam4()}
              {selectedCamIndex === 4 && renderCam5()}
              {selectedCamIndex === 5 && renderCam6()}
            </div>

            {/* Emergency static/glitch overlay if emergencyMode is on */}
            {emergencyMode && (
              <div className="absolute inset-0 bg-red-950/10 pointer-events-none mix-blend-overlay border border-red-500 animate-soft-pulse z-10">
                <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]" />
              </div>
            )}

            {/* Top Info HUD overlay indicators */}
            <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none z-10">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white text-[9px] font-mono font-bold">
                <span className={`h-1.5 w-1.5 rounded-full ${emergencyMode ? 'bg-red-500' : 'bg-error'} animate-pulse`} />
                <span>
                  {emergencyMode 
                    ? 'EMERGENCY PROTOCOL LINK' 
                    : `LIVE BROADCAST FEED - CAM 0${selectedCamIndex + 1}`
                  }
                </span>
                <span>&bull;</span>
                <span>78' min</span>
              </div>

              <div className="flex items-center gap-2 pointer-events-auto">
                <div className="flex bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 text-white gap-1 text-[8px] font-mono font-bold">
                  <button 
                    onClick={() => setShowHUD(!showHUD)} 
                    className={`px-1.5 py-1 rounded-full cursor-pointer hover:bg-white/10 ${showHUD ? 'text-primary' : 'text-white/60'}`}
                    title="Toggle Tactical HUD"
                  >
                    HUD
                  </button>
                  <button 
                    onClick={() => setShowCV(!showCV)} 
                    className={`px-1.5 py-1 rounded-full cursor-pointer hover:bg-white/10 ${showCV ? 'text-primary' : 'text-white/60'}`}
                    title="Toggle AI CV Boxes"
                  >
                    CV
                  </button>
                  <button 
                    onClick={() => setShowTelemetry(!showTelemetry)} 
                    className={`px-1.5 py-1 rounded-full cursor-pointer hover:bg-white/10 ${showTelemetry ? 'text-primary' : 'text-white/60'}`}
                    title="Toggle Network Telemetry"
                  >
                    NET
                  </button>
                </div>

                <div className="bg-emerald-600/90 backdrop-blur px-3 py-1.5 rounded-full text-white text-[9px] font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 size={10} />
                  <span>STABLE FEED</span>
                </div>
              </div>
            </div>

            {/* Network Stream Stats panel */}
            {showTelemetry && (
              <div className="absolute top-14 right-4 bg-black/85 border border-white/15 rounded-xl p-3 w-48 text-[9px] font-mono text-white/80 z-20 space-y-1.5 shadow-lg">
                <div className="text-primary font-bold border-b border-white/10 pb-1">NETWORK FEED ANALYTICS</div>
                <div className="flex justify-between">
                  <span>Stream Quality:</span>
                  <span className="text-emerald-500 font-bold">UHD (4K)</span>
                </div>
                <div className="flex justify-between">
                  <span>FPS:</span>
                  <span className="text-white">{(60 + Math.sin(tick * 0.1) * 0.5).toFixed(1)} fps</span>
                </div>
                <div className="flex justify-between">
                  <span>Bitrate:</span>
                  <span className="text-white">{(12.4 + Math.sin(tick * 0.05) * 0.3).toFixed(2)} Mbps</span>
                </div>
                <div className="flex justify-between">
                  <span>Packet Loss:</span>
                  <span className="text-emerald-400">0.000%</span>
                </div>
                <div className="flex justify-between">
                  <span>Latency:</span>
                  <span className="text-white">{(8 + Math.sin(tick * 0.1) * 0.8).toFixed(1)} ms</span>
                </div>
              </div>
            )}

            {/* Bottom info Overlay & Simulation Playback control bar */}
            <div className="relative z-10 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent w-full flex justify-between items-end">
              <div className="space-y-0.5 text-left">
                <h2 className="font-display font-black text-xl text-white">
                  {selectedCamIndex === 5 ? 'Press Room Post-Match Conference' : 'United States vs England'}
                </h2>
                <div className="flex items-center gap-3 text-white/80 font-mono text-[9px]">
                  <span>MetLife Stadium, NJ</span>
                  <span>&bull;</span>
                  <span>142M Live Stream views</span>
                  <span>&bull;</span>
                  <span className="text-primary font-bold">
                    {['Tactical Main Pitch', 'South Goal-Line', 'AI VAR Center', 'Drone Aerial W', 'West Gate Crowd', 'Press Interview'][selectedCamIndex]}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)} 
                  className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 cursor-pointer border border-white/10 flex items-center justify-center transition-all z-20"
                  title={isPlaying ? 'Pause Simulation' : 'Play Simulation'}
                >
                  {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                </button>
              </div>
            </div>
          </div>

          {/* Grid of secondary cameras */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            
            {[
              { id: 'CAM 01', name: 'Main Pitch Side', format: 'UHD · 60fps • 12ms', status: 'Stable' },
              { id: 'CAM 02', name: 'Goal Line South', format: 'UHD · 60fps • 8ms', status: 'Stable' },
              { id: 'CAM 03', name: 'VAR Center Feed', format: 'UHD · 60fps • 5ms', status: 'Stable' },
              { id: 'CAM 04', name: 'Aerial Drone W', format: 'HD • 60fps • 42ms', status: 'Stable' },
              { id: 'CAM 05', name: 'West Gate Crowds', format: 'HD • 30fps • 18ms', status: 'Stable' },
              { id: 'CAM 06', name: 'Press Room', format: 'UHD • 30fps • 15ms', status: 'Stable' }
            ].map((cam, idx) => {
              const isSelected = selectedCamIndex === idx;
              return (
                <div 
                  key={idx} 
                  onClick={() => setSelectedCamIndex(idx)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer shadow-ultra-soft flex flex-col justify-between min-h-[95px] ${
                    isSelected 
                      ? 'bg-surface-container-high border-primary ring-2 ring-primary/20 shadow-md scale-[1.02]' 
                      : 'bg-surface-container-lowest border-outline-variant/60 hover:border-primary/50'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center text-[9px] font-mono font-bold text-primary mb-1">
                      <span>{cam.id}</span>
                      <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-error animate-pulse' : 'bg-emerald-500'}`} />
                    </div>
                    <h4 className="font-bold text-xs text-on-surface text-left">{cam.name}</h4>
                  </div>
                  <div className="text-[9px] text-secondary font-mono leading-none mt-2 text-left">
                    {cam.format}
                  </div>
                </div>
              );
            })}

          </div>
        </div>

        {/* Right Details Panel: Satellite link (Span 3) */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          
          <div className="glass-panel rounded-3xl p-5 border-l-4 border-primary space-y-4 shadow-ultra-soft">
            <h3 className="font-display font-black text-lg text-on-surface flex items-center gap-2">
              <Satellite className="text-primary" size={18} />
              <span>Satellite Links</span>
            </h3>
            
            <div className="space-y-3.5 text-xs font-sans">
              
              <div className="bg-surface-container p-3 rounded-2xl border border-outline-variant/40 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-secondary text-[10px] uppercase font-mono block">Uplink Satellite</span>
                    <span className="font-extrabold text-on-surface flex items-center gap-1.5 mt-0.5">
                      <Satellite size={12} className="text-primary animate-bounce-slow" />
                      <span>FLOW-Sat 1 (Active)</span>
                    </span>
                  </div>
                  <span className="text-[8px] font-mono font-bold bg-emerald-500/20 text-emerald-600 px-1.5 py-0.5 rounded">
                    99.4% SIGNAL
                  </span>
                </div>
                <div className="text-secondary text-[9px] flex justify-between font-mono">
                  <span>Freq: 18.42 GHz (Ka-Band)</span>
                  <span>Drift: +0.2 mHz</span>
                </div>

                {/* Animated signal line chart */}
                <div className="pt-1.5 border-t border-outline-variant/30 space-y-1">
                  <div className="flex justify-between text-[8px] font-mono text-secondary">
                    <span>Ping latency (ms)</span>
                    <span className="font-bold text-on-surface">{(18 + Math.sin(tick * 0.05) * 2 + Math.random() * 1).toFixed(0)} ms</span>
                  </div>
                  <svg className="w-full h-8 bg-black/10 rounded overflow-hidden" viewBox="0 0 200 30">
                    <line x1="0" y1="10" x2="200" y2="10" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
                    <line x1="0" y1="20" x2="200" y2="20" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
                    
                    <path
                      d={`M ${Array.from({ length: 21 }).map((_, i) => {
                        const x = i * 10;
                        const seed = tick * 0.05 + i;
                        const y = 15 + Math.sin(seed) * 6 + Math.cos(seed * 0.5) * 3;
                        return `${x} ${y}`;
                      }).join(' L ')}`}
                      fill="none"
                      stroke="var(--color-primary)"
                      strokeWidth="1.5"
                    />
                    <circle cx="200" cy={15 + Math.sin(tick * 0.05 + 20) * 6 + Math.cos((tick * 0.05 + 20) * 0.5) * 3} r="2.5" fill="var(--color-primary)" className="animate-ping" />
                    <circle cx="200" cy={15 + Math.sin(tick * 0.05 + 20) * 6 + Math.cos((tick * 0.05 + 20) * 0.5) * 3} r="2" fill="var(--color-primary)" />
                  </svg>
                </div>
              </div>

              <div className="bg-surface-container p-3 rounded-2xl border border-outline-variant/40 space-y-1">
                <span className="text-secondary text-[10px] uppercase font-mono block">Terrestrial Fiber</span>
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-emerald-600 flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Primary Link Stable
                  </span>
                  <span className="font-mono text-[9px] text-secondary">10 Gbps</span>
                </div>
                <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden mt-1">
                  <div 
                    style={{ width: `${60 + Math.sin(tick * 0.02) * 8}%` }} 
                    className="h-full bg-emerald-500 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="bg-surface-container/60 p-3 rounded-2xl space-y-2">
                <span className="text-secondary text-[9px] font-mono uppercase block">Active Regional Feeds</span>
                <div className="space-y-1.5 text-[10px]">
                  {[
                    { name: 'Pan-America (EBU)', quality: '1080p60 • SRT' },
                    { name: 'Asia-Pacific (Dentsu)', quality: 'UHD4k60 • RTMP' },
                    { name: 'Mena Regional (beIN)', quality: '1080p60 • SRT' }
                  ].map((feed, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-outline-variant/10 pb-1 last:border-0 last:pb-0">
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-bold text-on-surface">{feed.name}</span>
                      </div>
                      <span className="text-emerald-600 font-mono text-[8px]">
                        {feed.quality}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
