import React from 'react';
import MultiSelectFormatter from '../MultiSelectFormatter';
import { shallow } from 'enzyme';

describe('MultiSelectFormatter', () => {
   const value = [
      { value: 'bug', label: 'Bug' },
      { value: 'improvement', label: 'Improvement' },
      { value: 'epic', label: 'Epic' },
      { value: 'story', label: 'Story' }
   ];

   it('should render all the selected values', () => {
      let multiSelectFormatterWrapper = shallow(<MultiSelectFormatter value={value} />);

      multiSelectFormatterWrapper.find('span').forEach((e, i) => {
         const { children, className } = e.props();
         const { label } = value[i];

         expect(className).toBe('selected');
         expect(children).toEqual(<b>{ label }</b>);
      });
   })
});
