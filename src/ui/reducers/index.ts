import { RouterState, routerReducer } from 'react-router-redux';
import { Reducer, combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { IActions as IHomeActions, reducers as homeReducers } from './home';

export const rootReducer = combineReducers({
  router: routerReducer as Reducer<RouterState>,
  home: homeReducers,
});

export type IRootState = StateType<typeof rootReducer>;

export type IRootAction = IHomeActions;
