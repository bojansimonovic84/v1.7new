import React from 'react';

const Logo = ({ className = '' }: { className?: string }) => (
  <div className={`flex items-center gap-4 ${className} group cursor-pointer`}>
    {/* Monogram Cluster */}
    <div className="relative flex items-center justify-center shrink-0">
        <div className="absolute inset-0 bg-amber-500/25 blur-2xl rounded-full group-hover:bg-amber-500/45 transition-all duration-700 animate-pulse"></div>
        
        <div className="relative transform transition-transform duration-500 group-hover:scale-110">
          <svg 
            viewBox="0 0 100 100" 
            className="h-10 w-10 md:h-12 md:w-12 relative drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="goldMonogramFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF3C7" />
                <stop offset="35%" stopColor="#F59E0B" />
                <stop offset="65%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
              <filter id="goldGlow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {/* Outer Ring - ANIMATED ROTATION */}
            <circle 
              cx="50" 
              cy="50" 
              r="46" 
              stroke="url(#goldMonogramFill)" 
              strokeWidth="4" 
              className="opacity-80 animate-[spin_10s_linear_infinite]" 
              strokeDasharray="10 10"
            />
            
            {/* FC Monogram - PULSING */}
            <g filter="url(#goldGlow)" className="animate-[pulse_3s_ease-in-out_infinite]">
              {/* F */}
              <path 
                d="M30 35V65M30 35H45M30 50H42" 
                stroke="url(#goldMonogramFill)" 
                strokeWidth="8" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              {/* C */}
              <path 
                d="M70 40C65 35 55 35 52 50C52 65 65 65 70 60" 
                stroke="url(#goldMonogramFill)" 
                strokeWidth="8" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </g>
          </svg>
        </div>
    </div>

    {/* Brand Text - SHIMMER ANIMATION */}
    <div className="whitespace-nowrap overflow-hidden relative">
        <span className="font-black text-xl md:text-2xl tracking-[0.3em] uppercase select-none leading-none inline-block drop-shadow-[0_0_10px_rgba(0,0,0,0.5)] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-600 bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
          THE FREQUENCY CODE™
        </span>
    </div>

    <style>{`
      @keyframes shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
    `}</style>
  </div>
);

export default Logo;