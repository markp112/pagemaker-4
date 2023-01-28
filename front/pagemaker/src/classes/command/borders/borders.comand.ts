import type { BorderStyle, LineStyle, PageElement, Style, StyleTags } from '@/components/page/model/pageElement/pageElement';
import { useEditorSettingsStore } from '@/stores/editorSettings.store';
import type { Command } from '../command';

const STRING_SEPARATOR = ' ';

const storeRef = useEditorSettingsStore();

class BordersCommand implements Command{
  constructor(private pageElement: PageElement) {};

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
    return storeRef.borderLineStyle;
  }

  private removeBorders(): PageElement {
    console.log('%c⧭', 'color: #e57373', 'removeBorders');
    const styles = this.pageElement.styles.filter(style => !style.style.includes('border'));
    this.pageElement.styles = styles;
    return this.pageElement;
  }
}


export { BordersCommand };
