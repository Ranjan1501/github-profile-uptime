import React, { useState, useEffect } from 'react';
import './ContributionGraph.css';

const ContributionGraph = ({ username }) => {
  const [contributionData, setContributionData] = useState([]);
  const [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    generateMockContributionData();
  }, [username]);

  const generateMockContributionData = () => {
    const data = [];
    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    
    let total = 0;
    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const contributions = Math.floor(Math.random() * 10);
      total += contributions;
      data.push({
        date: new Date(d),
        count: contributions
      });
    }
    
    setContributionData(data);
    setTotalContributions(total);
  };

  const getContributionLevel = (count) => {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 4) return 2;
    if (count <= 6) return 3;
    return 4;
  };

  const getMonthLabel = (date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[date.getMonth()];
  };

  const getDayOfWeek = (date) => {
    return date.getDay();
  };

  const groupByWeeks = (data) => {
    const weeks = [];
    let currentWeek = [];
    
    data.forEach((day, index) => {
      if (index === 0) {
        // Fill empty days at the beginning of the first week
        for (let i = 0; i < getDayOfWeek(day.date); i++) {
          currentWeek.push(null);
        }
      }
      
      currentWeek.push(day);
      
      if (getDayOfWeek(day.date) === 6 || index === data.length - 1) {
        // End of week (Saturday) or last day
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    });
    
    return weeks;
  };

  const weeks = groupByWeeks(contributionData);
  const monthLabels = [];
  
  // Generate month labels
  if (contributionData.length > 0) {
    let currentMonth = -1;
    contributionData.forEach((day, index) => {
      if (day.date.getMonth() !== currentMonth && index % 7 === 0) {
        currentMonth = day.date.getMonth();
        monthLabels.push({
          month: getMonthLabel(day.date),
          weekIndex: Math.floor(index / 7)
        });
      }
    });
  }

  return (
    <div className="contribution-graph">
      <div className="contribution-header">
        <h3>{totalContributions} contributions in the last year</h3>
        <div className="contribution-settings">
          <button className="settings-btn">Contribution settings</button>
        </div>
      </div>
      
      <div className="graph-container">
        <div className="month-labels">
          {monthLabels.map((label, index) => (
            <span 
              key={index} 
              className="month-label"
              style={{ left: `${label.weekIndex * 11}px` }}
            >
              {label.month}
            </span>
          ))}
        </div>
        
        <div className="graph-content">
          <div className="day-labels">
            <span className="day-label">Mon</span>
            <span className="day-label"></span>
            <span className="day-label">Wed</span>
            <span className="day-label"></span>
            <span className="day-label">Fri</span>
            <span className="day-label"></span>
            <span className="day-label">Sun</span>
          </div>
          
          <div className="contribution-grid">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="week-column">
                {Array.from({ length: 7 }, (_, dayIndex) => {
                  const day = week[dayIndex];
                  return (
                    <div
                      key={dayIndex}
                      className={`contribution-day level-${day ? getContributionLevel(day.count) : 0}`}
                      title={day ? `${day.count} contributions on ${day.date.toDateString()}` : ''}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        
        <div className="legend">
          <span className="legend-text">Less</span>
          <div className="legend-colors">
            <div className="legend-color level-0"></div>
            <div className="legend-color level-1"></div>
            <div className="legend-color level-2"></div>
            <div className="legend-color level-3"></div>
            <div className="legend-color level-4"></div>
          </div>
          <span className="legend-text">More</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionGraph;