import { Response } from '@api/types';
import { firebaseGetDocsFromCollection } from '@common/classes/firebaseCommon/getCollection';
import { constructResponse } from '@common/functions/constructResponse';
import { CommandElement, CommandPanel, CommandsCollectionStored, EditorButtonBase, TabGroup } from '../model';
import { httpStatusCodes } from '@api/httpStatusCodes';
import { ColourSwatches } from '@api/v1.0/sites/model/colourPalette';
import { buildColourCommandTabGroups } from './colourPalettes';
import { handleError } from '@errors/handleError';

export const COMMAND_COLLECTION = 'command-containers';
export const COMMAND_ELEMENT_COLLECTION = 'CommandElementCollection';
export const COMMANDS = 'commands';

function commandGroups() {

  let colourCommandGroups: CommandPanel[];

  async function get(colourPalettes: ColourSwatches): Promise<Response> {
    try {
      const commandCollection = await getAllCommands();
      if(colourPalettes) {
        colourCommandGroups = buildColourCommandTabGroups(colourPalettes);
      }
      const commands = await getCommands();
      const commandElements: CommandElement = await buildCommandsMap(commandCollection, commands);
      return constructResponse<CommandElement>(commandElements, httpStatusCodes.OK);
    }
    catch (err) {
      handleError(err);
    }
  }

  async function getAllCommands(): Promise<CommandsCollectionStored> {
    const firebaseData = await firebaseGetDocsFromCollection(COMMAND_COLLECTION, COMMAND_ELEMENT_COLLECTION);
    return firebaseData.data() as unknown as {
      commandElements: string[];
    };
  }
  
  async function buildCommandsMap(commandElements: CommandsCollectionStored, commands: EditorButtonBase[]): Promise<CommandElement> {
    const commandElement: CommandElement = {};
    try {

      await Promise.all(commandElements.commandElements.map(async pageElementName => {
        const elementTabs = await getTabList(pageElementName);
        commandElement[pageElementName] = { tabs: await getContentForTabs(elementTabs.tabs,commands)};
      }));
      return commandElement;
    } catch (err) {
      handleError(err)
    }
  }

  async function getContentForTabs(elementsTabsList: string[], commands: EditorButtonBase[]): Promise<TabGroup[]> {
    return Promise.all(elementsTabsList.map(async tabName => {
      return await getTabs(tabName, commands);
    }));
  }

  async function getTabList(pageElementName: string) {
    const firebaseData = await firebaseGetDocsFromCollection(COMMAND_COLLECTION, pageElementName);
    return firebaseData.data() as unknown as { tabs: string[] };
  }

  async function getTabs(tabName: string, commands: EditorButtonBase[]): Promise<TabGroup> {
    const firebaseData = await firebaseGetDocsFromCollection(COMMAND_COLLECTION, tabName);
    const tabContentStored = firebaseData.data() as unknown as {
      displayName: string,
      key: string,
      tabContent: string[],
    };
    if (tabContentStored) {
      if (tabContentStored.key === 'coloursTab' && colourCommandGroups) {
        return {
          displayName: tabContentStored.displayName,
          key: tabContentStored.key,
          tabContent: await buildPanelsFromColours(tabContentStored.tabContent, commands),
        }
      }
      return {
        displayName: tabContentStored.displayName,
        key: tabContentStored.key,
        tabContent: await getCommandPanels(tabContentStored.tabContent, commands),
      };
    }
    return {
      displayName: '',
      key: '',
      tabContent: []
    }
  }

  async function getCommandPanels(tabContent: string[], commands: EditorButtonBase[]) {
    if (tabContent) {
      return Promise.all(tabContent.map(async tabGroupName => {
        const firebaseData = await firebaseGetDocsFromCollection(COMMAND_COLLECTION, tabGroupName);
        const commandList = firebaseData.data() as unknown as { commands: string[] };
        return { [tabGroupName]: await getCommandsForPanel(commandList.commands, commands)}
      }));
    }
    return [];
  }

  async function getCommandsForPanel(commandsList: string[], commands: EditorButtonBase[]) {
    return Promise.all(commandsList.map(command => {
      return commands[command];
    }));
  } 

  async function getCommands(): Promise<EditorButtonBase[]> {
    try {
      const firebaseData = await firebaseGetDocsFromCollection(COMMAND_COLLECTION, COMMANDS);
      const commands = firebaseData.data() as unknown as EditorButtonBase[];
      return commands;
    }
    catch (err) {
      handleError(err);
    }
  }

  async function buildPanelsFromColours(tabContent: string[], commands: EditorButtonBase[]):Promise<CommandPanel[]> {
    const panels = await getCommandPanels(tabContent, commands);
    panels.push(...colourCommandGroups)
    return panels;
  }

  return { get, getCommands, getAllCommands };
}

export { commandGroups };


