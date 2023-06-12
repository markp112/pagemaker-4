import type { Command } from '../model/command';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import type { ActiveElements } from '@/components/page/model/imageElement/imageElement';

class DeleteElementCommand implements Command {
  constructor(private readonly pageElement: ActiveElements,
    private readonly service: EditorSettingsService = new EditorSettingsService()
  ) {};

  execute(): void {
      const elementRef = this.pageElement.ref;
      this.service.deleteElement(elementRef);
  }

  undo(): void {
    throw new Error('not implemented');
  }
}

export { DeleteElementCommand };
