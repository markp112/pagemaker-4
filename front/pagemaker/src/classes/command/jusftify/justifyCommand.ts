import type { PageElement } from '@/components/page/model/pageElement/pageElement';
import type { Command } from '../model/command';

const CSS_CLASS_NAME_PART = 'justify-';

class justifyCommand implements Command {
  constructor(private pageElement: PageElement) {};

  execute(tailwindClass: string): PageElement {
    let twClasses = this.removeJustifyClasses();
    twClasses = `${twClasses} ${tailwindClass}`;
    this.pageElement.classDefinition = twClasses;
    return this.pageElement;
  }

  undo(): PageElement {
    this.pageElement.classDefinition = this.removeJustifyClasses();
    return this.pageElement;
  }

  private removeJustifyClasses() {
    return this.pageElement.classDefinition.split(' ')
      .filter(twClass => !twClass.includes(CSS_CLASS_NAME_PART))
      .join(' ');
  }
}

export { justifyCommand };
