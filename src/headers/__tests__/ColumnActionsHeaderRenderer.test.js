import ColumnActionsHeaderRenderer from '../ColumnActionsHeaderRenderer';
import { COLUMN_CHANGE_TYPE } from '../../constants/ColumnActions';
import { shallow } from 'enzyme';
import React from 'react';

describe('ColumnActionsHeaderRenderer', () => {
   let actionHeaderRendererWrapper;

   const props = {
      column: { name: 'Column 1' },
      onColumnChanged: jest.fn(),
      index: 0
   };

   beforeEach(() => {
      actionHeaderRendererWrapper = shallow(<ColumnActionsHeaderRenderer {...props} />);
      props.onColumnChanged.mockReset();
   })

   const getEditColumn = () => actionHeaderRendererWrapper.find('.glyphicon-pencil');
   const getDeleteColumn = () => actionHeaderRendererWrapper.find('.glyphicon-remove');
   const getAddColumn = () => actionHeaderRendererWrapper.find('.glyphicon-plus');
   const getColumnEditor = () => actionHeaderRendererWrapper.find('ColumnEditor');

   it('renders an edit and remove option', () => {
      expect(getEditColumn().length).toBe(1);
      expect(getDeleteColumn().length).toBe(1)
      expect(getColumnEditor().length).toBe(0);
   });

   it('deleting a column should call onColumnChanged with the correct params', () => {
      getDeleteColumn().simulate('click');

      const { onColumnChanged, index } = props;

      expect(onColumnChanged).lastCalledWith({
         index,
         type: COLUMN_CHANGE_TYPE.DELETE
      });
   })

   it('editing a column should render column edit wiht the correct params', () => {
      getEditColumn().simulate('click');

      const { name, handleChange, commitValue } = getColumnEditor().props();

      expect(name).toBe(props.column.name);
      expect(handleChange).toBeDefined();
      expect(commitValue).toBeDefined();
   });

   it('handleColumnCommit should call onColumnChanged with the correct params', () => {
      const currentName = 'Edited column 1';

      actionHeaderRendererWrapper = actionHeaderRendererWrapper.setState({ name: currentName });
      actionHeaderRendererWrapper.instance().handleColumnCommit();

      const { index, onColumnChanged } = props;

      expect(onColumnChanged).lastCalledWith({
         index,
         column: { name: currentName },
         type: COLUMN_CHANGE_TYPE.EDIT
      })
   });

   it('handleColumnAdd shoudl call onColumnChanged with the correct params', () => {
      getAddColumn().simulate('click');

      const { onColumnChanged, index } = props;

      expect(onColumnChanged).lastCalledWith({
         index,
         type: COLUMN_CHANGE_TYPE.ADD
      })
   });
});
