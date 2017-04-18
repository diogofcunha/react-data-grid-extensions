import React from 'react';
import PropTypes from 'prop-types';
import './styles/MultiSelectFormatter.css';
 
const MultiSelectFormatter = ({ value = [] }) => {
   return (
      <div>
         { value.map(({ label, value }) => <span key={value} className="selected"><b>{ label }</b></span> ) }
      </div>
   );
};

const selectValueShape = {
   label: PropTypes.string.isRequired,
   value: PropTypes.string.isRequired
};

MultiSelectFormatter.propTypes = {
   value: PropTypes.arrayOf(PropTypes.shape(selectValueShape)).isRequired
};

export default MultiSelectFormatter;
