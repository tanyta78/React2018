import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import requester from '../../api/requester';
import observer from '../../api/observer';

export default class Logout extends Component {
	logout() {
		requester.post('user', '_logout', 'kinvey')
			.then(res => {
				sessionStorage.removeItem('authtoken');
				observer.trigger(observer.events.logoutUser);
				observer.trigger(observer.events.notification, {type:'success',message:'Successful logout!'});
				//redirect to home page

			}).catch(err => {
				//handle err msg
				console.log(err);
				observer.trigger(observer.events.notification, {type:'error',message:'Unsuccesful logout!'});
				
			});
	}

	render(){
		this.logout();
		return <Redirect to="/"/>;
	}

}

