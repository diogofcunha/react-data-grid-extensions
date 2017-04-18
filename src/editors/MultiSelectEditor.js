import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import editorWrapper from './editorWrapper';
import 'react-select/dist/react-select.css';

const MultiSelectEditor = ({ editorValue, onValueChanged, ...selectProps }) => {
   return (
      <div className="editor-main editor-base">
         <Select
            onChange={onValueChanged}
            multi={true}
            {...selectProps}
            value={editorValue} />
      </div>
   );
};

MultiSelectEditor.propTypes = {
   editorValue: PropTypes.oneOfType([ PropTypes.arrayOf(PropTypes.string), PropTypes.string ]).isRequired,
   onValueChanged: PropTypes.func.isRequired
};

export default editorWrapper(MultiSelectEditor);
export { MultiSelectEditor };
