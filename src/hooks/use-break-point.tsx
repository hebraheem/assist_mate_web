import { useState, useEffect } from 'react';

// Tailwind's `md` breakpoint corresponds to a minimum width of 768px
const useBreakpoint = (breakpoint: string) => {
  const [isBreakpoint, setIsBreakpoint] = useState(false);

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      switch (breakpoint) {
        case 'sm':
          setIsBreakpoint(width >= 640);
          break;
        case 'md':
          setIsBreakpoint(width >= 768);
          break;
        case 'lg':
          setIsBreakpoint(width >= 1024);
          break;
        case 'xl':
          setIsBreakpoint(width >= 1280);
          break;
        case '2xl':
          setIsBreakpoint(width >= 1536);
          break;
        default:
          setIsBreakpoint(false);
      }
    };

    checkBreakpoint(); // Initial check
    window.addEventListener('resize', checkBreakpoint); // Listen for resize events

    return () => {
      window.removeEventListener('resize', checkBreakpoint); // Cleanup on unmount
    };
  }, [breakpoint]);

  return isBreakpoint;
};

export default useBreakpoint;
