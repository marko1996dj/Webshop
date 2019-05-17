import React, { Component } from 'react';

import classes from './Wishlist.module.scss';

import StoreItem from '../../components/UI/StoreItem/StoreItem';
import axios from '../../axios-orders';
import fire from '../../config/config';

class Wishlist extends Component {
	state = {
		wishlistItems: ''
	};

	componentDidMount() {
		fire.auth().onAuthStateChanged((user) => {
			if (user) {
				axios
					.get('https://webshop-9a548.firebaseio.com/users/' + user.uid + '/wishlistItems.json')
					.then((response) => {
						this.setState({ wishlistItems: response.data });
					})
					.catch((e) => {
						console.log(e);
					});
			}
		});
	}

	componentWillUnmount() {
		let unsubscribe = fire.auth().onAuthStateChanged((user) => {
			
		})
		unsubscribe();
	}

	render() {
		let storeItem;

		if (this.state.wishlistItems) {
			const wishlistItems = Object.values(this.state.wishlistItems);

			storeItem = wishlistItems.map((cartItem) => (
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
				<div className={classes.WishlistItems}>{storeItem}</div>
			</React.Fragment>
		);
	}
}

export default Wishlist;
