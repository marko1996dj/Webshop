import React from 'react';

import classes from './Input.module.scss';

const inputField = (props) => {
	let inputElement = null;
	switch (props.typeOfInput) {
		case 'input':
			inputElement = <input className={classes.InputElement} {...props} />;
			break;
		case 'textarea':
			inputElement = <textarea className={classes.InputElement} {...props} />;
			break;
		default:
			inputElement = <input className={classes.InputElement} {...props} />;

			return (
				<div className={classes.InputField}>
					<label className={classes.Label}>{props.Label}</label>
					{inputElement}
				</div>
			);
	}
};
export default inputField;

