import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.scss';

const NavigationItems = () =>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/webshop">Webshop</NavigationItem>
        <NavigationItem link="/cart">Cart</NavigationItem>
        <NavigationItem link="/wishlist">Wishlist</NavigationItem>
        <NavigationItem link="/login-register">Login/Register</NavigationItem>
    </ul>
);

export default NavigationItems;