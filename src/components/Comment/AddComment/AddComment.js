import React, { Component } from 'react';
import fire from '../../../config/config';
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
		fire
			.database()
			.ref('item/' + this.props.id + '/comments')
			.push({
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

const mapStateToProps = state => {
	return{
		userInfo: state.userInfo
	}
}

export default connect(mapStateToProps)(AddComment);
