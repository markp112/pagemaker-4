import type { Style, StyleTags } from '@/components/page/model/pageElement/pageElement';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import type { Command } from '../model/command';
import type { ActiveElements } from '@/components/page/model/imageElement/imageElement';

class ColourCommand implements Command {
  constructor(private readonly pageElement: ActiveElements, private readonly service: EditorSettingsService = new EditorSettingsService()) {};
  
  execute(colour: string) {
    if(!this.pageElement) return;
    this.service.setColour(colour);
    const applyTo = this.service.getColourAppliesTo();
    this.pageElement.styles = this.removeExistingStyle(applyTo);
    this.pageElement.styles.push(this.addColourStyle(applyTo));
  }

  removeExistingStyle(appliesTo: string) {
    if (!this.pageElement) return [];
    return this.pageElement.styles.filter(style => style.style !== appliesTo);
  }

  addColourStyle(applyTo: string) {
    const currentColour = this.service.getColour();
    const style: Style = {
      style: applyTo as unknown as StyleTags,
      value: {value: currentColour },
    };
    return style;
  }

  undo() {
    throw new Error('not implemented')
  }
}

export { ColourCommand };
