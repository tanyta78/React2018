$(() => {

	function validateRegisterFields(username, pass, repeatPass) {
		if (!/^[A-Za-z]{3,}$/g.test(username)) {
			showError('Username should be at least 3 characters long and contain only letters!');
			return false;
		}

		if (pass !== repeatPass) {
			showError('Passwords should match!');
			return false;
		}

		if (!/^[A-Za-z\d]{6,}$/.test(pass)) {
			showError('Password should be at least 6 characters long and contain alphanumerical characters!');
			return false;
		}

		return true;
	}

	// Attach event handlers
	(() => {
		$('#menu').find('a[data-target]').click(navigateTo);
		$('#registerForm').submit(registerUser);
		$('#updateUserForm').submit(updateUser);
		$('#loginForm').submit(loginUser);
		$('#createCourseForm').submit(createCourse);
		$('#createCommentForm').submit(createComment);
		$('#editCourseForm').submit(editCourse);
		$('#linkMenuLogout').click(logoutUser);
		$('#linkCatalog').click(loadAllApprovedPosts);
		$('#linkMyCourses').click(loadMyPosts);
		$('.notification').click(function () {
			$(this).hide();
		});
	})();

	if (sessionStorage.getItem('authtoken') === null) {
		userLoggedOut();
	} else {
		userLoggedIn();
		loadAllApprovedPosts();
	}

	// LOGIC TO VIEW MY POSTS
	function loadMyPosts() {
		let username = sessionStorage.getItem('username');

		coursesService.loadOwnCourses(username)
			.then((myOwnPosts) => {
				console.log(myOwnPosts);
				displayMyOwnPosts(myOwnPosts);
			}).catch(handleError);
	}

	function displayMyOwnPosts(myOwnPosts) {
		let postsContainer = $('#myForumPosts');
		postsContainer.empty();
		if (myOwnPosts.length === 0) {
			postsContainer.text('No posts in database.');
		}

		let counter = 1;
		for (let postObj of myOwnPosts) {
			let courseId = postObj['_id'];
			let rank = counter++;
			let timeCreated = calcTime(postObj._kmd.ect);
			let url = postObj['url'];
			let imageUrl = postObj['imageUrl'];
			let author = postObj['author'];
			let title = postObj['title'];
			let description = postObj['description'] === ''
				? 'No description.'
				: postObj['description'];

			let detailsLink = $(`<a  href="#" data-id="${courseId}">Details</a>`)
				.click(loadCourseDetails);
			let postDiv = $('<div class="post">')
				.append($('<div class="col rank">')
					.append('<span>').text(rank))
				.append($('<div class="col thumbnail">')
					.append($(`<a href="${url}">`)
						.append($(`<img src="${imageUrl}">`))))
				.append($('<div class="post-content">')
					.append($('<div class="title">')
						.append($(`<a href="${url}">`)
							.text(title)))
					.append($('<div class="details">')
						.append($('<div class="info">')
							.text(`submitted ${timeCreated} ago by ${author}`))
						.append($('<div class="controls">')
							.append($('<ul>')
								.append($('<li class="action">').append(detailsLink))))));

			if (author === sessionStorage.getItem('username')) {
				let controls = postDiv
					.find('.controls')
					.find('ul');

				controls.append($('<li class="action">')
					.append($(`<a href="#" data-id="${courseId}">Delete</a>`)
						.click(deletePost)));
				controls.append($('<li class="action">')
					.append($(`<a href="#" data-id="${courseId}">Edit</a>`)
						.click(displayEditForm)));
			}

			postsContainer.append(postDiv);
		}
	}

	// LOGIC TO VIEW CATALOG
	function loadAllApprovedPosts() {
		coursesService.loadAllApprovedPosts()
			.then((allPosts) => {
				displayCatalog(allPosts);
			}).catch(handleError);
	}

	function displayCatalog(allPosts) {
		let postsContainer = $('#allForumPosts');
		postsContainer.empty();

		if (allPosts.length === 0) {
			postsContainer.text('No posts in database.');
		}

		let counter = 1;
		for (let postObj of allPosts) {
			let courseId = postObj['_id'];
			let rank = counter++;
			let timeCreated = calcTime(postObj._kmd.ect);
			let url = postObj['url'];
			let imageUrl = postObj['imageUrl'];
			let author = postObj['author'];
			let title = postObj['title'];
			let description = postObj['description'] === ''
				? 'No description.'
				: postObj['description'];

			let detailsLink = $(`<a  href="#" data-id="${courseId}">Details</a>`)
				.click(loadCourseDetails);
			let postDiv = $('<div class="post">')
				.append($('<div class="col rank">')
					.append('<span>').text(rank))
				.append($('<div class="col thumbnail">')
					.append($(`<a href="${url}">`)
						.append($(`<img src="${imageUrl}">`))))
				.append($('<div class="post-content">')
					.append($('<div class="title">')
						.append($(`<a href="${url}">`)
							.text(title)))
					.append($('<div class="details">')
						.append($('<div class="info">')
							.text(`submitted ${timeCreated} ago by ${author}`))
						.append($('<div class="controls">')
							.append($('<ul>')
								.append($('<li class="action">').append(detailsLink))))));

			if (author === sessionStorage.getItem('username')) {
				let controls = postDiv
					.find('.controls')
					.find('ul');

				controls.append($('<li class="action">')
					.append($(`<a href="#" data-id="${courseId}">Delete</a>`)
						.click(deletePost)));
				controls.append($('<li class="action">')
					.append($(`<a href="#" data-id="${courseId}">Edit</a>`)
						.click(displayEditForm)));
			}

			postsContainer.append(postDiv);
		}
	}

	// LOGIC TO CREATE POST
	function createPost(ev) {
		ev.preventDefault();
		let author = sessionStorage.getItem('username');
		let urlInput = $(this).find('input[name="url"]');
		let titleInput = $(this).find('input[name="title"]');
		let imgInput = $(this).find('input[name="image"]');
		let descInput = $(this).find('textarea[name="description"]');

		if (urlInput.val() === '' || titleInput.val() === '') {
			showError('Url/Title cannot be empty!');
			return;
		}

		if (!urlInput.val().startsWith('http')) {
			showError('Url should start with http!');
			return;
		}

		let title = titleInput.val();
		let description = descInput.val();
		let url = urlInput.val();
		let imageUrl = imgInput.val();

		coursesService.createPost(author, title, description, url, imageUrl)
			.then(() => {
				urlInput.val('');
				titleInput.val('');
				imgInput.val('');
				descInput.val('');
				showInfo('Post created.');
				loadAllApprovedPosts();
				showView('Catalog');
			}).catch(handleError);
	}

	// LOGIC TO DELETE POST
	function deletePost() {
		let courseId = $(this).attr('data-id');

		coursesService.deletePost(courseId)
			.then(() => {
				showInfo('Post deleted.');
				loadAllApprovedPosts();
				showView('Catalog');
			}).catch(handleError);
	}

	//LOGIC TO EDIT COURSE
	function displayEditForm() {
		let courseId = $(this).attr('data-id');
		let editForm = $('#editCourseForm');

		coursesService.loadCourseById(courseId)
			.then((courseInfo) => {
				editForm.find('input[name="url"]').val(courseInfo['url']);
				editForm.find('input[name="title"]').val(courseInfo['title']);
				editForm.find('input[name="image"]').val(courseInfo['imageUrl']);
				editForm.attr('data-id', courseInfo._id);
				editForm.find('textarea[name="description"]').val(courseInfo['description']);
				showView('PostEdit');
			}).catch(handleError);

	}

	function editCourse(ev) {
		ev.preventDefault();
		let courseId = $(this).attr('data-id');
		let author = sessionStorage.getItem('username');
		let urlInput = $(this).find('input[name="url"]');
		let titleInput = $(this).find('input[name="title"]');
		let imgInput = $(this).find('input[name="image"]');
		let descInput = $(this).find('textarea[name="description"]');

		if (urlInput.val() === '' || titleInput.val() === '') {
			showError('Url/Title cannot be empty!');
			return;
		}

		if (!urlInput.val().startsWith('http')) {
			showError('Url should start with http!');
			return;
		}

		let title = titleInput.val();
		let description = descInput.val();
		let url = urlInput.val();
		let imageUrl = imgInput.val();

		coursesService.editPost(courseId, author, title, description, url, imageUrl)
			.then(() => {
				urlInput.val('');
				titleInput.val('');
				imgInput.val('');
				descInput.val('');
				showInfo(`Post ${title} created.`);
				loadAllApprovedPosts();
				showView('Catalog');
			}).catch(handleError);
	}

	//LOGIC TO LOAD POST DETAILS
	function loadCourseDetails(cId) {
		let courseId = $(this).attr('data-id');

		if (!courseId) {
			courseId = cId;
		}

		let coursePromise = coursesService.loadCourseById(courseId);
		let commentsPromise = commentsService.loadAllCommentsForCourse(courseId);
		Promise.all([coursePromise, commentsPromise])
			.then(([courseInfo, comments]) => {
				let authorId = courseInfo.authorId;
				authorService.loadAuthorById(authorId).then(authorInfo=>{
					displayCourseDetails([courseInfo, authorInfo,comments]);
					showView('CourseDetails');
				});
				
			})
			.catch(handleError);
	}
	//courseInfo - category,price,duration,place
	//authorInfo - fullName,cityId,phone,email,profileImage,personalInfo
	function displayCourseDetails([courseInfo,authorInfo, comments]) {
		$('#createCommentForm').attr('data-id', courseInfo._id);
		let courseContainer = $('#courseDetails');
		courseContainer.empty();
		let category = courseInfo['category'] === ''
			? 'No category'
			: courseInfo['category'];
		courseContainer.append($('<div class="col thumbnail">')
			.append($(`<img src="${authorInfo['profileImage']}">`))
			.append($('<div class="post-content">')
				.append($('<div class="title">')
					.append($('<strong>').text(authorInfo['fullName'])))
				.append($('<div class="details">').text(category))));

		//TO DO ADD DETAILS INFO

		let commentsContainer = $('#allComments');
		commentsContainer.empty();

		if (comments.length === 0) {
			commentsContainer.append($('<div>No comments yet.</div>'));
		}

		for (let comment of comments) {
			let commentAuthor = comment['authorId'];
			let content = comment['content'];
			let currentComment = $('<article class="comment">');
			currentComment.append($('<div class="comment-content">').text(content));

			if (commentAuthor === sessionStorage.getItem('userId')) {
				let deleteBtn = $(`<a href="#" data-target="${courseInfo._id}" data-id="${comment._id}" class="action">[Delete]</a>`)
					.click(deleteComment);
				currentComment.append(deleteBtn);
			}

			commentsContainer.append(currentComment);
		}
	}

	// LOGIC TO DELETE A COMMENT
	function deleteComment() {
		let courseId = $(this).attr('data-target');
		let commentId = $(this).attr('data-id');

		commentsService.deleteComment(commentId)
			.then(() => {
				showInfo('Comment deleted.');
				loadCourseDetails(courseId);
			}).catch(handleError);
	}

	// LOGIC TO CREATE A COMMENT
	function createComment(ev) {
		ev.preventDefault();
		let contentInput = $('#cmtContent');
		let courseId = $(this).attr('data-id');
		let authorId = sessionStorage.getItem('userId');
		let content = contentInput.val();

		commentsService.createComment(authorId, content, courseId)
			.then(() => {
				showInfo('Comment created.');
				loadCourseDetails(courseId);
				contentInput.val('');
			}).catch(handleError);
	}

	// LOGIC TO LOGOUT USER
	function logoutUser() {
		auth.logout()
			.then(() => {
				sessionStorage.clear();
				showInfo('Logout successful.');
				userLoggedOut();
				showView('SignIn');
			}).catch(handleError);
	}

	// LOGIC TO LOGIN USER
	function loginUser(ev) {
		ev.preventDefault();
		let loginForm = $('#loginForm');
		let usernameInput = loginForm.find('input[name="username"]');
		let passInput = loginForm.find('input[name="password"]');

		let usernameVal = usernameInput.val();
		let passVal = passInput.val();

		let allIsValid = validateRegisterFields(usernameVal, passVal, passVal);
		if (allIsValid) {
			auth.login(usernameVal, passVal)
				.then((userInfo) => {
					usernameInput.val('');
					passInput.val('');
					saveSession(userInfo);
					showInfo('User login successful.');
				}).catch(handleError);
		}
	}

	// LOGIC TO UPDATE USER PROFILE
	function updateUser(ev) {
		ev.preventDefault();
		let updateUserForm = $('#updateUserForm');
		let usernameInput = updateUserForm.find('input[name="usernameNew"]');
		let passInput = updateUserForm.find('input[name="passwordNew"]');
		let repeatPassInput = updateUserForm.find('input[name="repeatPassNew"]');
		let fullNameInput = updateUserForm.find('input[name="fullNameNew"]');
		let addressInput = updateUserForm.find('input[name="addressNew"]');
		let phoneInput = updateUserForm.find('input[name="phoneNew"]');
		let emailInput = updateUserForm.find('input[name="emailNew"]');
		let cityInput = updateUserForm.find('input[name="cityNew"]');
		let profileImgInput = updateUserForm.find('input[name="profileImgNew"]');
		let websiteInput = updateUserForm.find('input[name="websiteNew"]');
		let infoInput = updateUserForm.find('input[name="infoNew"]');


		let usernameVal = usernameInput.val();
		let passVal = passInput.val();
		let repeatPassVal = repeatPassInput.val();
		let fullNameVal = fullNameInput.val();
		let addressVal = addressInput.val();
		let phoneVal = phoneInput.val();
		let emailVal = emailInput.val();
		let cityVal = cityInput.val();
		let profileImgVal = profileImgInput.val();
		let websiteVal = websiteInput.val();
		let infoVal = infoInput.val();

		let allIsValid = validateRegisterFields(usernameVal, passVal, repeatPassVal);
		if (allIsValid) {
			let userData = {
				username: usernameVal,
				password: passVal,
				fullName: fullNameVal,
				address: addressVal,
				phone: phoneVal,
				email: emailVal,
				cityId: cityVal,
				profileImg: profileImgVal,
				website: websiteVal,
				info: infoVal
			};
			auth.update(userData)
				.then((userInfo) => {
					usernameInput.val('');
					passInput.val('');
					repeatPassInput.val('');
					fullNameInput.val('');
					addressInput.val('');
					phoneInput.val('');
					emailInput.val('');
					cityInput.val('');
					profileImgInput.val('');
					websiteInput.val('');
					infoInput.val('');
					//to do check kinvey responce
					//saveSession(userInfo);
					showInfo('Profile update successful.');
				}).catch(handleError);
		}
	}

	// LOGIC TO REGISTER USER
	function registerUser(ev) {
		ev.preventDefault();
		let registerForm = $('#registerForm');
		let usernameInput = registerForm.find('input[name="username"]');
		let passInput = registerForm.find('input[name="password"]');
		let repeatPassInput = registerForm.find('input[name="repeatPass"]');
		let fullNameInput = registerForm.find('input[name="fullName"]');
		let addressInput = registerForm.find('input[name="address"]');
		let phoneInput = registerForm.find('input[name="phone"]');
		let emailInput = registerForm.find('input[name="email"]');
		let cityInput = registerForm.find('input[name="city"]');
		let profileImgInput = registerForm.find('input[name="profileImg"]');
		let websiteInput = registerForm.find('input[name="website"]');
		let infoInput = registerForm.find('input[name="info"]');


		let usernameVal = usernameInput.val();
		let passVal = passInput.val();
		let repeatPassVal = repeatPassInput.val();
		let fullNameVal = fullNameInput.val();
		let addressVal = addressInput.val();
		let phoneVal = phoneInput.val();
		let emailVal = emailInput.val();
		let cityVal = cityInput.val();
		let profileImgVal = profileImgInput.val();
		let websiteVal = websiteInput.val();
		let infoVal = infoInput.val();

		let allIsValid = validateRegisterFields(usernameVal, passVal, repeatPassVal);
		if (allIsValid) {
			let userData = {
				username: usernameVal,
				password: passVal,
				fullName: fullNameVal,
				address: addressVal,
				phone: phoneVal,
				email: emailVal,
				cityId: cityVal,
				profileImg: profileImgVal,
				website: websiteVal,
				info: infoVal
			};
			auth.register(userData)
				.then((userInfo) => {
					usernameInput.val('');
					passInput.val('');
					repeatPassInput.val('');
					fullNameInput.val('');
					addressInput.val('');
					phoneInput.val('');
					emailInput.val('');
					cityInput.val('');
					profileImgInput.val('');
					websiteInput.val('');
					infoInput.val('');
					saveSession(userInfo);
					showInfo('User registration successful.');
				}).catch(handleError);
		}
	}


	function navigateTo() {
		let viewName = $(this).attr('data-target');
		showView(viewName);
	}

	function showView(viewName) {
		$('main > section').hide();
		$('#view' + viewName).show();
	}

	function userLoggedOut() {
		$('#menu').hide();
		$('#profile').hide();
		$('#username').text('');
		showView('SignIn');
	}

	function userLoggedIn() {
		$('#menu').show();
		$('#profile').show();
		$('#username').text(`Hello, ${sessionStorage.getItem('username')}!`);
		showView('Catalog');
		loadAllApprovedPosts();
	}

	function saveSession(userInfo) {
		let userAuth = userInfo._kmd.authtoken;
		sessionStorage.setItem('authtoken', userAuth);
		let username = userInfo.username;
		sessionStorage.setItem('username', username);
		let userId = userInfo._id;
		sessionStorage.setItem('userId', userId);
		userLoggedIn();
	}

	function handleError(reason) {
		showError(reason.responseJSON.description);
	}

	function showInfo(message) {
		let infoBox = $('#infoBox');
		infoBox.text(message);
		infoBox.show();
		setTimeout(() => infoBox.fadeOut(), 3000);
	}

	function showError(message) {
		let errorBox = $('#errorBox');
		errorBox.text(message);
		errorBox.show();
		setTimeout(() => errorBox.fadeOut(), 3000);
	}

	// HELPER FUNCTION FOR TIME
	function calcTime(dateIsoFormat) {
		let diff = new Date - (new Date(dateIsoFormat));
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

		function pluralize(value) {
			if (value !== 1) return 's';
			else return '';
		}
	}

	// Handle notifications
	$(document).on({
		ajaxStart: () => $('#loadingBox').show(),
		ajaxStop: () => $('#loadingBox').fadeOut()
	});
});