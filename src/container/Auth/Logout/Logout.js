import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Logout.module.scss';
import fire from '../../../config/config';

class Logout extends Component {
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
	}

	logout(e) {
		e.preventDefault();
		fire
			.auth()
			.signOut()
			.then((u) => {
				this.props.history.push('/login');
				alert('You have succesfully logged out!');
			})
			.catch((error) => {
				console.log(error);
				alert(error);
			});
	}

	render() {
		return (
			<p className={classes.Logout} onClick={this.logout}>
				Logout
			</p>
		);
	}
}

export default withRouter(Logout);
