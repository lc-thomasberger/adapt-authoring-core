/**
 * Interface for REST functionality
 * @interface
 * @ignore
 */
export class REST {
  constructor() {

  }

  /**
  * Get the object
  * @param {String} route The route
  * @param {Object} id The ID of the item to get
  */
  get(route, id) {
    console.warn(`${this.constructor.name}.get: This function should be extended in the sub-class`);
  }

  /**
  * Create an object
  * @param {String} route The route
  * @param {Object} data The data
  */
  post(route, data) {
    console.warn(`${this.constructor.name}.post: This function should be extended in the sub-class`);
  }

  /**
  * Update the object
  * @param {String} route The route
  * @param {Object} data The data
  */
  put(route, data) {
    console.warn(`${this.constructor.name}.put: This function should be extended in the sub-class`);
  }

  /**
  * Delete the object
  * @param {String} route The route
  * @param {Object} id The ID of the item to delete
  */
  delete(route, id) {
    console.warn(`${this.constructor.name}.delete: This function should be extended in the sub-class`);
  }
}
