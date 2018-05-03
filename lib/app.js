import Module from './datatypes/module';
import modules from 'adapt-authoring-modules';
import ModuleLoader from './moduleloader';

/**
 * The main application class
 */
export class App extends Module {
  preload(resolve, reject) {
    /**
    * The app's ModuleLoader instance
    * @type {ModuleLoader}
    */
    this.moduleloader = new ModuleLoader(modules, this);
    this.moduleloader.preloadModules().then(resolve).catch(reject);
  }

  boot(resolve, reject) {
    this.moduleloader.bootModules().then(resolve).catch(reject);
  }
}
