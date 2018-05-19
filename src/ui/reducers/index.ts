import { RouterState, routerReducer } from 'react-router-redux';
import { Reducer, combineReducers } from 'redux';
import { Epic, combineEpics } from 'redux-observable';
import { StateType } from 'typesafe-actions';
import {
  IActions as IHomeActions,
  epics as homeEpics,
  reducers as homeReducers,
} from './home';

export const rootEpic = combineEpics(homeEpics);

export const rootReducer = combineReducers({
  router: routerReducer as Reducer<RouterState>,
  home: homeReducers,
});

export type IRootState = StateType<typeof rootReducer>;

export type IRootAction = IHomeActions;

export type IEpic = Epic<IRootAction, IRootState>;
