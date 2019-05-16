import React, { Component } from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import Logout from '../../../../container/Auth/Logout/Logout';
import fire from '../../../../config/config';

import classes from './NavigationItems.module.scss';

class NavigationItems extends Component {
	render() {
		let link = <p>Login/Register</p>;
		let userProfile;
		if (fire.auth().currentUser !== null) {
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
export default NavigationItems;
