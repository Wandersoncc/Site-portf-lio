export function OrnamentDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-center ${className}`} aria-hidden="true">
      <svg width="220" height="20" viewBox="0 0 220 20" className="text-gold/80">
        <g fill="none" stroke="currentColor" strokeWidth="1.2">
          <line x1="20" y1="10" x2="92" y2="10" />
          <line x1="128" y1="10" x2="200" y2="10" />
          <circle cx="104" cy="10" r="4" />
          <circle cx="110" cy="10" r="6" />
          <circle cx="116" cy="10" r="4" />
        </g>
        <circle cx="92" cy="10" r="1.6" fill="currentColor" />
        <circle cx="128" cy="10" r="1.6" fill="currentColor" />
      </svg>
    </div>
  );
}
