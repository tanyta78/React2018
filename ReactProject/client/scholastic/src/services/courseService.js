import requester from '../api/requester';

function pluralize(value) {
	if (value !== 1) return 's';
	else return '';
}

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
		// courseObj = {
		// 	authorId,
		// 	categoryId,
		// 	description,
		// 	imageUrl,
		// 	price,
		// 	duration,
		// 	place,
		// 	approved:false,
		// 	likes: 0,
		// 	views: 0
		// };

		return requester.post('appdata', 'courses', 'kinvey', courseObj);
	},

	editCourse:(updatedcourseObj) => {
		// let updatedcourseObj = {
		// 	authorId,
		// 	categoryId,
		// 	description,
		// 	imageUrl,
		// 	price,
		// 	duration,
		// 	place,
		// 	approved:false,
		// 	likes,
		// 	views
		// };

		return requester.update('appdata', `courses/${updatedcourseObj.id}`, 'kinvey', updatedcourseObj);
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
	},
	createdBeforeDays: createdOnString => {
		let dateIsoFormat = createdOnString;

		let diff = new Date() - (new Date(dateIsoFormat));
		diff = Math.floor(diff / 60000);
		if (diff < 1) return 'less than a minute';
		if (diff < 60) return diff + ' minute' + pluralize(diff);
		diff = Math.floor(diff / 60);
		if (diff < 24) return diff + ' hour' + pluralize(diff);
		diff = Math.floor(diff / 24);
		if (diff < 30) return diff + ' day' + pluralize(diff);
		diff = Math.floor(diff / 30);
		if (diff < 12) return diff + ' month' + pluralize(diff);
		diff = Math.floor(diff / 12);
		return diff + ' year' + pluralize(diff);
	},

	// casesensitive startWith = courses/?query={"firstName":{"$regex":"^Jo"} }
	searchCourses:(searchterm)=>{
		let endpoint = `courses/?query={"$or":[{"name":{"$regex":"^${searchterm}"}},{"description":{"$regex":"^${searchterm}"}},{"tags":{"$regex":"^${searchterm}"}}]}`;
		return requester.get('appdata',endpoint,'kinvey');
	}

};