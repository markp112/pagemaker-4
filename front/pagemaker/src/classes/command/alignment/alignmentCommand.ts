import type { ActiveElements, Command } from '../model/command';

export class AlignmentCommand implements Command {
  constructor(private readonly pageElement: ActiveElements) {};

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