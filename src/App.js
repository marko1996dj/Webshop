import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Webshop from './container/Webshop/Webshop';
import Cart from './container/Cart/Cart';
import Wishlist from './container/Wishlist/Wishlist';
import Login from './container/Login/Login';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Switch>
					<Route path="/" exact component={Webshop} />
					<Route path="/webshop" component={Webshop} />
					<Route path="/cart" component={Cart} />
					<Route path="/wishlist" component={Wishlist} />
					<Route path="/login-register" component={Login} />
				</Switch>
			</div>
		);
	}
}

export default App;
