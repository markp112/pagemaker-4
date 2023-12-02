import type { Style } from '@/components/page/model/pageElement/pageElement';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import type { Command, ActiveElements } from '../model/command';
export type Applies = 'color' | 'background-color' | 'border'; 


class ApplyColourTo implements Command {
  constructor(private readonly pageElement: ActiveElements, private readonly service: EditorSettingsService = new EditorSettingsService()) {}

  execute(applyTo: Applies): void {
    if (!this.pageElement) return;
    this.service.setColourAppliesTo(applyTo);
    this.pageElement.styles = this.removeExistingStyle(applyTo);
    this.pageElement.styles.push(this.addColourStyle(applyTo));
  }

  undo() {
    throw new Error ('not implemented');
  }

  removeExistingStyle(appliesTo: Applies) {
    if (!this.pageElement) return [];
    return this.pageElement.styles.filter(style => style.style !== appliesTo);
  }

  addColourStyle(applyTo: Applies) {
    const currentColour = this.service.getColour();
    const style: Style = {
      style: applyTo,
      value: { value: currentColour },
    };
    return style;
  }

}

export { ApplyColourTo };