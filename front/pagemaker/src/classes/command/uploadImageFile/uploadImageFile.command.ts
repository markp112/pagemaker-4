import type { PageElement } from '@/components/page/model/pageElement/pageElement';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import { ImageCommand } from '../image/image.command';
import type { Command } from '../model/command';

class UploadImageCommand implements Command {
  constructor(private pageElement: PageElement,
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