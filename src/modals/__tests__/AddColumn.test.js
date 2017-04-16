import React from 'react';
import { shallow } from 'enzyme';
import AddColumn, { INPUT_FIELDS } from '../AddColumn';
import { FormField } from 'elemental';

describe('AddColumn', () => {
   const getState = () => INPUT_FIELDS.reduce((acc, f) => ({ ...acc, [f]: Math.random() }), {}); 

   it('should render all input fields with the correct props', () => {
      const state = getState();
      const wrapper = shallow(<AddColumn state={state} handleChange={() => {}}/>);
      const forms = wrapper.find('div');

      INPUT_FIELDS.forEach((f, i) => {
         const { Type, key, label: expectedLabel, placeholder: expectedPlaceholder } = f;
         const { name, placeholder, value } = forms.childAt(i).find(Type).props();
         const { label, htmlFor } = forms.childAt(i).find(FormField).props();
         const expectedValue = state[key];

         expect(name).toBe(key);
         expect(placeholder).toBe(expectedPlaceholder);
         expect(value).toBe(expectedValue);
         expect(label).toBe(expectedLabel);
         expect(htmlFor).toBe(key);
      });
   });
});
