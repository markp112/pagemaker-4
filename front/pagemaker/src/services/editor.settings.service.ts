import { editorComponentButtons } from '@/components/base/editorButtons/model/borderButtonData';
import type { Units } from '@/components/page/model/model';
import type { ComponentTypesString, LineStyle, PageElement, StyleTags } from '@/components/page/model/pageElement/pageElement';
import { useEditorSettingsStore } from '@/stores/editorSettings.store';

class EditorSettingsService {
  store = useEditorSettingsStore();

  getLineStyle(): LineStyle {
    return this.store.borderLineStyle; 
  }

  setLineStyle(lineStyle: LineStyle) {
    this.store.setBorderLineStyle(lineStyle);
  }

  setLineThickness(byAmount: number) {
    this.store.setLineThickness(byAmount);
  }

  lineThickness(): number {
    return this.store.getLineThickness;
  }

  setBorderElement(borderElement: StyleTags) {
    this.store.setBorderElement(borderElement);
  }

  getBorderElement(): StyleTags {
    return this.store.borderElement;
  }

  getUnits(): Units {
    return this.store.units;
  }

  setUnits(units: Units) {
    this.store.setUnits(units);
  }

  setColour(colour: string) {
    this.store.setCurrentColour(colour);
  }

  getColour(): string {
    return this.store.currentColour;
  }

  setActiveElement(element: PageElement) {
    if(this.store.activeElement === undefined) {
      this.store.setActiveElement(element);
      return;
    } 
    if(this.store.activeElement.ref === element.ref) {
      this.store.setActiveElement(undefined);
      return;
    } 
    this.store.setActiveElement(element);
  }

  getActiveElement() {
    return this.store.activeElement;
  }

  getContainerCommands() {
    const elementName = this.store.activeElement?.name as ComponentTypesString;
    if(elementName) {
      return editorComponentButtons[elementName];
    }
    return;
  }
}

export  { EditorSettingsService };
