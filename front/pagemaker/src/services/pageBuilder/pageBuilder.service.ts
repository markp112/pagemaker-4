import { ComponentCounter } from '@/classes/componentCounter/componentCounter';
import type { ToolbarComponentItem } from '@/components/core/toolbar/model';
import type { ComponentTypesString, PageElement } from '@/components/page/model/pageElement/pageElement';
import { useToolbarStore } from '@/stores/toolbars.store';
import { usePageStore } from '@/stores/page.store';
import { ComponentFactory } from '@/views/pageBuilder/classes/componentFactory/componentFactory';
import type { Dimension } from '@/classes/dimension';

function PageBuilderService() {
  const toolbarStore = useToolbarStore();
  const pageStore = usePageStore();

  function createNewComponent(componentName: string, parentRef: ComponentTypesString) {
    const component = getToolbarComponent(componentName);
    if (component) {
      const pageElement = getNewComponent(component, parentRef);
      pageStore.addNewElement(pageElement);
    }
  }

  function getToolbarComponent(componentName: string): ToolbarComponentItem {
    return toolbarStore.toolbarItems.filter(toolbarItem => toolbarItem.componentName === componentName)[0];
  }

  function getNewComponent(component: ToolbarComponentItem, parentRef: ComponentTypesString): PageElement {
    const componentCounter: ComponentCounter = ComponentCounter.getInstance();
    const id = componentCounter.getNextCounter();
    component.componentRef = `${component.componentName}::${id}`;
    return ComponentFactory().createComponent(component, parentRef);
  }

  function calcPageSize(scale: number, dimension: Dimension): Dimension {
    return {
      width: { value: dimension.width.value * scale, unit: dimension.width.unit },
      height: { value: dimension.height.value * scale, unit: dimension.height.unit },
      offSetHeight: dimension.offSetHeight,
      offSetWidth: dimension.offSetWidth,
    };
  }

  function setScaledDimension(dimension: Dimension): void {
    pageStore.setScaledDimension(dimension);
  }

  return { createNewComponent, 
      calcPageSize,
      setScaledDimension,
    };
}

export { PageBuilderService };
