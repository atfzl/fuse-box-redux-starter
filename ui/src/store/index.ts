import { routerMiddleware } from 'react-router-redux';
import { Middleware, Store, applyMiddleware, createStore } from 'redux';
import ReduxLogger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { IRootAction, IRootState, rootEpic, rootReducer } from '~/ui/reducers';
import history from '~/ui/services/history';

export const epicMiddleware = createEpicMiddleware(rootEpic);

const configureStore = (): Store<IRootState, IRootAction> => {
  const middlewares: Middleware[] = [routerMiddleware(history), epicMiddleware];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(ReduxLogger);
  }

  return createStore<IRootState, IRootAction, any, any>(
    rootReducer,
    applyMiddleware(...middlewares),
  );
};

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  (window as any).store = store;
}

export default store;
