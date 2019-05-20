import React, { Component } from 'react';
import { connect } from 'react-redux';
import fire from '../../config/config';

import classes from './ProductPage.module.scss';

import Button from '../../components/UI/Button/GeneralButton/Button';

class ProductPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userID: ''
		};
	}

	addToCart = () => {
		fire
			.database()
			.ref('users/' + this.state.userID + '/cartItems')
			.push({
				brand: this.props.productInfo.brand,
				description: this.props.productInfo.description,
				price: this.props.productInfo.price,
				imgUrl: this.props.productInfo.imgUrl
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
				brand: this.props.productInfo.brand,
				description: this.props.productInfo.description,
				price: this.props.productInfo.price,
				imgUrl: this.props.productInfo.imgUrl
			})
			.then((u) => {
				alert('Item added to wishlist');
			})
			.catch((e) => {
				console.log(e);
			});
	};

	render() {
		const productInfo = this.props.productInfo;
		return (
			<div className={classes.ProductPage}>
				<div className={classes.Wrapper}>
					<div className={classes.Image}>
						<img src={productInfo.imgUrl} alt={productInfo.imgUrl} />
					</div>
					<div>
						<div className={classes.Brand}>
							<h1>{productInfo.brand}</h1>
						</div>
						<div className={classes.Price}>
							<h1>{productInfo.price}$</h1>
						</div>
					</div>
				</div>
				<div className={classes.Description}>
					<p>{productInfo.detailedDescription}</p>
				</div>
				<div className={classes.Buttons}>
					<Button className={classes.Cart} onClick={this.addToCart}>
						Add to cart
					</Button>
					<Button className={classes.Wishlist} onClick={this.addToWishlist}>
						Add to wishlist
					</Button>
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

const mapStateToProps = (state) => {
	return {
		productInfo: state.productInfo
	};
};

export default connect(mapStateToProps)(ProductPage);
