import React from 'react';
import Select from 'react-select';
import { shallow } from 'enzyme';
import { MultiSelectEditor } from '../MultiSelectEditor';

describe('MultiSelectEditor', () => {
   let multiSelectEditorWrapper;

   const props = {
      editorValue: 'Option 1',
      onValueChanged: jest.fn(),
      options: [ 'Option1', 'Option 2', 'Option 3' ]
   };

   const getSelect = () => multiSelectEditorWrapper.find(Select);

   beforeEach(() => {
      multiSelectEditorWrapper = shallow(<MultiSelectEditor {...props} />);
   });

   it('should render a Select with the correct props', () => {
      const { value, options, multi } = getSelect().props();
      const { editorValue: expectedValue, options: expectedOptions } = props;

      expect(value).toBe(expectedValue);
      expect(multi).toBe(true);
      expect(options).toBe(expectedOptions);
   });

   it('should call onValueChanged with the correct value', () => {
      const newValue = 'Option 2';
      const { onValueChanged } = props;

      getSelect().simulate('change', newValue);

      expect(onValueChanged).lastCalledWith(newValue);
   });
});
