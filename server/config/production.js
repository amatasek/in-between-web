module.exports = {
  port: process.env.PORT || 3002,
  jwtSecret: process.env.JWT_SECRET || 'your-production-jwt-secret',
  dbPath: '/opt/in-between/db', // Production database path
  corsOrigin: process.env.CORS_ORIGIN || 'https://in-between.live',
  logLevel: 'info'
};
