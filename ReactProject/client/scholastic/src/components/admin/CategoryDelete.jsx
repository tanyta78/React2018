import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import requester from '../../api/requester';
import observer from '../../api/observer';
import c from '../../api/constants';


export default class CategoryDelete extends Component {

	deleteCategory() {
		let categoryId=this.props.match.params.id;
			
		requester.remove('appdata', `categories/${categoryId}`, 'kinvey')
			.then(res => {
				observer.trigger(observer.events.notification, { type: 'success', message:c.CATEGORY_DELETE_SUCCESS });
											
			})
			.catch(err => {
			
				console.log(err);
				observer.trigger(observer.events.notification, { type: 'error', message: err.responseJSON.description });
			});
	}

	render(){
		this.deleteCategory();
		
		return <Redirect to={'/allCategories'}/>;
	}

}
