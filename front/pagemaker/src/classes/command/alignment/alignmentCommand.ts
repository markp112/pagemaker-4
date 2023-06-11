import type { Command } from '../model/command';
import type { ActiveElements } from '@/components/page/model/imageElement/imageElement';

export class AlignmentCommand implements Command {
  constructor(private pageElement: ActiveElements) {};

  execute(payload: string): ActiveElements {
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