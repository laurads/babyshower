import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.css';
import awsmobile from './aws-exports';
import Amplify from 'aws-amplify';
import {IntlProvider} from 'react-intl';

Amplify.configure(awsmobile);

ReactDOM.render(<IntlProvider><App /></IntlProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
