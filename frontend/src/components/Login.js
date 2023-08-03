import React, { useState } from 'react';
import AuthForm from './AuthForm';

function Login({ onLogin }) {
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
		onLogin(formValue);
	}

	return (
		<div className="authentication-form">
			<div className="authentication-form__container">
				<AuthForm
					handleSubmit={handleSubmit}
					title="Вход"
					formValue={formValue}
					handleChange={handleChange}
					button="Войти"
				/>
			</div>
		</div>
	)
}

export default Login;