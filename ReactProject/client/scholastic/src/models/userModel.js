export default {
	defaultState: {
		username: '',
		password: ''
	},
	validate: obj => {
		const {username, password} = obj;

		if (!username) {
			return 'Username is required';
		}

		if (!password || password.length < 3  ) {
			return 'Password is required and must be more than 3 symbols';
		}
	
	}
};