import React, { Component } from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.scss';

class NavigationItems extends Component {
    render(){
        return(
            <ul className={classes.NavigationItems}>
            <NavigationItem link="/webshop">Webshop</NavigationItem>
            <NavigationItem link="/cart">Cart</NavigationItem>
            <NavigationItem link="/wishlist">Wishlist</NavigationItem>
            <NavigationItem link="/register">Login/Register</NavigationItem>
        </ul>
        );
    }
}
export default NavigationItems;