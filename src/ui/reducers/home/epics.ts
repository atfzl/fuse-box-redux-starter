import { combineEpics } from 'redux-observable';
import { empty } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { IEpic } from '~/ui/reducers';
import { actions } from './';

const epics: IEpic[] = [
  action$ =>
    action$.pipe(
      filter(actions.updateText.match),
      mergeMap(action => {
        // tslint:disable-next-line:no-console
        console.log('payload is', action.payload);
        return empty();
      }),
    ),
];

export default combineEpics(...epics);
