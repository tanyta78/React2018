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
		$('#updateAuthorForm').submit(updateAuthor);
		$('#loginForm').submit(loginUser);
		$('#createCourseForm').submit(createCourse);
		$('#createCommentForm').submit(createComment);
		$('#editCourseForm').submit(editCourse);
		$('#linkMenuLogout').click(logoutUser);
		$('#linkCatalog').click(loadAllApprovedCourses);
		$('#linkMyCourses').click(loadMyCourses);
		$('#linkMyProfile').click(loadMyProfile);

		$('.notification').click(function () {
			$(this).hide();
		});
	})();

	if (sessionStorage.getItem('authtoken') === null) {
		userLoggedOut();
	} else {
		userLoggedIn();
		loadAllApprovedCourses();
	}

	// LOGIC TO VIEW MY POSTS
	function loadMyCourses() {
		let userId = sessionStorage.getItem('userId');

		authorService.loadAuthorByUserId(userId)
			.then(author => {
				let authorId = author._id;
				coursesService.loadOwnCourses(authorId)
					.then((myOwnCourses) => {
						console.log(myOwnCourses);
						displayMyOwnCourses(myOwnCourses);
					});

			}).catch(handleError);
	}

	// TODO: What to show in myCourses???
	function displayMyOwnCourses(myOwnCourses) {
		let coursesContainer = $('#myForumPosts');
		coursesContainer.empty();
		if (myOwnCourses.length === 0) {
			coursesContainer.text('No courses in database.');
		}

		let counter = 1;
		for (let courseObj of myOwnCourses) {
			let courseId = courseObj['_id'];
			let rank = counter++;
			let timeCreated = calcTime(courseObj._kmd.ect);
			let url = courseObj['url'];
			let imageUrl = courseObj['imageUrl'];
			let author = courseObj['author'];
			let title = courseObj['title'];
			let description = courseObj['description'] === '' ?
				'No description.' :
				courseObj['description'];

			let detailsLink = $(`<a  href="#" data-id="${courseId}">Details</a>`)
				.click(loadCourseDetails);
			let courseDiv = $('<div class="post">')
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
				let controls = courseDiv
					.find('.controls')
					.find('ul');

				controls.append($('<li class="action">')
					.append($(`<a href="#" data-id="${courseId}">Delete</a>`)
						.click(deleteCourse)));
				controls.append($('<li class="action">')
					.append($(`<a href="#" data-id="${courseId}">Edit</a>`)
						.click(displayEditForm)));
			}

			coursesContainer.append(courseDiv);
		}
	}

	// LOGIC TO VIEW CATALOG
	function loadAllApprovedCourses() {
		coursesService.loadAllApprovedCourses()
			.then((allCourses) => {
				displayCatalog(allCourses);
			}).catch(handleError);
	}
	//TODO: - WHAT TO SHOW IN COURSE CATALOG
	function displayCatalog(allCourses) {
		let coursesContainer = $('#allForumCourses');
		coursesContainer.empty();

		if (allCourses.length === 0) {
			coursesContainer.text('No courses in database.');
		}

		let counter = 1;
		for (let courseObj of allCourses) {
			let courseId = courseObj['_id'];
			let rank = counter++;
			let timeCreated = calcTime(courseObj._kmd.ect);
			let authorId = courseObj['authorId'];
			let categoryId = courseObj['categoryId'];
			let imageUrl = courseObj['imageUrl'];
			let price = courseObj['price'];
			let duration = courseObj['duration'];
			let place = courseObj['place'];
			let likes = courseObj['likes'];
			let views = courseObj['views'];


			let detailsLink = $(`<a  href="#" data-id="${courseId}">Details</a>`)
				.click(loadCourseDetails);
			let courseDiv = $('<div class="post">')
				.append($('<div class="col rank">')
					.append('<span>').text(rank))
				.append($('<div class="col thumbnail">')
					.append($(`<img src="${imageUrl}">`)))
				.append($('<div class="post-content">')
					.append($('<div class="title">')
						.text(categoryName)))
				.append($('<div class="details">')
					.append($('<div class="info">')
						.text(`submitted ${timeCreated} ago by ${authorFullName}`))
					.append($('<div class="controls">')
						.append($('<ul>')
							.append($('<li class="action">').append(detailsLink)))));

			if (authorId === sessionStorage.getItem('userId')) {
				let controls = courseDiv
					.find('.controls')
					.find('ul');

				controls.append($('<li class="action">')
					.append($(`<a href="#" data-id="${courseId}">Delete</a>`)
						.click(deleteCourse)));
				controls.append($('<li class="action">')
					.append($(`<a href="#" data-id="${courseId}">Edit</a>`)
						.click(displayEditForm)));
			}

			coursesContainer.append(courseDiv);
		}
	}

	// LOGIC TO CREATE COURSE
	function createCourse(ev) {
		ev.preventDefault();
		let imgInput = $(this).find('input[name="imageUrl"]');
		let priceInput = $(this).find('input[name="price"]');
		let durationInput = $(this).find('input[name="duration"]');
		let placeInput = $(this).find('input[name="place"]');
		let descInput = $(this).find('textarea[name="description"]');
		//  TODO: create select input for category. Load all categories from db.Set categoryId as option value or data-categoryId
		//$('#example').append('<option value="foo" selected="selected">Foo</option>');
		let categoryInput = $(this).find('select[name="category"]');

		// TODO: add validation
		// if (urlInput.val() === '' || titleInput.val() === '') {
		// 	showError('Url/Title cannot be empty!');
		// 	return;
		// }

		// if (!urlInput.val().startsWith('http')) {
		// 	showError('Url should start with http!');
		// 	return;
		// }

		let userId = sessionStorage.getItem('userId');

		let description = descInput.val();
		let imageUrl = imgInput.val();
		let price = priceInput.val();
		let duration = durationInput.val();
		let place = placeInput.val();
		let categoryId = categoryInput.find(':selected').val();

		authorService.loadAuthorByUserId(userId)
			.then((author) => {
				let authorId = author._id;
				coursesService.createPost(authorId, categoryId, description, imageUrl, price, duration, place)
					.then(() => {
						placeInput.val('');
						durationInput.val('');
						priceInput.val('');
						imgInput.val('');
						descInput.val('');
						showInfo('Course created. Please wait for admin approval.');
						loadMyCourses();

					});
			}).catch(handleError);
	}

	// LOGIC TO DELETE COURSE
	function deleteCourse() {
		let courseId = $(this).attr('data-id');

		coursesService.deleteCourse(courseId)
			.then(() => {
				showInfo('Course deleted.');
				loadMyCourses();
				// showView('Catalog');
			}).catch(handleError);
	}

	//LOGIC TO EDIT COURSE
	function displayEditForm() {
		let courseId = $(this).attr('data-id');
		let editForm = $('#editCourseForm');

		coursesService.loadCourseById(courseId)
			.then((courseInfo) => {
				editForm.find('input[name="imageUrl"]').val(courseInfo['imageUrl']);
				editForm.find('input[name="price"]').val(courseInfo['price']);
				editForm.find('input[name="duration"]').val(courseInfo['duration']);
				editForm.find('input[name="place"]').val(courseInfo['place']);
				editForm.attr('data-id', courseInfo._id);
				editForm.attr('data-authorId', courseInfo.authorId);
				editForm.attr('data-categoryId', courseInfo.categoryId);
				editForm.attr('data-likes', courseInfo.likes);
				editForm.attr('data-views', courseInfo.views);
				editForm.find('textarea[name="description"]').val(courseInfo['description']);
				showView('CourseEdit');
			}).catch(handleError);

	}

	function editCourse(ev) {
		ev.preventDefault();
		let courseId = $(this).attr('data-id');
		let authorId = $(this).attr('data-authorId');
		let categoryId = $(this).attr('data-categotyId');
		let likes = $(this).attr('data-likes');
		let views = $(this).attr('data-views');
		let imgInput = $(this).find('input[name="imageUrl"]');
		let priceInput = $(this).find('input[name="price"]');
		let durationInput = $(this).find('input[name="duration"]');
		let placeInput = $(this).find('input[name="place"]');
		let descInput = $(this).find('textarea[name="description"]');

		//TODO: create courseValidation
		//TODO: create constants - messages ...

		// if (urlInput.val() === '' || titleInput.val() === '') {
		// 	showError('Url/Title cannot be empty!');
		// 	return;
		// }

		// if (!urlInput.val().startsWith('http')) {
		// 	showError('Url should start with http!');
		// 	return;
		// }

		let description = descInput.val();
		let imageUrl = imgInput.val();
		let price = priceInput.val();
		let duration = durationInput.val();
		let place = placeInput.val();

		coursesService.editCourse(courseId, authorId, categoryId, description, imageUrl, price, duration, place, likes, views)
			.then(() => {
				descInput.val('');
				imgInput.val('');
				priceInput.val('');
				durationInput.val('');
				placeInput.val('');
				showInfo('Course edited. Now please wait for approval.');
				loadMyCourses();
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
				authorService.loadAuthorById(authorId).then(authorInfo => {
					displayCourseDetails([courseInfo, authorInfo, comments]);
					showView('CourseDetails');
				});

			})
			.catch(handleError);
	}
	//courseInfo - category,price,duration,place
	//authorInfo - fullName,cityId,phone,email,profileImage,personalInfo
	function displayCourseDetails([courseInfo, authorInfo, comments]) {
		$('#createCommentForm').attr('data-id', courseInfo._id);
		let courseContainer = $('#courseDetails');
		courseContainer.empty();
		let category = courseInfo['category'] === '' ?
			'No category' :
			courseInfo['category'];
		courseContainer.append($('<div class="col thumbnail">')
			.append($(`<img src="${authorInfo['profileImage']}">`))
			.append($('<div class="course-content">')
				.append($('<div class="title">')
					.append($('<strong>').text(authorInfo['fullName'])))
				.append($('<div class="details">').text(category))));

		//TODO: ... ADD DETAILS INFO

		let commentsContainer = $('#allComments');
		commentsContainer.empty();

		if (comments.length === 0) {
			commentsContainer.append($('<div>No comments yet.</div>'));
		}

		for (let comment of comments) {
			let commentAuthor = comment['username'];
			let content = comment['content'];
			let currentComment = $('<article class="comment">');
			currentComment.append($('<div class="comment-content">').text(content));

			if (commentAuthor === sessionStorage.getItem('username')) {
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
		let username = sessionStorage.getItem('username');
		let content = contentInput.val();

		commentsService.createComment(username, content, courseId)
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

	// LOGIC TO UPDATE AUTHOR PROFILE
	function loadMyProfile() {
		let userId = sessionStorage.getItem('userId');

		authorService.loadAuthorByUserId(userId)
			.then(author => {
				displayUpdateAuhtorForm(author);

			}).catch(handleError);
	}

	function displayUpdateAuhtorForm(authorInfo) {
		let editForm = $('#updateAuthorForm');

		editForm.find('input[name="fullNameNew"]').val(authorInfo['fullName']);
		editForm.find('input[name="addressNew"]').val(authorInfo['address']);
		editForm.find('input[name="phoneNew"]').val(authorInfo['phone']);
		editForm.find('input[name="emailNew"]').val(authorInfo['email']);
		editForm.find('input[name="cityNew"]').val(authorInfo['city']);
		editForm.find('input[name="profileImgNew"]').val(authorInfo['profileImg']);
		editForm.find('input[name="websiteNew"]').val(authorInfo['website']);
		editForm.find('input[name="infoNew"]').val(authorInfo['info']);
		editForm.attr('data-id', authorInfo._id);
		showView('MyProfile');

	}

	function updateAuthor(ev) {
		ev.preventDefault();
		let updateAuthorForm = $('#updateAuthorForm');
		let authorId = sessionStorage.getItem('authorId');
		let userId = sessionStorage.getItem('userId');
		let fullNameInput = updateAuthorForm.find('input[name="fullNameNew"]');
		let addressInput = updateAuthorForm.find('input[name="addressNew"]');
		let phoneInput = updateAuthorForm.find('input[name="phoneNew"]');
		let emailInput = updateAuthorForm.find('input[name="emailNew"]');
		let cityInput = updateAuthorForm.find('input[name="cityNew"]');
		let profileImgInput = updateAuthorForm.find('input[name="profileImgNew"]');
		let websiteInput = updateAuthorForm.find('input[name="websiteNew"]');
		let infoInput = updateAuthorForm.find('input[name="infoNew"]');

		let fullNameVal = fullNameInput.val();
		let addressVal = addressInput.val();
		let phoneVal = phoneInput.val();
		let emailVal = emailInput.val();
		let cityVal = cityInput.val();
		let profileImgVal = profileImgInput.val();
		let websiteVal = websiteInput.val();
		let infoVal = infoInput.val();

		// TODO: add validation
		let allIsValid = true;
		// validateRegisterFields(usernameVal, passVal, repeatPassVal);
		if (allIsValid) {
			let authorData = {
				authorId: authorId,
				userId: userId,
				fullName: fullNameVal,
				address: addressVal,
				phone: phoneVal,
				email: emailVal,
				cityId: cityVal,
				profileImg: profileImgVal,
				website: websiteVal,
				info: infoVal
			};
			authorService.updateProfile(authorData)
				.then((authorInfo) => {
					fullNameInput.val('');
					addressInput.val('');
					phoneInput.val('');
					emailInput.val('');
					cityInput.val('');
					profileImgInput.val('');
					websiteInput.val('');
					infoInput.val('');

					showInfo('Profile update successful.');
				}).catch(handleError);
		}
	}

	//LOGIC TO UPDATE USER - ADMIN FUNCTION
	function updateUser(ev) {
		// TODO: add admin functionality and functions in authServise or adminServise
		ev.preventDefault();
		let updateUserForm = $('#updateUserForm');
		let usernameInput = updateUserForm.find('input[name="usernameNew"]');
		let passInput = updateUserForm.find('input[name="passwordNew"]');
		let repeatPassInput = updateUserForm.find('input[name="repeatPassNew"]');
		let usernameVal = usernameInput.val();
		let passVal = passInput.val();
		let repeatPassVal = repeatPassInput.val();
		let allIsValid = validateRegisterFields(usernameVal, passVal, repeatPassVal);
		if (allIsValid) {
			let userData = {
				username: usernameVal,
				password: passVal
			};
			auth.update(userData)
				.then((userInfo) => {
					usernameInput.val('');
					passInput.val('');
					repeatPassInput.val('');
				});
		}
	}

	// LOGIC TO REGISTER USER and CREATE AUTHOR PROFILE
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
			};
			auth.register(userData)
				.then((userInfo) => {
					let profileData = {
						userId: userInfo._id,
						fullName: fullNameVal,
						address: addressVal,
						phone: phoneVal,
						email: emailVal,
						cityId: cityVal,
						profileImg: profileImgVal,
						website: websiteVal,
						info: infoVal
					};
					authorService.createAuthor(profileData)
						.then(authorData => {
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
							userInfo.authorId = authorData._id;
							saveSession(userInfo);
							showInfo('User registration successful.');
						});

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
		loadAllApprovedCourses();
	}

	function saveSession(userInfo) {
		let userAuth = userInfo._kmd.authtoken;
		sessionStorage.setItem('authtoken', userAuth);
		let username = userInfo.username;
		sessionStorage.setItem('username', username);
		let userId = userInfo._id;
		sessionStorage.setItem('userId', userId);
		let authorId = userInfo.authorId;
		sessionStorage.setItem('authorId', authorId);
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