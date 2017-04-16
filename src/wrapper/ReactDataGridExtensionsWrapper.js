import ReactDataGrid from'react-data-grid';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectHeader } from '../headers/columnActionHeader';
import ModalContainer from '../modals/ModalContainer';
import { handleGridRowsUpdated, handleModalClose } from './defaultHandlers';
import COLUMN_CHANGES from './columnActionHandlers';
import 'bootstrap/dist/css/bootstrap.css';

const wrapperPropsShape = {
  originalRows: PropTypes.array.isRequired,
  originalColumns: PropTypes.array.isRequired
};

class ReactDataGridExtensionsWrapper extends Component {
   constructor(props) {
      super(props);
      this.rowGetter = this.rowGetter.bind(this);
      this.handleColumnChange = this.handleColumnChange.bind(this);
      this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this);
      this.handleModalClose = this.handleModalClose.bind(this);

      this.setColumns = connectHeader({ handleColumnChange: this.handleColumnChange });

      const { wrapper: { originalRows: rows, originalColumns: columns }} = props;

      this.state = {
        rows,
        columns,
        modalProps: { isOpen: false }
      };
   }

   static defaultProps = {
      gridProps: {}
   }

   static propTypes = {
     wrapper: PropTypes.shape(wrapperPropsShape).isRequired
   }

   rowGetter(i) {
      return this.state.rows[i];
   }

   handleColumnChange({ type, ...extra }) {
      const updatedCb = COLUMN_CHANGES[type];

      this.setState(updatedCb({ ...extra, handleColumnChange: this.handleColumnChange }));
   }

   handleModalClose() {
      this.setState(handleModalClose);
   }

   handleGridRowsUpdated(update) {
      this.setState(handleGridRowsUpdated(update));
   }

   render() {
      const { columns, rows, modalProps } = this.state;
      const { gridProps } = this.props;

      return  (
         <div>
         <ModalContainer {...modalProps} onClose={this.handleModalClose}/>
         <ReactDataGrid
            enableCellSelect={true}
            rowGetter={this.rowGetter}
            rowsCount={rows.length}
            minHeight={600}
            onGridRowsUpdated={this.handleGridRowsUpdated}
            {...gridProps}
            columns={this.setColumns(columns)} />
         </div>);
   }
};

export default ReactDataGridExtensionsWrapper;
