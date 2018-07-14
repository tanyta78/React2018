import requester from '../api/requester';
import observer from '../api/observer';
import c from '../api/constants';


export default {
	// user/login
	login: {
		send: data => requester.post('user', 'login', 'basic', data),
		success: function (res) {
			observer.trigger(observer.events.loginUser, res.username);
			observer.trigger(observer.events.notification, { type: 'success', message: c.USER_LOGIN_SUCCESS });
			let userRoles = res._kmd.roles ? res._kmd.roles.map(r => r.roleId) : [];

			sessionStorage.setItem('authtoken', res._kmd.authtoken);
			sessionStorage.setItem('userRoles', userRoles.join(','));
			sessionStorage.setItem('userId', res._id);
			sessionStorage.setItem('username', res.username);

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
			observer.trigger(observer.events.notification, { type: 'success', message: c.USER_REGISTER_SUCCESS });

			let userRoles = res._kmd.roles ? res._kmd.roles.map(r => r.roleId) : [];
			sessionStorage.setItem('authtoken', res._kmd.authtoken);
			sessionStorage.setItem('userRoles', userRoles.join(','));
			sessionStorage.setItem('userId', res._id);
			sessionStorage.setItem('username', res.username);

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
				observer.trigger(observer.events.notification, { type: 'success', message: c.USER_LOGOUT_SUCCESS });
				sessionStorage.removeItem('authtoken');
				sessionStorage.removeItem('userRoles');
				sessionStorage.removeItem('userId');
				sessionStorage.removeItem('username');
				
			}).catch(err => {
				observer.trigger(observer.events.notification, {
					type: 'error',
					message: err.responseJSON.description
				});
			});
	}
};