import { ReactNode } from "react";

interface ResponsiveGridProps {
  children: ReactNode;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  className?: string;
}

const ResponsiveGrid = ({ 
  children, 
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = { mobile: 3, tablet: 4, desktop: 6 },
  className = ""
}: ResponsiveGridProps) => {
  const mobileClasses = `grid-cols-${cols.mobile || 1}`;
  const tabletClasses = `md:grid-cols-${cols.tablet || 2}`;
  const desktopClasses = `lg:grid-cols-${cols.desktop || 3}`;
  
  const mobileGap = `gap-${gap.mobile || 3}`;
  const tabletGap = `md:gap-${gap.tablet || 4}`;
  const desktopGap = `lg:gap-${gap.desktop || 6}`;

  return (
    <div 
      className={`
        grid 
        ${mobileClasses} 
        ${tabletClasses} 
        ${desktopClasses}
        ${mobileGap}
        ${tabletGap}
        ${desktopGap}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default ResponsiveGrid;