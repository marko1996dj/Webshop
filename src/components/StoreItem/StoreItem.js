import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import config from '../../config/config';

import classes from './StoreItem.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

class StoreItem extends Component {
	removeCartItem = () => {
		axios
			.delete(
				'https://webshop-9a548.firebaseio.com/users/' +
					this.props.userId +
					'/cartItems/' +
					this.props.itemKey +
					'.json'
			)
			.then((u) => {
				window.location.reload();
			})
			.catch((e) => {
				console.log(e);
			});
	};

	removeWishlistItem = () => {
		axios
			.delete(
				'https://webshop-9a548.firebaseio.com/users/' +
					this.props.userId +
					'/wishlistItems/' +
					this.props.itemKey +
					'.json'
			)
			.then(() => {
				window.location.reload();
			})
			.catch((e) => {
				console.log(e);
			});
	};

	addToCart = () => {
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
				axios
					.delete(
						'https://webshop-9a548.firebaseio.com/users/' +
							this.props.userId +
							'/wishlistItems/' +
							this.props.itemKey +
							'.json'
					)
					.then(() => {
						window.location.reload();
					})
					.catch((e) => {
						console.log(e);
					});
			})
			.catch((e) => {
				console.log(e);
			});
	};

	render() {
		let addToCart;
		let removeButton;
		if (this.props.history.location.pathname === '/cart') {
			removeButton = (
				<p className="btn btn-danger" onClick={this.removeCartItem} >
					<FontAwesomeIcon style={{fontSize: '25px'}} icon={faMinusCircle} />
				</p>
			);
		} else {
			addToCart = (
				<p className="btn btn-success">
				<FontAwesomeIcon style={{fontSize: '25px'}} onClick={this.addToCart} icon={faCartPlus} />
			</p>
			);
			removeButton = (
				<p className="btn btn-danger" onClick={this.removeWishlistItem} >
					<FontAwesomeIcon style={{fontSize: '25px'}} icon={faMinusCircle} />
				</p>
			);
		}
		return (
			<div className={classes.StoreItem} >
				<div className={classes.Image}>
					<img src={this.props.imgUrl} alt={this.props.imgUrl} />
				</div>
				<div className={classes.Name} >
					<h3>{this.props.brand}</h3>
				</div>
				<div className={classes.Description} >
					<p>{this.props.description}</p>
				</div>
				<div className={classes.Price} >
					<p>{this.props.price}$</p>
				</div>
				<div className={classes.Buttons} >
					{removeButton}
					{addToCart}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.userId
	};
};

export default withRouter(connect(mapStateToProps)(StoreItem));
