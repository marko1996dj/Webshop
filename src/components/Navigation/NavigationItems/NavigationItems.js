import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Nav, Navbar } from 'react-bootstrap';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import classes from './NavigationItems.module.scss';

import NavigationItem from './NavigationItem/NavigationItem';
import Logout from '../../../container/Auth/Logout/Logout';

class NavigationItems extends Component {
	render() {
		let link = <p>Login/Register</p>;
		let userProfile;
		if (this.props.isLoggedIn) {
			link = <Logout />;
			userProfile = 'User Profile';
		}

		return (
			<Navbar  className={classes.NavigationItems}  expand="lg">
				<Navbar.Toggle>Menu</Navbar.Toggle>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						<Nav.Item  style={{paddingRight: '20px'}}>
							<NavigationItem className="mr-1" link="/webshop">
								Webshop
							</NavigationItem>
						</Nav.Item>
						<Nav.Item  style={{paddingRight: '20px'}}>
							<NavigationItem className="mr-1" link="/cart">
								Cart
							</NavigationItem>
						</Nav.Item>
						<Nav.Item  style={{paddingRight: '20px'}}>
							<NavigationItem className="mr-1" link="/wishlist">
								Wishlist
							</NavigationItem>
						</Nav.Item>
						<Nav.Item  style={{paddingRight: '20px'}}>
							<NavigationItem className="mr-1" link="/user-profile">
								{userProfile}
							</NavigationItem>
						</Nav.Item>
						<Nav.Item  style={{paddingRight: '20px'}}>
							<NavigationItem className="mr-1" link="/login">
								{link}
							</NavigationItem>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.isLoggedIn
	};
};

export default connect(mapStateToProps)(NavigationItems);
