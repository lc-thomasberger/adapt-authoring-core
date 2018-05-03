import EventEmitter from 'events';

/**
 * Abstract class for authoring tool modules
 */
export class Module extends EventEmitter {
  /**
  * Creates a new Module instance
  * @returns {Module} The instance
  */
  constructor(app) {
    super();
    // store a reference to an arbitrary 'app' instance
    const __app = app;
    /**
    * Get function for the app instance
    * @returns {App} Instance of app
    */
    Object.defineProperty(this, 'app', { get: function() { return __app; } });
    /**
    * Whether the Module has finished preloading
    * @type {Boolean}
    */
    this.hasPreloaded = false;
    /**
    * Whether the Module has finished booting
    * @type {Boolean}
    */
    this.hasBooted = false;
  }

  /**
  * Returns the module name
  * @returns {String} Name
  */
  get name() {
    return this.constructor.name;
  }
  /**
  * Returns a 'key-friendly' version of the name (just makes first char lowercase)
  * @returns {String} Key
  */
  get instanceKey() {
    const name = this.name;
    return name[0].toLowerCase() + name.slice(1);
  }

  /**
  * Function to call any actions required to preload the module.
  * Will be passed as a promise executor to preloadDelegate
  * @param {Function} resolve Resolves the promise
  * @param {Function} reject Rejects the promise
  */
  preload(resolve, reject) {
    resolve();
  }
  /** @ignore **/
  preloadDelegate() {
    return new Promise(this.preload.bind(this)).then(() => {
      this.hasPreloaded = true;
      this.emit('preloaded');
    });
  }

  /**
  * Function to call any actions required to start the module.
  * Will be passed as a promise executor to bootDelegate
  * @param {Function} resolve Resolves the promise
  * @param {Function} reject Rejects the promise
  */
  boot(resolve, reject) {
    resolve();
  }
  /** @ignore **/
  bootDelegate() {
    return new Promise(this.boot.bind(this)).then(() => {
      this.hasBooted = true;
      this.emit('booted');
    });
  }
}
