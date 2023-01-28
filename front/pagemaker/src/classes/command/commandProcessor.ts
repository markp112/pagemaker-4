import type { PageElement } from '@/components/page/model/pageElement/pageElement';
import { BordersCommand } from './borders/borders.comand';
import type { Command, CommandName, CommandProperties } from './command';

type CommandKey = { [commandName in CommandName]: (pageElement: PageElement) => any}

class CommandProcessor {
  constructor(private pageElement: PageElement) {};
  private commandMap: CommandKey = {
    'border': (pageElement: PageElement) => new BordersCommand(pageElement),
  };

  processCommand(commandProperties: CommandProperties) {
    console.log('%c⧭', 'color: #006dcc', commandProperties);
    const command = (this.commandMap[commandProperties.commandName]);
    console.log('%c⧭', 'color: #807160', command);
    const x = command(this.pageElement);
    this.pageElement = x.execute(commandProperties.payload);
  };

  undoCommand(commandProperties: CommandProperties) {
    const command = (this.commandMap[commandProperties.commandName]) as unknown as Command;
    command.undo(commandProperties.payload);
  }
}

export { CommandProcessor };