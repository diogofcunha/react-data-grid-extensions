import ReactDataGridExtensionsWrapper from './wrapper/ReactDataGridExtensionsWrapper';
import React, { Component } from 'react';
import Formatters from './formatters/';
import Editors from './editors';
import 'bootstrap/dist/css/bootstrap.css';

const { DateEditor, PercentageEditor, ColorEditor, TextAreaEditor, MultiSelectEditor } = Editors;
const { JsonFormatter, ColorFormatter, MultiSelectFormatter } = Formatters;

const issueTypes = [
  { value: 'bug', label: 'Bug' },
  { value: 'improvement', label: 'Improvement' },
  { value: 'epic', label: 'Epic' },
  { value: 'story', label: 'Story' }
];

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
      formatter: ColorFormatter,
      editor: ColorEditor,
      editable: true,
      resizable: true,
      width: 125
   },
   {
      key: 'issueType',
      name: 'Issue Type',
      editor: <MultiSelectEditor options={issueTypes} />,
      formatter: MultiSelectFormatter,
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
   },
    {
      key: 'notes',
      name: 'Task notes',
      editable: true,
      editor: TextAreaEditor,
      resizable: true,
      width: 300
   }
]);


class ExampleGrid extends Component {
   constructor() {
      super();

      this._rows = this.createRows(1000);
      this._columns = getInitialColumns();
   }

  getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toString();
  }

  createRows(numberOfRows) {
    let rows = [];
    for (let i = 1; i < numberOfRows; i++) {
      const id = i;
      const priority = ['Crimson', 'OrangeRed', 'GoldenRod', 'Green'][Math.floor((Math.random() * 3) + 1)];
      const issueType = [issueTypes[Math.floor((Math.random() * 3) + 1)]];

      rows.push({
        id,
        priority,
        issueType,
        task: 'Task ' + i,
        complete: Math.min(100, Math.round(Math.random() * 110)),
        taskInfo: { id, priority, issueType },
        startDate: this.getRandomDate(new Date(2015, 3, 1), new Date()),
        completeDate: this.getRandomDate(new Date(), new Date(2016, 0, 1)),
        notes: ''
      });
    }
    return rows;
  }

  render() {
    const { _rows, _columns } = this;

    const wrapperProps = {
      originalRows: _rows,
      originalColumns: _columns
    };

    return  (
      <ReactDataGridExtensionsWrapper wrapper={wrapperProps} />);
  }
};

export default ExampleGrid;
