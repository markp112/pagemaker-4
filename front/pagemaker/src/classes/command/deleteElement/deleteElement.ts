import type { PageElement } from '@/components/page/model/pageElement/pageElement';
import type { Command } from '../model/command';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';

class DeleteElementCommand implements Command {
  constructor(private readonly pageElement: PageElement,
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
