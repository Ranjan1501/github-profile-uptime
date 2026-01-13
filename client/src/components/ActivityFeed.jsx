import React from 'react';
import './ActivityFeed.css';

const ActivityFeed = ({ events }) => {
  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'PushEvent':
        return (
          <svg className="event-icon" viewBox="0 0 16 16" width="16" height="16">
            <path d="M1.75 16A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 0 0 .25-.25V8.285a.25.25 0 0 0-.111-.208l-1.055-.703a.749.749 0 1 1 .832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0 1 14.25 16h-12.5Zm9.75-5.85a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5h-.5Z"></path>
          </svg>
        );
      case 'CreateEvent':
        return (
          <svg className="event-icon" viewBox="0 0 16 16" width="16" height="16">
            <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 0 1 1-1h8zM5 12.25v3.25a.25.25 0 0 0 .4.2l1.45-1.087a.25.25 0 0 1 .3 0L8.6 15.7a.25.25 0 0 0 .4-.2v-3.25a.25.25 0 0 0-.25-.25h-3.5a.25.25 0 0 0-.25.25z"></path>
          </svg>
        );
      case 'IssuesEvent':
        return (
          <svg className="event-icon" viewBox="0 0 16 16" width="16" height="16">
            <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path>
          </svg>
        );
      case 'PullRequestEvent':
        return (
          <svg className="event-icon" viewBox="0 0 16 16" width="16" height="16">
            <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"></path>
          </svg>
        );
      default:
        return (
          <svg className="event-icon" viewBox="0 0 16 16" width="16" height="16">
            <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"></path>
          </svg>
        );
    }
  };

  const getEventDescription = (event) => {
    switch (event.type) {
      case 'PushEvent':
        const commits = event.payload?.commits?.length || 1;
        return `Pushed ${commits} commit${commits > 1 ? 's' : ''} to ${event.repo.name}`;
      case 'CreateEvent':
        return `Created ${event.payload.ref_type} ${event.payload.ref || ''} in ${event.repo.name}`;
      case 'IssuesEvent':
        return `${event.payload.action} issue in ${event.repo.name}`;
      case 'PullRequestEvent':
        return `${event.payload.action} pull request in ${event.repo.name}`;
      case 'WatchEvent':
        return `Starred ${event.repo.name}`;
      case 'ForkEvent':
        return `Forked ${event.repo.name}`;
      default:
        return `Activity in ${event.repo.name}`;
    }
  };

  if (!events || events.length === 0) {
    return (
      <div className="activity-feed">
        <div className="activity-header">
          <h3>Contribution activity</h3>
          <select className="period-select">
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
        </div>
        <div className="no-activity">No recent activity</div>
      </div>
    );
  }

  // Group events by month
  const groupedEvents = events.reduce((groups, event) => {
    const date = new Date(event.created_at);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
    if (!groups[monthKey]) {
      groups[monthKey] = {
        month: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        events: []
      };
    }
    groups[monthKey].events.push(event);
    return groups;
  }, {});

  return (
    <div className="activity-feed">
      <div className="activity-header">
        <h3>Contribution activity</h3>
        <select className="period-select">
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
        </select>
      </div>

      <div className="activity-timeline">
        {Object.values(groupedEvents).map((group, groupIndex) => (
          <div key={groupIndex} className="activity-month">
            <h4 className="month-header">{group.month}</h4>
            <div className="month-summary">
              Created {group.events.filter(e => e.type === 'CreateEvent').length} repositories and made {group.events.filter(e => e.type === 'PushEvent').length} commits in {new Set(group.events.map(e => e.repo.name)).size} repositories
            </div>
            
            <div className="activity-list">
              {group.events.slice(0, 5).map((event, eventIndex) => (
                <div key={eventIndex} className="activity-item">
                  <div className="activity-icon">
                    {getEventIcon(event.type)}
                  </div>
                  <div className="activity-content">
                    <div className="activity-description">
                      {getEventDescription(event)}
                    </div>
                    <div className="activity-time">
                      {formatEventDate(event.created_at)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {group.events.length > 5 && (
              <button className="show-more-btn">
                Show more activity
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;