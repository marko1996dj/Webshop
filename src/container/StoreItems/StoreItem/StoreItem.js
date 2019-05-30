import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classes from './StoreItem.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import config from '../../../config/config';

class StoreItem extends Component {
	state = {
		cartItems: [],
		wishlistItems: []
	};

	addToCart = () => {
		if (this.props.isLoggedIn) {
			//if user is logged in send specific item to his store
			config.fire
				.database()
				.ref('users/' + this.props.userId + '/cartItems') //targeting user specific cart items
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
			//if user is logged in send specific item to his wishlist
			config.fire
				.database()
				.ref('users/' + this.props.userId + '/wishlistItems') //targeting user specific wishlist items
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
		this.props.onAddProductInfo(productInfo); //individual product info dispatch to store
	};

	render() {
		return (
			<div className={classes.Card + ' ' + 'card m-3'}>
				<img className="card-img-top" src={this.props.imgUrl} alt={this.props.imgUrl} />
				<div className="card-body">
					<h5 className="card-title">{this.props.brand}</h5>
					<p onClick={this.productInfo} className="card-text">
						<Link to="/product-page">Click here for more info.</Link>
					</p>
					<div
						style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}
						className={classes.Buttons}
					>
						<p onClick={this.addToCart} className={classes.CartButton + ' ' + 'btn btn-success'}>
							<FontAwesomeIcon icon={faCartPlus} />
						</p>
						<p onClick={this.addToWishlist} className={classes.WishlistButton + ' ' + 'btn btn-danger'}>
							<FontAwesomeIcon icon={faHeart} />
						</p>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.isLoggedIn, //isLoggedIn store state
		userId: state.userId // get userId from store state
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAddProductInfo: (productInfo) => dispatch({ type: 'ADD_PRODUCT_INFO', productInfo: productInfo }) //dispatch specific product info to store
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreItem);
