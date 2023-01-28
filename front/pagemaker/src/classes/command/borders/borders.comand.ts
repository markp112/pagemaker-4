import type { BorderStyle, LineStyle, PageElement, StyleTags } from '@/components/page/model/pageElement/pageElement';
import { EditorSettingsService } from '@/services/editor.settings.service';
import type { Command } from '../model/command';

class BordersCommand implements Command {
  constructor(private pageElement: PageElement, private service: EditorSettingsService = new EditorSettingsService()) {};

  execute(styleRequested: StyleTags): PageElement {
    if(styleRequested === 'border-none') {
      return this.removeBorders();
    }
    if(this.hasStyle(styleRequested)) {
      this.undo(styleRequested);
    }
    this.pageElement.styles.push(this.getBorderStyle(styleRequested));
    return this.pageElement;
  }

  undo(styleRequested: StyleTags): PageElement {
    const styles = this.pageElement.styles.filter(style => style.style !== styleRequested);
    this.pageElement.styles = styles;
    return this.pageElement
  }

  private hasStyle(styleRequested: StyleTags): boolean {
    return this.pageElement.styles.filter(style => style.style === styleRequested).length > 0
  }

  private getBorderStyle(styleRequested: StyleTags): BorderStyle {
    const lineStyle: LineStyle = this.getLineStyle();
    return {
      style: styleRequested,
      lineStyle,
      value: '1',
      unit: 'px',
    };
  }

  private getLineStyle(): LineStyle {
    return this.service.getLineStyle();
  }

  private removeBorders(): PageElement {
    const styles = this.pageElement.styles.filter(style => !style.style.includes('border'));
    this.pageElement.styles = styles;
    return this.pageElement;
  }
}

export { BordersCommand };
