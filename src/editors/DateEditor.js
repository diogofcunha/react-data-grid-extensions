import React from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import editorWrapper from './editorWrapper';
import "react-day-picker/lib/style.css"

const DATE_TYPES = {
   Object: 0,
   string: 1
};

const isDate = date => date instanceof Date;
const parseStringToDate = value => new Date(value);
const parseDateToString = value => value.toString();

const parseDate = (value, parseTo) => {
   const isValueDate = isDate(value);

   if (!isValueDate && typeof value !== 'string') {
      throw new Error('The injected value is not a date or a string');
   }

   if (parseTo === DATE_TYPES.Object) {
      return isValueDate ? value : parseStringToDate(value);
   }

   return isValueDate ? parseDateToString(value) : value;
};

const DateEditor = ({ editorValue, onValueChanged }) => {
   const date = parseDate(editorValue, DATE_TYPES.Object);

   return (
      <div className="editor-main editor-base">
        <DayPicker
            onDayClick={v => { onValueChanged(parseDate(v, isDate(editorValue) ? DATE_TYPES.Object : DATE_TYPES.string )) }} 
            selectedDays={date} 
            initialMonth={date} />
      </div>
   );
};

DateEditor.propTypes = {
   editorValue: PropTypes.object,
   onValueChanged: PropTypes.func.isRequired
};

export default editorWrapper(DateEditor);
export { DateEditor, parseDate, DATE_TYPES };
