import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import '~/hmr';
import history from '~/services/history';
import store from '~/store';

ReactDOM.render(
  <Provider store={store as any}>
    <ConnectedRouter history={history}>
      <div>
        <div>Hello</div>
        <Link to="/bar">foo</Link>
        <Route path="/" exact render={() => <div>home</div>} />
        <Route path="/bar" exact render={() => <div>bar</div>} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app'),
);
