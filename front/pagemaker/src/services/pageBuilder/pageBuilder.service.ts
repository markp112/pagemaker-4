import { ComponentCounter } from '@/classes/componentCounter/componentCounter';
import type { ToolbarComponentItem } from '@/components/core/toolbar/model';
import type { PageElement } from '@/components/page/model/pageElement/pageElement';
import { useToolbarStore } from '@/stores/toolbars.store';
import { usePageStore } from '@/stores/page.store';
import { ComponentFactory } from '@/views/pageBuilder/classes/componentFactory/componentFactory';
import type { Dimension } from '@/classes/dimension';
import type { CommandProperties } from '@/classes/command/model/command';
import { CommandProcessor } from '@/classes/command/commandProcessor';
import type { CommandHistory } from '@/classes/history/history';
import { EditorSettingsService } from '../editorSettings/editor.settings.service';

function PageBuilderService() {
  const toolbarStore = useToolbarStore();
  const pageStore = usePageStore();
  const editorSettingsService = new EditorSettingsService();

  function createNewComponent(componentName: string, parentRef: string) {
    const component = getToolbarComponent(componentName);
    if (component) {
      const pageElement = getNewComponent(component, parentRef);
      pageStore.addNewElement(pageElement);
    }
  }

  function getToolbarComponent(componentName: string): ToolbarComponentItem {
    return toolbarStore.toolbarItems.filter(toolbarItem => toolbarItem.componentName === componentName)[0];
  }

  function getNewComponent(component: ToolbarComponentItem, parentRef: string): PageElement {
    const componentCounter: ComponentCounter = ComponentCounter.getInstance();
    const id = componentCounter.getNextCounter();
    component.componentRef = `${component.componentName}::${id}`;
    return ComponentFactory().createComponent(component, parentRef);
  }

  function calcPageSize(scale: number, dimension: Dimension): Dimension {
    return {
      width: { value: dimension.width.value * scale, unit: dimension.width.unit },
      height: { value: dimension.height.value * scale, unit: dimension.height.unit },
    };
  }

  function setScaledDimension(dimension: Dimension): void {
    pageStore.setScaledDimension(dimension);
  }

  function setActiveElement(pageElement: PageElement): void {
    editorSettingsService.setActiveElement(pageElement);
  }

  function processButtonCommand(payload: CommandProperties, commandHistory: CommandHistory<CommandProperties>): void {
    const pageElement = editorSettingsService.getActiveElement() as PageElement;
    if(pageElement) {
      const commandProcessor = new CommandProcessor(pageElement, commandHistory);
      commandProcessor.processCommand(payload);
    }
  }

  function clearButtonCommand(payload: CommandProperties, commandHistory: CommandHistory<CommandProperties>) {
    const pageElement = editorSettingsService.getActiveElement() as PageElement;
    if(pageElement) {
      const commandProcessor = new CommandProcessor(pageElement, commandHistory);
      commandProcessor.processCommand(payload);
    }
  }

  return { createNewComponent, 
      calcPageSize,
      setScaledDimension,
      processButtonCommand,
      setActiveElement,
      clearButtonCommand
    };
}

export { PageBuilderService };
