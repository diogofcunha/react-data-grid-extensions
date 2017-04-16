import React from 'react';
import { shallow } from 'enzyme';
import ModalContainer, { handleChange } from '../ModalContainer';

describe('ModalContainer', () => {
   let modalContainerWrapper;
   const props = {
      requiredFields: [ 'Field1', 'Field2' ],
      handleSubmit: jest.fn(),
      isOpen: true,
      onClose: jest.fn(),
      headerProps: {
         p1: 1,
         p2: 2,
         text: 'New modal'
      },
      BodyRenderer: () => <div>Body!</div>
   };

   beforeEach(() => {
      modalContainerWrapper = shallow(<ModalContainer {...props} />);
   });

   it('should inject the correct props', () => {
      const {
         isOpen,
         onClose,
         headerProps,
         handleSubmit,
         BodyRenderer } = modalContainerWrapper.find('GridModal').props();

      const { isOpen: expectedIsOpen, onClose: expectedOnClose, headerProps: expectedHeaderProps, children } = props;
      
      expect(isOpen).toBe(expectedIsOpen);
      expect(onClose).toBe(expectedOnClose);
      expect(headerProps).toBe(expectedHeaderProps);
      expect(handleSubmit).toBeDefined();
      expect(BodyRenderer).toBe(children);
   });

   it('should reset state when modal closes', () => {
      modalContainerWrapper.setState({ key: 1, name: 'name' });
      modalContainerWrapper.setProps({ isOpen: false });

      expect(modalContainerWrapper.state()).toEqual({});
   });

   it('handleChange should update the state for the correct value and key', () => {
      let change = { key: 'key1', value: 'value1' };
      let currentState = { };

      let state = handleChange(change)(currentState);

      expect(state).toEqual({
         key1: 'value1'
      });

      change = { key: 'key2', value: 'value2' }; 
      state = handleChange(change)(state);

      expect(state).toEqual({
         key1: 'value1',
         key2: 'value2'
      });

      change = { key: 'key1', value: 'newValue1' };
      state = handleChange(change)(state);

      expect(state).toEqual({
         key1: 'newValue1',
         key2: 'value2'
      });
   });

   describe('instance', () => {
      let modalContainerInstance;

      beforeEach(() => {
         modalContainerInstance = modalContainerWrapper.instance();
      });

      it('isSubmitDisabled should return false when all required fields have a value', () => {
         const { requiredFields } = props;

         const state = requiredFields.reduce((acc, f) => ({ ...acc, [f]: Math.random() }) , {});
         modalContainerWrapper.setState(state);

         expect(modalContainerInstance.isSubmitDisabled()).toBe(false);
      });

      it('isSubmitDisabled should return true when not all required fields have a value', () => {
         const { requiredFields } = props;

         const state = requiredFields.reduce((acc, f) => ({ ...acc, [f]: undefined }) , {});
         state[requiredFields[0]] = 'Not empty';
         modalContainerWrapper.setState(state);

         expect(modalContainerInstance.isSubmitDisabled()).toBe(true);
      });

      it('handleSubmit should call the inject prop with the current state', () => {
         const { handleSubmit } = props;
         const state = { key: 'Date', name: 'The date' };

         modalContainerWrapper.setState(state);
         modalContainerInstance.handleSubmit();

         expect(handleSubmit).lastCalledWith(state);
      });
   });
});
