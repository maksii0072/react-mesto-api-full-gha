import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {


	const [name, setName] = useState('');
	const [link, setLink] = useState('');

	function handleChangePlace(e) {
		setName(e.target.value);
	}

	function handleChangeLinkPlace(e) {
		setLink(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		onAddPlace({
			name: name,
			link: link
		})
	}

	useEffect(() => {
		setName('');
		setLink('');
	}, [isOpen])

	return (
		<PopupWithForm
			name="popup-card"
			title="Новое место"
			buttonText="Создать"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<label className="popup__field">
				<input
					className="popup__input popup__input_image_name"
					id="card-title"
					type="text"
					name="name"
					value={name}
					onChange={handleChangePlace}
					placeholder="Название"
					minLength={2}
					maxLength={30}
					required
				/>
				<span className="card-title-error popup__error" />
			</label>
			<label className="popup__field">
				<input
					className="popup__input popup__input_image_link"
					id="card-link"
					type="url"
					name="link"
					value={link}
					onChange={handleChangeLinkPlace}
					placeholder="Ссылка на картинку"
					required
				/>
				<span className="card-link-error popup__error" />
			</label>
		</PopupWithForm>
	)
}

export default AddPlacePopup; 