import type { Command } from '../model/command';
import type { ActiveElements } from '@/components/page/model/imageElement/imageElement';

const CSS_CLASS_NAME_PART = 'items-';

class ItemsAlignmentCommand implements Command {
  
  constructor(private readonly pageElement: ActiveElements) {}
  
  execute(tailwindClass: string): ActiveElements {
    let twClasses = this.removeItemClasses();
    twClasses = `${twClasses} ${tailwindClass}`;
    this.pageElement.classDefinition = twClasses;
    return this.pageElement;
  }

  undo(): ActiveElements {
    this.pageElement.classDefinition = this.removeItemClasses();
    return this.pageElement;
  }

  private removeItemClasses() {
    return this.pageElement.classDefinition.split(' ').filter(twClass => !twClass.includes(CSS_CLASS_NAME_PART)).join(' ');
  }

}

export { ItemsAlignmentCommand };
