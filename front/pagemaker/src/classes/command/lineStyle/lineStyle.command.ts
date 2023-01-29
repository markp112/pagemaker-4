import type { LineStyle, PageElement } from '@/components/page/model/pageElement/pageElement';
import { EditorSettingsService } from '@/services/editor.settings.service';
import { BordersCommand } from '../borders/borders.comand';
import type { Command } from '../model/command';

class LineStyleCommand implements Command {
  constructor(private pageElement: PageElement, private service: EditorSettingsService = new EditorSettingsService()) {};

  execute(styleRequested: LineStyle): PageElement {
    this.service.setLineStyle(styleRequested);
    const selectedBorder = this.service.getBorderElement();
    const bordersCommand = new BordersCommand(this.pageElement);
    bordersCommand.execute(selectedBorder);
    return this.pageElement;
  }

  undo(styleRequested: LineStyle): PageElement {
    this.service.setLineStyle('solid');
    return this.pageElement;
  }
}

export { LineStyleCommand };
