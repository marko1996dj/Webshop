import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import fire from '../../../config/config';

import classes from './StoreItem.module.scss';

class StoreItem extends Component {
	state = {
		cartItems: [],
		wishlistItems: [],
		disabled: true,
		userID: ''
	};

	addToCart = () => {
		fire
			.database()
			.ref('users/' + this.state.userID + '/cartItems')
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
		fire
			.database()
			.ref('users/' + this.state.userID + '/wishlistItems')
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

	productInfo = () => {
		const productInfo = {
			brand: this.props.brand,
			description: this.props.description,
			detailedDescription: this.props.detailedDescription,
			price: this.props.price,
			imgUrl: this.props.imgUrl
		};
		this.props.onAddProductInfo(productInfo);
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
				<div onClick={this.productInfo} className={classes.Description}>
					<Link to="/product-page">Click here for more info.</Link>
				</div>
				<div className={classes.Price}>
					<p>{this.props.price}$</p>
				</div>
				<div className={classes.Icons}>
					<div>
						<button className={classes.Cart}>
							<FontAwesomeIcon onClick={this.addToCart} className={classes.CartIcon} icon={faCartPlus} />
						</button>
					</div>
					<div>
						<button className={classes.Heart}>
							<FontAwesomeIcon
								onClick={this.addToWishlist}
								className={classes.HeartIcon}
								icon={faHeart}
							/>
						</button>
					</div>
				</div>
			</div>
		);
	}
	componentDidMount() {
		fire.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ userID: fire.auth().currentUser.uid });
			}
		});
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onAddProductInfo: (productInfo) => dispatch({ type: 'ADD_PRODUCT_INFO', productInfo: productInfo })
	};
};

export default connect(null, mapDispatchToProps)(StoreItem);
