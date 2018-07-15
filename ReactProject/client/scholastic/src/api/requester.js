import $ from 'jquery';

const kinveyBaseUrl = 'https://baas.kinvey.com/';
const kinveyAppKey = 'kid_HkdNKK_XQ';
const kinveyAppSecret = 'fb948b8b39694d348f6b4ee8ed3827a0';
const kinveyMasterSecret = '1beca62f651846838c50156384b1c528';

// Creates the authentication header
function makeAuth(type) {
	if(type === 'basic'){
		return 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret);
	}else if(type === 'admin'){
		return 'Basic ' + btoa(kinveyAppKey + ':' + kinveyMasterSecret);
	}else{
		return 'Kinvey ' + sessionStorage.getItem('authtoken');
	}
		
}

// Creates request object to kinvey
function makeRequest(method, module, endpoint, auth, query) {
	let url = kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint;
	if (query) {
		url += '?query=' + JSON.stringify(query);
	}

	return {
		method,
		url: url,
		headers: {
			'Authorization': makeAuth(auth)
		}
	};
}

// Function to return GET promise
function get (module, endpoint, auth, query) {
	return $.ajax(makeRequest('GET', module, endpoint, auth, query));
}

// Function to return POST promise
function post (module, endpoint, auth, data) {
	let req = makeRequest('POST', module, endpoint, auth);
	req.data = data;
	return $.ajax(req);
}

// Function to return PUT promise
function update (module, endpoint, auth, data) {
	let req = makeRequest('PUT', module, endpoint, auth);
	req.data = data;
	return $.ajax(req);
}

// Function to return DELETE promise
function remove (module, endpoint, auth) {
	return $.ajax(makeRequest('DELETE', module, endpoint, auth));
}

export default {
	get,
	post,
	update,
	remove
};