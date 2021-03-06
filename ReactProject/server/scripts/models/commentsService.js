let commentsService = (() => {
	function loadAllCommentsForCourse(courseId) {
		let endpoint = `comments?query={"courseId":"${courseId}"}`;

		return requester.get('appdata', endpoint, 'kinvey');
	}

	function createComment(username, content, courseId) {
		let commentData = {
			username,
			content,
			courseId
		};

		return requester.post('appdata', 'comments', 'kinvey', commentData);
	}

	function deleteComment(commentId) {
		return requester.remove('appdata', `comments/${commentId}`, 'kinvey');
	}

	return {
		loadAllCommentsForCourse,
		createComment,
		deleteComment
	};
})();