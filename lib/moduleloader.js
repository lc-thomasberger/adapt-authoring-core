/**
* Loader for local NPM modules.
*/
export class ModuleLoader {
  /**
  * Creates a new ModuleLoader instance
  * @param {object} dependencies A list of dependencies in [NPM dependencies format](https://docs.npmjs.com/files/package.json#dependencies)
  * @param {object} memo Object used to store module references
  */
  constructor(dependencies, memo) {
    /** @ignore **/
    this.dependencies = dependencies;
    /** @ignore **/
    this.memo = memo;
    /** @ignore **/
    this.modules = [];
  }

  /**
  * Preloads all stored modules
  * @returns {Promise} Promise
  */
  preloadModules() {
    return new Promise((resolve, reject) => {
      Promise.all(
        Object.keys(this.dependencies).map(this.preloadModule.bind(this))
      ).then(resolve).catch(reject);
    });
  }

  /**
  * Preloads a single module.
  * @param {String} moduleName Name of module to preload (must appear in dependencies)
  * @returns {Promise} Promise
  */
  preloadModule(moduleName) {
    return new Promise((resolve, reject) => {
      try {
        var ModClass = require(moduleName);
      }
      catch(e) {
        console.log(`Failed to load '${moduleName}', ${e}`);
        resolve();
      }
      if(typeof ModClass !== 'function') {
        console.warn(`'${moduleName}' is not a valid module`);
        resolve();
      }
      var instance = new ModClass(this.memo);
      this.modules.push(instance);
      // add a reference to memo
      this.memo[instance.instanceKey] = instance;

      if(!instance.preloadDelegate) {
        resolve();
      }
      instance.preloadDelegate().then(resolve).catch(reject);
    });
  }

  /**
  * Boots all stored modules
  * @returns {Promise} Promise
  */
  bootModules() {
    return new Promise((resolve, reject) => {
      Promise.all(
        this.modules.map(this.bootModule.bind(this))
      ).then(resolve).catch(reject);
    });
  }

  /**
  * Boots a single module.
  * @param {Module} instance An instance of the module to preload
  * @returns {Promise} Promise
  */
  bootModule(instance) {
    return new Promise((resolve, reject) => {
      if(!instance.bootDelegate) {
        resolve();
      }
      instance.bootDelegate().then(resolve).catch(reject);
    });
  }
}
