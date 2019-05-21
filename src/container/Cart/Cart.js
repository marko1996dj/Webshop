import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Cart.module.scss';

import StoreItem from '../../components/UI/StoreItem/StoreItem';
import axios from '../../axios-orders';

class Cart extends Component {
	state = {
		cartItems: false,
	};

	render() {
		let storeItem;

		if (this.state.cartItems) {
			let proba = Object.entries(this.state.cartItems);
			console.log(proba[0][1]);
			const cartItems = Object.values(this.state.cartItems);
			storeItem = cartItems.map((cartItem, index) => (
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
				<div className={classes.CartItems}>{storeItem}</div>
			</React.Fragment>
		);
	}
	componentDidMount() {
		if(this.props.isLoggedIn){
			axios.get('https://webshop-9a548.firebaseio.com/users/' + this.props.userId + '/cartItems.json')
			.then((response) => {
				this.setState({cartItems: response.data});
			})
			.catch(e => {
				console.log(e);
			})
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

