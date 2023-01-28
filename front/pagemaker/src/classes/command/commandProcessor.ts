import type { PageElement } from '@/components/page/model/pageElement/pageElement';
import { BordersCommand } from './borders/borders.comand';
import { LineStyleCommand } from './lineStyle/lineStyle.command';
import type { Command, CommandName, CommandProperties } from './model/command';

type CommandKey = { [commandName in CommandName]: (pageElement: PageElement) => any}

class CommandProcessor {
  constructor(private pageElement: PageElement) {};
  private commandMap: CommandKey = {
    'border': (pageElement: PageElement) => new BordersCommand(pageElement),
    'line-style': (pageElement: PageElement) => new LineStyleCommand(pageElement),
  };

  processCommand(commandProperties: CommandProperties) {
    const getCommand = (this.commandMap[commandProperties.commandName]);
    const comamnd = getCommand(this.pageElement);
    this.pageElement = comamnd.execute(commandProperties.payload);
  };

  undoCommand(commandProperties: CommandProperties) {
    const command = (this.commandMap[commandProperties.commandName]) as unknown as Command;
    command.undo(commandProperties.payload);
  }
}

export { CommandProcessor };