FROM node:18

# Install CouchDB and supervisor
RUN apt-get update && apt-get install -y \
    curl supervisor gnupg \
    && curl -L https://couchdb.apache.org/repo/keys.asc | apt-key add - \
    && echo "deb https://apache.jfrog.io/artifactory/couchdb-deb/ focal main" | tee /etc/apt/sources.list.d/couchdb.list \
    && apt-get update && apt-get install -y couchdb \
    && rm -rf /var/lib/apt/lists/*

# Copy supervisor config
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Set up Node.js app
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

# Create data directories
RUN mkdir -p /var/data/couchdb /var/data/files
RUN chown -R couchdb:couchdb /var/data/couchdb

EXPOSE 10000

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]