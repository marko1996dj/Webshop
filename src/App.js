import React, { Component } from 'react';
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom';

import fire from './config/config';
import './App.css';
import Webshop from './container/Webshop/Webshop';
import Cart from './container/Cart/Cart';
import Wishlist from './container/Wishlist/Wishlist';
import Login from './container/Auth/Login/Login';
import Register from './container/Auth/Register/Register';
import PassReset from './container/Auth/PassReset/PassReset';
import EditUser from './container/EditUser/EditUser';
import UserProfile from './container/UserProfile/UserProfile';
import NavigationItems from './components/Navigation/NavigationItems/NavigationItems';
import ProductPage from './container/ProductPage/ProductPage';

class App extends Component {
	state = {
		user: null,
		userEmail: null
	};

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
			<React.Fragment>
				<NavigationItems />
				<HashRouter>
					<Switch>
						<Route path="Webshop/#/" exact component={Webshop} />
						<Route path="Webshop/#/webshop" component={Webshop} />
						<Route path="Webshop/#/cart" component={Cart} />
						<Route path="Webshop/#/wishlist" component={Wishlist} />
						<Route path="Webshop/#/register" component={Register} />
						<Route path="Webshop/#/password-reset" component={PassReset} />
						<Route path="Webshop/#/edit-user" exact component={EditUser} />
						<Route path="Webshop/#/user-profile" component={UserProfile} />
						<Route path="Webshop/#/login" render={() => <Login />} />
						<Route path="Webshop/#/product-page" component={ProductPage} />
					</Switch>
				</HashRouter>
			</React.Fragment>
		);
	}

	componentDidMount() {
		this.authListener();
	}
}

export default withRouter(App);
