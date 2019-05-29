import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import classes from './EditUser.module.scss';

import config from '../../config/config';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/GeneralButton/Button';

class User extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleImageChange = this.handleImageChange.bind(this);
		this.updateUser = this.updateUser.bind(this);
		this.state = {
			firstName: '',
			lastName: '',
			country: '',
			city: '',
			streetAddress: '',
			zipCode: '',
			error: null,
			imgUrl: null,
			uidInfo: null,
			imageFile: null
		};
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleImageChange(e) {
		if (e.target.files[0]) {
			this.setState({ imageFile: e.target.files[0] });
		}
	}

	updateUser(e) {
		e.preventDefault();

		if (this.state.imageFile) {
			config.storage.ref('images/' + this.state.imageFile.name).put(this.state.imageFile).on(
				'state_changed',
				(snapshot) => {},
				(error) => {
					console.log(error);
				},
				() => {
					config.storage.ref('images').child(this.state.imageFile.name).getDownloadURL().then((url) => {
						config.fire
							.database()
							.ref('users/')
							.child(this.props.userId)
							.set({
								firstName: this.state.firstName,
								lastName: this.state.lastName,
								country: this.state.country,
								city: this.state.city,
								streetAddress: this.state.streetAddress,
								zipCode: this.state.zipCode,
								imgUrl: url
							})
							.then(() => {
								this.props.history.push('/user-profile');
							})
							.catch((e) => {
								console.log(e);
							});
					});
				}
			);
		} else {
			config.fire
				.database()
				.ref('users/')
				.child(this.props.userId)
				.set({
					firstName: this.state.firstName,
					lastName: this.state.lastName,
					country: this.state.country,
					city: this.state.city,
					streetAddress: this.state.streetAddress,
					zipCode: this.state.zipCode,
					imgUrl: this.state.imgUrl
				})
				.then(() => {
					this.props.history.push('/user-profile');
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}

	render() {
		return (
			<React.Fragment>
				<form className={classes.User}>
					<h3>Edit user information</h3>
					<div className={classes.Wrapper}>
						<div className={classes.Left}>
							<label className={classes.Label}>First name</label>
							<Input
								value={this.state.firstName}
								onChange={this.handleChange}
								type="text"
								name="firstName"
								placeholder="John"
							/>
							<label className={classes.Label}>Last name</label>
							<Input
								value={this.state.lastName}
								onChange={this.handleChange}
								type="text"
								name="lastName"
								placeholder="Smith"
							/>
							<label className={classes.Label}>Country</label>
							<Input
								value={this.state.country}
								onChange={this.handleChange}
								type="text"
								name="country"
								placeholder="USA"
							/>
						</div>
						<div className={classes.Right}>
							<label className={classes.Label}>City</label>
							<Input
								value={this.state.city}
								onChange={this.handleChange}
								type="text"
								name="city"
								placeholder="Richmond"
							/>
							<label className={classes.Label}>Street Address</label>
							<Input
								value={this.state.streetAddress}
								onChange={this.handleChange}
								type="text"
								name="streetAddress"
								placeholder="Richmond Rd. 2015"
							/>
							<label className={classes.Label}>ZIP/Postal Code</label>
							<Input
								value={this.state.zipCode}
								onChange={this.handleChange}
								type="text"
								name="zipCode"
								placeholder="31852"
							/>
						</div>
					</div>
					<div className={classes.UploadImage}>
						<label>Profile image</label>
						<Input
							className={classes.InputImage}
							onChange={this.handleImageChange}
							type="file"
							name="profileImage"
						/>
					</div>
					<div className={classes.Button}>
						<Button onClick={this.updateUser}>Update User</Button>
					</div>
				</form>
			</React.Fragment>
		);
	}

	componentDidMount() {
		if (this.props.isLoggedIn) {
			axios
				.get('https://webshop-9a548.firebaseio.com/users/' + this.props.userId + '.json')
				.then((response) => {
					this.setState({
						firstName: response.data.firstName,
						lastName: response.data.lastName,
						city: response.data.city,
						country: response.data.country,
						imgUrl: response.data.imgUrl,
						streetAddress: response.data.streetAddress,
						zipCode: response.data.zipCode
					});
				})
				.catch((e) => {
					this.setState({
						firstName: '',
						lastName: '',
						cirt: '',
						country: '',
						imgUrl: '',
						streetAddress: '',
						zipCode: ''
					});
				});
		}
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.isLoggedIn,
		userId: state.userId
	};
};

export default connect(mapStateToProps)(User);
