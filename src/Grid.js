const ReactDataGrid = require('react-data-grid');
import React, { Component } from 'react';
import { connectHeader } from './headers/columnActionHeader';
import PercentageEditor from './editors/PercentageEditor';
import DateEditor from './editors/DateEditor';
import JsonFormatter from './formatters/JsonFormatter';
import { COLUMN_CHANGE_TYPE } from './constants/ColumnActions';
import ModalContainer from './modals/ModalContainer';
import AddColumn from './modals/AddColumn';
import 'bootstrap/dist/css/bootstrap.css';

const getInitialColumns = () => ([
   {
      key: 'id',
      name: 'ID',
      width: 80,
      resizable: true
   },
   {
      key: 'task',
      name: 'Title',
      editable: true,
      resizable: true,
      width: 100
   },
   {
      key: 'priority',
      name: 'Priority',
      editable: true,
      resizable: true,
      width: 125
   },
   {
      key: 'issueType',
      name: 'Issue Type',
      editable: true,
      resizable: true,
      width: 150
   },
   {
     key: 'taskInfo',
     name: 'Task info',
     formatter: JsonFormatter,
     width: 400,
     resizable: true
   },
   {
      key: 'complete',
      name: '% Complete',
      editable: true,
      editor: PercentageEditor,
      resizable: true,
      width: 200
   },
   {
      key: 'startDate',
      name: 'Start Date',
      editable: true,
      editor: DateEditor,
      resizable: true,
      width: 300
   },
   {
      key: 'completeDate',
      name: 'Expected Complete',
      editable: true,
      editor: DateEditor,
      resizable: true,
      width: 300
   }
]);

const handleColumnChange = ({ column: updatedColumn, index, setColumns }) => {
  return ({ columns: currentColumns }) => {
    const columns = setColumns(currentColumns.map((c, i) => {
      if (index === i) {
        return updatedColumn;
      }

      return c;
    }));

    return { columns };
  }
}

const handleColumnDelete = ({ index, setColumns }) => {
  return ({ columns: currentColumns }) => {
    const columns = setColumns(currentColumns.reduce((acc, c, i) => {
      if (index === i) {
        return acc;
      }

      return [...acc, c];
    }, []));

    return { columns };
  }
}

const handleColumnAdd = ({ index, handleColumnChange }) => ({
  modalProps: {
    isOpen: true,
    headerProps: {
      text: 'Add a new column'
    },
    BodyRenderer: AddColumn,
    requiredFields: [ 'key', 'name' ],
    handleSubmit: column => handleColumnChange({ index, column, type: COLUMN_CHANGE_TYPE.POST_ADD })
  }
});

const handleColumnPostAdd = ({ index, column: { defaultValue, ...column } }) => {
  return ({ columns, rows: oldRows }) => {
    const updateColumns = [...columns];
    updateColumns.splice(index + 1, 0, column);

    const rows = oldRows.map(r => ({ ...r, [column.key]: defaultValue }))

    return {
      rows,
      columns: updateColumns,
      modalProps: {
        isOpen: false
      }
    };
  }
}

const COLUMN_CHANGES = {
  [COLUMN_CHANGE_TYPE.DELETE]: handleColumnDelete,
  [COLUMN_CHANGE_TYPE.EDIT]: handleColumnChange,
  [COLUMN_CHANGE_TYPE.ADD]: handleColumnAdd,
  [COLUMN_CHANGE_TYPE.POST_ADD]: handleColumnPostAdd
};

class Grid extends Component {
   constructor() {
      super();
      this.rowGetter = this.rowGetter.bind(this);
      this.handleColumnChange = this.handleColumnChange.bind(this);
      this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this);
      this.handleModalClose = this.handleModalClose.bind(this);

      this.setColumns = connectHeader({ handleColumnChange: this.handleColumnChange });
    
      this.state = {
        rows: this.createRows(1000),
        columns: this.setColumns(getInitialColumns()),
        modalProps: { isOpen: false }
      };
   }

  getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toString();
  }

  createRows(numberOfRows) {
    let rows = [];
    for (let i = 1; i < numberOfRows; i++) {
      const id = i;
      const priority = ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)];
      const issueType = ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)];

      rows.push({
        id,
        priority,
        issueType,
        task: 'Task ' + i,
        complete: Math.min(100, Math.round(Math.random() * 110)),
        taskInfo: { id, priority, issueType },
        startDate: this.getRandomDate(new Date(2015, 3, 1), new Date()),
        completeDate: this.getRandomDate(new Date(), new Date(2016, 0, 1))
      });
    }
    return rows;
  }

  rowGetter(i) {
    return this.state.rows[i];
  }

  handleColumnChange({ type, ...extra }) {
    const updatedCb = COLUMN_CHANGES[type];

    this.setState(updatedCb({ ...extra, setColumns: this.setColumns, handleColumnChange: this.handleColumnChange }));
  }

  handleModalClose() {
    this.setState({ modalProps: { isOpen: false } });
  }

  handleGridRowsUpdated({ fromRow, toRow, updated }) {
    let rows = this.state.rows.slice();

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i];
      let updatedRow = { ...rowToUpdate, ...updated };
      rows[i] = updatedRow;
    }

    this.setState({ rows });
  }

  render() {
    const { columns, rows, modalProps } = this.state;

    return  (
      <div>
        <ModalContainer {...modalProps} onClose={this.handleModalClose}/>
        <ReactDataGrid
          enableCellSelect={true}
          columns={columns}
          rowGetter={this.rowGetter}
          rowsCount={rows.length}
          minHeight={600}
          onGridRowsUpdated={this.handleGridRowsUpdated} />
      </div>);
  }
};

export default Grid;

