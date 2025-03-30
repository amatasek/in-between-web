# Deploying In-Between LIVE

**Play now at [in-between.live](https://in-between.live)**

This guide provides instructions for deploying the In-Between card game using GitHub Pages for the frontend and Render.com for the backend.

## Architecture Overview

The application consists of:
- **Frontend**: React application (hosted on GitHub Pages)
- **Backend**: Node.js server with Socket.IO (hosted on Render.com)
- **Database**: PouchDB for data storage (stored on Render.com persistent disk)

## Deployment Steps

### 1. Frontend Deployment (GitHub Pages)

The frontend is already deployed to GitHub Pages and accessible at [in-between.live](https://in-between.live).

If you need to update the frontend:

1. **Make your changes** to the web code
2. **Build and push to the gh-pages branch**:
   ```bash
   cd web
   npm run export
   git checkout gh-pages
   git rm -rf .
   cp -r out/* .
   echo "in-between.live" > CNAME
   git add .
   git commit -m "Update frontend"
   git push origin gh-pages
   ```

### 2. Backend Deployment (Render.com)

#### Initial Setup

1. **Create a Render account**:
   - Go to [render.com](https://render.com/)
   - Sign up with your GitHub account

2. **Create a new Web Service**:
   - Click "New" and select "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure the Web Service**:
   - Name: `in-between-api`
   - Root Directory: `server`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node src/index.js`
   - Select the plan: "Standard ($7/month)"

4. **Add Environment Variables**:
   - Click on "Environment" tab
   - Add the following variables:
     - `NODE_ENV`: production
     - `JWT_SECRET`: [generate a secure random string]
     - `CORS_ORIGIN`: https://in-between.live
     - `DB_PATH`: /var/data/db

5. **Create a Persistent Disk**:
   - Click on "Disks" tab
   - Add a new disk:
     - Name: `data`
     - Mount Path: `/var/data/db`
     - Size: 1 GB

6. **Deploy**:
   - Click "Create Web Service"
   - Render will automatically build and deploy your app

#### Automated Deployments

For future deployments, you can use the GitHub Actions workflow:

1. **Get your Render API key**:
   - Go to your Render dashboard
   - Click on your profile picture in the top right
   - Select "Account Settings"
   - Go to "API Keys"
   - Create a new API key

2. **Get your Render service ID**:
   - Go to your Web Service dashboard
   - The service ID is in the URL: `https://dashboard.render.com/web/srv-XXXXXXXX`
   - The ID is the `srv-XXXXXXXX` part

3. **Add GitHub repository variables and secrets**:
   - Go to your repository Settings > Secrets and variables > Actions
   - Add the following variable:
     - Name: `RENDER_SERVICE_ID`
     - Value: Your Render service ID
   - Add the following secret:
     - Name: `RENDER_API_KEY`
     - Value: Your Render API key

4. **Deploy using GitHub Actions**:
   - Go to the "Actions" tab in your GitHub repository
   - Select the "Deploy to Render" workflow
   - Click "Run workflow"
   - Select "production" as the environment
   - Click "Run workflow" again

### 3. Configure DNS for Your Domain

1. **Log in to GoDaddy** where you purchased in-between.live
2. **Navigate to the DNS settings** for in-between.live
3. **Add the following DNS records**:

#### For the Frontend (GitHub Pages)
| Type  | Name | Value                | TTL      |
|-------|------|----------------------|----------|
| A     | @    | 185.199.108.153      | 1 hour   |
| A     | @    | 185.199.109.153      | 1 hour   |
| A     | @    | 185.199.110.153      | 1 hour   |
| A     | @    | 185.199.111.153      | 1 hour   |
| CNAME | www  | amatasek.github.io   | 1 hour   |

#### For the Backend (Render.com)
| Type  | Name | Value                    | TTL      |
|-------|------|--------------------------|----------|
| CNAME | api  | in-between-api.onrender.com | 1 hour   |

## Database Management

Render.com provides persistent storage for your PouchDB files in the `/var/data/db` directory. For better data management:

1. **Backup strategy**:
   - Render automatically backs up your persistent disks
   - For additional safety, you can periodically download backups

## Monitoring and Maintenance

1. **Render Dashboard**:
   - Monitor your application's logs and metrics
   - Set up alerts for errors and downtime

2. **GitHub Actions for Continuous Deployment**:
   - The provided GitHub Actions workflow enables manual deployment
   - You can modify it to trigger automatically on pushes to specific branches

## Troubleshooting

- **Socket connection issues**: Verify WebSocket connections are enabled in Render
- **CORS errors**: Verify the CORS_ORIGIN environment variable matches your frontend URL exactly
- **Database errors**: Check Render logs for file permission issues

## Cost Estimation

- **GitHub Pages**: Free for public repositories
- **Render.com** (Standard plan): $7/month
- **Custom Domain**: Already purchased through GoDaddy

Total estimated cost: **$7/month** (plus domain renewal costs)
