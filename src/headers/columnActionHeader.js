import ColumnActionsHeaderRenderer from './ColumnActionsHeaderRenderer';
import React from 'react';

const connectHeader = ({ handleColumnChange, handleColumnDelete }) => {
   return columnsToSet => {
      return columnsToSet.map((c, i) => ({
         ...c,
         headerRenderer:
            <ColumnActionsHeaderRenderer 
               column={c}
               index={i}
               onColumnChanged={ handleColumnChange }
               onColumnDeleted={ handleColumnDelete } /> 
         })
      );
   }
};

export { connectHeader };
