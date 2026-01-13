const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS properly
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// GitHub API endpoints
const GITHUB_API_BASE = 'https://api.github.com';

// Get user profile
app.get('/api/user/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const headers = {};
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }
    
    const response = await axios.get(`${GITHUB_API_BASE}/users/${username}`, { headers });
    res.json(response.data);
  } catch (error) {
    const { username } = req.params;
    console.error('GitHub API Error:', error.response?.status, error.response?.data?.message);
    
    // If rate limited or user not found, return mock data
    if (error.response?.status === 403 || error.response?.status === 404) {
      const mockUser = {
        login: username,
        id: Math.floor(Math.random() * 1000000),
        avatar_url: `https://github.com/identicons/${username}.png`,
        name: username.charAt(0).toUpperCase() + username.slice(1),
        bio: "This is mock data due to API rate limiting",
        company: "GitHub",
        location: "San Francisco, CA",
        email: `${username}@example.com`,
        blog: "https://github.com",
        twitter_username: username,
        public_repos: 42,
        public_gists: 5,
        followers: 1000,
        following: 100,
        created_at: "2020-01-01T00:00:00Z",
        updated_at: new Date().toISOString()
      };
      res.json(mockUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  }
});

// Get user repositories
app.get('/api/user/:username/repos', async (req, res) => {
  try {
    const { username } = req.params;
    const headers = {};
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }
    
    const response = await axios.get(`${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=6`, { headers });
    res.json(response.data);
  } catch (error) {
    console.error('GitHub API Error for repos:', error.response?.status, error.response?.data?.message);
    
    // Return mock repositories if API fails
    const mockRepos = [
      {
        id: 1,
        name: "awesome-project",
        html_url: `https://github.com/${username}/awesome-project`,
        description: "An awesome project built with React and Node.js",
        language: "JavaScript",
        stargazers_count: 42,
        forks_count: 12,
        private: false
      },
      {
        id: 2,
        name: "python-scripts",
        html_url: `https://github.com/${username}/python-scripts`,
        description: "Collection of useful Python scripts",
        language: "Python",
        stargazers_count: 18,
        forks_count: 5,
        private: false
      },
      {
        id: 3,
        name: "web-components",
        html_url: `https://github.com/${username}/web-components`,
        description: "Reusable web components library",
        language: "TypeScript",
        stargazers_count: 25,
        forks_count: 8,
        private: false
      }
    ];
    res.json(mockRepos);
  }
});

// Get user events (activity)
app.get('/api/user/:username/events', async (req, res) => {
  try {
    const { username } = req.params;
    const headers = {};
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }
    
    const response = await axios.get(`${GITHUB_API_BASE}/users/${username}/events/public?per_page=10`, { headers });
    res.json(response.data);
  } catch (error) {
    console.error('GitHub API Error for events:', error.response?.status, error.response?.data?.message);
    
    // Return mock events if API fails
    const mockEvents = [
      {
        id: "1",
        type: "PushEvent",
        repo: { name: `${username}/awesome-project` },
        payload: { commits: [{ message: "Update README" }] },
        created_at: new Date(Date.now() - 86400000).toISOString() // 1 day ago
      },
      {
        id: "2",
        type: "CreateEvent",
        repo: { name: `${username}/new-repo` },
        payload: { ref_type: "repository" },
        created_at: new Date(Date.now() - 172800000).toISOString() // 2 days ago
      },
      {
        id: "3",
        type: "IssuesEvent",
        repo: { name: `${username}/bug-tracker` },
        payload: { action: "opened" },
        created_at: new Date(Date.now() - 259200000).toISOString() // 3 days ago
      }
    ];
    res.json(mockEvents);
  }
});

// Proxy for GitHub avatars to avoid CORS issues
app.get('/api/avatar/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const avatarUrl = `https://avatars.githubusercontent.com/u/${userId}?v=4`;
    const response = await axios.get(avatarUrl, { responseType: 'stream' });
    
    res.set('Content-Type', response.headers['content-type']);
    response.data.pipe(res);
  } catch (error) {
    res.status(404).json({ error: 'Avatar not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});