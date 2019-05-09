import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Login.module.scss';

import Input from '../../../components/UI/Input/Input';
import Layout from '../../../components/Layout/Layout';
import Button from '../../../components/UI/Button/GeneralButton/Button';
import fire from '../../../config/config';

class Login extends Component {
	constructor(props) {
		super(props);
		this.login = this.login.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			email: '',
			password: '',
			wrongPasswordCounter: 0
		};
	}

	login(e) {
		e.preventDefault();
		fire
			.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.then((u) => {
				this.props.history.push('/webshop');
				alert('You have successfully logged in!');
			})
			.catch((error) => {
				console.log(error);
				alert(error);
			});
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		return (
			<React.Fragment>
				<Layout user={this.state.user} />
				<form className={classes.Login}>
					<h3>Login to your account.</h3>
					<label className={classes.Label}>E-mail address</label>
					<Input
						value={this.state.email}
						onChange={this.handleChange}
						type="email"
						name="email"
						placeholder="Enter e-mail"
					/>
					<label className={classes.Label}>Password</label>
					<Input
						value={this.state.pasword}
						onChange={this.handleChange}
						type="password"
						name="password"
						placeholder="Enter password"
						autoComplete="on"
					/>
					<div className={classes.Button}>
						<Button onClick={this.login}>Log In</Button>
					</div>
					<div className={classes.Footer}>
						<a href="/register">Don't have an account?</a>
						<a href="/password-reset">Forgot password?</a>
					</div>
				</form>
			</React.Fragment>
		);
	}
}

export default withRouter(Login);
