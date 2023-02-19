import type { PageElement } from '@/components/page/model/pageElement/pageElement';
import type {  Command } from '../model/command';

class ZindexCommand implements Command {

  constructor(private pageElement: PageElement) {};

  execute(payload: string): PageElement {
    let twClasses = this.pageElement.classDefinition;
    twClasses = this.removeZindex(twClasses);
    if (payload === 'bring-to-front') {
      twClasses = this.handleIncreaseZindex(twClasses);
    } else {
      this.handleDecreaseZindex(twClasses);
    }
    this.pageElement.classDefinition = twClasses;
    return this.pageElement;
  }

  undo(): PageElement {
    let twClasses = this.pageElement.classDefinition;
    twClasses = this.removeZindex(twClasses);
    this.pageElement.classDefinition = twClasses;
    return this.pageElement;
  }

  
  private removeZindex(twClasses: string): string {
    return twClasses.split(' ')
    .filter(twClass => !twClass.includes('z-'))
    .join(' ');
  }
  
  private handleIncreaseZindex(twClasses: string) {
    return `${twClasses} z-50`;
  }
  
  private handleDecreaseZindex(twClasses: string) {
    return `${twClasses} z-10`;
  }


}

export { ZindexCommand };
