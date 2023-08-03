import React, { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';


function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
	const currentUser = useContext(CurrentUserContext);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	function handleChangeName(e) {
		setName(e.target.value);
	}

	function handleChangeDescription(e) {
		setDescription(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		onUpdateUser({
			name: name,
			about: description,
		});
	}

	useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser]);

	return (
		<PopupWithForm
			name="popup-profile"
			title="Редактировать профиль"
			buttonText="Сохранить"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<label className="popup__field">
				<input
					className="popup__input popup__input_user_name"
					id="profile-name"
					type="text"
					name="name"
					value={name}
					onChange={handleChangeName}
					minLength={2}
					maxLength={40}
					required
				/>
				<span className="profile-name-error popup__error" />
			</label>
			<label className="popup__field">
				<input
					className="popup__input popup__input_user_job"
					id="profile-job"
					type="text"
					name="job"
					value={description}
					onChange={handleChangeDescription}
					minLength={2}
					maxLength={200}
					required
				/>
				<span className="profile-job-error popup__error" />
			</label>
		</PopupWithForm>
	)
}

export default EditProfilePopup;