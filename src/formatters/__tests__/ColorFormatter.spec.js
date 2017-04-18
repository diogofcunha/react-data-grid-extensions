import React from 'react';
import ColorFormatter from '../ColorFormatter';
import { shallow } from 'enzyme';

describe('ColorFormatter', () => {
   it('should render an element with the correct background color', () => {
      const value = 'red';
      const colorFormatterWrapper = shallow(<ColorFormatter value={value} />);
      const { style } = colorFormatterWrapper.find('div').props();

      expect(style).toEqual({
         backgroundColor: value,
         padding: 10
      });
   });
});
