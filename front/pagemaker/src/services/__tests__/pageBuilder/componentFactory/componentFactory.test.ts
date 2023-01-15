import type { ToolbarComponentItem } from '@/components/core/toolbar/model';
import type { PageContainerInterface } from '@/components/page/model/pageContainer/container';
import { describe, it, expect } from 'vitest';
import { ComponentFactory } from '../../../pageBuilder/componentFactory/componentFactory';

describe('ComponentFactory', () => {
  describe('createComponent', () => {
    
    it('should return a container when passed a toolbarElement with type container', () => {
      const toolbarElement: ToolbarComponentItem = {
        componentName: 'jumbo',
        dimension: { height: { value: 1280, unit: 'px' }, width: { value: 1096, unit: 'px' }},
        location: { top: { value: 0, unit: 'px' }, left: { value: 0, unit: 'px' }},
        classes: '',
        componentRef: '01',
        isContainer: true,
        sidebarIcon: '',
        tooltip: 'tooltip',
        type: 'jumbo'
      };
      const pageElement = ComponentFactory().createComponent(toolbarElement) as PageContainerInterface ;
      expect(pageElement).toBeDefined();
      expect(pageElement.elements.length).toBe(0);

    })
  })
})