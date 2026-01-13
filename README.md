# GitHub Profile UI Clone

A responsive GitHub profile page clone built with React (Vite) and Node.js backend that integrates with the GitHub API to display real user data.

## Features

- **Real GitHub Data Integration**: Fetches user profile, repositories, and activity from GitHub API
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **GitHub-like UI**: Matches the original GitHub profile design
- **Interactive Components**:
  - User search functionality
  - Popular repositories display
  - Contribution graph (mock data)
  - Activity feed
  - Profile sidebar with user details

## Tech Stack

### Frontend
- React 18 with Vite
- CSS3 with GitHub-inspired styling
- Responsive grid layouts

### Backend
- Node.js with Express
- GitHub API integration
- CORS enabled for cross-origin requests

## Project Structure

```
github-profile-ui/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── index.html
│   └── vite.config.js
├── server/                 # Node.js backend
│   ├── server.js           # Express server
│   └── .env               # Environment variables
└── package.json           # Root package.json

```

## Environment Variables

### Frontend (.env in client folder):
```bash
# Default GitHub username to display
VITE_DEFAULT_USERNAME=shreeram

# API URL (leave empty for local development)
VITE_API_URL=

# App configuration
VITE_APP_TITLE=GitHub Profile UI
```

### Backend (.env in server folder):
```bash
# Default port
PORT=5000

# GitHub token for higher API rate limits (optional)
GITHUB_TOKEN=your_github_token_here

# Default username to show
DEFAULT_USERNAME=shreeram

# Environment
NODE_ENV=development
```

## Customization

### Change Default Username:
1. **Frontend**: Update `VITE_DEFAULT_USERNAME` in `client/.env`
2. **Backend**: Update `DEFAULT_USERNAME` in `server/.env`
3. **Or search any username** using the search bar

### Popular GitHub Users to Try:
- `octocat` (GitHub mascot)
- `torvalds` (Linux creator)
- `gaearon` (React team member)
- `sindresorhus` (Popular developer)
- `tj` (Express.js creator)

## Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ranjan1501/github-profile-uptime.git
   cd github-profile-uptime
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Start development servers**
   ```bash
   npm run dev
   ```

   This starts both backend (port 5000) and frontend (port 5173) servers.

4. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions to Vercel, Netlify, Railway, or Heroku.

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd github-profile-ui
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables** (Optional)
   ```bash
   cd server
   # Edit .env file and add your GitHub token for higher rate limits
   GITHUB_TOKEN=your_github_token_here
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on http://localhost:5000
   - Frontend development server on http://localhost:5173

## API Endpoints

- `GET /api/user/:username` - Get user profile data
- `GET /api/user/:username/repos` - Get user repositories
- `GET /api/user/:username/events` - Get user activity events

## Usage

1. Open http://localhost:5173 in your browser
2. Use the search bar to enter any GitHub username
3. View the profile with real GitHub data including:
   - User information and avatar
   - Popular repositories
   - Contribution graph (mock data)
   - Recent activity

## Components

- **Header**: Navigation with search functionality
- **ProfileSidebar**: User avatar, bio, stats, and contact info
- **MainContent**: Main content area with tabs and sections
- **TabNavigation**: GitHub-style tab navigation
- **PopularRepos**: Grid of user's repositories
- **ContributionGraph**: Year-long contribution heatmap
- **ActivityFeed**: Timeline of recent GitHub activity

## Deployment Ready

The project is structured for easy deployment:
- Frontend builds to static files
- Backend is a simple Express server
- Environment variables for configuration
- CORS configured for production

## GitHub API Integration

The app integrates with GitHub's REST API to fetch:
- User profile information
- Repository data with language stats
- Public activity events

Note: The contribution graph uses mock data as GitHub's contribution API requires authentication.

## Responsive Design

- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized for various screen sizes

## Future Enhancements

- Real contribution data integration
- User authentication
- Repository filtering and sorting
- Dark/light theme toggle
- More detailed activity views