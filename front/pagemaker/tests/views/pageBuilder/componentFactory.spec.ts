import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFactory } from '@/views/pageBuilder/classes/componentFactory/componentFactory';
import { createPinia } from "pinia";
import { useSiteStore } from '@/stores/site.store';
import { containerComponent, primaryPalette, surfacePalette, location, dimension, imageComponent, buttonComponent, textComponent } from './mocks/componentFactory.mocks';

const mockStore = useSiteStore(createPinia());

mockStore.setTypography({ fontFamily: 'Arial', fontSize: { value: '16', unit: 'px' } });
mockStore.setMaterialColours([
  primaryPalette,
  surfacePalette,
]);

const backgroundColour = surfacePalette.colours[0].hexColourBackground;


describe('ComponentFactory', () => {
let siteStore;
beforeEach(() => {
  siteStore = mockStore;
})
  describe('createComponent', () => {
    it('should create a container with the correct properties when the component type is "container"', () => {
      const componentFactory = ComponentFactory();
      const parentReference = 'parentRef';
      const result = componentFactory.createComponent(containerComponent, parentReference);
      expect(result).toEqual({
        ref: 'ref',
        name: 'name',
        type: 'container',
        parentRef: 'parentRef',
        classDefinition: 'bg-red-500',
        dimension,
        actionEvent: { actionType: 'none', eventAction: '' },
        isContainer: true,
        componentHTMLTag: 'div',
        elements: [],
        styles: [
          { style: 'background-color', value: { value: backgroundColour } }
        ],
        isAbsolute: false,
        location
      });
    });


  it('should create an image with the correct properties when the component type is "imageElement"', () => {
    const factory = ComponentFactory();
    const parentReference = 'parentRef';
    const result = factory.createComponent(imageComponent, parentReference);
    console.log('%c⧭', 'color: #735656', JSON.stringify(result, null, 2));
    expect(result).toEqual({
      ref: 'ref',
      name: 'name',
      type: 'imageElement',
      parentRef: 'parentRef',
      classDefinition: 'bg-red-500',
      dimension: {
        width: { style: 'width', value: { value: '100', unit: 'px' } },
        height: { style: 'height', value: { value: '200', unit: 'px' } }
      },
      actionEvent: { actionType: 'none', eventAction: '' },
      isContainer: false,
      componentHTMLTag: 'img',
      content: 'imageplaceholder-100x83.png',
      image: {
        naturalSize: {
          height: { style: 'height', value: { value: '200', unit: 'px' } },
          width: { style: 'width', value: { value: '100', unit: 'px' } }
        },
        location: location,
        scaledSize: {
          height: { style: 'height', value: { value: '200', unit: 'px' } },
          width: { style: 'width', value: { value: '100', unit: 'px' } }
        },
        isAbsolute: false,
        styles: []
      },
      location: location,
    });
  });

    it('should create a button element with the correct properties when the component type is "buttonElement"', () => {
      const factory = ComponentFactory();
      const component = buttonComponent;
      const parentReference = 'parentRef';
      const result = factory.createComponent(component, parentReference);
      expect(result.componentHTMLTag).toBe('button');
      expect(result.content).toBe('Click me');
      expect(result.styles).toEqual([
        { style: 'background-color', value: { value: backgroundColour } },
        { style: 'font-family', value: { value: 'Arial' } }
      ]);
      expect(result.isAbsolute).toBe(false);
    });

    it('should create a text element with correct properties', () => {
      const factory = ComponentFactory();
      const parentReference = 'parentRef';
      const result = factory.createComponent(textComponent, parentReference);
      expect(result).toEqual({
        ref: 'refText',
        name: 'text',
        type: 'textElement',
        parentRef: 'parentRef',
        classDefinition: 'bg-red-500',
        dimension:dimension,
        actionEvent: { actionType: 'none', eventAction: '' },
        isContainer: false,
        componentHTMLTag: textComponent.componentHTMLTag,
        content: 'hello world',
        styles: [
          { style: 'font-family', value: { value: 'Arial' } },
          { style: 'font-size', value: { value: '16', unit: 'px' } }
        ],
        isAbsolute: false,
        location: location
      });
    });

    it('should handle missing or invalid component types', () => {
      const factory = ComponentFactory();
      const component = {
        type: 'invalidType',
        componentRef: 'ref',
        componentName: 'name',
        classes: 'class',
        dimension: {
          width: { value: '100', unit: 'px' },
          height: { value: '200', unit: 'px' }
        },
        location: {
          left: { value: '10', unit: 'px' },
          top: { value: '20', unit: 'px' }
        }
      };
      const parentReference = 'parentRef';
      expect(() => factory.createComponent(component, parentReference)).toThrowError('Could not create component of type invalidType');
    });
  });
});