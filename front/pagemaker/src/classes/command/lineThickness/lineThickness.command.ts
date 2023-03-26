import type { LineStyle } from '@/components/page/model/pageElement/pageElement';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import type { Command } from '../model/command';

class LineThicknessCommand implements Command {
  constructor(private service: EditorSettingsService = new EditorSettingsService()) {};

  execute(byAmount: number) {
    let lineThickness = this.service.lineThickness();
    if(byAmount === 1) {
      lineThickness += 1;
    } else {
      lineThickness -= 1;
      lineThickness = lineThickness < 0 ? 0 : lineThickness;
    }
    this.service.setLineThickness(lineThickness);
  }

  undo(styleRequested: LineStyle) {
    throw new Error('not implemented')
  }
}

export { LineThicknessCommand };
