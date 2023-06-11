import type { Command } from '../model/command';
import type { ActiveElements } from '@/components/page/model/imageElement/imageElement';

const CSS_CLASS_NAME_PART = 'justify-';

class justifyCommand implements Command {
  constructor(private pageElement: ActiveElements) {};

  execute(tailwindClass: string): ActiveElements {
    let twClasses = this.removeJustifyClasses();
    twClasses = `${twClasses} ${tailwindClass}`;
    this.pageElement.classDefinition = twClasses;
    return this.pageElement;
  }

  undo(): ActiveElements {
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
