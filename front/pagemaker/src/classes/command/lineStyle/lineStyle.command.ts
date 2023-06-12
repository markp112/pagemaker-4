import type { LineStyle } from '@/components/page/model/pageElement/pageElement';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import type { Command } from '../model/command';

class LineStyleCommand implements Command {
  constructor(private readonly service: EditorSettingsService = new EditorSettingsService()) {};

  execute(styleRequested: LineStyle) {
    this.service.setLineStyle(styleRequested);
  }

  undo(styleRequested: LineStyle) {
    this.service.setLineStyle('solid');
  }
}

export { LineStyleCommand };
