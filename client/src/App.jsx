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
  const [username, setUsername] = useState(import.meta.env.VITE_DEFAULT_USERNAME || 'shreeram');

  useEffect(() => {
    // Test API connection first
    const testAPIConnection = async () => {
      const API_BASE = import.meta.env.VITE_API_URL || '/api';
      console.log('🔍 Testing API connection to:', API_BASE);
      console.log('🌐 Environment check - VITE_API_URL:', import.meta.env.VITE_API_URL);
      
      try {
        const healthResponse = await fetch(`${API_BASE}/health`);
        if (healthResponse.ok) {
          const healthData = await healthResponse.json();
          console.log('✅ API Health Check:', healthData);
        } else {
          console.error('❌ API Health Check failed:', healthResponse.status);
        }
      } catch (error) {
        console.error('🚨 API Connection test failed:', error);
      }
    };
    
    testAPIConnection();
    fetchUserData();
  }, [username]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      console.log('Fetching data for username:', username);
      
      // Use environment variable for API URL, fallback to local development
      const API_BASE = import.meta.env.VITE_API_URL || '/api';
      console.log('Using API_BASE:', API_BASE);
      
      // Fetch user profile
      const userResponse = await fetch(`${API_BASE}/user/${username}`);
      console.log('User response status:', userResponse.status);
      
      if (userResponse.ok) {
        const userData = await userResponse.json();
        console.log('User data received:', userData);
        setUser(userData);
      } else {
        console.error('Failed to fetch user data:', userResponse.status, userResponse.statusText);
        const errorText = await userResponse.text();
        console.error('Error response:', errorText);
      }

      // Fetch repositories
      const reposResponse = await fetch(`${API_BASE}/user/${username}/repos`);
      console.log('Repos response status:', reposResponse.status);
      
      if (reposResponse.ok) {
        const reposData = await reposResponse.json();
        console.log('Repos data received:', reposData.length, 'repositories');
        setRepos(reposData);
      } else {
        console.error('Failed to fetch repos:', reposResponse.status);
      }

      // Fetch events
      const eventsResponse = await fetch(`${API_BASE}/user/${username}/events`);
      console.log('Events response status:', eventsResponse.status);
      
      if (eventsResponse.ok) {
        const eventsData = await eventsResponse.json();
        console.log('Events data received:', eventsData.length, 'events');
        setEvents(eventsData);
      } else {
        console.error('Failed to fetch events:', eventsResponse.status);
      }
    } catch (error) {
      console.error('Network error fetching data:', error);
      console.error('Error details:', error.message);
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
        <div className="loading">Loading GitHub profile...</div>
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