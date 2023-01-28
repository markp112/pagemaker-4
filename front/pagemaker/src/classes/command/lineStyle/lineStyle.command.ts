import type { CssStyleNames } from '@/classes/cssStyles';
import type { LineStyle, PageElement } from '@/components/page/model/pageElement/pageElement';
import { EditorSettingsService } from '@/services/editor.settings.service';
import type { Command } from '../model/command';

class LineStyleCommand implements Command {
  constructor(private pageElement: PageElement, private service: EditorSettingsService = new EditorSettingsService()) {};

  execute(styleRequested: LineStyle): PageElement {
    this.service.setLineStyle(styleRequested);
    return this.pageElement;
  }

  undo(styleRequested: LineStyle): PageElement {
    return this.pageElement;
  }
}

export { LineStyleCommand };
