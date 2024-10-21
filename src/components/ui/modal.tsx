import React, { useEffect } from 'react';
import useBreakpoint from '../../hooks/use-break-point';

interface ResponsiveModalDrawerProps {
  isOpen: boolean;
  hideCloseBtn?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  backdropCollapsible?: boolean;
}

const ResponsiveModalDrawer: React.FC<ResponsiveModalDrawerProps> = ({
  isOpen,
  onClose,
  hideCloseBtn,
  backdropCollapsible,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const isMdScreen = useBreakpoint('md');

  if (!isOpen) return null;

  const renderModal = () => {
    if (!isMdScreen) return null;
    return (
      <div
        role="button"
        onKeyDown={(e) => e.stopPropagation()}
        tabIndex={0}
        aria-label="Close modal modal"
        onClick={(e) => e.stopPropagation()}
        className={`hidden md:block bg-white rounded-lg shadow-lg w-1/3 max-w-lg p-6 z-50 transition-transform duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        {/* Modal content */}
        <div>{children}</div>
        {!hideCloseBtn && (
          <button onClick={onClose} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
            Close
          </button>
        )}
      </div>
    );
  };

  const renderDrawer = () => {
    if (isMdScreen) return null;
    return (
      <div
        role="button"
        onKeyDown={(e) => e.stopPropagation()}
        tabIndex={0}
        aria-label="Close modal drawer"
        onClick={(e) => e.stopPropagation()}
        className={`md:hidden fixed bottom-0 inset-x-0 bg-white rounded-t-lg p-6 shadow-lg z-50 transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        {/* Drawer content */}
        <div>{children}</div>
        {!hideCloseBtn && (
          <button onClick={onClose} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
            Close
          </button>
        )}
      </div>
    );
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Close modal"
      className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      onClick={() => {
        if (backdropCollapsible) return onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClose();
        }
      }}
    >
      {/* Modal on large screens, Drawer on small screens */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {renderModal()}
        {renderDrawer()}
      </div>
    </div>
  );
};

export default ResponsiveModalDrawer;
