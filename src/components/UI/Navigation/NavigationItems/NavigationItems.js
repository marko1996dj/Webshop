import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavigationItem from './NavigationItem/NavigationItem';
import Logout from '../../../../container/Auth/Logout/Logout';

import classes from './NavigationItems.module.scss';

class NavigationItems extends Component {
	render() {
		let link = <p>Login/Register</p>;
		let userProfile;
		if(this.props.isLoggedIn) {
			link = <Logout />;
			userProfile = 'User Profile';
		}

		return (
			<ul className={classes.NavigationItems}>
				<NavigationItem link="/webshop">Webshop</NavigationItem>
				<NavigationItem link="/cart">Cart</NavigationItem>
				<NavigationItem link="/wishlist">Wishlist</NavigationItem>
				<NavigationItem link="/user-profile">{userProfile}</NavigationItem>
				<NavigationItem link="/login">{link}</NavigationItem>
			</ul>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.isLoggedIn,
	};
};

export default connect(mapStateToProps)(NavigationItems);
