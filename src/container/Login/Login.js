import React, { Component } from 'react';

import classes from './Login.module.scss';

import Layout from '../../components/Layout/Layout';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/GeneralButton/Button';


class Login extends Component {

	render() {
		return (
			<React.Fragment>
				<Layout />
				<form className={classes.Login}>
					<Input type="text" name="firstName" placeholder="First Name" />
					<Input type="text" name="lastName" placeholder="Last Name" />
					<Input type="e-mail" name="mail" placeholder="Your Mail" />
					<Input type="password" name="password" placeholder="Your Password" autoComplete="on"/>
					<div className={classes.Buttons}>
						<Button>Log In</Button>
						<Button>Register</Button>
					</div>
				</form>
			</React.Fragment>
		);
	}
}

export default Login;
