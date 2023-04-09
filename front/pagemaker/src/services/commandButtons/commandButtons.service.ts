import type { Command, CommandButtonTypes, CommandMap } from '@/classes/commandButtons/model';
import type { TabStrip } from '@/components/core/settingsPanel/tabStrip/tabStripContainer/model';
import { useCommandButtonStore } from '@/stores/commandButton.store';
import { useEditorSettingsStore } from '@/stores/editorSettings.store';
import { axiosClient } from '../httpService';

const BASE_ROUTE = '/private/editor/command-buttons';

function CommandsService() {
  const store = useCommandButtonStore();
  const editorSettingsStore = useEditorSettingsStore()
  
  async function fetchCommandHierarchy() {
    const route = `${BASE_ROUTE}/hierarchy`
    const commandMap = await axiosClient().get<CommandMap>(route);
    store.setCommandMap(commandMap);
  }

  function getEditorCommand() {
    const commandName = editorSettingsStore.getActiveElementName;
    return commandName ? store.getCommandMap[commandName] : undefined;
  }

  function getTabs(): TabStrip[] {
    const command = getEditorCommand();
    if (!command) {
      return [];
    } 
    return command.tabs.map(tab => {
      return {
        displayName: tab.displayName,
        commandPanels: tab.tabContent,
        id: tab.displayName
      }
    })
  }

  function setActiveTab(pageElement: string, tab: string) {
    store.setActiveTab(pageElement, tab);
  }

  async function fetchAllCommands() {
    const route = `${BASE_ROUTE}/commands`
    const allCommands = await axiosClient().get<Command>(route);
    store.setCommands(allCommands);
  }

  async function postCommand(key: string, command: CommandButtonTypes ) {
    const commandToPost = { ...command, key };
    await axiosClient().post<{},{}>(BASE_ROUTE, commandToPost);
    store.addCommand(key, command);
  }

  return { fetchCommandHierarchy,
    getEditorCommand,
    getTabs,
    setActiveTab,
    fetchAllCommands,
    postCommand
  };

}

export { CommandsService };
