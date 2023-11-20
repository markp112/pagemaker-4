import { describe, it, expect } from 'vitest';
import { ComponentFactory } from '../classes/componentFactory/componentFactory';
import { createPinia } from "pinia";
import { useSiteStore } from '../../../stores/site.store';
import { beforeEach } from 'node:test';


describe('ComponentFactory', () => {
let siteStore;
beforeEach(() => {
  siteStore = useSiteStore(createPinia());
})
  describe('createComponent', () => {
    
        it('should create a container component with default styles and dimensions', () => {
          const componentFactory = ComponentFactory();
          const component = {
            type: 'container',
            componentRef: 'ref',
            componentName: 'name',
            classes: [],
            dimension: {
              width: { value: '100', unit: 'px' },
              height: { value: '200', unit: 'px' }
            }
          };
          const parentReference = 'parentRef';
          const result = componentFactory.createComponent(component, parentReference);
          expect(result).toEqual({
            ref: 'ref',
            name: 'name',
            type: 'container',
            parentRef: 'parentRef',
            classDefinition: [],
            dimension: {
              width: { value: '100', unit: 'px' },
              height: { value: '200', unit: 'px' }
            },
            actionEvent: { actionType: 'none', eventAction: '' },
            isContainer: true,
            componentHTMLTag: 'div',
            elements: [],
            styles: [
              { style: 'background-color', value: { value: 'white', unit: '' } }
            ],
            isAbsolute: false,
            location: {
              left: { style: 'left', value: { value: '0', unit: 'px' } },
              top: { style: 'top', value: { value: '0', unit: 'px' } }
            }
          });
        });
  })
})