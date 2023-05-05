
interface EditorButtonBase {
  key: string;
  tooltip: string;
  displayIcon: string;
  buttonType: string;
  commandName: string;
  commandType: string;
};

interface EditorButtonContent extends EditorButtonBase {
  content: string;
}

type Command = EditorButtonBase & {key: string };

interface CommandGroup {
  commands: string[];
}; 

interface CommandPanel {
  [key: string]: EditorButtonBase[] | EditorButtonContent[];
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

interface TabContentStored {
  displayName: string,
  tabContent: string[];
};

interface CommandsCollectionStored {
  commandElements: string[];
}


export {
  EditorButtonBase,
  EditorButtonContent,
  Command,
  CommandElement,
  CommandElementCollection,
  CommandsCollectionStored,
  TabContentStored,
  TabGroup,
  CommandGroup,
  CommandPanel,
}; 
