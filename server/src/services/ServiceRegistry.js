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
    // Using Promise.all to handle async init methods
    const initPromises = Object.values(this.services)
      .filter(service => typeof service.init === 'function')
      .map(async service => {
        try {
          console.log(`[SERVICE_REGISTRY] Initializing service: ${service.constructor.name}`);
          await service.init();
          console.log(`[SERVICE_REGISTRY] Service initialized: ${service.constructor.name}`);
        } catch (error) {
          console.error(`[SERVICE_REGISTRY] Error initializing service ${service.constructor.name}:`, error);
        }
      });
    
    // Execute all init promises
    Promise.all(initPromises)
      .then(() => console.log('[SERVICE_REGISTRY] All services initialized'))
      .catch(error => console.error('[SERVICE_REGISTRY] Error during service initialization:', error));
  }
}

module.exports = new ServiceRegistry();
