# In-Between LIVE - Deployment Guide

**Play now at [in-between.live](https://in-between.live)**

This document provides instructions for deploying the In-Between card game to production.

## Architecture Overview

The application consists of:
- **Frontend**: React application
- **Backend**: Node.js server with Socket.IO for real-time communication
- **Database**: PouchDB for data storage

## Deployment Options

### Frontend Deployment (Netlify)

1. **Create a Netlify account** at [netlify.com](https://www.netlify.com/)
2. **Connect your GitHub repository** to Netlify
3. **Configure build settings**:
   - Build command: `cd web && npm ci && npm run build`
   - Publish directory: `web/build`
   - Environment variables: Set `REACT_APP_API_URL` to your API domain (e.g., `https://api.in-between.live`)

### Backend Deployment (DigitalOcean)

1. **Create a DigitalOcean account** at [digitalocean.com](https://www.digitalocean.com/)
2. **Create a new Droplet**:
   - Choose Ubuntu 22.04 LTS
   - Select the Basic plan ($5/month)
   - Choose a datacenter region close to your target users
   - Add your SSH key for secure access

3. **Initial server setup**:
   ```bash
   # Update packages
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js and npm
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install PM2 for process management
   sudo npm install -g pm2
   
   # Install Nginx
   sudo apt install -y nginx
   
   # Configure firewall
   sudo ufw allow 'Nginx Full'
   sudo ufw allow OpenSSH
   sudo ufw enable
   ```

4. **Set up application directory**:
   ```bash
   # Create application directory
   sudo mkdir -p /opt/in-between
   sudo chown $USER:$USER /opt/in-between
   
   # Clone repository
   git clone https://github.com/yourusername/in-between.git /opt/in-between
   
   # Create database directory
   mkdir -p /opt/in-between/db
   ```

5. **Configure Nginx**:
   - Copy the nginx.conf file to `/etc/nginx/sites-available/in-between`
   - Create a symbolic link: `sudo ln -s /etc/nginx/sites-available/in-between /etc/nginx/sites-enabled/`
   - Test configuration: `sudo nginx -t`
   - Reload Nginx: `sudo systemctl reload nginx`

6. **Set up SSL with Certbot**:
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d api.in-between.live
   ```

7. **Start the application**:
   ```bash
   cd /opt/in-between
   npm ci --production
   export NODE_ENV=production
   export JWT_SECRET=your-secure-jwt-secret
   export PORT=3002
   export CORS_ORIGIN=https://in-between.live
   pm2 start server/src/index.js --name in-between-server
   pm2 save
   pm2 startup
   ```

## Domain Setup

1. **Register a domain** with Namecheap or another registrar
2. **Configure DNS records**:
   - For frontend (Netlify): Follow Netlify's instructions to set up your domain (in-between.live)
   - For backend (DigitalOcean): Create an A record pointing `api.in-between.live` to your DigitalOcean droplet's IP address

## GitHub Actions Setup

To use the manual deployment workflow:

1. **Add GitHub Secrets** in your repository settings:
   - `FTP_SERVER`: Your Netlify FTP server
   - `FTP_USERNAME`: Your Netlify FTP username
   - `FTP_PASSWORD`: Your Netlify FTP password
   - `FTP_WEB_DIRECTORY`: Directory for web files
   - `SSH_HOST`: Your DigitalOcean droplet IP
   - `SSH_USERNAME`: SSH username
   - `SSH_PRIVATE_KEY`: Your SSH private key
   - `SERVER_DIRECTORY`: `/opt/in-between`
   - `API_URL`: Your backend API URL

2. **Trigger a deployment**:
   - Go to the "Actions" tab in your GitHub repository
   - Select the "Manual Deploy" workflow
   - Click "Run workflow"
   - Select the environment (production or staging)
   - Click "Run workflow" again

## Environment Variables

### Frontend (.env.production)
- `REACT_APP_API_URL`: URL of your backend API
- `REACT_APP_SOCKET_URL`: URL for Socket.IO connections (usually same as API URL)

### Backend (production.js)
- `PORT`: Server port (default: 3002)
- `JWT_SECRET`: Secret key for JWT authentication
- `CORS_ORIGIN`: Frontend URL for CORS
- `DB_PATH`: Path to database files

## Troubleshooting

- **Socket connection issues**: Check Nginx configuration for proper WebSocket proxy settings
- **Database errors**: Ensure the database directory exists and has proper permissions
- **CORS errors**: Verify the CORS_ORIGIN environment variable matches your frontend URL exactly

## Maintenance

- **Database backups**: Set up a cron job to regularly back up the `/opt/in-between/db` directory
- **Log monitoring**: Use `pm2 logs in-between-server` to view application logs
- **Updates**: Use the GitHub Actions workflow for controlled updates
