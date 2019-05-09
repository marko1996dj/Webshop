import React, { Component } from 'react';

import classes from './Register.module.scss';

import Input from '../../../components/UI/Input/Input';
import Layout from '../../../components/Layout/Layout';
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
			verifyPassword: ''
		};
	}

  signUp(e) {
		e.preventDefault();
    let password = this.state.password;
    let verifyPassword = this.state.verifyPassword;
    if (password === verifyPassword){
      fire
			.auth()
			.createUserWithEmailAndPassword(this.state.email, this.state.verifyPassword)
			.then((u) => {
				this.props.history.push('/');
				alert('You have successfully created account and are now signed in!');
			})
			.catch(function(error) {
				// Handle Errors here.
				var errorMessage = error.message;
				alert(errorMessage);
				// ...
			});
    }else{
      alert("Passwords do not match!");
    }
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		return (
			<React.Fragment>
				<Layout />
				<form className={classes.Register}>
        <h3>Register your account here.</h3>
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
						value={this.state.password}
						onChange={this.handleChange}
						type="password"
						name="password"
						placeholder="Enter password"
						autoComplete="on"
					/>
          <label className={classes.Label}>Verify Password</label>
					<Input
						value={this.state.verifyPassword}
						onChange={this.handleChange}
						type="password"
						name="verifyPassword"
						placeholder="Verify Password"
						autoComplete="on"
					/>
					<div className={classes.Button}>
						<Button onClick={this.signUp}>Register</Button>
					</div>
          <a href="/login">Already have an account?</a>
				</form>
			</React.Fragment>
		);
	}
}

export default Register;
