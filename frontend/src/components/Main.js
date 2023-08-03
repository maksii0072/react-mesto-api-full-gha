import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {

	const { name, about, avatar } = useContext(CurrentUserContext);

	return (
		<div className="content">
			<section className="profile">
				<div className="profile__inner">
					<div className="profile__image">
						<img src={avatar} alt={name} className="profile__avatar" />
						<div className="profile__overlay">
							<button type="button" onClick={onEditAvatar} className="button button_type_avatar" />
						</div>
					</div>
					<div className="profile__info">
						<h1 className="profile__title">{name}</h1>
						<p className="profile__subtitle">{about}</p>
						<button type="button" onClick={onEditProfile} className="button button_type_edit" />
					</div>
				</div>
				<button type="button" onClick={onAddPlace} className="button button_type_add" />
			</section>
			<section className="cards" aria-label="Фотогалерея">
				{cards.map((card) => {
					return (
						<Card
							key={card._id}
							card={card}
							onCardClick={onCardClick}
							onCardLike={onCardLike}
							onCardDelete={onCardDelete}
						/>
					)
				})}
			</section>
		</div>
	);
}

export default Main;