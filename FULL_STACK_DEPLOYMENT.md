# Full Stack Deployment Guide

Deploy both frontend and backend to get a shareable link with full functionality.

## 🚀 Option 1: Vercel + Railway (Recommended)

### Step 1: Deploy Backend on Railway

1. **Go to Railway**: https://railway.app
2. **Sign up/Login** with GitHub
3. **New Project** → **Deploy from GitHub repo**
4. **Select** your `github-profile-uptime` repository
5. **Configure Service**:
   - **Root Directory**: `server`
   - **Start Command**: `npm start`
   - **Build Command**: `npm install`
6. **Add Environment Variables**:
   - `NODE_ENV=production`
   - `GITHUB_TOKEN=your_token_here` (optional, for higher rate limits)
7. **Deploy** - Railway will give you a URL like: `https://your-app.railway.app`

### Step 2: Deploy Frontend on Vercel

1. **Go to Vercel**: https://vercel.com
2. **Import Project** → Select your `github-profile-uptime` repo
3. **Configure Settings**:
   - **Framework Preset**: Other
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. **Add Environment Variable**:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-railway-app.railway.app/api`
5. **Deploy** - Vercel will give you a URL like: `https://your-app.vercel.app`

### Step 3: Update CORS (Important!)

After deployment, update your backend CORS settings:

```javascript
// In server/server.js, update CORS configuration
app.use(cors({
  origin: ['https://your-app.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

---

## 🚀 Option 2: Render (Full Stack on One Platform)

### Deploy Both on Render

1. **Go to Render**: https://render.com
2. **Create Web Service** for Backend:
   - **Connect Repository**: `github-profile-uptime`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
3. **Create Static Site** for Frontend:
   - **Connect Repository**: `github-profile-uptime`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Add Environment Variable**: `VITE_API_URL=https://your-backend.onrender.com/api`

---

## 🚀 Option 3: Netlify + Railway

### Backend on Railway (Same as Option 1)

### Frontend on Netlify

1. **Go to Netlify**: https://netlify.com
2. **New Site from Git** → Connect your repo
3. **Build Settings**:
   - **Base Directory**: `client`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `client/dist`
4. **Environment Variables**:
   - `VITE_API_URL=https://your-railway-app.railway.app/api`

---

## 🚀 Option 4: Heroku (Full Stack)

### Single Heroku App (Monorepo)

1. **Create Heroku App**: `heroku create your-app-name`
2. **Add Buildpacks**:
   ```bash
   heroku buildpacks:add heroku/nodejs
   heroku buildpacks:add https://github.com/heroku/heroku-buildpack-static
   ```
3. **Add Heroku Config**:
   ```json
   // package.json (root)
   {
     "scripts": {
       "build": "cd client && npm install && npm run build",
       "start": "cd server && npm start",
       "heroku-postbuild": "npm run build"
     }
   }
   ```

---

## 📋 Quick Start (Recommended: Railway + Vercel)

### 1. Deploy Backend (5 minutes)
- Go to https://railway.app
- Connect GitHub → Select repo → Set root to `server`
- Copy the Railway URL

### 2. Deploy Frontend (3 minutes)  
- Go to https://vercel.com
- Import repo → Set root to `client`
- Add env var: `VITE_API_URL=https://your-railway-url.railway.app/api`
- Deploy

### 3. Share Your Link! 🎉
Your app will be live at: `https://your-app.vercel.app`

---

## 🔧 Environment Variables Summary

### Backend (.env):
```
NODE_ENV=production
GITHUB_TOKEN=your_github_token (optional)
```

### Frontend (Vercel/Netlify):
```
VITE_API_URL=https://your-backend-url.com/api
```

---

## 🌐 Expected URLs

After deployment, you'll have:
- **Frontend**: `https://your-app.vercel.app`
- **Backend API**: `https://your-app.railway.app/api`
- **Full App**: Share the frontend URL - it connects to the backend automatically!

---

## 🎯 Testing Your Deployment

1. **Visit your frontend URL**
2. **Search for a GitHub username** (try: `octocat`, `torvalds`)
3. **Check browser console** for any API errors
4. **Verify data loads** (profile, repos, activity)

Your app is now live and shareable! 🚀