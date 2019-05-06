import React, { Component } from 'react';

import classes from './StoreItems.module.scss';
import StoreItem from './StoreItem/StoreItem';
import Spinner from '../UI/Spinner/Spinner';

import axios from '../../axios-orders';

class StoreItems extends Component {
	state = {
		items: [],
		loading: true,
		currentPage: 1,
		itemsPerPage: 6
	};

	componentWillMount() {
		axios.get('https://api.myjson.com/bins/n8iy4.json').then((response) => {
			this.setState({ items: response.data });
			this.setState({ loading: false });
		});
	}

	render() {
		let items = this.state.items;
		let storeItem;
		let shoes;
		let socks;
		let hoodies;
		let shorts;
		let tShirt;
		let shirts;
		let jackets;
		let jeans;
		let underwear;

		if (this.props.itemType) {
			shoes = this.props.itemType[0];
			socks = this.props.itemType[1];
			hoodies = this.props.itemType[2];
			shorts = this.props.itemType[3];
			tShirt = this.props.itemType[4];
			shirts = this.props.itemType[5];
			jackets = this.props.itemType[6];
			jeans = this.props.itemType[7];
			underwear = this.props.itemType[8];
		}
		if (this.state.loading) {
			storeItem = <Spinner />;
		} else {
			let filteredItems = items.filter(
				(items) =>
					items.type === shoes ||
					items.type === socks ||
					items.type === hoodies ||
					items.type === shorts ||
					items.type === tShirt ||
					items.type === shirts ||
					items.type === jackets ||
					items.type === jeans ||
					items.type === underwear
			);
			storeItem = filteredItems.map((filteredItem) => (
				<StoreItem
					key={filteredItem.id}
					brand={filteredItem.brand}
					description={filteredItem.description}
					price={filteredItem.price}
				/>
			));
		}

		return <div className={classes.StoreItems}>{storeItem}</div>;
	}
}

export default StoreItems;
