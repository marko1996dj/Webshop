import React, { Component } from 'react';

import Button from '../UI/Button/GeneralButton/Button';

class CheckboxList extends Component {
  state = {
    checkboxItems: [
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
  };

  handleFormSubmit = e => {
    e.preventDefault();
    // get all input items that have the are currently checked
    const checkedList = Array.from(
      document.querySelectorAll('.checkbox:checked')
    ).map(checkbox => checkbox.value);

    // if there are no items checked and we submit the form
    // it's expected to return all items, meaning we dont
    // want to filter anything.
    if (checkedList.length === 0) {
      this.props.onChange(this.state.checkboxItems);
    } else {
      this.props.onChange(checkedList);
    }
  };

  render() {
    const style = {
      border: '1px solid #dedede',
      borderRadius: '5px',
      padding: '10px',
      alignSelf: 'start',
      maxWidth: '380px',
      flex: '1',
      marginTop: '15px'
    };
    return (
      <div style={style}>
        <form
          className="m-3"
          style={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={this.handleFormSubmit}
        >
          {this.state.checkboxItems.map(item => (
            <label key={item}>
              <input
                className="checkbox"
                type="checkbox"
                value={item}
                style={{ marginRight: '5px' }}
              />
              {item}
            </label>
          ))}

          <Button>Save</Button>
        </form>
      </div>
    );
  }
}

export default CheckboxList;