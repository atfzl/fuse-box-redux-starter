import { LocationChangeAction, RouterAction } from 'react-router-redux';
import { ActionType } from 'typesafe-actions';
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('HOME');

const actions = {
  updateText: actionCreator<string>('updateText'),
  asyncUpdateText: actionCreator.async<
    string,
    { data: string },
    { error: string }
  >('asyncUpdateText'),
};

export default actions;

export type IActions =
  | RouterAction
  | LocationChangeAction
  | ActionType<typeof actions>;
