import React, { Component } from 'react';
import { connect } from 'react-redux';
import config from '../../config/config';
import axios from '../../axios-orders';

import classes from './ProductPage.module.scss';

import Button from '../../components/UI/Button/GeneralButton/Button';
import AddComment from '../../components/Comment/AddComment/AddComment';
import CommentList from '../../components/Comment/CommentList/CommentList';

class ProductPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: false
		};
	}

	addToCart = () => {
		//add item to cart
		config.fire
			.database()
			.ref('users/' + this.props.userId + '/cartItems')
			.push({
				//push product info to users db
				brand: this.props.productInfo.brand,
				description: this.props.productInfo.description,
				price: this.props.productInfo.price,
				imgUrl: this.props.productInfo.imgUrl
			})
			.then((u) => {
				alert('Item added to cart');
			})
			.catch((e) => {
				console.log(e);
			});
	};

	addToWishlist = () => {
		//add item to wishlist
		config.fire
			.database()
			.ref('users/' + this.props.userId + '/wishlistItems')
			.push({
				//push product info to users db
				brand: this.props.productInfo.brand,
				description: this.props.productInfo.description,
				price: this.props.productInfo.price,
				imgUrl: this.props.productInfo.imgUrl
			})
			.then((u) => {
				alert('Item added to wishlist');
			})
			.catch((e) => {
				console.log(e);
			});
	};

	render() {
		let commentList;

		if (this.state.comments) {
			//if there are comments
			const comments = Object.values(this.state.comments);
			commentList = comments.map((
				comment,
				index //map each comment and send values as props to CommentList
			) => (
				<CommentList
					firstName={comment.firstName}
					lastName={comment.lastName}
					key={index}
					title={comment.title}
					comment={comment.comment}
				/>
			));
		}

		const productInfo = this.props.productInfo;
		return (
			<div className={classes.ProductPage}>
				<div className={classes.Wrapper}>
					<div className={classes.Image}>
						<img src={productInfo.imgUrl} alt={productInfo.imgUrl} />
					</div>
					<div className={classes.BPWrapper}>
						<div className={classes.Brand}>
							<h1>{productInfo.brand}</h1>
						</div>
						<div className={classes.Price}>
							<h1>{productInfo.price}$</h1>
						</div>
					</div>
				</div>
				<div className={classes.Description}>
					<p>{productInfo.detailedDescription}</p>
				</div>
				<div className={classes.Buttons}>
					<Button className={classes.Cart} onClick={this.addToCart}>
						Add to cart
					</Button>
					<Button className={classes.Wishlist} onClick={this.addToWishlist}>
						Add to wishlist
					</Button>
				</div>
				<AddComment id={this.props.productInfo.id} />
				{commentList}
			</div>
		);
	}

	componentDidMount() {
		axios
			.get('https://webshop-9a548.firebaseio.com/item/' + this.props.productInfo.id + '/comments.json')
			.then((response) => {
				this.setState({ comments: response.data }); //store comments of product if any to this.state.comments
			})
			.catch((e) => {
				console.log(e);
			});
	}
}

const mapStateToProps = (state) => {
	return {
		productInfo: state.productInfo, // productInfo store state
		userId: state.userId //userId store state
	};
};

export default connect(mapStateToProps)(ProductPage);
