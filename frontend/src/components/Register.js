import React, { useState } from 'react';
import AuthForm from './AuthForm';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
	const [formValue, setFormValue] = useState({
		email: '',
		password: ''
	})

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValue({
			...formValue,
			[name]: value
		});
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		onRegister(formValue);
	}

	return (
		<div className="authentication-form">
			<div className="authentication-form__container">
				<AuthForm
					handleSubmit={handleSubmit}
					title="Регистрация"
					formValue={formValue}
					handleChange={handleChange}
					button="Зарегистрироваться"
				/>
				<div className="authentication-form__signin">
					<p className="authentication-form__question">Уже зарегистрированы? <Link to="/sign-in" className="authentication-form__login-link">Войти</Link></p>
				</div>
			</div>
		</div>
	)
}

export default Register;