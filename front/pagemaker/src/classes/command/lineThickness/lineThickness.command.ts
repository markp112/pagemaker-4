import type { LineStyle, PageElement } from '@/components/page/model/pageElement/pageElement';
import { EditorSettingsService } from '@/services/editor.settings.service';
import { BordersCommand } from '../borders/borders.comand';
import type { Command } from '../model/command';

class LineThicknessCommand implements Command {
  constructor(private pageElement: PageElement, private service: EditorSettingsService = new EditorSettingsService()) {};

  execute(byAmount: number): PageElement {
    let lineThickness = this.service.lineThickness();
    if(byAmount === 1) {
      lineThickness += 1;
    } else {
      lineThickness -= 1;
      lineThickness = lineThickness < 0 ? 0 : lineThickness;
    }
    this.service.setLineThickness(lineThickness);
    const bordersCommand = new BordersCommand(this.pageElement);
    const selectedBorder = this.service.getBorderElement();
    console.log('%c⧭', 'color: #1d3f73', selectedBorder);
    bordersCommand.execute(selectedBorder);
    
    return this.pageElement;
  }

  undo(styleRequested: LineStyle): PageElement {
    return this.pageElement;
  }
}

export { LineThicknessCommand };
