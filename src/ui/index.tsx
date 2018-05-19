import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { setStatefulModules } from '~/ui/hmr';
import store from '~/ui/store';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store as any}>
      <div>
        <div>Hello</div>
        <Link to="/bar">foo</Link>
        <Route path="/" exact render={() => <div>home</div>} />
        <Route path="/bar" exact render={() => <div>bar</div>} />
      </div>
    </Provider>
  </BrowserRouter>,
  document.getElementById('app'),
);

setStatefulModules(name => /^ui\/hmr/.test(name) || /^ui\/store/.test(name));
