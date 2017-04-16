import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GridModal from './GridModal';

const handleChange = ({ key, value }) => state => ({ ...state, [key]: value });

class ModalContainer extends Component {
   constructor() {
      super();
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.isSubmitDisabled = this.isSubmitDisabled.bind(this);

      this.state = { };
   }

   static defaultProps = {
      requiredFields: [],
      BodyRenderer: () => {},
      headerProps: { text: 'New modal' },
      handleSubmit: () => {}
   }

   static propTypes = {
      BodyRenderer: PropTypes.func,
      isOpen: PropTypes.bool.isRequired,
      headerProps: PropTypes.object,
      onClose: PropTypes.func.isRequired,
      requiredFields: PropTypes.arrayOf(PropTypes.string),
      handleSubmit: PropTypes.func.isRequired
   }

   componentWillReceiveProps({ isOpen }) {
      if (!isOpen) {
         const emptyState = Object.keys(this.state)
            .reduce((acc, key) => ({...acc, [key]: undefined }), {});

         this.setState(emptyState);
      }
   }

   handleSubmit() {
      const { handleSubmit } = this.props;

      handleSubmit(this.state);
   }

   handleChange(change) {
      this.setState(handleChange(change)); 
   }

   isSubmitDisabled() {
      const { requiredFields } = this.props;
      const { state } = this;

      return requiredFields.reduce((acc, f) => {
         return acc || !state[f]
      }, false);
   }

   render() {
      const { BodyRenderer, isOpen, headerProps, onClose } = this.props;

      const gridModalProps = {
         isOpen,
         onClose,
         headerProps,
         isSubmitDisabled: this.isSubmitDisabled(),
         handleSubmit: this.handleSubmit
      };
      
      return (
         <GridModal {...gridModalProps} >
            <BodyRenderer handleChange={this.handleChange} state={this.state} />
         </GridModal>);
   }
};


export default ModalContainer;
export { handleChange };
