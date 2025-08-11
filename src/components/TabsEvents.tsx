import React, { useState, type ReactNode } from 'react';

type TabItem = {
  label: string;
  content: ReactNode;
};

interface TabsProps {
  tabs: TabItem[];
}

export const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="pb-3">
      <div className="flex border-b border-[#e5e0d1] px-4 gap-8">
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                isActive
                  ? "border-b-primary text-[#1a170f]"
                  : "border-b-transparent text-[#938353]"
              }`}
            >
              <p
                className={`text-sm font-bold leading-normal tracking-[0.015em] ${
                  isActive ? "text-[#1a170f]" : "text-[#938353]"
                }`}
              >
                {tab.label}
              </p>
            </button>
          );
        })}
      </div>

      <div className="pt-8">{tabs[activeIndex].content}</div>
    </div>
  );
};
