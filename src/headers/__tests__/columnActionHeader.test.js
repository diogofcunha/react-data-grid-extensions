import { connectHeader } from '../columnActionHeader';

describe('columnActionHeader', () => {
   const originalColumns = [
      { key: '1', name: 'First colmn' },
      { key: '2', name: 'Scnd colmn' },
      { key: '3', name: 'Thrd colmn' }
   ]

   const handleColumnChange = () => {};

   it('connectHeader should work as expected', () => {
      const columns = connectHeader({ handleColumnChange })(originalColumns);

      columns.forEach((c, i) => {
         const { headerRenderer } = c;
         const { props: { column, index, onColumnChanged } } = headerRenderer;

         expect(index).toBe(i);
         expect(column).toBe(originalColumns[i]);
         expect(onColumnChanged).toBe(handleColumnChange);
      })
   });
});
