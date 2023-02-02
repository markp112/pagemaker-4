import type { PageElement } from '@/components/page/model/pageElement/pageElement';
import { BorderRadiusCommand } from './borderRadius/borderRadius.command';
import { BordersCommand } from './borders/borders.comand';
import { LineStyleCommand } from './lineStyle/lineStyle.command';
import { LineThicknessCommand } from './lineThickness/lineThickness.command';
import type { CommandName, CommandProperties } from './model/command';
import { UnitsCommand } from './units/units.command';

type CommandKey = { [commandName in CommandName]: (pageElement: PageElement) => any}

class CommandProcessor {
  constructor(private pageElement: PageElement) {};
  private commandMap: CommandKey = {
    'border': (pageElement: PageElement) => new BordersCommand(pageElement),
    'line-style': (pageElement: PageElement) => new LineStyleCommand(pageElement),
    'line-thickness': (pageElement: PageElement) => new LineThicknessCommand(pageElement),
    'border-radius': (pageElement: PageElement) => new BorderRadiusCommand(pageElement),
    'set-units': () => new UnitsCommand(),
  };

  processCommand(commandProperties: CommandProperties) {
    const getCommand = (this.commandMap[commandProperties.commandName]);
    const command = getCommand(this.pageElement);
    this.pageElement = command.execute(commandProperties.payload);
  };

  undoCommand(commandProperties: CommandProperties) {
    const getCommand = (this.commandMap[commandProperties.commandName]);
    const command = getCommand(this.pageElement);
    command.undo(commandProperties.payload);
  }
}

export { CommandProcessor };