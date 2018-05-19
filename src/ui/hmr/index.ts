import { Loader } from 'fuse-box/modules/fuse-loader';
import store from '~/ui/store';
import isDependantOn from './isDependantOn';

const customizedHMRPlugin = {
  hmrUpdate: ({
    type,
    path,
    content,
    dependants,
  }: {
    type: string;
    path: string;
    content: string;
    dependants: { [k: string]: string[] };
  }) => {
    if (type === 'js') {
      const isModuleStateful = (p: string) => statefulModuleCheck(p);

      /** If a stateful module has changed reload the window */
      if (isModuleStateful(path)) {
        window.location.reload();
      }

      const isDependentOnReducers = isDependantOn(
        dependants,
        path,
        'ui/reducers/index.js',
      );

      /** Otherwise flush the other modules */
      Loader.flush(fileName => {
        if (isDependentOnReducers && fileName === 'ui/reducers/index.js') {
          return true;
        }
        return !isModuleStateful(fileName);
      });

      /** Patch the module at give path */
      Loader.dynamic(path, content);

      if (isDependentOnReducers) {
        store.replaceReducer(require('~/ui/reducers').default());
      }

      /** Re-import / run the mainFile */
      if (Loader.mainFile) {
        try {
          Loader.import(Loader.mainFile);
        } catch (e) {
          // in case if a package was not found
          // It probably means that it's just not in the scope
          if (typeof e === 'string') {
            // a better way but string?!
            if (/not found/.test(e)) {
              window.location.reload();
            }
          }
          // tslint:disable-next-line:no-console
          console.error(e);
        }
      }

      /** We don't want the default behavior */
      return true;
    }

    return false;
  },
};

/** Only register the plugin once */
let alreadyRegistered = false;

/** Current names of stateful modules */
let statefulModuleCheck: (moduleName: string) => boolean = () => false;

/**
 * Registers given module names as being stateful
 * @param isStateful for a given moduleName returns true if the module is stateful
 */
export const setStatefulModules = (
  isStateful: (moduleName: string) => boolean,
) => {
  if (!alreadyRegistered) {
    alreadyRegistered = true;
    Loader.addPlugin(customizedHMRPlugin as any);
  }
  statefulModuleCheck = isStateful;
};
