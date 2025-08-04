FROM node:18-alpine

# Install docker-compose
RUN apk add --no-cache docker-compose

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy app code
COPY . .

EXPOSE 10000

CMD ["npm", "start"]