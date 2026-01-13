import React, { useState } from 'react';
import './ProfileSidebar.css';

const ProfileSidebar = ({ user }) => {
  const [imageError, setImageError] = useState(false);
  
  if (!user) return null;

  console.log('User data:', user);
  console.log('Avatar URL:', user.avatar_url);

  // Create a simple colored circle with initials as fallback
  const createDefaultAvatar = (initial) => {
    const colors = ['#58a6ff', '#238636', '#f85149', '#a5a5a5', '#8b5cf6', '#fb8500'];
    const color = colors[initial.charCodeAt(0) % colors.length];
    
    const svg = `<svg width="260" height="260" xmlns="http://www.w3.org/2000/svg">
      <circle cx="130" cy="130" r="120" fill="${color}"/>
      <text x="130" y="150" font-family="Arial, sans-serif" font-size="80" fill="white" text-anchor="middle" font-weight="bold">${initial}</text>
    </svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  const handleImageError = (e) => {
    console.error('Image failed to load:', e.target.src);
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log('Image loaded successfully');
  };

  const getImageSrc = () => {
    if (imageError || !user.avatar_url) {
      const initial = user.login?.charAt(0).toUpperCase() || 'U';
      return createDefaultAvatar(initial);
    }
    return user.avatar_url;
  };

  return (
    <div className="profile-sidebar">
      <div className="profile-avatar">
        <img 
          src={getImageSrc()}
          alt={user.name || user.login} 
          className="avatar-img"
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      </div>
      
      <div className="profile-info">
        <h1 className="profile-name">{user.name || user.login}</h1>
        <p className="profile-username">@{user.login}</p>
        
        {user.bio && (
          <p className="profile-bio">{user.bio}</p>
        )}
        
        <button className="btn btn-primary edit-profile-btn">Edit profile</button>
        
        <div className="profile-stats">
          <div className="stat-item">
            <svg className="stat-icon" viewBox="0 0 16 16" width="16" height="16">
              <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.954.752.752 0 0 1-.549-.514 3.507 3.507 0 0 0-2.522-2.372.75.75 0 0 1-.574-.73v-.352a.75.75 0 0 1 .416-.672A1.5 1.5 0 0 0 11 5.5.75.75 0 0 1 11 4Zm-5.5-.5a2 2 0 1 0-.001 3.999A2 2 0 0 0 5.5 3.5Z"></path>
            </svg>
            <span>{user.followers} followers</span>
          </div>
          <div className="stat-item">
            <span>{user.following} following</span>
          </div>
        </div>
        
        <div className="profile-details">
          {user.company && (
            <div className="detail-item">
              <svg className="detail-icon" viewBox="0 0 16 16" width="16" height="16">
                <path d="M1.75 16A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 0 0 .25-.25V8.285a.25.25 0 0 0-.111-.208l-1.055-.703a.749.749 0 1 1 .832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0 1 14.25 16h-12.5Zm9.75-5.85a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5h-.5Z"></path>
              </svg>
              <span>{user.company}</span>
            </div>
          )}
          
          {user.location && (
            <div className="detail-item">
              <svg className="detail-icon" viewBox="0 0 16 16" width="16" height="16">
                <path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z"></path>
              </svg>
              <span>{user.location}</span>
            </div>
          )}
          
          {user.email && (
            <div className="detail-item">
              <svg className="detail-icon" viewBox="0 0 16 16" width="16" height="16">
                <path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2ZM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V5.809L8.38 9.397a.75.75 0 0 1-.76 0L1.5 5.809v6.442Zm13-8.181v-.32a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v.32L8 7.88l6.5-3.81Z"></path>
              </svg>
              <span>{user.email}</span>
            </div>
          )}
          
          {user.blog && (
            <div className="detail-item">
              <svg className="detail-icon" viewBox="0 0 16 16" width="16" height="16">
                <path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path>
              </svg>
              <a href={user.blog} target="_blank" rel="noopener noreferrer">{user.blog}</a>
            </div>
          )}
          
          {user.twitter_username && (
            <div className="detail-item">
              <svg className="detail-icon" viewBox="0 0 16 16" width="16" height="16">
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
              </svg>
              <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer">@{user.twitter_username}</a>
            </div>
          )}
        </div>
        
        <div className="achievements">
          <h3 className="achievements-title">Achievements</h3>
          <div className="achievement-badges">
            <div className="achievement-badge">
              <img src="https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png" alt="Pull Shark" />
            </div>
            <div className="achievement-badge">
              <img src="https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png" alt="Quickdraw" />
            </div>
            <div className="achievement-badge">
              <img src="https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png" alt="YOLO" />
            </div>
          </div>
        </div>
        
        <div className="organizations">
          <h3 className="organizations-title">Organizations</h3>
          <div className="org-list">
            <div className="org-item">
              <img src={user.avatar_url} alt="Organization" className="org-avatar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;