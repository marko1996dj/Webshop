import React, { Component } from 'react';

import classes from './Login.module.scss';

import Input from '../../components/UI/Input/Input';
import Layout from '../../components/Layout/Layout';
import Button from '../../components/UI/Button/GeneralButton/Button';
import fire from '../../config/config';

class Login extends Component {
	constructor(props) {
		super(props);
		this.login = this.login.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			email: '',
			password: ''
		};
	}

	login(e) {
		e.preventDefault();
		fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {}).catch((error) => {
			console.log(error);
		});
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		return (
			<React.Fragment>
				<Layout />
				<form className={classes.Login}>
					<label>E-mail address</label>
					<Input
						value={this.state.email}
						onChange={this.handleChange}
						type="email"
						name="email"
						placeholder="Enter e-mail"
					/>
					<label>Password</label>
					<Input
						value={this.state.pasword}
						onChange={this.handleChange}
						type="password"
						name="password"
						placeholder="Enter password"
						autoComplete="on"
					/>
					<div className={classes.Buttons}>
						<Button onClick={this.login}>Log In</Button>
						<Button>Register</Button>
					</div>
				</form>
			</React.Fragment>
		);
	}
}

export default Login;
