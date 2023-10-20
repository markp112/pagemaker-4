import type { Command, CommandButtonTypes, CommandMap, TabGroup } from '@/classes/commandButtons/model';
import type { TabStrip } from '@/components/core/settingsPanel/tabStrip/tabStripContainer/model';
import { useCommandButtonStore } from '@/stores/commandButton.store';
import { EditorSettingsService  } from '../editorSettings/editor.settings.service';
import { axiosClient } from '../httpService';

const BASE_ROUTE = '/private/editor/command-buttons';
const SHOW_PAGE_TABS = 'page';

function CommandsService() {
  const store = useCommandButtonStore();
  const editorSettingsService = new EditorSettingsService();
  
  async function fetchCommandHierarchy(siteId: string, userId: string) {
    const route = `${BASE_ROUTE}/hierarchy/${siteId}/${userId}`;
    const commandMap = await axiosClient().get<CommandMap>(route);
    store.setCommandMap(commandMap);
  }

  function getEditorCommand() {
    const commandName = editorSettingsService.getActiveElementType();
    return commandName ? store.getCommandMap[commandName] : store.getCommandMap[SHOW_PAGE_TABS];
  }

  function getTabs(): TabStrip[] {
    const command = getEditorCommand();
    if (command) {
      const tabs = command.tabs.map(tab => {
        return {
          displayName: tab.displayName,
          commandPanels: tab.tabContent,
          id: tab.displayName
        }
      })
      return tabs;
    }
    return [];
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
    await axiosClient().post(BASE_ROUTE, commandToPost);
    store.addCommand(key, command);
  }

  async function createPageElement(pageElementName: string, tabs: string[] = []) {
    const key = pageElementName;
    const data = { [key]: { tabs } };
    await axiosClient().post<{[keyName: string]: {tabs: string[]}}, string>(`${BASE_ROUTE}/page-element`, data);
  }

  async function updatePageElementTabs(pageElement: string, tabs: string[]) {
    const key = pageElement;
    const data = { [key]: { tabs } };
    await axiosClient().put<{[keyName: string]: {tabs: string[]}}, string[]>(`${BASE_ROUTE}/page-element/tabs`, data);
  }

  async function createNewTabElement(tabGroupPartial:  Omit<TabGroup, 'tabContent'>): Promise<TabGroup> {
    const tabGroup: TabGroup = {
      key: tabGroupPartial.key,
      displayName: tabGroupPartial.displayName,
      tabContent: []
    };
    return createNewTabGroup(tabGroup);
  }

  async function createNewTabGroup(tabGroup: TabGroup): Promise<TabGroup> {
    return axiosClient().post<TabGroup, TabGroup>(`${BASE_ROUTE}/page-element/tab-group`, tabGroup);
  }

  return { fetchCommandHierarchy,
    getEditorCommand,
    getTabs,
    setActiveTab,
    fetchAllCommands,
    postCommand, 
    createPageElement,
    updatePageElementTabs,
    createNewTabElement,
  };

}

export { CommandsService };

