FROM node:18

# Install CouchDB
RUN curl -L https://couchdb.apache.org/repo/bintray-pubkey.asc | apt-key add -
RUN echo "deb https://apache.bintray.com/couchdb-deb/ stretch main" | tee -a /etc/apt/sources.list
RUN apt-get update && apt-get install -y couchdb supervisor

# Copy supervisor config
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Set up Node.js app
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

EXPOSE 10000

# Create directories and set permissions
RUN mkdir -p /var/data/couchdb /var/data/files
RUN chown -R couchdb:couchdb /var/data/couchdb

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]