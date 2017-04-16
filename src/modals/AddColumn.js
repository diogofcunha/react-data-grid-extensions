import React from 'react';
import PropTypes from 'prop-types';
import { FormField, FormInput, Checkbox } from 'elemental';

const parseControlValue = v => v === 'on';
const getInputTargetValue = ({ currentTarget: { value } }) => value;
const getCheckBoxTargetValue = tvalue => parseControlValue(getInputTargetValue(tvalue));

const getValue = {
   [FormInput.displayName]: getInputTargetValue,
   [Checkbox.displayName]: getCheckBoxTargetValue
};

const INPUT_FIELDS = [
   { Type: FormInput, key: 'key', label: 'Column Key', placeholder: 'Type the column key' },
   { Type: FormInput, key: 'name', label: 'Column Name', placeholder: 'Type the column name' },
   { Type: FormInput, key: 'width', label: 'Default column width', placeholder: 'Type the column width' },
   { Type: FormInput, key: 'defaultValue', label: 'Default column value', placeholder: 'Type the default value' },
   { Type: Checkbox, key: 'editable', label: 'Editable' },
   { Type: Checkbox, key: 'resizable', label: 'Resizable' }
];

const AddColumn = ({ handleChange, state = { }}) => {
   return (
      <div>
         {
            INPUT_FIELDS.map(({ Type, key, label, placeholder }) => {
               return (
                  <FormField label={label} htmlFor={key} key={key}>
                     <Type
                        placeholder={placeholder}
                        name={key}
                        onChange={v => handleChange({ value: getValue[Type.displayName](v), key })}
                        value={state[key]} />
                  </FormField>
               );
            })
         }
      </div>
   );
}

AddColumn.propTypes = {
   handleChange: PropTypes.func.isRequired,
   state: PropTypes.object.isRequired
};

export default AddColumn;
export { INPUT_FIELDS };
