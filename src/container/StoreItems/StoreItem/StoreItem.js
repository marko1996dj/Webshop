import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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

		return (
			<div style={{width: '18rem'}} className="card m-3">
				<img style={{maxHeight: '190px', width: 'auto'}} className="card-img-top" src={this.props.imgUrl} alt={this.props.imgUrl} />
				<div className="card-body">
					<h5 className="card-title">{this.props.brand}</h5>
					<p onClick={this.productInfo} className="card-text">
						<Link to="/product-page">Click here for more info.</Link>
					</p>
					<p style={{marginRight: '160px', marginTop: '30px'}} className="btn btn-success">
						<FontAwesomeIcon onClick={this.addToCart} icon={faCartPlus} />
					</p>
					<p style={{marginTop: '30px'}} className="btn btn-danger">
						<FontAwesomeIcon onClick={this.addToWishlist} icon={faHeart} />
					</p>
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
