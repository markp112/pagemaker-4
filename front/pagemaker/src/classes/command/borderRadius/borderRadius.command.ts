import type { Units } from '@/components/page/model/model';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import type { Command } from '../model/command';
import type { ActiveElements } from '@/components/page/model/imageElement/imageElement';
import type { Style } from '@/components/page/model/pageElement/pageElement';

class BorderRadiusCommand implements Command {
  constructor(private readonly pageElement: ActiveElements, private readonly service: EditorSettingsService = new EditorSettingsService()) {}

  execute(borderRadius: number): ActiveElements {
    const unit = this.service.getUnits();
    if(this.hasStyle()) {
      this.undo();
    }
    this.pageElement.styles.push(this.getStyle(unit, borderRadius));
    return this.pageElement;
  }

  undo(): ActiveElements {
    const styles = this.pageElement.styles.filter(style => style.style !== 'border-radius');
    this.pageElement.styles = styles;
    return this.pageElement;
  }

  private hasStyle(): boolean {
    return this.pageElement.styles.filter(style => style.style === 'border-radius').length > 0;
  }

  private getStyle(units: Units, borderRadius: number): Style {
    const style: Style = {
      style: 'border-radius',
      value: { value: `${borderRadius}`, unit: units },
    }
    return style;
  }
}

export { BorderRadiusCommand };
