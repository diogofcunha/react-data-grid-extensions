import React from 'react';
import { shallow } from 'enzyme';
import GridModal from '../GridModal';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'elemental';

describe('GridModal', () => {
   let gridModalWrapper;

   const props = {
      isOpen: true,
      onClose: jest.fn(),
      headerProps: {
         text: 'This is the modal Title'
      },
      children: <div className="child"></div>,
      handleSubmit: () => {},
      isSubmitDisabled: true
   };

   beforeEach(() => {
      gridModalWrapper = shallow(<GridModal {...props}/>);
   });

   it('should inject the correct props to Modal', () => {
      const { isOpen } = gridModalWrapper.find(Modal).props();
      const { isOpen: expectedIsOpen } = props;

      expect(isOpen).toBe(expectedIsOpen);
   });

   it('should inject the correct props to ModalHeader', () => {
      const headerProps = gridModalWrapper.find(ModalHeader).props();
      const { headerProps: expectedHeaderProps } = props;

      expect(headerProps).toEqual(expectedHeaderProps);
   });

   it('should inject the correct props to ModalBody', () => {
      const { children } = gridModalWrapper.find(ModalBody).props();
      const { children: expectedChildren } = props;

      expect(children).toBe(expectedChildren);
   });

   it('should inject the correct props to ModalFooter', () => {
      const buttons = gridModalWrapper.find(Button);

      const { onClick: handleSubmit } = buttons.findWhere(b => b.props().type === "primary").props();
      const { handleSubmit: expectedHandleSubmit } = props;

      expect(handleSubmit).toBe(expectedHandleSubmit);

      const { onClick: onClose } = buttons.findWhere(b => b.props().type === "default").props();
      const { onClose: expectedOnClose } = props;

      expect(onClose).toBe(expectedOnClose);
   });
});
