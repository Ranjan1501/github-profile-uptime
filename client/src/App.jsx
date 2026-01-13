import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProfileSidebar from './components/ProfileSidebar';
import MainContent from './components/MainContent';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('Ranjan1501');

  useEffect(() => {
    fetchUserData();
  }, [username]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      console.log('Fetching data for username:', username);
      
      // Fetch user profile
      const userResponse = await fetch(`/api/user/${username}`);
      if (userResponse.ok) {
        const userData = await userResponse.json();
        console.log('User data received:', userData);
        setUser(userData);
      } else {
        console.error('Failed to fetch user data:', userResponse.status);
      }

      // Fetch repositories
      const reposResponse = await fetch(`/api/user/${username}/repos`);
      if (reposResponse.ok) {
        const reposData = await reposResponse.json();
        console.log('Repos data received:', reposData.length, 'repositories');
        setRepos(reposData);
      } else {
        console.error('Failed to fetch repos:', reposResponse.status);
      }

      // Fetch events
      const eventsResponse = await fetch(`/api/user/${username}/events`);
      if (eventsResponse.ok) {
        const eventsData = await eventsResponse.json();
        console.log('Events data received:', eventsData.length, 'events');
        setEvents(eventsData);
      } else {
        console.error('Failed to fetch events:', eventsResponse.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameChange = (newUsername) => {
    setUsername(newUsername);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header onUsernameChange={handleUsernameChange} currentUsername={username} />
      <div className="container">
        <div className="profile-layout">
          <ProfileSidebar user={user} />
          <MainContent user={user} repos={repos} events={events} />
        </div>
      </div>
    </div>
  );
}

export default App;