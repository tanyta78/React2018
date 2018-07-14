import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import '../../styles/all.css';

import requester from '../../api/requester';
import observer from '../../api/observer';
import c from '../../api/constants';


export default class CityDelete extends Component {

	deleteCity() {
		let cityId=this.props.match.params.id;
			
		requester.remove('appdata', `cities/${cityId}`, 'kinvey')
			.then(res => {
				observer.trigger(observer.events.notification, { type: 'success', message:c.CITY_DELETE_SUCCESS });
											
			})
			.catch(err => {
			
				console.log(err);
				observer.trigger(observer.events.notification, { type: 'error', message: err.responseJSON.description });
			});
	}

	render(){
		this.deleteCity();
		
		return <Redirect to={'/allCities'}/>;
	}

}
