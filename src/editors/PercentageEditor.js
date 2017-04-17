import React from 'react';
import PropTypes from 'prop-types';
import editorWrapper from './editorWrapper';
import Slider, { Handle } from 'rc-slider';
import './styles/editor.css';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';

export const HandleSlider = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle {...restProps} />
    </Tooltip>
  );
};

const PercentageEditor = ({ editorValue, minValue, maxValue, onValueChanged }) => {
   return (
      <div className="editor-main editor-base">
         <Slider min={minValue} max={maxValue} defaultValue={editorValue} onChange={onValueChanged} handle={HandleSlider}/>
      </div>
   );
};

PercentageEditor.propTypes = {
   maxValue: PropTypes.number,
   minValue: PropTypes.number,
   editorValue: PropTypes.number.isRequired,
   onValueChanged: PropTypes.func.isRequired
};

PercentageEditor.defaultProps = {
   maxValue: 100,
   minValue: 0
}

export default editorWrapper(PercentageEditor);
export { PercentageEditor };
