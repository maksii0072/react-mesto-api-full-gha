import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

	const avatar = useRef();

	useEffect(() => {
		avatar.current.value = "";
	}, [avatar, isOpen]);

	function handleSubmit(e) {
		e.preventDefault();
		onUpdateAvatar({
			avatar: avatar.current.value,
		});
	}

	return (
		<PopupWithForm
			name="popup-avatar"
			title="Обновить аватар"
			buttonText="Сохранить"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<label className="popup__field">
				<input
					className="popup__input popup__input_avatar_link"
					id="avatar-link"
					type="url"
					name="avatar"
					ref={avatar}
					placeholder="Ссылка на новый аватар"
					required
				/>
				<span className="avatar-link-error popup__error" />
			</label>
		</PopupWithForm>
	)
}

export default EditAvatarPopup;