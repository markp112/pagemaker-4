import type { CommandName } from '@/classes/command/model/command';
import type { CssStyleNames } from '@/classes/cssStyles';
import type { StyleTags } from '@/components/page/model/pageElement/pageElement';

type EditorButtonTypes = 'list' | 'iconList' | 'plusMinus' | 'basic' | 'numericWithSelect';

interface EditorButtonBase {
  name: string;
  tooltip: string;
  displayIcon: string;
  buttonType: EditorButtonTypes;
  commandName: CommandName;
};

interface SelectListIcon {
  icon: string;
  classToApply: StyleTags | CssStyleNames;
  tooltip: string;
}

interface EditorButtonSelectList extends EditorButtonBase {
  listValues: SelectListIcon[];
};

interface EditorButtonNumericSelectList extends EditorButtonBase {
  listValues: string[];
}

export type { EditorButtonBase, EditorButtonSelectList, SelectListIcon, EditorButtonNumericSelectList };


