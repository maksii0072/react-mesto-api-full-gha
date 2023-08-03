import React from 'react';

function AuthForm({ handleSubmit, title, formValue, handleChange, button }) {
	return (
		<form onSubmit={handleSubmit} className="authentication-form__content" noValidate>
			<h2 className="authentication-form__title">{title}</h2>
			<label htmlFor="register-email" className="authentication-form__field">
				<input
					className="authentication-form__input"
					id="email"
					type="email"
					name="email"
					placeholder="Email"
					value={formValue.email}
					onChange={handleChange}
					minLength={2}
					maxLength={40}
					required
				/>
			</label>
			<label htmlFor="register-password" className="authentication-form__field">
				<input
					className="authentication-form__input"
					id="password"
					type="password"
					name="password"
					placeholder="Пароль"
					value={formValue.password}
					onChange={handleChange}
					minLength={2}
					maxLength={200}
					required
				/>
			</label>
			<button type="submit" className="button button_type_save authentication-form__submit">{button}</button>
		</form>
	)
}

export default AuthForm;