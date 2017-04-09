import editorWrapper from '../editorWrapper';
import React from 'react';
import { mount } from 'enzyme';

describe('editorWrapper', () => {
   const ComponentToWrap = () => <div>I'm Wrapped!!</div>;

   let wrapper;

   const props = {
      column: {
         key: 'col1'
      },
      value: 'vvv'
   };

   beforeEach(() => {
      const WrappedComponent = editorWrapper(ComponentToWrap);

      wrapper = mount(<WrappedComponent {...props} />);
   });

   it('should render an instance of the wrapped component with the correct props', () => {
      const newEditorValue = 'updated value';

      wrapper.setState({ editorValue: newEditorValue });
      const { column, value, editorValue, onValueChanged } = wrapper.find(ComponentToWrap).props();
      const { column: expectedColumn, value: expectedValue } = props;

      expect(column).toEqual(expectedColumn);
      expect(onValueChanged).toBeDefined();
      expect(value).toBe(expectedValue);
      expect(editorValue).toBe(newEditorValue);
   });

   describe('instance methods', () => {
      let wrapperComponentInstance;

      beforeEach(() => {
         wrapperComponentInstance = wrapper.instance();
      });

      it('should implement getValue', () => {
         const editorValue = 'get me please!';
         const { column: { key } } = props;

         wrapper.setState({ editorValue })

         expect(
            wrapperComponentInstance.getValue()
         ).toEqual({
            [key]: editorValue 
         });
      })

      it('should implement getInputNode', () => {
         expect(
            wrapperComponentInstance.getInputNode()
         ).toBeDefined();
      });

      it('should disable the container styles to avoid incorrect styling', () => {
         expect(wrapperComponentInstance.disableContainerStyles).toBe(true);
      })
   });
});

