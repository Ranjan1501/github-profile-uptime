import React from 'react';
import TabNavigation from './TabNavigation';
import PopularRepos from './PopularRepos';
import ContributionGraph from './ContributionGraph';
import ActivityFeed from './ActivityFeed';
import './MainContent.css';

const MainContent = ({ user, repos, events }) => {
  return (
    <div className="main-content">
      <TabNavigation />
      <div className="content-sections">
        <PopularRepos repos={repos} />
        <ContributionGraph username={user?.login} />
        <ActivityFeed events={events} />
      </div>
    </div>
  );
};

export default MainContent;