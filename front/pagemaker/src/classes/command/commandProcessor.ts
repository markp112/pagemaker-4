import type { PageElement } from '@/components/page/model/pageElement/pageElement';
import type { CommandHistory } from '../history/history';
import { AlignmentCommand } from './alignment/alignmentCommand';
import { BorderRadiusCommand } from './borderRadius/borderRadius.command';
import { BordersCommand } from './borders/borders.comand';
import { ColourCommand } from './colour/colourCommand';
import { ApplyColourTo } from './colourAppliesTo/colourAppliesTo';
import { ImageCommand } from './image/image.command';
import { ImageLibraryCommand } from './imageLibrary/imageLibrary.command';
import { ItemsAlignmentCommand } from './itemsAlignment/itemsAlignment';
import { justifyCommand } from './jusftify/justifyCommand';
import { LineStyleCommand } from './lineStyle/lineStyle.command';
import { LineThicknessCommand } from './lineThickness/lineThickness.command';
import type { CommandName, CommandProperties } from './model/command';
import { UnitsCommand } from './units/units.command';
import { UploadImageCommand } from './uploadImageFile/uploadImageFile.command';
import { ZindexCommand } from './zIndex/zindexCommand';

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
type  CommandKey = { [commandName in CommandName]: (pageElement: PageElement) => any }

class CommandProcessor {
  
  constructor(private pageElement: PageElement, private commandHistory: CommandHistory<CommandProperties>) {};
  
  private commandMap: CommandKey = {
    'border': (pageElement: PageElement) => new BordersCommand(pageElement),
    'line-style': () => new LineStyleCommand(),
    'line-thickness': () => new LineThicknessCommand(),
    'border-radius': (pageElement: PageElement) => new BorderRadiusCommand(pageElement),
    'set-units': () => new UnitsCommand(),
    'set-colour': (pageElement: PageElement) => new ColourCommand(pageElement),
    'set-image': (pageElement: PageElement) => new ImageCommand(pageElement),
    'set-colour-applies-to': (pageElement: PageElement) => new ApplyColourTo(pageElement),
    'justify-start': (pageElement: PageElement) => new justifyCommand(pageElement),
    'justify-center': (pageElement: PageElement) => new justifyCommand(pageElement),
    'justify-end': (pageElement: PageElement) => new justifyCommand(pageElement),
    'justify-between': (pageElement: PageElement) => new justifyCommand(pageElement),
    'justify-evenly': (pageElement: PageElement) => new justifyCommand(pageElement),
    'justify-around': (pageElement: PageElement) => new justifyCommand(pageElement),
    'flex-col': (pageElement: PageElement) => new AlignmentCommand(pageElement),
    'flex-row': (pageElement: PageElement) => new AlignmentCommand(pageElement),
    'items-start': (pageElement: PageElement) => new ItemsAlignmentCommand(pageElement),
    'items-center': (pageElement: PageElement) => new ItemsAlignmentCommand(pageElement),
    'items-end': (pageElement: PageElement) => new ItemsAlignmentCommand(pageElement),
    'send-to-back': (pageElement: PageElement) => new ZindexCommand(pageElement),
    'bring-to-front': (pageElement: PageElement) => new ZindexCommand(pageElement),
    'show-gallery': () => new ImageLibraryCommand(),
    'upload-image-file': (pageElement: PageElement) => new UploadImageCommand(pageElement),
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