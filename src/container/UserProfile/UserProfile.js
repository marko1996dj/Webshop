import React, { Component } from 'react';

import classes from './UserProfile.module.scss';

import Spinner from '../../components/UI/Spinner/Spinner';
import fire from '../../config/config';
import axios from '../../axios-orders';
import Button from '../../components/UI/Button/GeneralButton/Button';

class UserProfile extends Component {
	state = {
		uidInfo: '',
		loadng: true
	};

	componentDidMount() {
		fire.auth().onAuthStateChanged((user) => {
			if (user) {
				axios
					.get('https://webshop-9a548.firebaseio.com/users/' + user.uid + '.json')
					.then((response) => {
						this.setState({ uidInfo: response.data });
						this.setState({ loading: false });
					})
					.catch((e) => {
						console.log(e);
					});
			}
		});
	}

	editProfileHandler = () => {
		this.props.history.push('/edit-user');
	};

	render() {
		console.log('fuck');
		let uidInfo;
		if (this.state.uidInfo) {
			uidInfo = (
				<div className={classes.UserProfile}>
					<div className={classes.Heading}>
						<h1>User Profile</h1>
					</div>
					<div className={classes.Form}>
						<div className={classes.Img} />
						<div className={classes.Info}>
							<div className={classes.Wrapper}>
								<div className={classes.Wrap}>
									<label>Name: </label>
									<p>{this.state.uidInfo.firstName + ' ' + this.state.uidInfo.lastName}</p>
								</div>
								<div className={classes.Wrap}>
									<label>Country: </label>
									<p>{this.state.uidInfo.country}</p>
								</div>
								<div className={classes.Wrap}>
									<label>Zip Code: </label>
									<p>{this.state.uidInfo.zipCode}</p>
								</div>
								<div className={classes.Wrap}>
									<label>City: </label>
									<p>{this.state.uidInfo.city}</p>
								</div>
								<div className={classes.Wrap}>
									<label>Street Address: </label>
									<p>{this.state.uidInfo.streetAddress}</p>
								</div>
							</div>
						</div>
						<div className={classes.Button}>
							<Button onClick={this.editProfileHandler}>Edit profile</Button>
						</div>
					</div>
				</div>
			);
		} else if (fire.auth().currentUser) {
			uidInfo = (
				<div className={classes.UserProfile}>
					<div className={classes.Heading}>
						<h1>User profile</h1>
					</div>
					<div className={classes.Form}>
						<h3>Please edit your profile</h3>
					</div>
					<div className={classes.Button}>
						<Button onClick={this.editProfileHandler}>Edit profile</Button>
					</div>
				</div>
			);
		} else {
			uidInfo = (
				<div className={classes.UserProfile}>
					<div className={classes.Spinner}>
						<Spinner />
					</div>
				</div>
			);
		}

		return <React.Fragment>{uidInfo}</React.Fragment>;
	}
}

export default UserProfile;
