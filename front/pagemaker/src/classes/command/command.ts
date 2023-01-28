import type { StyleTags } from '@/components/page/model/pageElement/pageElement';

type CommandName = | 'border';



interface Command {
  execute(styleToApply: StyleTags): void;
  undo(styleToRemove: StyleTags): void;
};

interface CommandProperties {
  commandName: CommandName;
  payload: StyleTags;
};

export type { Command, CommandProperties, CommandName };
