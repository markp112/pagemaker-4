import { Response } from '@api/types';
import { firebaseGetDocsFromCollection } from '@common/classes/firebaseCommon/getCollection';
import { constructResponse } from '@common/functions/constructResponse';
import { GenericError } from '@errors/index';
import { logger } from '@logger/index';
import { CommandElement, CommandsCollectionStored, EditorButtonBase, TabGroup } from '../model';
import { httpStatusCodes } from '@api/httpStatusCodes';

function commandGroups() {
  const COLLECTION = 'command-containers';
  const COMMAND_ELEMENT_COLLECTION = 'CommandElementCollection';
  const COMMANDS = 'commands';

  async function get(): Promise<Response> {
    try {
      const commandCollection = await getAllCommands();
      const commands = await getCommands();
      const commandElements: CommandElement = await buildCommandsMap(commandCollection, commands);
      return constructResponse<CommandElement>(commandElements, httpStatusCodes.OK);
    }
    catch (err) {
      console.log('%c⧭', 'color: #735656', err);
      logger.error(err);
      throw new GenericError(err);
    }
  }

  async function getAllCommands(): Promise<CommandsCollectionStored> {
    const firebaseData = await firebaseGetDocsFromCollection(COLLECTION, COMMAND_ELEMENT_COLLECTION);
    return firebaseData.data() as unknown as {
      commandElements: string[]
    };
  }
  
  async function buildCommandsMap(commandElements: CommandsCollectionStored, commands: EditorButtonBase[]): Promise<CommandElement> {
    const commandElement: CommandElement = {};
    await Promise.all(commandElements.commandElements.map(async pageElementName => {
      const elementTabs = await getTabList(pageElementName);
      commandElement[pageElementName] = {tabs: await getContentForTabs(elementTabs.tabs,commands)};
    }));
    return commandElement;
  }

  async function getContentForTabs(elementsTabsList: string[], commands: EditorButtonBase[]): Promise<TabGroup[]> {
    return await Promise.all(elementsTabsList.map(async tabName => {
      return await getTabs(tabName, commands);
    }));
  }

  async function getTabList(pageElementName: string) {
    const firebaseData = await firebaseGetDocsFromCollection(COLLECTION, pageElementName);
    return firebaseData.data() as unknown as { tabs: string[] };
  }

  async function getTabs(tabName: string, commands: EditorButtonBase[]): Promise<TabGroup> {
    const firebaseData = await firebaseGetDocsFromCollection(COLLECTION, tabName);
    const tabContentStored = firebaseData.data() as unknown as {
      displayName: string,
      tabContent: string[],
    };
    return {
      displayName: tabContentStored.displayName,
      tabContent: await getCommandPanels(tabContentStored.tabContent, commands),
    };
  }

  async function getCommandPanels(tabContent: string[], commands: EditorButtonBase[]) {
    return await Promise.all(tabContent.map(async tabGroupName => {
      const firebaseData = await firebaseGetDocsFromCollection(COLLECTION, tabGroupName);
      const commandList = firebaseData.data() as unknown as { commands: string[] };
      return {
        commands: await getCommandsForPanel(commandList.commands, commands),
      }
    }));
  }

  async function getCommandsForPanel(commandsList: string[], commands: EditorButtonBase[]) {
    return await Promise.all(commandsList.map(command => {
      return commands[command];
    }));
  } 

  async function getCommands(): Promise<EditorButtonBase[]> {
    try {
      const firebaseData = await firebaseGetDocsFromCollection(COLLECTION, COMMANDS);
      const commands = firebaseData.data() as unknown as EditorButtonBase[];
      return commands;
    }
    catch (err) {
      logger.error(err);
      throw new GenericError(err);
    }
  }

  return { get }
}

export { commandGroups };


