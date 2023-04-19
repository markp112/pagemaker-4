import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import type { Command } from '../model/command';

class DropShadowCommand implements Command {
  constructor (private service = new EditorSettingsService()) {};

  execute(dropShadow: string) {
    const CLASSNAME_STEM = 'shadow';
    const classToApply = `${CLASSNAME_STEM} ${dropShadow}`;
    this.service.applyClass(classToApply, CLASSNAME_STEM); 
  }

  undo() {
    throw new Error('not implemented');
  }
}

export { DropShadowCommand };
