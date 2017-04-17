import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ColumnEditor extends Component {
   constructor() {
      super();
      this.handeKeyDown = this.handeKeyDown.bind(this);
   }

   static propTypes = {
      name: PropTypes.string,
      handleChange: PropTypes.func.isRequired,
      commitValue: PropTypes.func.isRequired
   }

   handeKeyDown({ key }) {
      const { commitValue } = this.props;

      switch (key) {
         case 'Tab':
            commitValue();
            break;
      
         default:
            break;
      }
   }

   render() {
      const { name, handleChange, commitValue } = this.props;
      return (
         <input
            autoFocus
            type="text"
            value={name}
            onChange={handleChange}
            onKeyDown={this.handeKeyDown}
            onBlur={commitValue} 
            className="react-grid-HeaderCell edit-input"
            />
      );
   }
}

export default ColumnEditor;
