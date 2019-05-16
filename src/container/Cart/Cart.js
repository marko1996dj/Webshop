import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Cart.module.scss';

import StoreItem from '../../components/UI/StoreItem/StoreItem';

class Cart extends Component {
	render() {
		console.log(this.props.cartItems);

		let storeItem = this.props.cartItems.map((cartItem) => (
			<StoreItem
				imgUrl={cartItem.imgUrl}
				key={cartItem.imgUrl}
				brand={cartItem.brand}
				description={cartItem.description}
				price={cartItem.price}
			/>
		));

		return (
			<React.Fragment>
				<div className={classes.CartItems}>{storeItem}</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cartItems: state.cartItems
	};
};

export default connect(mapStateToProps, null)(Cart);
