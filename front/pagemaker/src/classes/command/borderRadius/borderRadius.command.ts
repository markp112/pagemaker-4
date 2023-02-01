import type { Units } from '@/components/page/model/model';
import type { PageElement, Style } from '@/components/page/model/pageElement/pageElement';
import { EditorSettingsService } from '@/services/editor.settings.service';
import { useNavMenuItemStore } from '@/stores/navMenuItems.store';
import type { Command } from '../model/command';

class BorderRadiusCommand implements Command {
  constructor(private pageElement: PageElement, private service: EditorSettingsService = new EditorSettingsService()) {}

  execute(borderRadius: number): PageElement {
    const unit = this.service.getUnits();
    if(this.hasStyle()) {
      this.pageElement = this.undo();
    }
    this.pageElement.styles.push(this.getStyle(unit, borderRadius));
    return this.pageElement;
  }

  undo(): PageElement {
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
      value: `${borderRadius}`,
      unit: units,
    }
    return style;
  }
}

export { BorderRadiusCommand };
