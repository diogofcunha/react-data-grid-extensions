import React from 'react';
import PropTypes from 'prop-types';

const JsonFormatter = ({ value, format }) => <div>{ format(value) }</div>

JsonFormatter.propTypes = {
   value: PropTypes.object.isRequired,
   format: PropTypes.func
}

JsonFormatter.defaultProps = {
   format: v => {
      const valueKeys = Object.keys(v);
      const totalKeys = valueKeys.length;

      return valueKeys.reduce((acc, key, i) => {
         acc += `${key}: ${v[key]}`;

         if (i !== totalKeys - 1) {
            acc += ', '
         }

         return acc;
      }, '');
   }
}

export default JsonFormatter;
