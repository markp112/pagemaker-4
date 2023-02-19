import type { PageElement } from '@/components/page/model/pageElement/pageElement';
import type { Command } from '../model/command';

export class AlignmentCommand implements Command {
  constructor(private pageElement: PageElement) {};

  execute(payload: string): PageElement {
    let twClasses = this.removeFlexRowCol();
    twClasses = `${twClasses} flex ${payload}`;
    this.pageElement.classDefinition = twClasses;
    return this.pageElement;
  }

  undo() {
    throw new Error('not implemented');
  }

  private removeFlexRowCol() {
    return this.pageElement.classDefinition.split(' ')
      .filter(twClass => !twClass.includes('flex'))
      .join(' ');
  }
}