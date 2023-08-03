export const BASE_URL = 'https://api.mesto.student.nomoreparties.co';

const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка: ${res.status}`);
};

export const register = (email, password) => {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password }),
	})
		.then(checkResponse)
}

export const login = (email, password) => {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password }),
	})
		.then(checkResponse)
}

export const getContent = (token) => {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then(checkResponse)
}