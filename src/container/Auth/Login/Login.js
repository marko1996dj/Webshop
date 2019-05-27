import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';

import classes from './Login.module.scss';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/GeneralButton/Button';
import config from '../../../config/config';

class Login extends Component {
	constructor(props) {
		super(props);
		this.login = this.login.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			email: '',
			password: '',
			wrongPasswordCounter: 0,
			error: '',
			isLoggedIn: false,
			userId: '',
			user: ''
		};
	}

	login(e) {
		e.preventDefault();
		config.fire
			.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.then((user) => {
				this.setState({ isLoggedIn: true });
				this.setState({ userId: user.user.uid });
				this.props.onIsLoggedIn(this.state.isLoggedIn);
				this.props.onAddUserId(this.state.userId);
				axios
					.get('https://webshop-9a548.firebaseio.com/users/' + this.state.userId + '.json')
					.then((response) => {
						this.setState({ user: response.data });
						this.props.onAddingUserInfo(response.data);
						this.props.history.push('/webshop');
					});
				
			})
			.catch((error) => {
				let errorMessage = error.message;
				this.setState({ error: errorMessage });
			});
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
				marginLeft: '100px',
				fontSize: '.7em'
			};
		}

		return (
			<React.Fragment>
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
					<p style={errorStyle}>{this.state.error}</p>
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

const mapDispatchToProps = (dispatch) => {
	return {
		onIsLoggedIn: (isLoggedIn) => dispatch({ type: 'IS_LOGGED_IN', isLoggedIn: isLoggedIn }),
		onAddUserId: (userId) => dispatch({ type: 'ADD_USER_ID', userId: userId }),
		onAddingUserInfo: (userInfo) => dispatch({ type: 'ADD_USER_INFO', userInfo: userInfo })
	};
};

export default connect(null, mapDispatchToProps)(withRouter(Login));
