import React, { Component } from 'react';
import '../../style/site.css';


import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';
import About from './About';

class HomePage extends Component {
	
	render() {
		return (
			<section id="viewSignIn">
				<div className="welcome">
					<div className="signup">
						<LoginForm {...this.props}/>
						<RegisterForm {...this.props}/>				
					</div>
					<About/>
				</div>
			</section>
		);
	}
}

export default HomePage;