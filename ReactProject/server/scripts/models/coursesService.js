let coursesService = (() => {
	function loadAllApprovedCourses() {
		let endpoint='courses?query={"approved":"true"}';
		return requester.get('appdata', endpoint, 'kinvey');
	}

	function loadAllNotApprovedCourses() {
		let endpoint='courses?query={"approved":"false"}';
		return requester.get('appdata', endpoint, 'kinvey');
	}

	function createCourse(authorId, categoryId,description,imageUrl, price, duration, place) {
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
	}

	function editCourse(courseId, authorId, categoryId,description,imageUrl, price, duration, place, likes, views) {
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
	}

	function deleteCourse(courseId) {
		return requester.remove('appdata', `courses/${courseId}`, 'kinvey');
	}

	function loadOwnCourses(authorId) {
		let endpoint = `courses?query={"authorId":"${authorId}"}`;

		return requester.get('appdata', endpoint, 'kinvey');
	}

	function loadCourseById(courseId) {
		let endpoint = `courses/${courseId}`;

		return requester.get('appdata', endpoint, 'kinvey');
	}

	function loadApprovedCoursesByCategoryId(categoryId) {
		let endpoint = `courses?query={"categoryId":"${categoryId}","approved":"true"}`;

		return requester.get('appdata', endpoint, 'kinvey');
	}

	return {
		loadAllApprovedCourses,
		loadAllNotApprovedCourses,
		createCourse,
		editCourse,
		deleteCourse,
		loadOwnCourses,
		loadCourseById,
		loadApprovedCoursesByCategoryId
	};
})();