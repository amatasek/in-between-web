/**
 * BaseService - Base class for all services with service registry integration
 */
class BaseService {
  constructor() {
    this.serviceRegistry = null;
  }
  
  /**
   * Set the service registry for this service
   * @param {Object} registry - The service registry instance
   */
  setServiceRegistry(registry) {
    this.serviceRegistry = registry;
  }
  
  /**
   * Get a service from the registry
   * @param {string} name - The name of the service
   * @returns {Object} - The service instance
   */
  getService(name) {
    if (!this.serviceRegistry) {
      throw new Error('Service registry not set');
    }
    return this.serviceRegistry.get(name);
  }
  
  /**
   * Initialize the service - called after all services are registered
   * Override in subclasses if needed
   */
  init() {
    // Default implementation does nothing
  }
}

module.exports = BaseService;
