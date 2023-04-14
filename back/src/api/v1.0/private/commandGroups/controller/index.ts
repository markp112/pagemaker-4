import { Response } from '@api/types';
import { firebaseGetDocsFromCollection } from '@common/classes/firebaseCommon/getCollection';
import { constructResponse } from '@common/functions/constructResponse';
import { GenericError } from '@errors/index';
import { logger } from '@logger/index';
import { CommandElement, CommandsCollectionStored, EditorButtonBase, TabGroup } from '../model';
import { httpStatusCodes } from '@api/httpStatusCodes';

export const COMMAND_COLLECTION = 'command-containers';
export const COMMAND_ELEMENT_COLLECTION = 'CommandElementCollection';
export const COMMANDS = 'commands';

function commandGroups() {

  async function get(): Promise<Response> {
    try {
      const commandCollection = await getAllCommands();
      const commands = await getCommands();
      const commandElements: CommandElement = await buildCommandsMap(commandCollection, commands);
      return constructResponse<CommandElement>(commandElements, httpStatusCodes.OK);
    }
    catch (err) {
      logger.error(err, 'err');
      throw new GenericError(err);
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
      console.log(err);
      throw new GenericError(err);
    }
  }

  async function getContentForTabs(elementsTabsList: string[], commands: EditorButtonBase[]): Promise<TabGroup[]> {
    return await Promise.all(elementsTabsList.map(async tabName => {
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
      return await Promise.all(tabContent.map(async tabGroupName => {
        const firebaseData = await firebaseGetDocsFromCollection(COMMAND_COLLECTION, tabGroupName);
        const commandList = firebaseData.data() as unknown as { commands: string[] };
        return { [tabGroupName]: await getCommandsForPanel(commandList.commands, commands)}
      }));
    }
    return [];
  }

  async function getCommandsForPanel(commandsList: string[], commands: EditorButtonBase[]) {
    return await Promise.all(commandsList.map(command => {
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
      logger.error(err);
      throw new GenericError(err);
    }
  }

  return { get, getCommands, getAllCommands };
}

export { commandGroups };


