import type { CommandMap } from '@/classes/commandButtons/model';
import type { TabStrip } from '@/components/core/settingsPanel/tabStrip/tabStripContainer/model';
import { useCommandButtonStore } from '@/stores/commandButton.store';
import { useEditorSettingsStore } from '@/stores/editorSettings.store';
import { axiosClient } from '../httpService';

const BASE_ROUTE = '/private/editor/command-buttons';

function CommandsService() {
  const store = useCommandButtonStore();
  const editorSettingsStore = useEditorSettingsStore()
  
  async function fetchCommandHierarchy() {
    const commandMap = await axiosClient().get<CommandMap>(BASE_ROUTE);
    store.setCommandMap(commandMap);
  }

  function getEditorCommand() {
    const commandName = editorSettingsStore.getActiveElementName;
    console.log('%c⧭', 'color: #00258c', editorSettingsStore.getActiveElementName);
    return commandName ? store.getCommandMap[commandName] : undefined;
  }

  function getTabs(): TabStrip[] {
    const command = getEditorCommand();
    console.log('%c⧭', 'color: #00ff88', command);
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

  return { fetchCommandHierarchy,
    getEditorCommand,
    getTabs,
  };

}

export { CommandsService };
