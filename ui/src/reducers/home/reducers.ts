import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actions from './actions';

export interface IReducerState {
  text: string;
}

const INITIAL_STATE: IReducerState = {
  text: '',
};

const reducer = reducerWithInitialState<IReducerState>(INITIAL_STATE)
  .case(actions.updateText, (state, payload): IReducerState => ({
    ...state,
    text: payload,
  }))
  .build();

export default reducer;
