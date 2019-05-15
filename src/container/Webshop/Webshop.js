import React, { Component } from "react";

import CheckboxList from "../../components/CheckboxList/CheckboxList";
import StoreItems from "../StoreItems/StoreItems";

import classes from "./Webshop.module.scss";
import NavigationItems from "../../components/UI/Navigation/NavigationItems/NavigationItems";

class Webshop extends Component {
  state = {
    type: null
  };

  onChangeType = newType => {
    this.setState({ type: newType });
  };
  
  render() {
    return (
      <React.Fragment>
        <NavigationItems />
        <div className={classes.Webshop}>
          <CheckboxList onChange={this.onChangeType.bind(this)} />
          <StoreItems itemType={this.state.type} />
        </div>
      </React.Fragment>
    );
  }
}

export default Webshop;
