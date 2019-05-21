import React, { Component } from 'react';

import classes from './StoreItem.module.scss';

class StoreItem extends Component {
	render() {
		const style = {
			backgroundImage: "url(" + this.props.imgUrl + ")",
			backgroundSize: "cover"
		}

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
			</div>
		);
	}
}

export default StoreItem;
