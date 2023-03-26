
interface EditorButtonBase {
  name: string;
  tooltip: string;
  displayIcon: string;
  buttonType: string;
  commandName: string;
  commandType: string;
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


interface CommandGroup {
  commands: string[];
}; 

interface CommandPanel {
  commands: EditorButtonBase[];
}

interface TabGroup {
  displayName: string;
  tabContent: CommandPanel[];
}

interface CommandElement {
  [key: string]: {
    tabs: TabGroup[]
  };
};

interface CommandElementCollection {
  elements: CommandElement[];
};

interface PageElementsRoot {
  tabs: string[];
};

interface PageElementStored {
  commandGroups: string[];
  displayName: string;
};

interface TabContentStored {
  displayName: string,
  tabContent: string[];
};

interface CommandsCollectionStored {
  commandElements: string[];
}


export {
  EditorButtonBase,
  CommandElement,
  CommandElementCollection,
  CommandsCollectionStored,
  PageElementsRoot,
  PageElementStored,
  TabContentStored,
  TabGroup,
  CommandGroup,
  CommandPanel,
}; 
