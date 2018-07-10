import React, {Component} from 'react';
import withLogging from './withLogging';

class HomeBase extends Component{
	
	render(){
		return (
			<div>Home</div>
		);
	}
}
const Home=withLogging(HomeBase);

export default Home;