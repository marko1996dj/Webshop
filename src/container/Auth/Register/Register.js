import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Register.module.scss';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/GeneralButton/Button';
import fire from '../../../config/config';

class Register extends Component {
	constructor(props) {
		super(props);
		this.signUp = this.signUp.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			email: '',
			password: '',
			verifyPassword: '',
			error: '',
			isLoggedIn: this.props.isLoggedIn
		};
	}

	signUp(e) {
		e.preventDefault();
		let email = this.state.email;
		let password = this.state.password;
		let verifyPassword = this.state.verifyPassword;
		if (password === verifyPassword) {
			fire
				.auth()
				.createUserWithEmailAndPassword(email, verifyPassword)
				.then((u) => {
					this.setState({ isLoggedIn: true });
					this.props.onIsLoggedIn(this.state.isLoggedIn);
					this.props.history.push('/edit-user');
				})
				.catch((error) => {
					let errorMessage = error.message;
					this.setState({ error: errorMessage });
				});
		} else {
			this.setState({ error: 'Passwords do not match!' });
		}
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		let errorStyle = null;
		if (this.state.error) {
			errorStyle = {
				color: 'red',
				marginTop: '-22px',
				marginBottom: '10px',
				fontSize: '.7em',
				textAlign: 'center'
			};
		}

		return (
			<React.Fragment>
				<form className={classes.Register}>
					<h3>Register your account here.</h3>
					<label className={classes.Label}>E-mail address</label>
					<Input
						value={this.state.email}
						onChange={this.handleChange}
						type="email"
						name="email"
						placeholder="Johnsmith@example.com"
					/>
					<label className={classes.Label}>Password</label>
					<Input
						value={this.state.password}
						onChange={this.handleChange}
						type="password"
						name="password"
						placeholder="Minimum 6 characters"
						autoComplete="on"
					/>
					<label className={classes.Label}>Verify Password</label>
					<Input
						value={this.state.verifyPassword}
						onChange={this.handleChange}
						type="password"
						name="verifyPassword"
						placeholder="Repeat password"
						autoComplete="on"
					/>
					<p style={errorStyle}>{this.state.error}</p>
					<div className={classes.Button}>
						<Button onClick={this.signUp}>Register</Button>
					</div>
					<a href="/login">Already have an account?</a>
				</form>
			</React.Fragment>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onIsLoggedIn: (isLoggedIn) => dispatch({ type: 'IS_LOGGED_IN', isLoggedIn: isLoggedIn })
	};
};

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.isLoggedIn
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
