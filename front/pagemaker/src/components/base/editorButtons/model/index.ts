import type { CommandName, CommandTypes } from '@/classes/command/model/command';
import type { CssStyleNames } from '@/classes/cssStyles';
import type { StyleTags } from '@/components/page/model/pageElement/pageElement';

type EditorButtonTypes = 'list'
  | 'iconList' 
  | 'plusMinus'
  | 'iconImageButton'
  | 'numericWithSelect'
  | 'textInputButton'
  | 'uploadButton'
  | 'imageLibrary';

interface EditorButtonBase {
  name: string;
  tooltip: string;
  displayIcon: string;
  buttonType: EditorButtonTypes;
  commandName: CommandName | StyleTags | CssStyleNames;
  commandType: CommandTypes;
};

interface EditorButtonContent extends EditorButtonBase {
  content: string | File;
}

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
};


export type { EditorButtonBase,
  EditorButtonContent,
  EditorButtonTypes,
  EditorButtonSelectList,
  SelectListIcon,
  EditorButtonNumericSelectList,
};
