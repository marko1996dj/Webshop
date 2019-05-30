import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Cart.module.scss';

import StoreItem from '../../components/StoreItem/StoreItem';
import axios from '../../axios-orders';

class Cart extends Component {
	state = {
		cartItems: false
	};

	render() {
		let storeItem;

		if (this.state.cartItems) {
			//if user has store items
			const cartKeys = Object.keys(this.state.cartItems); //get key for each item
			storeItem = cartKeys.map((
				cartKey //map array of keys
			) => (
				<StoreItem
					imgUrl={this.state.cartItems[cartKey].imgUrl} //send item info as props to StoreItem
					key={cartKey}
					itemKey={cartKey}
					brand={this.state.cartItems[cartKey].brand}
					description={this.state.cartItems[cartKey].description}
					price={this.state.cartItems[cartKey].price}
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
		if (this.props.isLoggedIn) {
			//if user is logged in gettin all cart items from him and storing to this.state.cartItems
			axios
				.get('https://webshop-9a548.firebaseio.com/users/' + this.props.userId + '/cartItems.json')
				.then((response) => {
					this.setState({ cartItems: response.data });
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
		userId: state.userId //userId store state
	};
};

export default connect(mapStateToProps)(Cart);
