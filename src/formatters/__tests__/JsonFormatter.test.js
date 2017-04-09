import JsonFormatter from '../JsonFormatter';
import React from 'react';
import { shallow } from 'enzyme';

describe('JsonFormatter', () => {
   let jsonFormatterWrapper;

   const baseProps = {
      value: {
         FirstName: 'Clark',
         LastName: 'Kent',
         Alias: 'Superman',
      }
   };

   it('should render the expected text with the default format', () => {
      jsonFormatterWrapper = shallow(<JsonFormatter {...baseProps} />);

      const { children: renderedText } = jsonFormatterWrapper.find('div').props();

      expect(renderedText).toBe('FirstName: Clark, LastName: Kent, Alias: Superman');
   });

   it('should render the expected text with a specified format', () => {
      const format = v => v.toString();
      jsonFormatterWrapper = shallow(<JsonFormatter {...baseProps} format={format} />);

      const { children: renderedText } = jsonFormatterWrapper.find('div').props();

      expect(renderedText).toBe(baseProps.value.toString());
   })
});
