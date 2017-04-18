import React from 'react';
import PropTypes from 'prop-types';

const ColorFormatter = ({ value = 'white'}) => <div style={{ backgroundColor: value, padding: 10 }}></div>

ColorFormatter.propTypes = {
   value: PropTypes.string
};

export default ColorFormatter;
