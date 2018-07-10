let authorService = (() => {

	// user/register => author/create
	function createAuthor(data) {
		let userData = {
			userId:data.userId,
			fullName:data.fullName,
			address:data.address,
			phone:data.phone,
			email:data.email,
			cityId:data.city,
			profileImage:data.profileImg,
			website:data.website,
			personalInfo:data.info
		};

		return requester.post('appdata', 'authors', 'kinvey', userData);
	}

	//user/update => author/update
	function updateProfile(data) {
		let updatedProfileData = {
			userId:data.userId,
			fullName:data.fullName,
			address:data.address,
			phone:data.phone,
			email:data.email,
			cityId:data.city,
			profileImage:data.profileImg,
			website:data.website,
			personalInfo:data.info
		};

		return requester.update('appdata', `authors/${data.authorId}`, 'kinvey', updatedProfileData);
	}

	// author/delete?!?
	function deleteAuthor() {
		
	}

	//loadAuthorById
	function loadAuthorById(authorId) {
		let endpoint = `authors/${authorId}`;

		return requester.get('appdata', endpoint, 'kinvey');
	}

	//loadAuthorByUserId
	function loadAuthorByUserId(userId) {
		let endpoint=`authors?query={"userId":"${userId}"}`;

		return requester.get('appdata', endpoint, 'kinvey');
	}

	return {
		createAuthor,
		updateProfile,
		deleteAuthor,
		loadAuthorById,
		loadAuthorByUserId
	};
})();