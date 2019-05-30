import React, { Component } from 'react';
import config from '../../../config/config';
import { connect } from 'react-redux';

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

	addCommentHandler = () => {
		if (this.props.userId && !this.props.userInfo) {
			alert('You need to fill your information before leaving a comment');
		} else if (this.props.userId) {
			//if user is logged in
			config.fire
				.database()
				.ref('item/' + this.props.id + '/comments')
				.push({
					// push comment to specific item
					firstName: this.props.userInfo.firstName,
					lastName: this.props.userInfo.lastName,
					title: this.state.title,
					comment: this.state.comment
				})
				.then((u) => {
					alert('Comment added successfuly');
					window.location.reload();
				})
				.catch((e) => {
					console.log(e);
				});
		} else {
			// if user is not logged in
			alert('To leave a comment you need to be logged in!');
		}
	};

	render() {
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
				<Button onClick={this.addCommentHandler} style={{ width: 'none' }} className={classes.Button}>
					Add Comment
				</Button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userInfo: state.userInfo, // userInfo store state
		userId: state.userId // userId store state
	};
};

export default connect(mapStateToProps)(AddComment);
