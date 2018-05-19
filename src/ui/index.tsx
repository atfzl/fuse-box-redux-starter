import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { setStatefulModules } from '~/ui/hmr';
import store from '~/ui/store';

ReactDOM.render(
  <Provider store={store as any}>
    <div>Hello</div>
  </Provider>,
  document.getElementById('app'),
);

setStatefulModules(name => /^ui\/hmr/.test(name) || /^ui\/store/.test(name));
