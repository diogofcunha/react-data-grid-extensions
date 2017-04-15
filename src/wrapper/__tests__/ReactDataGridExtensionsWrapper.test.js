import ReactDataGridExtensionsWrapper from '../ReactDataGridExtensionsWrapper';
import { shallow } from 'enzyme';
import React from 'react';

describe('ReactDataGridExtensionsWrapper', () => {
   let reactDataGridExtensionsWrapper;

   const props = {
      wrapper: {
         originalRows: [
            { name: 'MMM', type: 'Project management' },
            { name: 'Code complete', type: 'Development'},
            { name: 'Clean Code', type: 'Development' },
            { name: 'The Clean coder', type: 'Development' },
            { name: 'Javascript the good parts', type: 'Development' }
         ],
         originalColumns: [
            { key: 'name', name: 'Book name' },
            { key: 'type', name: 'Book type' }
         ]
      }
   };

   const getModalContainer = () => reactDataGridExtensionsWrapper.find('ModalContainer');

   beforeEach(() => {
      reactDataGridExtensionsWrapper = shallow(<ReactDataGridExtensionsWrapper {...props} />);
   });

   it('should render a ReactDataGrid with the correct default props', () => {
      const {
         enableCellSelect,
         rowGetter,
         rowsCount,
         minHeight,
         onGridRowsUpdated,
         columns } = reactDataGridExtensionsWrapper.find('ReactDataGrid').props();

      const { wrapper: { originalRows, originalColumns } } = props;

      expect(enableCellSelect).toBe(true);
      expect(rowGetter).toBeDefined();
      expect(rowsCount).toBe(originalRows.length);
      expect(minHeight).toBeDefined();
      expect(onGridRowsUpdated).toBeDefined();
      expect(columns.length).toBe(originalColumns.length);
   });

   it('should render a ModalContainer with the correct props', () => {
      const { isOpen, onClose } = getModalContainer().props();

      expect(isOpen).toBe(false);
      expect(onClose).toBeDefined();

      const modalProps = { isOpen: true, body: 1 };

      reactDataGridExtensionsWrapper.setState({ modalProps });

      const props = getModalContainer().props();

      expect(props.isOpen).toBe(modalProps.isOpen);
      expect(props.body).toBe(modalProps.body);
   });
});
