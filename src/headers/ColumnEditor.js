import React, { PropTypes, Component } from 'react';

class ColumnEditor extends Component {
   static propTypes = {
      name: PropTypes.string,
      handleChange: PropTypes.func.isRequired,
      commitValue: PropTypes.func.isRequired
   }

   componentDidMount() {
      this._input.focus();
      this._input.select();
   }

   render() {
      const { name, handleChange, commitValue } = this.props;
      return (
         <input
            ref={ i => { this._input = i } }
            type="text"
            value={name}
            onChange={handleChange}
            onBlur={commitValue} 
            className="react-grid-HeaderCell edit-input"
            />
      );
   }
}

export default ColumnEditor;
