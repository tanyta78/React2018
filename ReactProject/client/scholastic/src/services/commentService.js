import requester from '../api/requester';
import observer from '../api/observer';

export default{
	loadAllCommentsForCourse:(courseId)=> {
		let endpoint = `comments?query={"courseId":"${courseId}"}`;

		return requester.get('appdata', endpoint, 'kinvey');
	},

	create:{
		send: data  => {
			data.username = sessionStorage.username;
			return requester.post('appdata', 'comments', 'kinvery', data);},
		fail: res => observer.trigger(observer.events.notification, res.responseJSON.message)
	},

	delete:(commentId)=> {
		return requester.remove('appdata', `comments/${commentId}`, 'kinvey');
	}
};