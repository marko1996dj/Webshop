import React, { Component } from 'react';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/GeneralButton/Button';

import classes from './AddComment.module.scss';

class AddComment extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			title: '',
			comment: ''
		};
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		console.log(this.props.id);
		const style = {
			marginLeft: '0'
		};
		return (
			<div className={classes.AddComment}>
				<div className={classes.Title}>
					<label>Title</label>
					<Input
						style={style}
						value={this.state.title}
						onChange={this.handleChange}
						type="text"
						name="title"
						autoComplete="off"
					/>
				</div>
				<div className={classes.Comment}>
					<label>Comment</label>
					<textarea
						style={style}
						rows="4"
						cols="50"
						value={this.state.comment}
						onChange={this.handleChange}
						type="textarea"
						name="comment"
						autoComplete="off"
					/>
				</div>
				<Button style={{ width: 'none' }} className={classes.Button}>
					Add Comment
				</Button>
			</div>
		);
	}
}

export default AddComment;
