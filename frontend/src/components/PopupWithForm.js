import React from "react";

function PopupWithForm({ name, title, children, buttonText, isOpen, onClose, onSubmit }) {

	return (
		<div className={`popup popup-${name} ${isOpen ? "popup_opened" : ""}`}>
			<div className="popup__container">
				<button type="button" className="button button_type_close" onClick={onClose} />
				<form name={name} onSubmit={onSubmit} className="popup__content" noValidate>
					<h2 className="popup__title">{title}</h2>
					<label className="popup__field">
						{children}
					</label>
					<button type="submit" className="button button_type_save popup__submit">{buttonText}</button>
				</form>
			</div>
		</div>
	)
}

export default PopupWithForm;