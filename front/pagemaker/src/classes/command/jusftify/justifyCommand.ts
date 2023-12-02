import type { Command, ActiveElements } from '../model/command';

const CSS_CLASS_NAME_PART = 'justify-';

class justifyCommand implements Command {
  constructor(private readonly pageElement: ActiveElements) {}

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
