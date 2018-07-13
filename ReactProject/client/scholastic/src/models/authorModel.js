export default {
	defaultState: {
		userId:'',
		username:'',
		fullName:'',
		address:'',
		phone:'',
		email:'',
		cityId:'',
		profileImage:'',
		website:'',
		personalInfo:''
	},
	validate: obj => {
		const {username, password} = obj;

		if (!username) {
			return 'Username is required';
		}

		if (!password) {
			return 'Password is required.';
		}
		
		//TODO: add validation
	}
};