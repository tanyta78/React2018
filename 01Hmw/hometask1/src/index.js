import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './elements/App';
import registerServiceWorker from './registerServiceWorker';

function clickHandler (id) {
	const app=App(clickHandler,id);
	ReactDOM.render(app, document.getElementById('root'));
}
//clickHandler(0);
/*to work correct with contact list onClick it must be used without interval. Time will change on click.*/
setInterval(function(){clickHandler(0);},1000); 
registerServiceWorker();
