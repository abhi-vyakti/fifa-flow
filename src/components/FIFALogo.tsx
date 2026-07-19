import React from 'react';

interface FIFALogoProps {
  className?: string;
  size?: number;
}

export const FIFALogo: React.FC<FIFALogoProps> = ({ className = 'w-8 h-8', size }) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <img 
      src="/favicon.svg" 
      alt="FIFA FLOW Trophy Logo" 
      className={`object-contain ${className}`}
      style={style}
    />
  );
};
