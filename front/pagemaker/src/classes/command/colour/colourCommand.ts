import { EditorSettingsService } from '@/services/editor.settings.service';
import type { Command } from '../model/command';

class ColourCommand implements Command {
  constructor(private service: EditorSettingsService = new EditorSettingsService()) {};
  
  execute(colour: string) {
    this.service.setColour(colour);
  }

  undo() {
    throw new Error('not implemented')
  }
}

export { ColourCommand };