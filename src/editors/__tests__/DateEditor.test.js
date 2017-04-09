import { DateEditor, parseDate, DATE_TYPES } from '../DateEditor';
import React from 'react';
import { shallow } from 'enzyme';
import DayPicker from 'react-day-picker';

describe('DateEditor', () => {
   let dateEditorWrapper;

   const props = {
      editorValue: new Date(),
      onValueChanged: jest.fn()
   };

   beforeEach(() => {
      dateEditorWrapper = shallow(<DateEditor {...props} />);
   });

   it('should render with the correct props', () => {
      const { selectedDays, initialMonth } = dateEditorWrapper.find(DayPicker).props();
      const { editorValue } = props;

      expect(selectedDays).toBe(editorValue);
      expect(initialMonth).toBe(editorValue);
   })

   describe('parseDate', () => {
      const dateObj = new Date();
      const dateStr = dateObj.toString();

      it('should not touch the date when a parse is not necessary', () => {
         expect(parseDate(dateObj, DATE_TYPES.Object)).toBe(dateObj);
         expect(parseDate(dateStr, DATE_TYPES.string)).toBe(dateStr);
      });

      it('should parse correctly when necessary', () => {
         expect(parseDate(dateObj, DATE_TYPES.string)).toBe(dateObj.toString());

         const dateFromString = parseDate(dateStr, DATE_TYPES.Object);

         expect(dateFromString.getFullYear()).toEqual(dateObj.getFullYear());
         expect(dateFromString.getMonth()).toEqual(dateObj.getMonth());
         expect(dateFromString.getDay()).toEqual(dateObj.getDay());
      })

      it('should throw when the value type is not a string or a date', () => {
         const expectedErrorMessage = 'The injected value is not a date or a string';

         expect(() => { parseDate({}) }).toThrowError(expectedErrorMessage);
         expect(() => { parseDate(1) }).toThrowError(expectedErrorMessage);
      })
   });
});
