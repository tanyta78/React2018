import requester from '../api/requester';
import observer from '../api/observer';

export default {
	// user/login
	login: {
		send: data => requester.post('user', 'login', 'basic', data),
		success: function (res) {
			observer.trigger(observer.events.loginUser, res.username);
			observer.trigger(observer.events.notification, { type: 'success', message: "User login successful." })

			sessionStorage.setItem('authtoken', res._kmd.authtoken);
			sessionStorage.setItem('userRoles', res.Roles.join(','));
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
			sessionStorage.setItem('authtoken', res._kmd.authtoken);
			sessionStorage.setItem('userRoles', res.Roles.join(','));
			sessionStorage.setItem('userId', res._id);
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
	logout: {
		send: () => requester.post('user', '_logout', 'kinvey'),
		success: function (res) {
			observer.trigger(observer.events.notification, { type: 'success', message: "User logout successful." })
			sessionStorage.removeItem('authtoken');
			sessionStorage.removeItem('userRoles');
			sessionStorage.removeItem('userId');
		},
		fail: function (res) {
			observer.trigger(observer.events.notification, {
				type: 'error',
				message: res.responseJSON.description
			});
		}
	}
}