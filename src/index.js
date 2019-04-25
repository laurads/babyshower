import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.css';
import awsmobile from './aws-exports';
import Amplify from 'aws-amplify';
import {IntlProvider, addLocaleData} from 'react-intl';
import en from "react-intl/locale-data/en";
import fr from "react-intl/locale-data/fr";
import localeData from "./../build/locales/data.json";

addLocaleData([...en, ...fr]);

Amplify.configure(awsmobile);

const language =
(navigator.languages && navigator.languages[0]) ||
navigator.language ||
navigator.userLanguage;
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
const messages =
localeData[languageWithoutRegionCode] ||
localeData[language] ||
localeData.en;


ReactDOM.render(<IntlProvider locale={language} messages={messages}><App /></IntlProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
