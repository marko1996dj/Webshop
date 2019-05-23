import React, { Component } from 'react';

import CheckboxList from '../../components/CheckboxList/CheckboxList';
import StoreItems from '../StoreItems/StoreItems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import classes from './Webshop.module.scss';

class Webshop extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: null,
			firstItem: 0,
			lastItem: 6
		};
	}

	onChangeType = (newType) => {
		this.setState({ type: newType });
	};

	onPaginateNext = () => {
		if (this.state.lastItem === 30) {
		} else {
			this.setState((prevState) => ({
				firstItem: prevState.firstItem + 6,
				lastItem: prevState.lastItem + 6
			}));
		}
	};

	onPaginatePrevious = () => {
		if (this.state.firstItem === 0) {
		} else {
			this.setState((prevState) => ({
				firstItem: prevState.firstItem - 6,
				lastItem: prevState.lastItem - 6
			}));
		}
	};

	render() {
		return (
			<React.Fragment>
				<div className={classes.Webshop}>
					<CheckboxList onChange={this.onChangeType.bind(this)} />
					<StoreItems
						firstItem={this.state.firstItem}
						lastItem={this.state.lastItem}
						itemType={this.state.type}
					/>
				</div>
				<div className={classes.Buttons}>
					<FontAwesomeIcon
						className={classes.Previous}
						onClick={this.onPaginatePrevious}
						icon={faAngleLeft}
					/>
					<FontAwesomeIcon className={classes.Next} onClick={this.onPaginateNext} icon={faAngleRight} />
				</div>
			</React.Fragment>
		);
	}
}

export default Webshop;
