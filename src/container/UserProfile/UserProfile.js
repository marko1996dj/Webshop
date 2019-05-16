import React, { Component } from 'react';

import classes from './UserProfile.module.scss';

import NavigationItems from '../../components/UI/Navigation/NavigationItems/NavigationItems';
import Spinner from '../../components/UI/Spinner/Spinner';
import fire from '../../config/config';
import axios from '../../axios-orders';

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
				console.log(user.uid);
			} else {
				console.log('not logged in yet');
			}
		});
	}

	render() {
		let uidInfo;
		if (this.state.loading) {
			uidInfo = <Spinner />;
		} else {
			uidInfo = (
				<div className={classes.UserProfile}>
					<div className={classes.Heading}>
						<h1>User Profile</h1>
					</div>
					<div className={classes.Form}>
						<div className={classes.Img} />
						<div className={classes.Info}>
							<label>Name: </label>
							<p>{this.state.uidInfo.firstName + ' ' + this.state.uidInfo.lastName}</p>
							<label>Country: </label>
							<p>{this.state.uidInfo.country}</p>
							<label>Zip Code: </label>
							<p>{this.state.uidInfo.zipCode}</p>
							<label>City: </label>
							<p>{this.state.uidInfo.city}</p>
							<label>Street Address: </label>
							<p>{this.state.uidInfo.streetAddress}</p>
						</div>
					</div>
				</div>
			);
		}

		return (
			<React.Fragment>
				<NavigationItems />
				{uidInfo}
			</React.Fragment>
		);
	}
}

export default UserProfile;
