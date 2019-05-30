import React, { Component } from 'react';

import StoreItem from './StoreItem/StoreItem';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';

class StoreItems extends Component {
	state = {
		items: [],
		loading: true,
		firstItem: 0,
		lastItem: 6
	};

	render() {
		let items = this.state.items;
		let storeItem, shoes, socks, hoodies, shorts, tShirt, shirts, jackets, jeans, underwear;
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
			//initially a spinned until storeItem is filled with items from db
			storeItem = (
				<div>
					<Spinner />
				</div>
			);
		} else if (this.props.itemType) {
			//if user selected item type
			let filteredItems = items
				.filter(
					//filtering items by type
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
				)
				.slice(this.state.firstItem, this.state.lastItem);
			storeItem = filteredItems.map((filteredItem, index) => (
				<StoreItem //maping filtered items and sending their info via props to StoreItem component
					uniqueId={filteredItem.id}
					imgUrl={filteredItem.imgUrl}
					key={index}
					brand={filteredItem.brand}
					description={filteredItem.description}
					price={filteredItem.price}
					detailedDescription={filteredItem.detailedDescription}
				/>
			));
		} else {
			//if user did not select item type
			storeItem = items.slice(this.state.firstItem, this.state.lastItem).map((
				filteredItem,
				index //map all products and send their info via props to StoreItem component
			) => (
				<StoreItem
					uniqueId={filteredItem.id}
					imgUrl={filteredItem.imgUrl}
					key={index}
					brand={filteredItem.brand}
					description={filteredItem.description}
					price={filteredItem.price}
					detailedDescription={filteredItem.detailedDescription}
				/>
			));
		}

		return <div style={{ display: 'flex', flexWrap: 'wrap' }}>{storeItem}</div>;
	}
	componentDidMount() {
		axios.get('https://webshop-9a548.firebaseio.com/item.json').then((response) => {
			this.setState({ items: response.data }); //get store items
			this.setState({ loading: false });
		});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			firstItem: nextProps.firstItem,
			lastItem: nextProps.lastItem //paginating array of items by increasing or decreasing index of items
		});
	}
}

export default StoreItems;
