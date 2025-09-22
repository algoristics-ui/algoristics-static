import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface BreakpointContextType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
}

const BreakpointContext = createContext<BreakpointContextType>({
  isMobile: false,
  isTablet: false,
  isDesktop: false,
  width: 0
});

export const useBreakpoint = () => {
  const context = useContext(BreakpointContext);
  if (!context) {
    throw new Error('useBreakpoint must be used within a BreakpointProvider');
  }
  return context;
};

interface BreakpointProviderProps {
  children: ReactNode;
}

export const BreakpointProvider = ({ children }: BreakpointProviderProps) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  return (
    <BreakpointContext.Provider value={{ isMobile, isTablet, isDesktop, width }}>
      {children}
    </BreakpointContext.Provider>
  );
};