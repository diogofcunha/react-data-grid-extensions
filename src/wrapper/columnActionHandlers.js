import { COLUMN_CHANGE_TYPE } from '../constants/ColumnActions';
import AddColumn from '../modals/AddColumn';

export const ADD_MODAL_STATIC_PROPS = {
   isOpen: true,
   headerProps: {
      text: 'Add a new column'
   },
   BodyRenderer: AddColumn,
   requiredFields: [ 'key', 'name' ]
};

export const handleColumnChange = ({ column: updatedColumn, index }) => {
  return ({ columns: currentColumns }) => {
    const columns = currentColumns.map((c, i) => {
      if (index === i) {
        return updatedColumn;
      }

      return c;
    });

    return { columns };
  }
}

export const handleColumnDelete = ({ index }) => {
  return ({ columns: currentColumns }) => {
    const columns = currentColumns.reduce((acc, c, i) => {
      if (index === i) {
        return acc;
      }

      return [...acc, c];
    }, []);

    return { columns };
  }
}

export const handleColumnAdd = ({ index, handleColumnChange }) => ({
  modalProps: {
     ...ADD_MODAL_STATIC_PROPS, 
    handleSubmit: column => handleColumnChange({ index, column, type: COLUMN_CHANGE_TYPE.POST_ADD })
  }
});

export const handleColumnPostAdd = ({ index, column: { defaultValue, ...column } }) => {
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
};

export default {
  [COLUMN_CHANGE_TYPE.DELETE]: handleColumnDelete,
  [COLUMN_CHANGE_TYPE.EDIT]: handleColumnChange,
  [COLUMN_CHANGE_TYPE.ADD]: handleColumnAdd,
  [COLUMN_CHANGE_TYPE.POST_ADD]: handleColumnPostAdd
};
