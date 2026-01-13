import React, { useState } from 'react';
import './TabNavigation.css';

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'repositories', label: 'Repositories', count: 31 },
    { id: 'projects', label: 'Projects', count: 0 },
    { id: 'packages', label: 'Packages', count: 0 },
    { id: 'stars', label: 'Stars', count: 0 }
  ];

  return (
    <nav className="tab-navigation">
      <div className="tab-list">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon && <span className="tab-icon">{tab.icon}</span>}
            <span className="tab-label">{tab.label}</span>
            {tab.count !== undefined && (
              <span className="tab-count">{tab.count}</span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default TabNavigation;