import { ComponentCounter } from '@/classes/componentCounter/componentCounter';
import type { ToolbarComponentItem } from '@/components/core/toolbar/model';
import type { PageElement } from '@/components/page/model/pageElement/pageElement';
import { useToolbarStore } from '@/stores/toolbars.store';
import { usePageStore } from '@/stores/page.store';
import { ComponentFactory } from '@/views/pageBuilder/classes/componentFactory/componentFactory';

function PageBuilderService() {
  const toolbarStore = useToolbarStore();
  const pageStore = usePageStore();

  function createNewComponent(componentName: string) {
    const component = getToolbarComponent(componentName);
    if (component) {
      const pageElement = getNewComponent(component);
      pageStore.addNewElement(pageElement);
    }
  }

  function getToolbarComponent(componentName: string): ToolbarComponentItem {
    return toolbarStore.toolbarItems.filter(toolbarItem => toolbarItem.componentName === componentName)[0];
  }

  function getNewComponent(component: ToolbarComponentItem): PageElement {
    const componentCounter: ComponentCounter = ComponentCounter.getInstance();
    const id = componentCounter.getNextCounter();
    component.componentRef = `${component.componentName}::${id}`;
    return ComponentFactory().createComponent(component);
    
  }

  return { createNewComponent };
}

export { PageBuilderService };
