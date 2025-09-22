import { ReactNode } from "react";

interface TouchOptimizedProps {
  children: ReactNode;
  onTap?: () => void;
  className?: string;
  disabled?: boolean;
}

const TouchOptimized = ({ children, onTap, className = "", disabled = false }: TouchOptimizedProps) => {
  return (
    <div
      className={`
        touch-manipulation
        select-none
        ${onTap && !disabled ? 'cursor-pointer active:scale-95 transition-transform' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      onClick={disabled ? undefined : onTap}
      role={onTap ? "button" : undefined}
      tabIndex={onTap && !disabled ? 0 : undefined}
      onKeyDown={(e) => {
        if (onTap && !disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onTap();
        }
      }}
    >
      {children}
    </div>
  );
};

export default TouchOptimized;