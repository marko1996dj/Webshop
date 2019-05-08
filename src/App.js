import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import fire from "./config/config";
import "./App.css";
import Webshop from "./container/Webshop/Webshop";
import Cart from "./container/Cart/Cart";
import Wishlist from "./container/Wishlist/Wishlist";
import Login from "./container/Login/Login";
import Register from "./container/Register/Register";

class App extends Component {
  state = {
    user: null,
    userEmail: null
  };

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user });
        this.setState({ userEmail: user.email });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    console.log(this.state.user);
    return (
      <Switch>
        <Route path="/" exact component={Webshop} />
        <Route path="/webshop" component={Webshop} />
        <Route path="/cart" component={Cart} />
        <Route path="/wishlist" component={Wishlist} />
        <Route path="/register" component={Register} />
        <Route path="/login" render={() => <Login />} />
      </Switch>
    );
  }
}

export default withRouter(App);
