import type { Units } from '@/components/page/model/model';
import { EditorSettingsService } from '@/services/editor.settings.service';

export class UnitsCommand {
  constructor(private service: EditorSettingsService = new EditorSettingsService()) {}

  execute(units: Units) {
    this.service.setUnits(units);
  }

  undo() {
    this.service.setUnits('px');
  }
}