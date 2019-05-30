import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

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
import Footer from './components/Footer/Footer';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<NavigationItems />
				<Switch>
					<Route path="/" exact component={Webshop} />
					<Route path="/webshop" component={Webshop} />
					<Route path="/cart" component={Cart} />
					<Route path="/wishlist" component={Wishlist} />
					<Route path="/register" component={Register} />
					<Route path="/password-reset" component={PassReset} />
					<Route path="/edit-user" component={EditUser} />
					<Route path="/user-profile" component={UserProfile} />
					<Route path="/login" component={Login} />
					<Route path="/product-page" component={ProductPage} />
				</Switch>
				<Footer />
			</React.Fragment>
		);
	}
}

export default withRouter(App);
