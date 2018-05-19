import * as React from 'react';
import * as ReactDOM from 'react-dom';
import HelloWorld from '~/ui/hello';
import { setStatefulModules } from './hmr';

ReactDOM.render(<HelloWorld />, document.getElementById('app'));

setStatefulModules(name => /^ui\/hmr/.test(name) || /^ui\/store/.test(name));
