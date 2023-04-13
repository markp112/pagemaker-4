import type { CommandName, CommandTypes } from '@/classes/command/model/command';
import type { TabPanel } from '@/components/core/settingsPanel/tabStrip/tabStripContainer/model';
type EditorButtonTypes = 'list'
  | 'iconList' 
  | 'plusMinus'
  | 'iconImageButton'
  | 'numericWithSelect'
  | 'textInputButton'
  | 'uploadButton'
  | 'imageLibrary';

interface EditorButtonBase {
  tooltip: string;
  displayIcon: string;
  buttonType: EditorButtonTypes;
  commandName: CommandName;
  commandType: CommandTypes;
};

interface EditorButtonContent extends EditorButtonBase {
  content: string | File;
}

interface SelectListIcon {
  icon: string;
  classToApply: string;
  tooltip: string;
}

interface EditorButtonSelectList extends EditorButtonBase {
  listValues: SelectListIcon[];
};

interface EditorButtonNumericSelectList extends EditorButtonBase {
  listValues: string[];
};

type CommandButtonTypes = EditorButtonBase | EditorButtonContent | EditorButtonNumericSelectList | EditorButtonSelectList; 

interface Command {
  [key: string]: CommandButtonTypes;
}

interface TabGroup {
  displayName: string,
  key: string,
  tabContent: TabPanel[],
};

interface CommandTabs {
  tabs: TabGroup[];
}

interface CommandMap {
  [key: string]: CommandTabs;
}

export type { EditorButtonBase,
    CommandMap,
    CommandTabs,
    TabGroup,
    Command,
    CommandButtonTypes,
};
