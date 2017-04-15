import { handleGridRowsUpdated, handleModalClose } from '../defaultHandlers';

describe('defaultHandlers', () => {
   const rows = [
      { name: 'MMM', type: 'Project management' },
      { name: 'Code complete', type: 'Development'},
      { name: 'Clean Code', type: 'Development' },
      { name: 'The Clean coder', type: 'Development' },
      { name: 'Javascript the good parts', type: 'Development' }
   ];

   it('handleGridRowsUpdated should return the correct state', () => {
      const type = 'Writing clean code';

      expect(
         handleGridRowsUpdated({ fromRow: 1, toRow: 3, updated: { type } })({ rows })
      ).toEqual({
         rows: [
            rows[0],
            { ...rows[1], type },
            { ...rows[2], type },
            { ...rows[3], type },
            rows[4]
         ]
      });
   });

   it('handleModalClose should return the correct state', () => {
      expect(
         handleModalClose({ rows })
      ).toEqual({ 
         modalProps: { isOpen: false } 
      });
   });
});
