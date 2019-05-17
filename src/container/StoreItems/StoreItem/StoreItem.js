import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import fire from '../../../config/config';

import classes from './StoreItem.module.scss';

class StoreItem extends Component {
	state = {
		cartItems: [],
		wishlistItems: []
	};

	addToCart = () => {
		let userId = fire.auth().currentUser.uid;
		fire
			.database()
			.ref('users/' + userId + '/cartItems')
			.push({
				brand: this.props.brand,
				description: this.props.description,
				price: this.props.price,
				imgUrl: this.props.imgUrl
			})
			.then((u) => {
				alert('Item added to cart');
			})
			.catch((e) => {
				console.log(e);
			});
	};

	addToWishlist = () => {
		let userId = fire.auth().currentUser.uid;
		fire
			.database()
			.ref('users/' + userId + '/wishlistItems')
			.push({
				brand: this.props.brand,
				description: this.props.description,
				price: this.props.price,
				imgUrl: this.props.imgUrl
			})
			.then((u) => {
				alert('Item added to wishlist');
			})
			.catch((e) => {
				console.log(e);
			});
	};

	render() {
		const style = {
			backgroundImage: 'url(' + this.props.imgUrl + ')',
			backgroundSize: 'cover'
		};

		return (
			<div className={classes.StoreItem}>
				<div style={style} className={classes.Image} />
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
