import type { CommandProperties, CommandTypes } from '../command/model/command';

class CommandHistory<T extends CommandProperties> {
  private history:T[] = [];
  
  add(newElement: T) {
    this.history.push(newElement);
  }

  getLastCommand(type: CommandTypes) {
    return this.history.filter(commandProperty => commandProperty.commandType === type).reverse()[0];
  }

  pop() {
    this.history.pop();
  }
}

export { CommandHistory };
