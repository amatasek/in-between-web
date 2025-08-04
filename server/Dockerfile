FROM node:18

# Install supervisor and dependencies
RUN apt-get update && apt-get install -y \
    supervisor \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install CouchDB from official binary
RUN curl -L https://archive.apache.org/dist/couchdb/binary/linux/2.3.1/apache-couchdb-2.3.1.tar.gz -o couchdb.tar.gz \
    && tar -xzf couchdb.tar.gz -C /opt \
    && rm couchdb.tar.gz \
    && useradd -r -d /opt/couchdb couchdb \
    && chown -R couchdb:couchdb /opt/couchdb

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