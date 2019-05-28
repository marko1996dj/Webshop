import React, { Component } from 'react';

import Checkbox from './CheckboxItem/Checkbox';
import Button from '../UI/Button/GeneralButton/Button';

const checkboxItems = [ 'Shoes', 'Socks', 'Hoodies', 'Shorts', 'T-Shirts', 'Shirts', 'Jackets', 'Jeans', 'Underwear' ];

class CheckboxList extends Component {
	state = {
		type: []
	};

	componentWillMount = () => {
		this.selectedCheckboxes = new Set();
	};

	toggleCheckbox = (label) => {
		let newStateType = this.state.type;
		if (newStateType.includes(label)) {
			for (let i = 0; newStateType.length >= i; i++) {
				if (newStateType[i] === label) {
					newStateType.splice(i, 1);
				}
			}
		} else {
			newStateType.push(label);
			this.setState({ type: newStateType });
		}
	};

	handleFormSubmit = (formSubmitEvent) => {
		formSubmitEvent.preventDefault();
		this.props.onChange(this.state.type);
	};

	createCheckbox = (label) => <Checkbox label={label} handleCheckboxChange={this.toggleCheckbox} key={label} />;

	createCheckboxes = () => checkboxItems.map(this.createCheckbox);

	render() {
		const style = {
			border: '1px solid #dedede',
			borderRadius: '5px',
			maxHeight: '350px',
			padding: '10px',
		}
		return (
			<form className="m-3" style={style} onSubmit={this.handleFormSubmit}>
				{this.createCheckboxes()}

				<Button>Save</Button>
			</form>
		);
	}
}

export default CheckboxList;
