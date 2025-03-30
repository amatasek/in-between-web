# Deploying In-Between LIVE to GitHub Pages and Azure

**Play now at [in-between.live](https://in-between.live)**

This guide provides instructions for deploying the In-Between card game using GitHub Pages for the frontend and Azure App Service for the backend.

## Architecture Overview

The application consists of:
- **Frontend**: React application (hosted on GitHub Pages)
- **Backend**: Node.js server with Socket.IO (hosted on Azure App Service)
- **Database**: PouchDB for data storage (stored on Azure App Service)

## Deployment Steps

### 1. Frontend Deployment (GitHub Pages)

1. **Set up GitHub repository variables**:
   - Go to your repository Settings > Secrets and variables > Actions > Variables (tab)
   - Add the following variables:
     - `REACT_APP_API_URL`: URL of your Azure backend (e.g., `https://api.in-between.live`)
     - `REACT_APP_SOCKET_URL`: Same as the API URL for WebSocket connections
     - `CORS_ORIGIN`: Your frontend URL (e.g., `https://in-between.live`)
     - `AZURE_WEBAPP_NAME`: The name of your Azure Web App (e.g., `in-between-api`)
     - `AZURE_RESOURCE_GROUP`: The name of your Azure Resource Group

2. **Set up GitHub repository secrets**:
   - Go to your repository Settings > Secrets and variables > Actions > Secrets (tab)
   - Add the following secrets:
     - `AZURE_WEBAPP_PUBLISH_PROFILE`: Download from Azure Portal (App Service > Overview > Get publish profile)
     - `JWT_SECRET`: A secure random string for JWT authentication

3. **Deploy the frontend**:
   - Go to the "Actions" tab in your GitHub repository
   - Select the "Deploy Frontend to GitHub Pages" workflow
   - Click "Run workflow"
   - Select "production" as the environment
   - Click "Run workflow" again

4. **Configure GitHub Pages**:
   - After the workflow runs successfully, a new branch called `gh-pages` will be created
   - Go to your repository Settings > Pages
   - Under "Source", select "Deploy from a branch"
   - Select the `gh-pages` branch and the root folder (/)
   - Click "Save"
   - Under "Custom domain", enter `in-between.live`
   - Click "Save"
   - Follow the instructions to verify domain ownership (add DNS records at GoDaddy)
   - Check "Enforce HTTPS"

### 2. Backend Deployment (Azure App Service)

1. **Create an Azure App Service**:
   - Log in to the [Azure Portal](https://portal.azure.com)
   - Click "Create a resource" > "Web App"
   - Configure the basics:
     - Resource Group: Create new or select existing
     - Name: `in-between-api` (or your preferred name)
     - Publish: Code
     - Runtime stack: Node.js 18 LTS
     - Operating System: Linux
     - Region: Choose a region close to your users
     - App Service Plan: Create new (B1 Basic tier is a good starting point, ~$15/month)
   - Click "Review + create" > "Create"

2. **Enable WebSockets**:
   - Go to your App Service > Configuration
   - Click on "General settings"
   - Set "WebSockets" to "On"
   - Click "Save"

5. **Deploy the backend**:
   - Go to the "Actions" tab in your GitHub repository
   - Select the "Deploy Backend to Azure" workflow
   - Click "Run workflow"
   - Select "production" as the environment
   - Click "Run workflow" again



### 3. Configure DNS for Your Domain

1. **Log in to GoDaddy** where you purchased in-between.live
2. **Navigate to the DNS settings** for in-between.live
3. **Add the following DNS records**:
   - For the frontend (GitHub Pages):
     - Add CNAME record: `@` pointing to `yourusername.github.io` (or your organization's GitHub Pages domain)
     - Add CNAME record: `www` pointing to `yourusername.github.io`
   - For the backend (Azure):
     - Add CNAME record: `api` pointing to `in-between-api.azurewebsites.net`

## Database Management

Azure App Service provides persistent storage for your PouchDB files in the `/home/site/wwwroot/db` directory. However, for better data management, consider these options:

1. **Backup strategy**:
   - Set up a scheduled task in Azure to back up your database files
   - Use Azure Blob Storage for storing backups

2. **Migration to Azure Cosmos DB** (future enhancement):
   - For better scalability, consider migrating from PouchDB to Azure Cosmos DB
   - Cosmos DB offers a fully managed NoSQL database service

## Monitoring and Maintenance

1. **Azure Application Insights**:
   - Enable Application Insights in your Azure App Service
   - Monitor application performance and usage
   - Set up alerts for errors and availability issues

2. **GitHub Actions for Continuous Deployment**:
   - The provided GitHub Actions workflows enable manual deployment
   - You can modify them to trigger automatically on pushes to specific branches

## Troubleshooting

- **Socket connection issues**: Ensure WebSockets are enabled in Azure App Service
- **CORS errors**: Verify the CORS_ORIGIN environment variable matches your frontend URL exactly
- **Database errors**: Check Azure App Service logs for file permission issues

## Cost Estimation

- **GitHub Pages**: Free for public repositories
- **Azure App Service** (B1 Basic tier): ~$15/month
- **Custom Domain**: Already purchased through GoDaddy

Total estimated cost: **~$15/month** (plus domain renewal costs)
