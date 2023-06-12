import type { Style } from '@/components/page/model/pageElement/pageElement';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import type { Command } from '../model/command';

export class FontCommand implements Command {

  constructor(private readonly service: EditorSettingsService = new EditorSettingsService()) {};

  execute(fontName: string) {
    const style: Style = {
      style: 'font-family',
      value: { value: fontName },
    }
    this.service.applyStyle(style);
  }

  undo() {
    throw new Error('not implemented');
  }

  
}