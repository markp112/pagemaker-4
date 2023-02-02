import type { CssStyleNames } from '@/classes/cssStyles';
import type { StyleTags } from '@/components/page/model/pageElement/pageElement';

type CommandName = | 'border'
  | 'line-style'
  | 'line-thickness'
  | 'border-radius'
  | 'set-units';

interface Command {
  execute(styleToApply: StyleTags | CssStyleNames | number): void;
  undo(styleToRemove: StyleTags | CssStyleNames | number): void;
};

interface CommandProperties {
  commandName: CommandName;
  payload: StyleTags | CssStyleNames | number | string;
};

export type { Command, CommandProperties, CommandName };
