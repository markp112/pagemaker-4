import { ComponentCounter } from '@/classes/componentCounter/componentCounter';
import type { ToolbarComponentItem } from '@/components/core/toolbar/model';
import type { PageElement, Style } from '@/components/page/model/pageElement/pageElement';
import { useToolbarStore } from '@/stores/toolbars.store';
import { usePageStore } from '@/stores/page.store';
import { ComponentFactory } from '@/views/pageBuilder/classes/componentFactory/componentFactory';
import type { Dimension } from '@/classes/dimension';
import type { CommandProperties } from '@/classes/command/model/command';
import { CommandProcessor } from '@/classes/command/commandProcessor';
import type { CommandHistory } from '@/classes/history/history';
import { EditorSettingsService } from '../editorSettings/editor.settings.service';
import type { ActiveElements, ImageElement } from '@/components/page/model/imageElement/imageElement';
import { addStyle, removeStyle } from '@/components/page/functions/stylesToString';

function PageBuilderService() {
  const toolbarStore = useToolbarStore();
  const pageStore = usePageStore();
  const editorSettingsService = new EditorSettingsService();

  function initPage() {
    const componentCount = pageStore.page.elements.length;
    const componentCounter = ComponentCounter.getInstance();
    componentCounter.setCounter(componentCount);
  }

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
    const height = parseInt(dimension.height.value.value);
    const width = parseInt(dimension.width.value.value);
    const scaledDeimension = { ...dimension };
    scaledDeimension.width.value.value = `${width * scale}`;
    scaledDeimension.height.value.value = `${height * scale}`;
    return scaledDeimension;
  }

  function setScaledDimension(dimension: Dimension): void {
    pageStore.setScaledDimension(dimension);
  }

  function scaleElement(scalingRatio: number, styles: Style[]) {
    const currentStyles = [...styles]
    const cleanStyles = removeStyle(currentStyles, 'scale');
    const style: Style = {
      style: 'scale',
      value: { value: scalingRatio.toString() }
    };
    return addStyle(cleanStyles, style);
  }

  function setActiveElement(pageElement: ActiveElements): void {
    editorSettingsService.setActiveElement(pageElement);
  }

  function processButtonCommand(payload: CommandProperties, commandHistory: CommandHistory<CommandProperties>): void {
    const pageElement = editorSettingsService.getActiveElement() as ActiveElements;
    if(pageElement) {
      const commandProcessor = new CommandProcessor(pageElement, commandHistory);
      commandProcessor.processCommand(payload);
    }
  }

  function clearButtonCommand(payload: CommandProperties, commandHistory: CommandHistory<CommandProperties>) {
    const pageElement = editorSettingsService.getActiveElement();
    if(pageElement) {
      const commandProcessor = new CommandProcessor(pageElement, commandHistory);
      commandProcessor.processCommand(payload);
    }
  }

  return { 
      initPage,
      createNewComponent, 
      calcPageSize,
      setScaledDimension,
      processButtonCommand,
      setActiveElement,
      clearButtonCommand,
      scaleElement
    };
}

export { PageBuilderService };
