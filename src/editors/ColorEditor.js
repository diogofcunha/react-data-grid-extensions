import React from 'react';
import PropTypes from 'prop-types';
import { CirclePicker } from 'react-color';
import editorWrapper from './editorWrapper';
import './styles/colorPicker.css';

const ColorEditor = ({ editorValue, Renderer = CirclePicker, onValueChanged, ...pickerProps }) => {
   return (
      <div className="editor-main editor-base color-picker">
         <Renderer
            width={250}
            color={editorValue}
            onChangeComplete={({ hex }) => onValueChanged(hex) }
            {...pickerProps} />
      </div>
   );
};

ColorEditor.propTypes = {
   editorValue: PropTypes.string.isRequired,
   onValueChanged: PropTypes.func.isRequired,
   Renderer: PropTypes.func
}

export default editorWrapper(ColorEditor);
export { ColorEditor };
