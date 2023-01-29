import type { LineStyle, StyleTags } from '@/components/page/model/pageElement/pageElement';
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
}

export  { EditorSettingsService };
