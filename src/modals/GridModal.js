import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'elemental';
import '../styles/modules.css';

const GridModal = ({
   isOpen,
   onClose,
   headerProps,
   children,
   handleSubmit,
   isSubmitDisabled }) => {
   return (
      <Modal isOpen={isOpen}>
         <ModalHeader {...headerProps} />
         <ModalBody>
            { children }
         </ModalBody>
         <ModalFooter>
            <Button type="primary" onClick={handleSubmit} disabled={isSubmitDisabled}>Submit</Button>
            <Button type="default" onClick={onClose}>Close</Button>
         </ModalFooter>
      </Modal>
   );
};

export default GridModal;
