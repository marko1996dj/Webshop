import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons';

import classes from './StoreItem.module.scss';

class StoreItem extends Component {
	state = {
		cartItems: [],
		wishListItems: []
	};

	addToCart = () => {
		let cartItems = [ ...this.state.cartItems ];
		let cartItem = {
			brand: this.props.brand,
			description: this.props.description,
			price: this.props.price
		};
		cartItems.push(cartItem);
		this.setState({ cartItems: cartItems });
		console.log(this.state.cartItems);
	};

	addToWishlist = () => {
		let wishListItems = [ ...this.state.wishListItems ];
		let wishListItem = {
			brand: this.props.brand,
			description: this.props.description,
			price: this.props.price,
		}
		wishListItems.push(wishListItem);
		this.setState({wishListItems: wishListItems});
		console.log(this.state.wishListItems);
	};


	render() {

		const style = {
			backgroundImage: "url(" + this.props.imgUrl + ")",
			backgroundSize: "cover"
		}

		return (
			<div className={classes.StoreItem}>
				<div style={style} className={classes.Image}>
				</div>
				<div className={classes.Name}>
					<h3>{this.props.brand}</h3>
				</div>
				<div className={classes.Description}>
					<p>{this.props.description}</p>
				</div>
				<div className={classes.Price}>
					<p>{this.props.price}$</p>
				</div>
				<div className={classes.Icons}>
					<div className={classes.Cart}>
						<FontAwesomeIcon onClick={this.addToCart} className={classes.CartIcon} icon={faCartPlus} />
					</div>
					<div className={classes.Heart}>
						<FontAwesomeIcon onClick={this.addToWishlist} className={classes.HeartIcon} icon={faHeart} />
					</div>
				</div>
			</div>
		);
	}
}

export default StoreItem;
