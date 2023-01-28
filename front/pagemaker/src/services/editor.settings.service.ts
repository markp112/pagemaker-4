import type { LineStyle } from '@/components/page/model/pageElement/pageElement';
import { useEditorSettingsStore } from '@/stores/editorSettings.store';

class EditorSettingsService {
  store = useEditorSettingsStore();

  getLineStyle(): LineStyle {
    return this.store.borderLineStyle; 
  }

}

export  { EditorSettingsService };
