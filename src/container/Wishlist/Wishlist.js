import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Wishlist.module.scss';

import StoreItem from '../../components/UI/StoreItem/StoreItem';

class Wishlist extends Component {
	render() {
		let storeItem = this.props.wishlistItems.map((wishlistItem) => (
			<StoreItem
				imgUrl={wishlistItem.imgUrl}
				key={wishlistItem.imgUrl}
				brand={wishlistItem.brand}
				description={wishlistItem.description}
				price={wishlistItem.price}
			/>
		));

		return (
			<React.Fragment>
				<div className={classes.WishlistItems}>{storeItem}</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		wishlistItems: state.wishlistItems
	};
};

export default connect(mapStateToProps, null)(Wishlist);
