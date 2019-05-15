import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import classes from './PassReset.module.scss';

import fire from '../../../config/config';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/GeneralButton/Button';
import NavigationItems from '../../../components/UI/Navigation/NavigationItems/NavigationItems';


class PassReset extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.passReset = this.passReset.bind(this);
		this.state = {
			email: '',
			error: ''
		};
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	passReset(e) {
		e.preventDefault();
		fire
			.auth()
			.sendPasswordResetEmail(this.state.email)
			.then((u) => {
				alert('An email has been sent to your email address with further instructions');
			})
			.catch((error) => {
				this.setState({ error: 'There is no user associated with this email address' });
			});
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
				<NavigationItems />
				<form className={classes.PassReset}>
					<h3>Reset password.</h3>
					<label className={classes.Label}>E-mail address</label>
					<Input
						value={this.state.email}
						onChange={this.handleChange}
						type="email"
						name="email"
						placeholder="Enter e-mail"
					/>
					<p style={errorStyle}>{this.state.error}</p>
					<div className={classes.Button}>
						<Button onClick={this.passReset}>Reset password</Button>
					</div>
				</form>
			</React.Fragment>
		);
	}
}

export default withRouter(PassReset);
