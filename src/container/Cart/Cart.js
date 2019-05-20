import React, { Component } from 'react';

import classes from './Cart.module.scss';

import StoreItem from '../../components/UI/StoreItem/StoreItem';
import axios from '../../axios-orders';
import fire from '../../config/config';

class Cart extends Component {
	state = {
		cartItems: '',
		isLoggedIn: false,
		didMount: false
	};

	render() {
		let storeItem;

		if (this.state.cartItems) {
			const cartItems = Object.values(this.state.cartItems);

			storeItem = cartItems.map((cartItem) => (
				<StoreItem
					imgUrl={cartItem.imgUrl}
					key={cartItem.imgUrl}
					brand={cartItem.brand}
					description={cartItem.description}
					price={cartItem.price}
				/>
			));
		}

		return (
			<React.Fragment>
				<div className={classes.CartItems}>{storeItem}</div>
			</React.Fragment>
		);
	}
	componentDidMount() {
		this.ref = fire.auth();
		this.ref.onAuthStateChanged((user) => {
			this.setState({ isLoggedIn: true });
			if (user) {
				axios
					.get('https://webshop-9a548.firebaseio.com/users/' + user.uid + '/cartItems.json')
					.then((response) => {
						this.setState({ cartItems: response.data });
					})
					.catch((e) => {
						console.log(e);
					});
			}
		});
	}
	componentWillUnmount() {
		window.removeEventListener('unsubscribe', this.ref);
	}
}

export default Cart;
