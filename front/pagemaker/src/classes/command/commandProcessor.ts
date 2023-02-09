import type { PageElement } from '@/components/page/model/pageElement/pageElement';
import type { CommandHistory } from '../history/history';
import { BorderRadiusCommand } from './borderRadius/borderRadius.command';
import { BordersCommand } from './borders/borders.comand';
import { ColourCommand } from './colour/colourCommand';
import { ImageCommand } from './image/image.command';
import { LineStyleCommand } from './lineStyle/lineStyle.command';
import { LineThicknessCommand } from './lineThickness/lineThickness.command';
import type { CommandName, CommandProperties } from './model/command';
import { UnitsCommand } from './units/units.command';

type CommandKey = { [commandName in CommandName]: (pageElement: PageElement) => any}

class CommandProcessor {
  
  constructor(private pageElement: PageElement, private commandHistory: CommandHistory<CommandProperties>) {};
  
  private commandMap: CommandKey = {
    'border': (pageElement: PageElement) => new BordersCommand(pageElement),
    'line-style': () => new LineStyleCommand(),
    'line-thickness': () => new LineThicknessCommand(),
    'border-radius': (pageElement: PageElement) => new BorderRadiusCommand(pageElement),
    'set-units': () => new UnitsCommand(),
    'set-colour': () => new ColourCommand(),
    'set-image': (pageElement: PageElement) => new ImageCommand(pageElement)
  };

  processCommand(commandProperties: CommandProperties) {
    const getCommand = (this.commandMap[commandProperties.commandName]);
    const command = getCommand(this.pageElement);
    if (commandProperties.commandType === 'direct') {
      this.pageElement = command.execute(commandProperties.payload);
    } else {
      command.execute(commandProperties.payload);
      this.applyPropertyToLastDirectComand();
    }
    this.commandHistory.add(commandProperties);
  };

  undoCommand(commandProperties: CommandProperties) {
    const getCommand = (this.commandMap[commandProperties.commandName]);
    const command = getCommand(this.pageElement);
    command.undo(commandProperties.payload);
    this.commandHistory.pop();
  }

  applyPropertyToLastDirectComand() {
    const lastCommand = this.commandHistory.getLastCommand('direct');
    if(lastCommand) {
      this.processCommand(lastCommand);
    }
  }
}

export { CommandProcessor };