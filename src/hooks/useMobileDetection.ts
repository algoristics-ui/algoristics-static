import { useState, useEffect } from 'react';

export function useMobileDetection(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

export function useSmartSidebarDefault(): boolean {
  const [shouldOpenByDefault, setShouldOpenByDefault] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      // Open by default on desktop (768px and above), closed on mobile
      setShouldOpenByDefault(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return shouldOpenByDefault;
}