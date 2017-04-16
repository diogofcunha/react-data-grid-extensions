import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ColumnEditor from './ColumnEditor';
import { COLUMN_CHANGE_TYPE } from '../constants/ColumnActions';
import './styles/header.css';

class ColumnActionsHeaderRenderer extends Component {
   static columnShape = {
      name: PropTypes.string
   }

   static propTypes = {
      column: PropTypes.shape(ColumnActionsHeaderRenderer.columnShape),
      onColumnChanged: PropTypes.func.isRequired,
      index: PropTypes.number.isRequired,
   }

   constructor(props) {
      super(props);
      this.handleEditColumnClick = this.handleEditColumnClick.bind(this);
      this.handleColumnChange = this.handleColumnChange.bind(this);
      this.handleColumnCommit = this.handleColumnCommit.bind(this);
      this.handleColumnDelete = this.handleColumnDelete.bind(this);
      this.handleColumnAdd = this.handleColumnAdd.bind(this);
      
      this.state = { editing: false, name: props.column.name };
   }

   componentWillReceiveProps({ column: { name: nextName } }) {
      if (nextName !== this.props.column.name) {
         this.setState({ name: nextName });
      }
   }

   handleEditColumnClick() {
      this.setState({ editing: true });
   }

   handleColumnChange({ target: { value }}) {
      this.setState({ name: value })
   }

   handleColumnCommit() {
      const { index, column, onColumnChanged } = this.props;
      const { name } = this.state;
      onColumnChanged({ type: COLUMN_CHANGE_TYPE.EDIT, column: { ...column, name }, index });
      this.setState({ editing: false });
   }

   handleColumnDelete() {
      const { index, onColumnChanged } = this.props;

      onColumnChanged({ type: COLUMN_CHANGE_TYPE.DELETE, index });
   }

   handleColumnAdd() {
      const { index, onColumnChanged } = this.props;

      onColumnChanged({ type: COLUMN_CHANGE_TYPE.ADD, index });
   }

   render() {
      const { editing, name } = this.state;

      if (editing) {
         return <ColumnEditor name={name} handleChange={this.handleColumnChange} commitValue={this.handleColumnCommit} />;
      }

      return (
         <div>
            { this.props.column.name }
            <div className="column-edit">
               <span className="glyphicon glyphicon-pencil column-action" onClick={this.handleEditColumnClick}></span>
               <span className="glyphicon glyphicon-remove column-action" onClick={this.handleColumnDelete}></span>
               <span className="glyphicon glyphicon-plus column-action" onClick={this.handleColumnAdd}></span>
            </div>
         </div>
         
      );
   }
}

export default ColumnActionsHeaderRenderer;
