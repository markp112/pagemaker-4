
interface EditorButtonBase {
  name: string;
  tooltip: string;
  displayIcon: string;
  buttonType: string;
  commandName: string;
  commandType: string;
};

type Command = EditorButtonBase & {key: string };

interface CommandGroup {
  commands: string[];
}; 

interface CommandPanel {
  [key: string]: EditorButtonBase[];
}

interface TabGroup {
  displayName: string;
  key: string;
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
  Command,
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
