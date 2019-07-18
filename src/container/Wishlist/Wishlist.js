import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Wishlist.module.scss';

import StoreItem from '../../components/StoreItem/StoreItem';

import axios from '../../axios-orders';

class Wishlist extends Component {
	state = {
		wishlistItems: ''
	};

	render() {
		let storeItem;

		if (this.state.wishlistItems) {
			//if there are wishlist items
			const wishlistItems = Object.keys(this.state.wishlistItems);

			storeItem = wishlistItems.map((
				wishlistKey //map them and send their info via props
			) => (
				<StoreItem
					imgUrl={this.state.wishlistItems[wishlistKey].imgUrl}
					itemKey={wishlistKey}
					key={wishlistKey}
					brand={this.state.wishlistItems[wishlistKey].brand}
					description={this.state.wishlistItems[wishlistKey].description}
					price={this.state.wishlistItems[wishlistKey].price}
				/>
			));
		}else if(!this.props.isLoggedIn){
			storeItem = <h1 className={classes.Login}>Please login to view your wishlist items.</h1>
		}
		

		return (
			<React.Fragment>
				<div className={classes.WishlistItems}>{storeItem}</div>
			</React.Fragment>
		);
	}
	componentDidMount() {
		if (this.props.isLoggedIn) {
			//if user is logged in
			axios
				.get('https://webshop-9a548.firebaseio.com/users/' + this.props.userId + '/wishlistItems.json')
				.then((response) => {
					this.setState({ wishlistItems: response.data }); //take user specific wishlist items and store them in this.state.wishlistItems
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.isLoggedIn, // isLoggedIn store state
		userId: state.userId // userId store state
	};
};

export default connect(mapStateToProps)(Wishlist);
