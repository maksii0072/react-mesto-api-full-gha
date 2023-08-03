class Api {
	constructor({ baseUrl }) {
		this._baseUrl = baseUrl;
	}

	_responseOutput(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	};


	getInfoProfile() {
		const token = localStorage.getItem('token');
		return fetch(`${this._baseUrl}/users/me`, {
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		}).then(this._responseOutput)
	}

	getInitialCards() {
		const token = localStorage.getItem('token');
		return fetch(`${this._baseUrl}/cards`, {
			headers: {
				authorization: `Bearer ${token}`,
			}
		}).then(this._responseOutput)
	}

	editInfoProfile({ name, about }) {
		const token = localStorage.getItem('token');
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				about
			})
		}).then(this._responseOutput)
	}

	addCard({ name, link }) {
		const token = localStorage.getItem('token');
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				link
			})
		}).then(this._responseOutput)
	}

	editProfileAvatar({ avatar }) {
		const token = localStorage.getItem('token');
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				avatar,
			})
		}).then(this._responseOutput)
	}

	deleteCard(cardId) {
		const token = localStorage.getItem('token');
		return fetch(`${this._baseUrl}/cards/${cardId}`, {
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${token}`,
			}
		}).then(this._responseOutput)
	}

	changeLikeCardStatus(id, isLiked) {
		const token = localStorage.getItem('token');
		return fetch(`${this._baseUrl}/cards/${id}/likes`, {
			method: isLiked ? 'PUT' : 'DELETE',
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		}).then(this._responseOutput)
	}

}

const api = new Api({
	baseUrl: 'https://api.mesto.student.nomoreparties.co',
});

export default api;