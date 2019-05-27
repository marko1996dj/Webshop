import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Logout.module.scss';
import config from '../../../config/config';

class Logout extends Component {
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
		this.state = {
			isLoggedIn: this.props.isLoggedIn,
		}
	}

	logout(e) {
		e.preventDefault();
		config.fire
			.auth()
			.signOut()
			.then((u) => {
				this.props.onIsLoggedOut(!this.state.isLoggedIn)
				this.props.history.push('/login');
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

const mapDispatchToProps = dispatch => {
	return{
		onIsLoggedOut: (isLoggedOut) => dispatch({type: 'IS_LOGGED_OUT', isLoggedOut: isLoggedOut}),
	};
}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.isLoggedIn
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Logout));
