import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import fire from './config/config';
import './App.css';
import Webshop from './container/Webshop/Webshop';
import Cart from './container/Cart/Cart';
import Wishlist from './container/Wishlist/Wishlist';
import Login from './container/Auth/Login/Login';
import Register from './container/Auth/Register/Register';
import PassReset from './container/Auth/PassReset/PassReset';
import User from './container/User/User';
import UserProfile from './container/UserProfile/UserProfile';

class App extends Component {
	state = {
		user: null,
		userEmail: null
	};

	componentDidMount() {
		this.authListener();
	}

	authListener() {
		fire.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ user: user });
				this.setState({ userEmail: user.email });
			} else {
				this.setState({ user: null });
			}
		});
	}

	render() {
		return (
			<Switch>
				<Route path="/" exact component={Webshop} />
				<Route path="/webshop" component={Webshop} />
				<Route path="/cart" component={Cart} />
				<Route path="/wishlist" component={Wishlist} />
				<Route path="/register" component={Register} />
				<Route path="/password-reset" component={PassReset}/>
				<Route path="/user" exact component={User} />
				<Route path="/user/user-profile" component={UserProfile} />
				<Route path="/login" render={() => <Login />} />
			</Switch>
		);
	}
}

export default withRouter(App);
