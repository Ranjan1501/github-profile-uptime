# Deployment Guide

## GitHub Repository Setup

This project has been prepared for deployment. Follow these steps to create the GitHub repository and push the code:

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Set repository name: `github-profile-uptime`
5. Add description: "GitHub Profile UI Clone - React & Node.js"
6. Make it Public
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. Click "Create repository"

### 2. Push Code to GitHub

After creating the repository, run these commands in your terminal:

```bash
# Add the remote repository
git remote add origin https://github.com/Ranjan1501/github-profile-uptime.git

# Push the code to GitHub
git push -u origin main
```

### 3. Deployment Options

#### Option A: Vercel (Recommended for Frontend + API)
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will auto-detect the React app in the `client` folder
4. Set build settings:
   - Build Command: `cd client && npm run build`
   - Output Directory: `client/dist`
   - Install Command: `npm run install-all`

#### Option B: Netlify (Frontend) + Railway/Render (Backend)
1. **Frontend on Netlify:**
   - Connect GitHub repo
   - Build command: `cd client && npm run build`
   - Publish directory: `client/dist`

2. **Backend on Railway:**
   - Connect GitHub repo
   - Set root directory to `server`
   - Railway will auto-deploy the Express server

#### Option C: Heroku (Full Stack)
1. Create two Heroku apps (one for frontend, one for backend)
2. Deploy backend first, then update frontend API URLs
3. Use Heroku's GitHub integration for automatic deployments

### 4. Environment Variables

For production deployment, set these environment variables:

**Backend (.env):**
```
NODE_ENV=production
GITHUB_TOKEN=your_github_token_here (optional, for higher rate limits)
```

**Frontend:**
Update API URLs in production to point to your deployed backend.

### 5. Custom Domain (Optional)

After deployment, you can add a custom domain through your hosting provider's dashboard.

## Repository Structure

```
github-profile-uptime/
├── client/                 # React frontend (Vite)
├── server/                 # Node.js backend
├── package.json           # Root package.json for scripts
├── README.md              # Project documentation
└── DEPLOYMENT.md          # This deployment guide
```

## Live Demo

Once deployed, your GitHub Profile UI will be accessible at:
- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-api.railway.app`

## Features

✅ Real GitHub API integration
✅ Responsive design
✅ User search functionality
✅ Repository display with stats
✅ Contribution graph
✅ Activity feed
✅ Fallback avatars
✅ Rate limiting handling