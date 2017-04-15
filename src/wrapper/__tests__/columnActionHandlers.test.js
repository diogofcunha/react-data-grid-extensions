import {
   handleColumnAdd,
   handleColumnDelete,
   handleColumnChange,
   handleColumnPostAdd,
   ADD_MODAL_STATIC_PROPS } from '../columnActionHandlers';
import { COLUMN_CHANGE_TYPE } from '../../constants/ColumnActions';

describe('columActionHandlers', () => {
   const originalColumns = [
      { key: 'col1', name: 'Column 1' },
      { key: 'col2', name: 'Column 2' },
      { key: 'col3', name: 'Column 3' }
   ];

   const originalRows = [
      { col1: 1, col2: 2, col3: 3 },
      { col1: 4, col2: 5, col3: 6 },
      { col1: 7, col2: 8, col3: 9 }
   ];

   it('handleColumnAdd should open the add modal', () => {
      const handleColumnChange = jest.fn();
      const column = { key: 'col4', value: 100 };
      const index = 1;

      const { modalProps: { handleSubmit, ...staticProps } } = handleColumnAdd({ handleColumnChange, index });
      handleSubmit(column);

      expect(staticProps).toEqual(ADD_MODAL_STATIC_PROPS);
      expect(handleColumnChange).lastCalledWith({
         index,
         column,
         type: COLUMN_CHANGE_TYPE.POST_ADD
      });
   });

   it('handleColumnDelete should delete a column', () => {
      expect(
         handleColumnDelete({ index: 1 })({ columns: originalColumns })
      ).toEqual({
         columns: [
            originalColumns[0],
            originalColumns[2]
         ]
      });
   });

   it('handleColumnChange should edit a column', () => {
      const index = 1;
      const column = { ...originalColumns[index], name: 'Updated Value' };

      expect(
         handleColumnChange({ index: 1, column })({ columns: originalColumns })
      ).toEqual({
         columns: [
            originalColumns[0],
            column,
            originalColumns[2]
         ]
      })
   });

   it('handleColumnPostAdd should add a new column', () => {
      const column = { key: 'col4', name: 'Column 4', defaultValue: 25 };
      const { key, name, defaultValue } = column;

      const { columns, rows } = handleColumnPostAdd({ index: 1, column })({ columns: originalColumns, rows: originalRows });
      
      expect(columns).toEqual([
         originalColumns[0],
         originalColumns[1],
         { key, name },
         originalColumns[2]
      ]);

      originalRows.forEach((r, i) => {
         expect(rows[i]).toEqual({ ...r, [key]: defaultValue });
      })
   });
});