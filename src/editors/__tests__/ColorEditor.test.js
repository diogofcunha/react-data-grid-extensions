import { ColorEditor } from '../ColorEditor';
import React from 'react';
import { shallow } from 'enzyme';
import { CirclePicker, TwitterPicker } from 'react-color';

describe('Color Editor', () => {
   let colorEditorWrapper;

   const props = {
      editorValue: 'black',
      onValueChanged: jest.fn(),
      extraProp: 'ext',
      secondProp: 'ext'
   };
   
   const render = (extraProps = {}) => shallow(<ColorEditor {...props} {...extraProps} />);
   const getDefaultPicker = () => colorEditorWrapper.find(CirclePicker);

   beforeEach(() => {
      colorEditorWrapper = render();
   });

   it('should render a the correct editor with the correct props', () => {
      const { width, color, onChangeComplete, extraProp, secondProp } = getDefaultPicker().props();

      const { editorValue: expectedColor, extraProp: expectedExtraProp, secondProp: expectedSecondProp } = props;

      expect(width).toBe(250);
      expect(color).toBe(expectedColor);
      expect(onChangeComplete).toBeDefined();
      expect(extraProp).toBe(expectedExtraProp);
      expect(secondProp).toBe(expectedSecondProp);
   });

   it('should render a custom renderer', () => {
      colorEditorWrapper = render({ Renderer: TwitterPicker });

      expect(colorEditorWrapper.find(TwitterPicker).length).toBe(1);
      expect(colorEditorWrapper.find(CirclePicker).length).toBe(0);
   });

   it('onChangeComplete should call onValueChanged with the correct params', () => {
      const selectedColor = 'red';
      const { onValueChanged } = props;
      getDefaultPicker().simulate('changeComplete', { hex: selectedColor });

      expect(onValueChanged).lastCalledWith(selectedColor);
   });
});
