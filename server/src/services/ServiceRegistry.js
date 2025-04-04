/**
 * ServiceRegistry - A simple dependency injection container for services
 */
class ServiceRegistry {
  constructor() {
    this.services = {};
  }
  
  /**
   * Register a service with the registry
   * @param {string} name - The name of the service
   * @param {Object} service - The service instance
   * @returns {ServiceRegistry} - Returns this for chaining
   */
  register(name, service) {
    this.services[name] = service;
    return this;
  }
  
  /**
   * Get a service from the registry
   * @param {string} name - The name of the service
   * @returns {Object} - The service instance
   */
  get(name) {
    return this.services[name];
  }
  
  /**
   * Initialize all services with references to each other
   */
  wireServices() {
    // Give each service access to the registry
    Object.values(this.services).forEach(service => {
      if (typeof service.setServiceRegistry === 'function') {
        service.setServiceRegistry(this);
      }
    });
    
    // Call init on services that have it
    Object.values(this.services).forEach(service => {
      if (typeof service.init === 'function') {
        service.init();
      }
    });
  }
}

module.exports = new ServiceRegistry();
