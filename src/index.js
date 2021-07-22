import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import FlowAdaptive from 'flow-adaptive'
 
new FlowAdaptive({
  fontRatio: 1440 / 10, // the best practice is to set fontRatio to base layout width / 10
  maxWidth: 1440,
  minWidth: 650,
  breakPoints: [
    {
      minWidth: 650,
      maxWidth: 900,
      fontRatio: 768 / 10,
    },
    {
      maxWidth: 649,
      fontRatio: 375 / 10,
    },
  ],
})

const app = (
	<React.StrictMode>
    	<App />
  	</React.StrictMode>
)

ReactDOM.render(
	app, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
