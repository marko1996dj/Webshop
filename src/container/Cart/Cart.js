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
			const cartKeys = Object.keys(this.state.cartItems);
			storeItem = cartKeys.map(cartKey => (
			   <StoreItem
				  imgUrl={this.state.cartItems[cartKey].imgUrl}
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
		isLoggedIn: state.isLoggedIn,
		userId: state.userId
	};
};

export default connect(mapStateToProps)(Cart);
