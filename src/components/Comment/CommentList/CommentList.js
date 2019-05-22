import React, { Component } from 'react';

import classes from './CommentList.module.scss';

class CommentList extends Component {
	render() {
		return (
			<React.Fragment>
				<div className={classes.CommentList}>
					<div className={classes.User}>
						<p>{this.props.firstName} {this.props.lastName}</p>
					</div>
					<div className={classes.Title}>
						<p>{this.props.title}</p>
					</div>
					<div className={classes.Comment}>
						<p>{this.props.comment}</p>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default CommentList
