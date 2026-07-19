import React from 'react';

interface FlagBadgeProps {
  className?: string;
}

export const USABadge: React.FC<FlagBadgeProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 100 100" className={`${className} rounded-full shadow-sm border border-outline-variant/40 bg-white shrink-0 inline-block align-middle`}>
    <mask id="circle-mask-usa-badge">
      <circle cx="50" cy="50" r="50" fill="white" />
    </mask>
    <g mask="url(#circle-mask-usa-badge)">
      {[...Array(13)].map((_, i) => (
        <rect key={i} x="0" y={i * 7.7} width="100" height="4.2" fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"} />
      ))}
      <rect x="0" y="0" width="45" height="40" fill="#3C3B6E" />
      <polygon points="22.5,8 25,16 33,16 26.5,21 29,29 22.5,24 16,29 18.5,21 12,16 20,16" fill="#FFFFFF" />
    </g>
  </svg>
);

export const ENGBadge: React.FC<FlagBadgeProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 100 100" className={`${className} rounded-full shadow-sm border border-outline-variant/40 bg-white shrink-0 inline-block align-middle`}>
    <mask id="circle-mask-eng-badge">
      <circle cx="50" cy="50" r="50" fill="white" />
    </mask>
    <g mask="url(#circle-mask-eng-badge)">
      <rect width="100" height="100" fill="#FFFFFF" />
      <rect x="41" y="0" width="18" height="100" fill="#CE1126" />
      <rect x="0" y="41" width="100" height="18" fill="#CE1126" />
    </g>
  </svg>
);

export const CANBadge: React.FC<FlagBadgeProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 100 100" className={`${className} rounded-full shadow-sm border border-outline-variant/40 bg-white shrink-0 inline-block align-middle`}>
    <mask id="circle-mask-can-badge">
      <circle cx="50" cy="50" r="50" fill="white" />
    </mask>
    <g mask="url(#circle-mask-can-badge)">
      <rect width="100" height="100" fill="#CE1126" />
      <rect x="25" y="0" width="50" height="100" fill="#FFFFFF" />
      {/* Simplified Maple Leaf */}
      <path d="M 50 25 L 53 38 L 62 33 L 58 45 L 68 45 L 58 53 L 62 65 L 50 58 L 38 65 L 42 53 L 32 45 L 42 45 L 38 33 L 47 38 Z" fill="#CE1126" />
      <rect x="48" y="58" width="4" height="18" fill="#CE1126" />
    </g>
  </svg>
);

export const MEXBadge: React.FC<FlagBadgeProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 100 100" className={`${className} rounded-full shadow-sm border border-outline-variant/40 bg-white shrink-0 inline-block align-middle`}>
    <mask id="circle-mask-mex-badge">
      <circle cx="50" cy="50" r="50" fill="white" />
    </mask>
    <g mask="url(#circle-mask-mex-badge)">
      <rect x="0" y="0" width="33.3" height="100" fill="#006847" />
      <rect x="33.3" y="0" width="33.4" height="100" fill="#FFFFFF" />
      <rect x="66.7" y="0" width="33.3" height="100" fill="#C8102E" />
      <circle cx="50" cy="50" r="6" fill="#8B5A2B" className="opacity-80" />
    </g>
  </svg>
);

interface FlagBadgeSelectorProps {
  country: string;
  className?: string;
}

export const FlagBadge: React.FC<FlagBadgeSelectorProps> = ({ country, className }) => {
  const norm = country.toLowerCase();
  if (norm.includes('usa') || norm.includes('united states') || norm.includes('us')) {
    return <USABadge className={className} />;
  }
  if (norm.includes('eng') || norm.includes('england')) {
    return <ENGBadge className={className} />;
  }
  if (norm.includes('can') || norm.includes('canada')) {
    return <CANBadge className={className} />;
  }
  if (norm.includes('mex') || norm.includes('mexico')) {
    return <MEXBadge className={className} />;
  }
  return null;
};
