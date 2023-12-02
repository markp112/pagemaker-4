import type { CssStyleNames } from '@/classes/cssStyles';
import { ImageElement, TextElement, ButtonElement } from '@/components/page/model/imageElement/imageElement';
import { PageContainerInterface } from '@/components/page/model/pageContainer/container';
import type { Page, StyleTags } from '@/components/page/model/pageElement/pageElement';

type CommandName = | 'border'
  | 'line-style'
  | 'line-thickness'
  | 'border-radius'
  | 'delete-element'
  | 'drop-shadow'
  | 'set-units'
  | 'set-colour'
  | 'set-image'
  | 'set-colour-applies-to'
  | 'set-font'
  | 'flex-row'
  | 'flex-col'
  | 'justify-start'
  | 'justify-center'
  | 'justify-end'
  | 'justify-between'
  | 'justify-evenly'
  | 'justify-around'
  | 'items-start'
  | 'items-center'
  | 'items-end'
  | 'bring-to-front'
  | 'save-page'
  | 'send-to-back'
  | 'show-gallery'
  | 'upload-image-file';

type CommandParameter = StyleTags | CssStyleNames | number | string | boolean | File | Page;
type ActiveElements =  Page | ImageElement | TextElement | ButtonElement | PageContainerInterface;
type  CommandKey = { [commandName in CommandName]: (ActiveElements: ActiveElements) => unknown };
interface Command {
  execute(styleToApply: CommandParameter ): void;
  undo(styleToRemove?: CommandParameter): void;
}

type CommandTypes = 'direct' | 'indirect';

interface CommandProperties {
  commandType: CommandTypes; 
  commandName: CommandName;
  payload: CommandParameter;
}

export type { Command, CommandProperties, CommandName, CommandTypes, ActiveElements, CommandKey };
