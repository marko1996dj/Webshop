import React from 'react';

import classes from './Button.module.scss';

const Button = ( props ) => (
    <div className={classes.Button}>
        <button {...props}>{props.children}</button>
    </div>
)

export default Button