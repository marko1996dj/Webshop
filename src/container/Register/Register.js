import React, { Component } from "react";

import classes from "./Register.module.scss";

import Input from "../../components/UI/Input/Input";
import Layout from "../../components/Layout/Layout";
import Button from "../../components/UI/Button/GeneralButton/Button";
import fire from "../../config/config";

class Register extends Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      email: "",
      password: ""
    };
  }

  signUp(e) {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        this.props.history.push("/");
        alert("You have successfully created account and are now signed in!");
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorMessage = error.message;
        alert(errorMessage);
        // ...
      });
  }

  logout(e) {
    e.preventDefault();
    fire
      .auth()
      .signOut()
      .then(
        function() {
          alert("You have been successfully logged out!");
        },
        function(error) {
          alert(error);
        }
      );
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <React.Fragment>
        <Layout />
        <form className={classes.Register}>
          <a href="/login">Already have an account?</a>
          <br />
          <label>E-mail address</label>
          <Input
            value={this.state.email}
            onChange={this.handleChange}
            type="email"
            name="email"
            placeholder="Enter e-mail"
          />
          <label>Password</label>
          <Input
            value={this.state.pasword}
            onChange={this.handleChange}
            type="password"
            name="password"
            placeholder="Enter password"
            autoComplete="on"
          />
          <div className={classes.Button}>
            <Button onClick={this.signUp}>Register</Button>
            <Button onClick={this.logout}>Logout</Button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default Register;
