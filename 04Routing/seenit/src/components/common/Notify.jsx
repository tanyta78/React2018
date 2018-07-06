import React, { Component } from 'react';
import observer from '../../api/observer';
import '../../style/notifications.css';

const DEFAULT_STATE = {
	message: '',
	success: '',
	error: '',
	loading: ''
}

export default class Notify extends Component {
	constructor(props) {
		super(props);
		this.state = DEFAULT_STATE;

		observer.subscribe(observer.events.notification, this.showNotification);
	}

	showNotification = data => {
		let message = data.message;
		let type = data.type;
		this.setState({ [type]:type, message });
	}

	hideNotification = event => {
		this.setState(DEFAULT_STATE);
	}

	render() {
		let notificationType;
		if (this.state.success) {
			notificationType = 'infoBox';
		} else if (this.state.error) {
			notificationType = 'errorBox';

		} else if (this.state.loading) {
			notificationType = 'loadingBox';
		}

		return (
			<div id={notificationType}  className="notification" onClick={this.hideNotification} >{this.state.message} </div>
			
		)
	}

};
