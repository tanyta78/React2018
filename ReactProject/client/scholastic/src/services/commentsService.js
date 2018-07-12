import requester from '../api/requester';

export default{
	loadAllCommentsForCourse:(courseId)=> {
		let endpoint = `comments?query={"courseId":"${courseId}"}`;

		return requester.get('appdata', endpoint, 'kinvey');
	},

	createComment:(username, content, courseId)=> {
		let commentData = {
			username,
			content,
			courseId
		};

		return requester.post('appdata', 'comments', 'kinvey', commentData);
	},

	deleteComment:(commentId)=> {
		return requester.remove('appdata', `comments/${commentId}`, 'kinvey');
	}
}