import type { CssStyleNames } from '@/classes/cssStyles';
import type { StyleTags } from '@/components/page/model/pageElement/pageElement';

type CommandName = | 'border'
  | 'line-style'
  | 'line-thickness'
  | 'border-radius'
  | 'set-units'
  | 'set-colour'
  | 'set-image';

type CommandParameter = StyleTags | CssStyleNames | number | string;

interface Command {
  execute(styleToApply: CommandParameter ): void;
  undo(styleToRemove: CommandParameter): void;
};

type CommandTypes = 'direct' | 'indirect';

interface CommandProperties {
  commandType: CommandTypes; 
  commandName: CommandName;
  payload: CommandParameter;
};

export type { Command, CommandProperties, CommandName, CommandTypes };
