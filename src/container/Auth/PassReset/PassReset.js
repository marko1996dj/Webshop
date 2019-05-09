import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import classes from './PassReset.module.scss';

import fire from '../../../config/config';
import Layout from '../../../components/Layout/Layout';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/GeneralButton/Button';


class PassReset extends Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.passReset = this.passReset.bind(this);
        this.state = {
            email: '',
        }
    }


    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    passReset(e) {
        e.preventDefault();
        fire.auth().sendPasswordResetEmail(this.state.email)
    }

    render(){



        return(
            <React.Fragment>
            <Layout user={this.state.user} />
            <form className={classes.PassReset}>
                <h3>Reset password.</h3>
                <label className={classes.Label}>E-mail address</label>
                <Input
                    value={this.state.email}
                    onChange={this.handleChange}
                    type="email"
                    name="email"
                    placeholder="Enter e-mail"
                />
                <div className={classes.Button}>
                    <Button onClick={this.passReset}>Reset password</Button>
                </div>
            </form>
        </React.Fragment>
        );
    }
}

export default withRouter(PassReset);