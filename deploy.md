# 🚀 Quick Deploy Instructions

## Fastest Way to Deploy (5 minutes total)

### 1. Deploy Backend on Railway (2 minutes)
1. Go to https://railway.app
2. Login with GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Select `github-profile-uptime`
5. Set **Root Directory**: `server`
6. Deploy → Copy the URL (e.g., `https://abc123.railway.app`)

### 2. Deploy Frontend on Vercel (3 minutes)
1. Go to https://vercel.com  
2. "New Project" → Import `github-profile-uptime`
3. **Root Directory**: `client`
4. **Environment Variables** → Add:
   - Name: `VITE_API_URL`
   - Value: `https://your-railway-url.railway.app/api`
5. Deploy → Get your live URL!

### 3. Share Your Link! 🎉
Your GitHub Profile UI is now live at: `https://your-app.vercel.app`

## Features That Will Work:
✅ Real GitHub user search  
✅ Profile information display  
✅ Repository listings with stats  
✅ Contribution graph  
✅ Activity feed  
✅ Responsive design  
✅ Fallback avatars  

## Test Users to Try:
- `octocat` (GitHub mascot)
- `torvalds` (Linux creator)  
- `gaearon` (React team)
- `sindresorhus` (Popular developer)

Your app is production-ready and shareable! 🚀