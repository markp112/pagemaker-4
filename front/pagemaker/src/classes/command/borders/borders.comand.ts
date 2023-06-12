import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import type { Command } from '../model/command';
import type { ActiveElements } from '@/components/page/model/imageElement/imageElement';
import type { StyleTags, BorderStyle, LineStyle } from '@/components/page/model/pageElement/pageElement';

class BordersCommand implements Command {
  constructor(private readonly ActiveElements: ActiveElements, private readonly service: EditorSettingsService = new EditorSettingsService()) {};
  
  execute(styleRequested: StyleTags): ActiveElements {
    if(styleRequested === 'border-none') {
      return this.removeBorders();
    }
    if(this.hasStyle(styleRequested)) {
      this.undo(styleRequested);
    }
    this.ActiveElements.styles.push(this.getBorderStyle(styleRequested));
    this.setOrClearBorderElement(styleRequested);
    return this.ActiveElements;
  }

  undo(styleRequested: StyleTags): ActiveElements {
    this.service.setBorderElement('');
    const styles = this.ActiveElements.styles.filter(style => style.style !== styleRequested);
    this.ActiveElements.styles = styles; 
    return this.ActiveElements
  }

  private hasStyle(styleRequested: StyleTags): boolean {
    return this.ActiveElements.styles.filter(style => style.style === styleRequested).length > 0
  }

  private getBorderStyle(styleRequested: StyleTags): BorderStyle {
    const lineStyle: LineStyle = this.getLineStyle();
    const thickness: number = this.service.lineThickness();
    const colour: string = this.service.getColour();
    return {
      style: styleRequested,
      colour,
      lineStyle,
      value:{value: `${thickness}`, unit: 'px' },
    };
  }

  private getLineStyle(): LineStyle {
    return this.service.getLineStyle();
  }

  private removeBorders(): ActiveElements {
    const styles = this.ActiveElements.styles.filter(style => !style.style.includes('border'));
    this.ActiveElements.styles = styles;
    return this.ActiveElements;
  }

  private setOrClearBorderElement(borderElement: StyleTags): void {
    this.service.setBorderElement(borderElement);
  }
}

export { BordersCommand };
