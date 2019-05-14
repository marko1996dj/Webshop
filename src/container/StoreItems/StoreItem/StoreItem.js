import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import * as actionType from '../../../store/action';

import classes from './StoreItem.module.scss';

class StoreItem extends Component {
	state = {
		cartItems: [],
		wishlistItems: []
	};

	addToCart = () => {
		const cartItem = {
			brand: this.props.brand,
			description: this.props.description,
			price: this.props.price,
			imgUrl: this.props.imgUrl,
			id: this.props.id
		}
		this.props.addToCart(cartItem);
	}

	addToWishlist = () => {
		const wishlistItem = {
			brand: this.props.brand,
			description: this.props.description,
			price: this.props.price,
			imgUrl: this.props.imgUrl,
			key: this.props.key
		}
		this.props.addToWishlist(wishlistItem);
	}


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


const mapDispatchToProps = dispatch => {
	return {
		addToCart: (cartItem) => dispatch({type: actionType.ADD_TO_CART, cartItem: cartItem}),
		addToWishlist: (wishlistItem) => dispatch({type: actionType.ADD_TO_WISHLIST, wishlistItem: wishlistItem})
	}
}

export default connect(null, mapDispatchToProps)(StoreItem);
