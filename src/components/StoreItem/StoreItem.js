import React, { Component } from 'react';
import axios from '../../axios-orders';

import classes from './StoreItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

class StoreItem extends Component {
	constructor(props) {
		super(props)

	}

	removeCartItem = () => {
		console.log(this.props.itemKey)
		axios.delete('https://webshop-9a548.firebaseio.com/users/')
		//izvuci user ID iz reduxa, i stavi path baseUrl/users/userid/cartItems/this.props.itemKey i trebalo bi da radi
	}


	render() {
		return (
			<div className={classes.StoreItem}>
				<div className={classes.Image}>
					<img src={this.props.imgUrl} alt={this.props.imgUrl} />
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
				<div onClick={this.removeCartItem} className={classes.RemoveCart}>
					<FontAwesomeIcon icon={faMinusCircle} />
				</div>
			</div>
		);
	}
}
export default StoreItem;
