# Vercel Deployment Guide

## Quick Deploy to Vercel

### Option 1: Frontend Only (Recommended for Demo)

1. **Import Repository**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import `github-profile-uptime` repository

2. **Configure Build Settings**:
   - **Framework Preset**: Other
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Node.js Version**: 18.x

3. **Environment Variables** (Optional):
   - Add `VITE_API_URL` if you want to point to a different backend

4. **Deploy**: Click "Deploy"

### Option 2: Full Stack (Frontend + Backend)

For full-stack deployment, you'll need to deploy backend separately:

1. **Deploy Backend** (Railway/Render):
   - Create new service
   - Connect GitHub repo
   - Set root directory to `server`
   - Deploy

2. **Deploy Frontend** (Vercel):
   - Follow Option 1 above
   - Add environment variable: `VITE_API_URL=https://your-backend-url.com`

### Manual Vercel Settings

If automatic detection fails, use these settings:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

### Troubleshooting

**Error: "vite: command not found"**
- Make sure Root Directory is set to `client`
- Or use Build Command: `cd client && npm install && npm run build`

**Error: "Module not found"**
- Clear Vercel cache and redeploy
- Check that all dependencies are in client/package.json

### Live Demo

Once deployed, your app will be available at:
`https://your-project-name.vercel.app`

### API Integration

The app includes mock data fallback, so it will work even without a backend server. For production with real GitHub API:

1. Deploy backend to Railway/Render
2. Update frontend API calls to point to your backend URL
3. Add GitHub token to backend environment variables