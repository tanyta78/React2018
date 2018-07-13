import requester from '../api/requester';
import observer from '../api/observer';
import authorService from './authorService';

export default {
	// user/login
	login: {
		send: data => requester.post('user', 'login', 'basic', data),
		success: function (res) {
			observer.trigger(observer.events.loginUser, res.username);
			observer.trigger(observer.events.notification, { type: 'success', message: 'User login successful.' });
			let userRoles = res._kmd.roles ? res._kmd.roles.map(r => r.roleId) : [];

			sessionStorage.setItem('authtoken', res._kmd.authtoken);
			sessionStorage.setItem('userRoles', userRoles.join(','));
			sessionStorage.setItem('userId', res._id);

			this.props.history.push('/catalog');
		},
		fail: res => {
			observer.trigger(observer.events.notification, {
				type: 'error',
				message: res.responseJSON.description
			});

			this.setState({ username: '', password: '' });
		}
	},
	// user/register
	register: {
		send: data => requester.post('user', '', 'basic', data),
		success: function (res) {
			observer.trigger(observer.events.loginUser, res.username);
			//TODO: trigger success msg notification
			let userRoles = res._kmd.roles ? res._kmd.roles.map(r => r.roleId) : [];
			sessionStorage.setItem('authtoken', res._kmd.authtoken);
			sessionStorage.setItem('userRoles', userRoles.join(','));
			sessionStorage.setItem('userId', res._id);

			authorService.createAuthor(res._id)
				.then(authorObj=>{
					this.props.history.push('/profile');
					//TODO: handle success msg

				})
				.catch(
					//TODO: handle error msg
				);

			
		},
		fail: function (res) {
			observer.trigger(observer.events.notification, {
				type: 'error',
				message: res.responseJSON.description
			});

			this.setState({ username: '', password: '' });
		}
	},
	// user/logout
	logout: () => {
		requester.post('user', '_logout', 'kinvey')
			.then(res => {
				observer.trigger(observer.events.notification, { type: 'success', message: 'User logout successful.' });
				sessionStorage.removeItem('authtoken');
				sessionStorage.removeItem('userRoles');
				sessionStorage.removeItem('userId');
			}).catch(err => {
				observer.trigger(observer.events.notification, {
					type: 'error',
					message: err.responseJSON.description
				});
			});
	}
};