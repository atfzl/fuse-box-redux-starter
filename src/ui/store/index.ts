import { routerMiddleware } from 'react-router-redux';
import { Middleware, Store, applyMiddleware, createStore } from 'redux';
import ReduxLogger from 'redux-logger';
import { IRootAction, IRootState, rootReducer } from '~/ui/reducers';
import history from '~/ui/services/history';

const configureStore = (): Store<IRootState, IRootAction> => {
  const middlewares: Middleware[] = [routerMiddleware(history)];

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
