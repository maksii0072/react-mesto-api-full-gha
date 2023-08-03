import React from 'react';
import logo from '../logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ loggedIn, userEmail, onSignOut }) {
	let location = useLocation();

	return (
		<div className="header">
			<img src={logo} alt="Логотип" className="header__logo" />
			<div className="header__info">
				{loggedIn ? (<>
					<p className="header__email">{userEmail}</p>
					<Link to="/sign-in" onClick={onSignOut} className="header__sign">Выйти</Link>
				</>) : (location.pathname === '/sign-in' ? (<Link to="/sign-up" className="header__sign">Регистрация</Link>) : (<Link to="/sign-in" className="header__sign">Войти</Link>))}
			</div>
		</div>
	);
}

export default Header;