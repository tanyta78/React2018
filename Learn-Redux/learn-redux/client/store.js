import {createStore, compose} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';

//Import the root reducer
import rootReducer from './reducers/index';

import comments from './data/comments';
import posts from './data/posts';

//create an object for default data
const defaultState = {
	posts,
	comments
}

// const enhancers = compose(
// 	window.devToolsExtension ? window.devToolsExtension() : (f) => f
// );

// const store = createStore(rootReducer,defaultState, enhancers);

const store = createStore(rootReducer,defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const history = syncHistoryWithStore(browserHistory,store);

if(module.hot){
	module.hot.accept('./reducers/',()=>{
		const nextRootReducer = require('./reducers/index').default;
		store.replaceReducer(nextRootReducer);
	})
}

export default store;