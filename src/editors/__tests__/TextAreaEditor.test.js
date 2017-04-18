import React from 'react';
import { mount } from 'enzyme';
import { TextAreaEditor } from '../TextAreaEditor';

describe('TextAreaEditor', () => {
   let textAreaEditorWrapper;

   const props = {
      onValueChanged: jest.fn(),
      editorValue: 'Area value'
   };

   const getTextArea = () => textAreaEditorWrapper.find('textarea');

   beforeEach(() => {
      textAreaEditorWrapper = mount(<TextAreaEditor {...props} />)
   });

   it('should render a text area with the correct value', () => {
      const { value } = getTextArea().props();
      const { editorValue: expectedValue } = props;

      expect(value).toBe(expectedValue);
   });

   it('should call onChange with the correct params', () => {
      const value = 'New area value';
      const { onValueChanged } = props;

      getTextArea().simulate('change', { target: { value } });

      expect(onValueChanged).lastCalledWith(value);
   });
});
