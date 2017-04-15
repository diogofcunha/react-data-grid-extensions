export const handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
   return ({ rows: originalRows }) => {
      let rows = [...originalRows];

      for (let i = fromRow; i <= toRow; i++) {
         let rowToUpdate = rows[i];
         let updatedRow = { ...rowToUpdate, ...updated };
         rows[i] = updatedRow;
      }

      return { rows };
   };
};

export const handleModalClose = () => ({ modalProps: { isOpen: false } });