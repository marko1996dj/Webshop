import React, { Component } from 'react';

import CheckboxList from '../../components/CheckboxList/CheckboxList';
import StoreItems from '../StoreItems/StoreItems';
import classes from './Webshop.module.scss';

class Webshop extends Component {
  state = {
    type: [
      'Shoes',
      'Socks',
      'Hoodies',
      'Shorts',
      'T-Shirts',
      'Shirts',
      'Jackets',
      'Jeans',
      'Underwear',
    ],
    firstItem: 0,
    lastItem: 6,
  };

  onChangeType = newType => {
    this.setState({ type: newType }); //sending type on change to CheckboxList
  };

  onPaginateNext = () => {
    if (this.state.lastItem === 30) {
    } else {
      this.setState(prevState => ({
        // +6 to first and last item index to generate next 6 items
        firstItem: prevState.firstItem + 6,
        lastItem: prevState.lastItem + 6,
      }));
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  onPaginatePrevious = () => {
    if (this.state.firstItem !== 0) {
      this.setState(prevState => ({
        // -6 to first and last item index to generate previous 6 items
        firstItem: prevState.firstItem - 6,
        lastItem: prevState.lastItem - 6,
      }));
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className={classes.Webshop}>
          <CheckboxList onChange={this.onChangeType.bind(this)} />
          <StoreItems
            firstItem={this.state.firstItem}
            lastItem={this.state.lastItem}
            itemType={this.state.type}
            nextPage={this.onPaginateNext}
            prevPage={this.onPaginatePrevious}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Webshop;
