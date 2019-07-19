import React, { Component } from 'react';
import axios from '../../axios-orders';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import StoreItem from './StoreItem/StoreItem';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from '../Webshop/Webshop.module.scss';

class StoreItems extends Component {
  state = {
    items: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get('https://webshop-9a548.firebaseio.com/item.json')
      .then(response => {
        this.setState({ items: response.data }); //get store items
        this.setState({ loading: false });
      });
  }

  renderPaginate = length => {
    const nextDisabled = this.props.lastItem + 6 > length + 6;
    const prevDisabled = this.props.firstItem - 6 < 0;

    return (
      <div className={classes.Buttons}>
        <button
          className={classes.PaginateBtn}
          type="button"
          onClick={this.props.prevPage}
          disabled={prevDisabled}
        >
          <FontAwesomeIcon
            className={prevDisabled ? classes.Disabled : classes.Previous}
            icon={faAngleLeft}
          />
        </button>
        <button
          type="button"
          disabled={nextDisabled}
          onClick={this.props.nextPage}
          className={classes.PaginateBtn}
        >
          <FontAwesomeIcon
            className={nextDisabled ? classes.Disabled : classes.Next}
            icon={faAngleRight}
          />
        </button>
      </div>
    );
  };

  renderList = () => {
    // filter matching types, We need this list so we
    // know the length of the filtered list
    const filteredComponents = this.state.items.filter(
      item => this.props.itemType.indexOf(item.type) >= 0
    );

    // Created the StoreItems using the filtedlist and
    // slice it using the pagination values.
    const filtedComponentsPaginated = filteredComponents
      .slice(this.props.firstItem, this.props.lastItem) // paginate
      .map(item => (
        <StoreItem
          uniqueId={item.id}
          imgUrl={item.imgUrl}
          key={item.id}
          brand={item.brand}
          description={item.description}
          price={item.price}
          detailedDescription={item.detailedDescription}
        />
      ));

    // render the components list and the pagination component
    // giving it the length of our filtered list, that way we
    // know how when to disable the buttons.
    return (
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {filtedComponentsPaginated}
        </div>
        {this.renderPaginate(filteredComponents.length)}
      </div>
    );
  };

  render() {
    //Loading state
    if (this.state.loading) {
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Spinner />
        </div>
      );
    }

    // If there are no items to return we need to tell the user
    if (!this.state.items.length) {
      return (
        <div>
          Sorry no items{' '}
          <span aria-label="Crying smile" role="img">
            😢
          </span>
        </div>
      );
    }

    // Render list
    return this.renderList();
  }
}

export default StoreItems;
