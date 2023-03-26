import type { BorderStyle, LineStyle, PageElement, StyleTags } from '@/components/page/model/pageElement/pageElement';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
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
    this.setOrClearBorderElement(styleRequested);
    return this.pageElement;
  }

  undo(styleRequested: StyleTags): PageElement {
    this.service.setBorderElement('');
    const styles = this.pageElement.styles.filter(style => style.style !== styleRequested);
    this.pageElement.styles = styles; 
    return this.pageElement
  }

  private hasStyle(styleRequested: StyleTags): boolean {
    return this.pageElement.styles.filter(style => style.style === styleRequested).length > 0
  }

  private getBorderStyle(styleRequested: StyleTags): BorderStyle {
    const lineStyle: LineStyle = this.getLineStyle();
    const thickness: number = this.service.lineThickness();
    const colour: string = this.service.getColour();
    return {
      style: styleRequested,
      colour,
      lineStyle,
      value: `${thickness}`,
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

  private setOrClearBorderElement(borderElement: StyleTags): void {
    this.service.setBorderElement(borderElement);
  }
}

export { BordersCommand };
