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
import type { ActiveElements, Command, CommandKey, CommandProperties } from './model/command';
import { UnitsCommand } from './units/units.command';
import { UploadImageCommand } from './uploadImageFile/uploadImageFile.command';
import { ZindexCommand } from './zIndex/zindexCommand';
import { FontCommand } from './fontCommand/fontCommand';
import { DropShadowCommand } from './dropShadow/dropShadow.command';
import { DeleteElementCommand } from './deleteElement/deleteElement';
import { SavePageCommand } from './savePage/savePage';
import type { Page } from '@/components/page/model/pageElement/pageElement';



class CommandProcessor {
  
  constructor(private ActiveElements: ActiveElements, private commandHistory: CommandHistory<CommandProperties>) {}
  
  private readonly commandMap: CommandKey = {
    'border': (ActiveElements: ActiveElements) => new BordersCommand(ActiveElements),
    'border-radius': (ActiveElements: ActiveElements) => new BorderRadiusCommand(ActiveElements),
    'line-style': () => new LineStyleCommand(),
    'line-thickness': () => new LineThicknessCommand(),
    'drop-shadow': () => new DropShadowCommand(),
    'set-units': () => new UnitsCommand(),
    'set-colour': (ActiveElements: ActiveElements) => new ColourCommand(ActiveElements),
    'set-image': (ActiveElements: ActiveElements) => new ImageCommand(ActiveElements),
    'set-colour-applies-to': (ActiveElements: ActiveElements) => new ApplyColourTo(ActiveElements),
    'set-font': () => new FontCommand(),
    'justify-start': (ActiveElements: ActiveElements) => new justifyCommand(ActiveElements),
    'justify-center': (ActiveElements: ActiveElements) => new justifyCommand(ActiveElements),
    'justify-end': (ActiveElements: ActiveElements) => new justifyCommand(ActiveElements),
    'justify-between': (ActiveElements: ActiveElements) => new justifyCommand(ActiveElements),
    'justify-evenly': (ActiveElements: ActiveElements) => new justifyCommand(ActiveElements),
    'justify-around': (ActiveElements: ActiveElements) => new justifyCommand(ActiveElements),
    'flex-col': (ActiveElements: ActiveElements) => new AlignmentCommand(ActiveElements),
    'flex-row': (ActiveElements: ActiveElements) => new AlignmentCommand(ActiveElements),
    'items-start': (ActiveElements: ActiveElements) => new ItemsAlignmentCommand(ActiveElements),
    'items-center': (ActiveElements: ActiveElements) => new ItemsAlignmentCommand(ActiveElements),
    'items-end': (ActiveElements: ActiveElements) => new ItemsAlignmentCommand(ActiveElements),
    'send-to-back': (ActiveElements: ActiveElements) => new ZindexCommand(ActiveElements),
    'bring-to-front': (ActiveElements: ActiveElements) => new ZindexCommand(ActiveElements),
    'show-gallery': () => new ImageLibraryCommand(),
    'save-page': (ActiveElements: ActiveElements) => new SavePageCommand(ActiveElements as Page),
    'upload-image-file': (ActiveElements: ActiveElements) => new UploadImageCommand(ActiveElements),
    'delete-element': (ActiveElements: ActiveElements) => new DeleteElementCommand(ActiveElements),
  };

  processCommand(commandProperties: CommandProperties) {
    const getCommand = (this.commandMap[commandProperties.commandName]);
    const command = getCommand(this.ActiveElements) as unknown as Command;
    if (commandProperties.commandType === 'direct') {
      this.ActiveElements = command.execute(commandProperties.payload) as unknown as ActiveElements;
    } else {
      command.execute(commandProperties.payload);
      this.applyPropertyToLastDirectComand();
    }
    this.commandHistory.add(commandProperties);
  }

  undoCommand(commandProperties: CommandProperties) {
    const getCommand = (this.commandMap[commandProperties.commandName]);
    const command = getCommand(this.ActiveElements) as unknown as Command;
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