import type { PageElement, Style } from '@/components/page/model/pageElement/pageElement';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import type { Command } from '../model/command';
export type Applies = 'color' | 'background-color' | 'border'; 


class ApplyColourTo implements Command {
  constructor(private pageElement: PageElement, private service: EditorSettingsService = new EditorSettingsService()) {};

  execute(applyTo: Applies): void {
    this.service.setColourAppliesTo(applyTo);
    this.pageElement.styles = this.removeExistingStyle(applyTo);
    this.pageElement.styles.push(this.addColourStyle(applyTo));
  }

  undo() {
    throw new Error ('not implemented');
  }

  removeExistingStyle(appliesTo: Applies) {
    return this.pageElement.styles.filter(style => style.style !== appliesTo);
  }

  addColourStyle(applyTo: Applies) {
    const currentColour = this.service.getColour();
    const style: Style = {
      style: applyTo,
      value: currentColour,
    };
    return style;
  }

}

export { ApplyColourTo };