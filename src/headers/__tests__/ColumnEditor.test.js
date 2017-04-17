import ColumnEditor from '../ColumnEditor';
import React from 'react';
import { shallow } from 'enzyme';

describe('ColumnEditor', () => {
   let columnEditorWrapper;
   const props = {
      handleChange: jest.fn(),
      commitValue: jest.fn(),
      name: 'Column 234',
   }

   const { commitValue } = props;

   const getInput = () => columnEditorWrapper.find('input');

   beforeEach(() => {
      columnEditorWrapper = shallow(<ColumnEditor {...props} />);
      commitValue.mockClear();
   });

   it('should render with the correct value', () => {
      const { value } = getInput().props();

      expect(value).toBe(props.name);
   })

   it('should pass down the correct handlers', () => {
      const { onChange, onBlur, onKeyDown, autoFocus } = getInput().props();
      const { handleChange, commitValue } = props;

      expect(onChange).toBe(handleChange);
      expect(onBlur).toBe(commitValue);
      expect(autoFocus).toBeDefined();
      expect(onKeyDown).toBeDefined();
   });

   it('should call commitValue when tab is pressed', () => {
      getInput().simulate('keyDown', { key: 'Tab' });

      expect(commitValue).toHaveBeenCalled();
   });

   it('should not call commitValue when a key other then tab is pressed', () => {
      getInput().simulate('keyDown', { key: 'ArrowUp' });
      getInput().simulate('keyDown', { key: 'a' });

      expect(commitValue).not.toHaveBeenCalled();
   })
});
