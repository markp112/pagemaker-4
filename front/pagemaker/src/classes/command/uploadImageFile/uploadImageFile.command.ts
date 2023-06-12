import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import { ImageCommand } from '../image/image.command';
import type { Command } from '../model/command';
import type { ActiveElements } from '@/components/page/model/imageElement/imageElement';

class UploadImageCommand implements Command {
  constructor(private readonly pageElement: ActiveElements,
    private service: EditorSettingsService = new EditorSettingsService()) {}

  async execute(imageFile: File): Promise<void> {
    const url = await this.service.uploadImageFile(imageFile);
    const imageCommand = new ImageCommand(this.pageElement);
    imageCommand.execute(url);
  }

  undo(): void {
      throw new Error('not implemented');
  }
}

export { UploadImageCommand };