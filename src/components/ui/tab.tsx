import React, { useState, ReactNode, useEffect, useRef } from 'react';

interface Tab {
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  contentClass?: string;
  labelWrapperClass?: string;
  mainWrapperClass?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, contentClass, labelWrapperClass, mainWrapperClass }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyboardNavigation = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      setActiveTab((prevTab) => (prevTab + 1) % tabs.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      setActiveTab((prevTab) => (prevTab - 1 + tabs.length) % tabs.length);
    } else if (e.key === 'Enter') {
      tabRefs.current[activeTab]?.click();
    }
  };

  useEffect(() => {
    tabRefs.current[activeTab]?.focus();
  }, [activeTab]);

  // Animation control - set a small delay between switching content
  useEffect(() => {
    setIsAnimating(true);
    const timeout = setTimeout(() => {
      setIsAnimating(false);
    }, 300); // Adjust time for animation duration
    return () => clearTimeout(timeout);
  }, [activeTab]);

  return (
    <div
      role="button"
      className={`flex flex-col md:flex-row md:space-x-4 ${mainWrapperClass}`}
      onKeyDown={handleKeyboardNavigation}
      tabIndex={0}
    >
      {/* Tab Labels */}
      <div
        className={`flex md:flex-col md:w-1/4 mb-4 md:mb-0 border-b md:border-b-0 md:border-r border-gray-300 ${labelWrapperClass}`}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            ref={(el) => (tabRefs.current[index] = el)}
            className={`w-full md:w-auto py-2 px-4 text-left md:text-center focus:outline-none 
              ${activeTab === index ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}
              hover:bg-blue-400 hover:text-white transition-all`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content with Fade Animation */}
      <div
        className={`md:flex-1 p-4 border md:border-l border-gray-300 
          transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'} ${contentClass}`}
      >
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};

export default Tabs;
