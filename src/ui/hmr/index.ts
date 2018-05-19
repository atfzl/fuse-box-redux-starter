import { Loader } from 'fuse-box/modules/fuse-loader';
import store from '~/ui/store';
import isDependantOn from './isDependantOn';

const customizedHMRPlugin = (
  statefulModuleCheck: (moduleName: string) => boolean,
) => ({
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

      if (isModuleStateful(path)) {
        window.location.reload();
      }

      const isDependentOnReducers = isDependantOn(
        dependants,
        path,
        'ui/reducers/index.js',
      );

      Loader.flush(fileName => {
        if (isDependentOnReducers && fileName === 'ui/reducers/index.js') {
          return true;
        }
        return !isModuleStateful(fileName);
      });

      Loader.dynamic(path, content);

      if (isDependentOnReducers) {
        store.replaceReducer(require('~/ui/reducers').rootReducer);
      }

      if (Loader.mainFile) {
        Loader.import(Loader.mainFile);
      }

      return true;
    }

    return false;
  },
});

let alreadyRegistered = false;

export const setStatefulModules = (
  isStateful: (moduleName: string) => boolean,
) => {
  if (!alreadyRegistered) {
    alreadyRegistered = true;
    Loader.addPlugin(customizedHMRPlugin(isStateful) as any);
  }
};
