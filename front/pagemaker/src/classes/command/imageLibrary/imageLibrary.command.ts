import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import type { Command } from '../model/command';

class ImageLibraryCommand implements Command {
  constructor(private readonly service: EditorSettingsService = new EditorSettingsService()) {};
  
  execute(show: boolean): void {
    this.service.showImageLibrary(show);
  };

  undo() {
    throw new Error('now implemented');
  }
}

export { ImageLibraryCommand }