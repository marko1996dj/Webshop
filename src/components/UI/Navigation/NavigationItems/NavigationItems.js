import React, { Component } from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import Logout from '../../../../container/Auth/Logout/Logout';
import fire from '../../../../config/config';

import classes from './NavigationItems.module.scss';

class NavigationItems extends Component {
	render() {
		let link = <p>Login/Register</p>;

		if (fire.auth().currentUser !== null) {
			link = <Logout />;
		}

		return (
			<ul className={classes.NavigationItems}>
				<NavigationItem link="/webshop">Webshop</NavigationItem>
				<NavigationItem link="/cart">Cart</NavigationItem>
				<NavigationItem link="/wishlist">Wishlist</NavigationItem>
				<NavigationItem link="/register">{link}</NavigationItem>
			</ul>
		);
	}
}
export default NavigationItems;
