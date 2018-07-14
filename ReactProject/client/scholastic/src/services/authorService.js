import requester from '../api/requester';

export default{

	// user/register => author/create
	createAuthor:(userId)=> {
		let userData = {
			username:sessionStorage.username,
			userId,
			fullName:'',
			address:'',
			phone:'',
			email:'',
			cityId:'',
			profileImg:'',
			website:'',
			personalInfo:''
		};

		return requester.post('appdata', 'authors', 'kinvey', userData);
	},

	//user/update => author/update
	updateProfile:(data)=> {
		console.log(data);
		let updatedProfileData = {
			username:sessionStorage.username,
			userId:sessionStorage.userId,
			fullName:data.fullName,
			address:data.address,
			phone:data.phone,
			email:data.email,
			cityId:data.city,
			profileImg:data.profileImg,
			website:data.website,
			personalInfo:data.info
		};

		return requester.update('appdata', `authors/${data.authorId}`, 'kinvey', updatedProfileData);
	},

	// author/delete?!?
	deleteAuthor: ()=> {
		
	},

	//loadAuthorById
	loadAuthorById:(authorId) =>{
		let endpoint = `authors/${authorId}`;

		return requester.get('appdata', endpoint, 'kinvey');
	},

	//loadAuthorByUserId
	loadAuthorByUserId: (userId)=> {
		let endpoint=`authors?query={"userId":"${userId}"}`;

		return requester.get('appdata', endpoint, 'kinvey');
	}
};