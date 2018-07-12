import requester from '../api/requester';

export default {
	loadAllApprovedCourses:()=> {
		let endpoint='courses?query={"approved":"true"}';
		return requester.get('appdata', endpoint, 'kinvey');
	},

	loadAllNotApprovedCourses:()=> {
		let endpoint='courses?query={"approved":"false"}';
		return requester.get('appdata', endpoint, 'kinvey');
	},

	createCourse:(courseObj) => {
		let courseObj = {
			authorId,
			categoryId,
			description,
			imageUrl,
			price,
			duration,
			place,
			approved:false,
			likes: 0,
			views: 0
		};

		return requester.post('appdata', 'courses', 'kinvey', courseObj);
	},

	editCourse:(updatedcourseObj) => {
		let updatedcourseObj = {
			authorId,
			categoryId,
			description,
			imageUrl,
			price,
			duration,
			place,
			approved:false,
			likes,
			views
		};

		return requester.update('appdata', `courses/${courseId}`, 'kinvey', updatedcourseObj);
	},

	deleteCourse:(courseId)=> {
		return requester.remove('appdata', `courses/${courseId}`, 'kinvey');
	},

	loadOwnCourses:(authorId)=> {
		let endpoint = `courses?query={"authorId":"${authorId}"}`;

		return requester.get('appdata', endpoint, 'kinvey');
	},

	loadCourseById:(courseId)=> {
		let endpoint = `courses/${courseId}`;

		return requester.get('appdata', endpoint, 'kinvey');
	},

	loadApprovedCoursesByCategoryId: (categoryId)=> {
		let endpoint = `courses?query={"categoryId":"${categoryId}","approved":"true"}`;

		return requester.get('appdata', endpoint, 'kinvey');
	}

}