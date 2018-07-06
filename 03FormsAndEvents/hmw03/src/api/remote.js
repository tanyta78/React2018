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

async function fetchAll() {
	const res = await fetch(host + 'pokedex/pokedex');
	return await res.json();
}

async function createPokemon(data) {
	const res = await fetch(host + 'pokedex/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'bearer ' + localStorage.getItem('authToken')
		},
		body: JSON.stringify(data)
	});
	return await res.json();
}

export { register, login, createPokemon, fetchAll };