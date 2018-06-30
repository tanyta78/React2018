const host = 'http://localhost:5000/';

async function register(name, email, password) {
	const res = await fetch(host + 'auth/signup', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name,
			email,
			password
		})
	});
	return await res.json();
}

async function login(email, password) {
	const res = await fetch(host + 'auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email,
			password
		})
	});
	return await res.json();
}
async function fetchPage(page) {
	const res = await fetch(host + 'furniture/all?page=' + page);
	return await res.json();
}

async function fetchDetails(id) {
	const res = await fetch(host + 'furniture/details/' + id, {
		method: 'GET',
		headers: {
			'Authorization': 'bearer ' + localStorage.getItem('authToken')
		},
	});
	return await res.json();
}

async function fetchSearchPage(query, page) {
	const res = await fetch(host + `furniture/all?page=${page}&search=${query}`);
	return await res.json();
}

async function fetchStats() {
	const res = await fetch(host + 'stats');
	return await res.json();
}

async function createFurniture(data) {
	const res = await fetch(host + 'furniture/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'bearer ' + localStorage.getItem('authToken')
		},
		body: JSON.stringify(data)
	});
	return await res.json();
}

export { register, login, fetchPage, fetchDetails, fetchSearchPage, fetchStats, createFurniture };