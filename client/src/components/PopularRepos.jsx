import React from 'react';
import './PopularRepos.css';

const PopularRepos = ({ repos }) => {
  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#f1e05a',
      Python: '#3572A5',
      Java: '#b07219',
      TypeScript: '#2b7489',
      HTML: '#e34c26',
      CSS: '#563d7c',
      PHP: '#4F5D95',
      C: '#555555',
      'C++': '#f34b7d',
      'C#': '#239120',
      Go: '#00ADD8',
      Rust: '#dea584',
      Swift: '#ffac45',
      Kotlin: '#F18E33',
      Ruby: '#701516',
      Dart: '#00B4AB',
      Shell: '#89e051',
      Vue: '#2c3e50',
      React: '#61dafb'
    };
    return colors[language] || '#7d8590';
  };

  if (!repos || repos.length === 0) {
    return (
      <div className="popular-repos">
        <div className="section-header">
          <h2>Popular repositories</h2>
          <button className="customize-btn">Customize your pins</button>
        </div>
        <div className="no-repos">No repositories found</div>
      </div>
    );
  }

  return (
    <div className="popular-repos">
      <div className="section-header">
        <h2>Popular repositories</h2>
        <button className="customize-btn">Customize your pins</button>
      </div>
      
      <div className="repos-grid">
        {repos.slice(0, 6).map(repo => (
          <div key={repo.id} className="repo-card">
            <div className="repo-header">
              <h3 className="repo-name">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
              </h3>
              <span className="repo-visibility">{repo.private ? 'Private' : 'Public'}</span>
            </div>
            
            {repo.description && (
              <p className="repo-description">{repo.description}</p>
            )}
            
            <div className="repo-stats">
              {repo.language && (
                <div className="repo-language">
                  <span 
                    className="language-color" 
                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                  ></span>
                  <span>{repo.language}</span>
                </div>
              )}
              
              {repo.stargazers_count > 0 && (
                <div className="repo-stars">
                  <svg className="star-icon" viewBox="0 0 16 16" width="16" height="16">
                    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path>
                  </svg>
                  <span>{repo.stargazers_count}</span>
                </div>
              )}
              
              {repo.forks_count > 0 && (
                <div className="repo-forks">
                  <svg className="fork-icon" viewBox="0 0 16 16" width="16" height="16">
                    <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                  </svg>
                  <span>{repo.forks_count}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularRepos;