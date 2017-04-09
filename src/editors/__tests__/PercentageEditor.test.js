import { PercentageEditor } from '../PercentageEditor';
import React from 'react';
import { shallow } from 'enzyme';
import Slider from 'rc-slider';

describe('PercentageEditor', () => {
   let percentageEditorWrapper;

   const props = {
      editorValue: 25,
      minValue: 22,
      maxValue: 500,
      onValueChanged: () => {}
   };

   beforeEach(() => {
      percentageEditorWrapper = shallow(<PercentageEditor {...props} />);
   });

   it('renders with the correct props', () => {
      const { max, min, defaultValue, onChange } = percentageEditorWrapper.find(Slider).props();
      const { maxValue, minValue, editorValue, onValueChanged } = props;

      expect(max).toBe(maxValue);
      expect(min).toBe(minValue);
      expect(defaultValue).toBe(editorValue);
      expect(onChange).toBe(onValueChanged);
   });
});
