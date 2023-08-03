import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import api from '../utils/Api';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import * as auth from '../utils/auth';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

function App() {

	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isInfoTooltipPopup, setIsInfoTooltipPopup] = useState(false);
	const [isInfoTooltipImage, setIsInfoTooltipImage] = useState(false);
	const [isInfoTooltipMessage, setIsInfoTooltipMessage] = useState('');
	const [selectedCard, setSelectedCard] = useState({});
	const [cards, setCards] = useState([]);
	const [currentUser, setCurrentUser] = useState({
		_id: '',
		avatar: '',
		name: '',
		about: '',
		cohort: ''
	});
	const [loggedIn, setLoggedIn] = useState(false);
	const [userEmail, setUserEmail] = useState('');
	const navigate = useNavigate();

	// проверка токена
	const tokenCheck = () => {
		const token = localStorage.getItem('token');
		if (token) {
			auth.getContent(token)
				.then((res) => {
					if (res) {
						setLoggedIn(true);
						setUserEmail(res.email);
						navigate('/', { replace: true })
					}
				})
				.catch(err => console.log(err));
		}
	}

	//регистрация
	const handleRegister = ({ email, password }) => {
		auth.register(email, password)
			.then((res) => {
				if (res) {
					setIsInfoTooltipPopup(true);
					setIsInfoTooltipImage(true);
					setIsInfoTooltipMessage('Вы успешно зарегистрировались!');
					navigate('/sign-in', { replace: true });
				}
			}).catch((err) => {
				setIsInfoTooltipPopup(true);
				setIsInfoTooltipImage(false);
				setIsInfoTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.');
				console.log(err);
			})
	}

	//авторизация
	const handleLogin = ({ email, password }) => {
		auth.login(email, password)
			.then((res) => {
				if (res.token) {
					localStorage.setItem('token', res.token);
					setLoggedIn(true);
					navigate('/', { replace: true });
				}
			})
			.catch((err) => {
				setIsInfoTooltipPopup(true);
				setIsInfoTooltipImage(false);
				setIsInfoTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.');
				console.log(err);
			})
			.finally(() => {
				setUserEmail(email);
			})
	}

	//выход
	const handleSignOut = () => {
		localStorage.removeItem('token');
		setLoggedIn(false);
		navigate('/sign-in', { replace: true });
	}

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}
	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	}
	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}
	function handleCardClick(card) {
		setSelectedCard(card);
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some(id => id === currentUser._id);
		api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
			setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
		}).catch((err) => {
			console.log(err);
		});
	}

	function handleCardDelete(card) {
		const isOwn = card.owner._id === currentUser._id;
		api.deleteCard(card._id, !isOwn)
			.then(() => {
				const deleteCard = cards.filter((c) => c._id !== card._id);
				setCards(deleteCard);
			}).catch((err) => {
				console.log(err);
			});
	}

	function handleUpdateUser(userInfo) {
		api.editInfoProfile(userInfo)
			.then((data) => {
				setCurrentUser(data);
				closeAllPopups();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function handleUpdateAvatar(userAvatar) {
		api.editProfileAvatar(userAvatar)
			.then((data) => {
				setCurrentUser(data);
				closeAllPopups();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function handleAddPlaceSubmit(newCard) {
		api.addCard(newCard)
			.then((data) => {
				setCards([data, ...cards]);
				closeAllPopups();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	useEffect(() => {
		loggedIn && Promise.all([api.getInfoProfile(), api.getInitialCards()])
			.then(([data, dataCard]) => {
				setCurrentUser(data)
				setCards(dataCard)
			})
			.catch(console.log)
	}, [loggedIn])

	useEffect(() => {
		tokenCheck()
	}, [])

	function closeAllPopups() {
		setIsEditAvatarPopupOpen(false)
		setIsEditProfilePopupOpen(false)
		setIsAddPlacePopupOpen(false)
		setIsInfoTooltipPopup(false)
		setSelectedCard({})
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="root">
				<div className="page">
					<Header
						loggedIn={loggedIn}
						userEmail={userEmail}
						onSignOut={handleSignOut} />
					<Routes>
						<Route path='/*' element={<Login onLogin={handleLogin} />} />
						<Route path='/sign-in' element={<Login onLogin={handleLogin} />} />
						<Route path='/sign-up' element={<Register onRegister={handleRegister} />} />
						<Route path='/' element={<ProtectedRoute
							onEditAvatar={handleEditAvatarClick}
							onEditProfile={handleEditProfileClick}
							onAddPlace={handleAddPlaceClick}
							onCardClick={handleCardClick}
							onCardLike={handleCardLike}
							onCardDelete={handleCardDelete}
							loggedIn={loggedIn}
							cards={cards}
							element={Main}
						/>} />
						<Route path='/' element={loggedIn ? <Navigate to='/ducks' /> : <Navigate to='/sign-in' replace />} />
					</Routes>
					<Footer />

					<EditProfilePopup
						isOpen={isEditProfilePopupOpen}
						onClose={closeAllPopups}
						onUpdateUser={handleUpdateUser}
					/>

					<EditAvatarPopup
						isOpen={isEditAvatarPopupOpen}
						onClose={closeAllPopups}
						onUpdateAvatar={handleUpdateAvatar}
					/>

					<AddPlacePopup
						isOpen={isAddPlacePopupOpen}
						onClose={closeAllPopups}
						onAddPlace={handleAddPlaceSubmit}
					/>

					<InfoTooltip
						isOpen={isInfoTooltipPopup}
						onClose={closeAllPopups}
						title={isInfoTooltipMessage}
						regImage={isInfoTooltipImage}
					/>

					<PopupWithForm
						name="popup-delete"
						title="Вы уверены?"
						buttonText="Да"
					>
					</PopupWithForm>
					<ImagePopup
						card={selectedCard}
						onClose={closeAllPopups}
					/>
				</div>
			</div>
		</CurrentUserContext.Provider >
	);
}

export default App;
