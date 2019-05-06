import React from 'react';

import classes from './StoreItem.module.scss';

const StoreItem = (props) => (
	<div className={classes.StoreItem}>
		<div className={classes.Image} />
		<div className={classes.Name}>
			<h3>{props.brand}</h3>
		</div>
		<div className={classes.Description}>
			<p>
				{props.description}
			</p>
		</div>
		<div className={classes.Price}><p>{props.price}$</p></div>
	</div>
);

export default StoreItem;
