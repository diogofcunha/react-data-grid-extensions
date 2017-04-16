import React from 'react';
import PropTypes from 'prop-types';
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

const headerPropsShape = {
   text: PropTypes.string.isRequired
}

GridModal.propTypes = {
   isOpen: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
   headerProps: PropTypes.shape(headerPropsShape).isRequired,
   children: PropTypes.node,
   handleSubmit: PropTypes.func.isRequired,
   isSubmitDisabled: PropTypes.bool.isRequired
}

export default GridModal;
