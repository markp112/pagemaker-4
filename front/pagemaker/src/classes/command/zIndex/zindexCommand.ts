import type { ActiveElements } from '@/components/page/model/imageElement/imageElement';
import type {  Command } from '../model/command';

class ZindexCommand implements Command {

  constructor(private pageElement: ActiveElements) {};

  execute(payload: string): ActiveElements {
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

  undo(): ActiveElements {
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
