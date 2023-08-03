import React from 'react';

function ImagePopup({ card, onClose }) {
	return (
		<div className={`popup popup-${card.name} ${card.name ? "popup_opened" : ""}`}>
			<figure className="popup__container-image">
				<button type="button" className="button button_type_close" onClick={onClose} />
				<img src={card.link} alt={card.name} className="popup__image" />
				<figcaption className="popup__caption">{card.name}</figcaption>
			</figure>
		</div>
	)
}

export default ImagePopup;