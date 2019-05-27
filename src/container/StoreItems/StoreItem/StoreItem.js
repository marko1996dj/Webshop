import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import config from '../../../config/config';

import classes from './StoreItem.module.scss';

class StoreItem extends Component {
	state = {
		cartItems: [],
		wishlistItems: []
	};

	addToCart = () => {
		if (this.props.isLoggedIn) {
			config.fire
				.database()
				.ref('users/' + this.props.userId + '/cartItems')
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
		} else {
			alert('You must be logged in');
		}
	};

	addToWishlist = () => {
		if (this.props.isLoggedIn) {
			config.fire
				.database()
				.ref('users/' + this.props.userId + '/wishlistItems')
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
		} else {
			alert('You must be logged in');
		}
	};

	productInfo = () => {
		const productInfo = {
			brand: this.props.brand,
			description: this.props.description,
			detailedDescription: this.props.detailedDescription,
			price: this.props.price,
			imgUrl: this.props.imgUrl,
			id: this.props.uniqueId
		};
		this.props.onAddProductInfo(productInfo);
	};

	render() {
		const style = {
			height: '165px',
			width: 'auto'
		};

		return (
			<div className={classes.StoreItem}>
				<div className={classes.Image}>
					<img style={style} src={this.props.imgUrl} alt={this.props.imgUrl} />
				</div>
				<div className={classes.Name}>
					<h3>{this.props.brand}</h3>
				</div>
				<div onClick={this.productInfo} className={classes.Description}>
					<Link to="/product-page">Click here for more info.</Link>
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

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.isLoggedIn,
		userId: state.userId
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAddProductInfo: (productInfo) => dispatch({ type: 'ADD_PRODUCT_INFO', productInfo: productInfo })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreItem);
