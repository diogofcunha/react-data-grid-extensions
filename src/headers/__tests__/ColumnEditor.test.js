import ColumnEditor from '../ColumnEditor';
import React from 'react';
import { shallow } from 'enzyme';

describe('ColumnEditor', () => {
   let columnEditorWrapper;
   const props = {
      handleChange: jest.fn(),
      commitValue: jest.fn(),
      name: 'Column 234'
   }

   const getInput = () => columnEditorWrapper.find('input');

   beforeEach(() => {
      columnEditorWrapper = shallow(<ColumnEditor {...props} />);
   });

   it('should render with the correct value', () => {
      const { value } = getInput().props();

      expect(value).toBe(props.name);
   })

   it('should pass down the correct handlers', () => {
      const { onChange, onBlur } = getInput().props();
      const { handleChange, commitValue } = props;

      expect(onChange).toBe(handleChange);
      expect(onBlur).toBe(commitValue);
   });
});
