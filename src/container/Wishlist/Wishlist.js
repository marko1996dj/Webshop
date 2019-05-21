import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Wishlist.module.scss';

import StoreItem from '../../components/StoreItem/StoreItem';
import axios from '../../axios-orders';
import fire from '../../config/config';

class Wishlist extends Component {
	state = {
		wishlistItems: ''
	};

	render() {
		let storeItem;

		if (this.state.wishlistItems) {
			const wishlistItems = Object.values(this.state.wishlistItems);

			storeItem = wishlistItems.map((cartItem, index) => (
				<StoreItem
					imgUrl={cartItem.imgUrl}
					key={index}
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
	componentDidMount() {
		if (this.props.isLoggedIn) {
			axios
				.get('https://webshop-9a548.firebaseio.com/users/' + this.props.userId + '/wishlistItems.json')
				.then((response) => {
					this.setState({ wishlistItems: response.data });
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}
	componentWillUnmount() {
		let unsubscribe = fire.auth().onAuthStateChanged((user) => {});
		unsubscribe();
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.isLoggedIn,
		userId: state.userId
	};
};

export default connect(mapStateToProps)(Wishlist);
