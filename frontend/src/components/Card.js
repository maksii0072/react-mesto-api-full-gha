import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

	const currentUser = useContext(CurrentUserContext);

	function handleClick() {
		onCardClick(card)
	}

	function handleLikeClick() {
		onCardLike(card)
	}

	function handleDeleteClick() {
		onCardDelete(card)
	}

	const isOwn = card.owner === currentUser._id;
	const isLiked = card.likes.some(id => id === currentUser._id);
	const cardLikeButtonClassName = (
		`button__like ${isLiked && 'button__like_active'}`
	);

	return (
		<article className="card">
			{isOwn && <button type="button" className="button button__delete" onClick={handleDeleteClick} />}
			<img src={card.link} alt={card.name} className="card__image" onClick={handleClick} />
			<div className="card__text">
				<h2 className="card__title">{card.name}</h2>
				<div className={cardLikeButtonClassName}>
					<button type="button" className="button button__like" onClick={handleLikeClick} />
					<p className="card__like-count">{card.likes.length}</p>
				</div>
			</div>
		</article>
	)
}

export default Card;