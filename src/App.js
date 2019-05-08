import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import fire from './config/config';
import './App.css';
import Webshop from './container/Webshop/Webshop';
import Cart from './container/Cart/Cart';
import Wishlist from './container/Wishlist/Wishlist';
import Login from './container/Login/Login';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
		};
	}

	componentDidMount() {
		this.authListener();
	}

	authListener() {
		fire.auth().onAuthStateChanged((user) => {


			if (user) {
				this.setState({ user });
				console.log(user)
				// localStorage.setItem('user', user.uid);
			} else {
				this.setState({ user: null });
				console.log(user)
				// localStorage.removeItem('user');
			}
		});
	}

	render() {
		let app = null;
		if (this.state.user) {
			app = <p>you are logged in!</p>
			console.log("logged in")
		}else {
			app = <Login />
			console.log("not logged in")
		}

		return <div className="App">{app}</div>;
	}
}

export default App;


{/* <Switch>
<Route path="/" exact component={Webshop} />
<Route path="/webshop" component={Webshop} />
<Route path="/cart" component={Cart} />
<Route path="/wishlist" component={Wishlist} />
<Route path="/login-register" component={Login} />
</Switch> */}