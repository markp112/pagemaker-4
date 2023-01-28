import type { CssStyleNames } from '@/classes/cssStyles';
import type { StyleTags } from '@/components/page/model/pageElement/pageElement';

type CommandName = | 'border' | 'line-style';

interface Command {
  execute(styleToApply: StyleTags | CssStyleNames): void;
  undo(styleToRemove: StyleTags | CssStyleNames): void;
};

interface CommandProperties {
  commandName: CommandName;
  payload: StyleTags | CssStyleNames;
};

export type { Command, CommandProperties, CommandName };
