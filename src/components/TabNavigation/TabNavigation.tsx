import React, { useState } from 'react';
import { TabContainer, TabButton } from './TabNavigation.styles';
import { useI18n } from '../../i18n';

interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs?: Tab[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ 
  tabs,
  defaultTab = 'posts',
  onTabChange
}) => {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  const defaultTabs = tabs || [
    { id: 'posts', label: t('tabNavigation.tabs.posts') },
    { id: 'prayer-request', label: t('tabNavigation.tabs.prayerRequest') }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <TabContainer>
      {defaultTabs.map((tab) => (
        <TabButton
          key={tab.id}
          $isActive={activeTab === tab.id}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.label}
        </TabButton>
      ))}
    </TabContainer>
  );
};

export default TabNavigation;
