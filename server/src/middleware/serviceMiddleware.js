/**
 * Service Middleware - Injects services into the request object
 */
const { serviceRegistry } = require('../serviceIntegration');

/**
 * Middleware to inject specific services into the request object
 * @param {Array} serviceNames - Array of service names to inject
 * @returns {Function} Express middleware function
 */
function injectServices(serviceNames = []) {
  return (req, res, next) => {
    // Create a services object on the request
    req.services = {};
    
    // Add requested services
    serviceNames.forEach(name => {
      const service = serviceRegistry.get(name);
      if (service) {
        req.services[name] = service;
      }
    });
    
    next();
  };
}

module.exports = {
  injectServices
};
