import { PercentageEditor, HandleSlider } from '../PercentageEditor';
import React from 'react';
import { shallow } from 'enzyme';
import Slider, { Handle } from 'rc-slider';
import Tooltip from 'rc-tooltip';

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

   describe('handle', () => {
      let handerWrapper;

      const handlerProps = {
         value: 1,
         dragging: true,
         index: 2,
         extraProp: 'extra',
         anotherProp: 'extra2'
      };

      beforeEach(() => {
         handerWrapper = shallow(<HandleSlider {...handlerProps} />);
      });

      it('renders a Tooltip with the correct props', () => {
         const { overlay, visible } = handerWrapper.find(Tooltip).props();
         const { value: expectedOverlay, dragging: expectedVisibility, index: expectedKey } = handlerProps;

         expect(overlay).toBe(expectedOverlay);
         expect(visible).toBe(expectedVisibility);
      });

      it('renders a Handle with the correct props', () => {
         const handleProps = handerWrapper.find(Handle).props();
         const { extraProp, anotherProp } = handlerProps;

         expect(handleProps).toEqual({
            extraProp,
            anotherProp
         });
      });
   });
});
