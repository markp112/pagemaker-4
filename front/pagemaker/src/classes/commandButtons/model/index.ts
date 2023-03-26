import type { CommandName, CommandTypes } from '@/classes/command/model/command';
import type { EditorButtonTypes } from '@/components/base/editorButtons/model';
import type { TabPanel } from '@/components/core/settingsPanel/tabStrip/tabStripContainer/model';

interface EditorButtonBase {
  name: string;
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



interface TabGroup {
  displayName: string,
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
} 
