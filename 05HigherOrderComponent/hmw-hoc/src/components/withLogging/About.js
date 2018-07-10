import React, {Component} from 'react';
import withLogging from './withLogging';

class AboutBase extends Component{
	
	render(){
		return (
			<div>About</div>
		);
	}
}

const About=withLogging(AboutBase);

export default About;