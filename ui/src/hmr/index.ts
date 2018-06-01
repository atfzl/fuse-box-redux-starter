import { Loader } from 'fuse-box/modules/fuse-loader';
import store, { epicMiddleware } from '~/store';
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
        'reducers/index.js',
      );

      Loader.flush(fileName => {
        if (isDependentOnReducers && fileName === 'reducers/index.js') {
          return true;
        }
        return !isModuleStateful(fileName);
      });

      Loader.dynamic(path, content);

      if (isDependentOnReducers) {
        const { rootReducer, rootEpic } = require('~/reducers');

        store.replaceReducer(rootReducer);
        epicMiddleware.replaceEpic(rootEpic);
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

setStatefulModules(
  name =>
    /^hmr/.test(name) || /^store/.test(name) || /^services\/history/.test(name),
);
