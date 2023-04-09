import type { Command, CommandButtonTypes, CommandMap, TabGroup } from '@/classes/commandButtons/model';
import type { TabContent, TabStrip } from '@/components/core/settingsPanel/tabStrip/tabStripContainer/model';
import { defineStore } from 'pinia';


const useCommandButtonStore = defineStore({
  id: 'commandButtonStore',
  
  state: () => {
    return {
      _commandMap: {} as CommandMap,
      _activeTabElements: [] as TabStrip[],
      _activeTabCommands: [] as TabContent[],
      _activeTabGroups: [] as string[],
      _activeTabName: '' as string,
      _activeCommands: [] as string[],
      _commandButtons: {} as Command, 
      _editedCommand: {} as CommandButtonTypes,
      _tabList: [] as string[],
      _tabGroupList: [] as string[],
    }
  },

  getters: {

    getCommandMap: (state) => {
      return state._commandMap;
    },

    getAllCommandButtons: (state) => {
      return state._commandButtons;
    },

    editedCommand: (state) => {
      return state._editedCommand;
    },

    getActiveTabGroups: (state) => {
      return state._activeTabGroups;
    },

    getActiveCommands: (state) => {
      return state._activeCommands;
    },

    getTabList: (state) => {
      return state._tabList;
    },

    getTabGroupList: (state) => {
      return state._tabGroupList;
    }
  },

  actions: {
    setCommandMap(commandMap: CommandMap) {
      this._commandMap = commandMap;
    },

    setCommands(commands: Command) {
      this._commandButtons = commands;
    },

    setTabList() {
      const tabs = new Set<string>();
      const pageElementKeys = Object.keys(this._commandMap);
      pageElementKeys.forEach(pageElement => {
        const element = this._commandMap[pageElement];
        element.tabs.forEach(tab => tabs.add(tab.displayName));
      });
      this._tabList = Array.from(tabs.values());
    },
    
    setTabGroups() {
      const groups = new Set<string>();
      const pageElementKeys = Object.keys(this._commandMap);
      pageElementKeys.forEach(pageElement => {
        const element = this._commandMap[pageElement];
        element.tabs.forEach(tab => {
          tab.tabContent.forEach(group => {
            const key = Object.keys(group)[0];
            groups.add(key);
          })
        });
      })
      this._tabGroupList = Array.from(groups.values());
    },  

    createNewPageElement(element: string) {
      this._commandMap[element] = { tabs: [] };
    },

    createNewTabElement(tabName: string) {
      const tabs = this._tabList.filter(tab => tab !== tabName);
      tabs.push(tabName);
      this._tabList = tabs;
    },

    createNewTabGroupElement(tabGroupName: string) {
      const tabGroups = this._tabGroupList.filter(tabGroup => tabGroup !== tabGroupName);
      tabGroups.push(tabGroupName);
      this._tabGroupList = tabGroups;
    },

    addCommand(key: string, buttonType: CommandButtonTypes) {
      this._commandButtons[key] = buttonType;
    },

    setActiveTabElements(tabElements: TabStrip[]) {
      this._activeTabElements = tabElements;
    },

    AddTabToElement(pageElementName: string, tabName: string) {
      let tabGroupToAdd;
      const keys = Object.keys(this._commandMap);
      for (const key of keys) {
        const pageElement = this._commandMap[key];
        for (const tab of pageElement.tabs) {
          if (tab.displayName === tabName && key !== pageElementName) {
            tabGroupToAdd = tab;
            break;
          }
        }
        if (tabGroupToAdd) {
          break;
        }
      }
      if(tabGroupToAdd) {
        this._commandMap[pageElementName].tabs.push(tabGroupToAdd);
      }
    },

    setActiveTabCommands(tabCommands: TabContent[]) {
      this._activeTabCommands = tabCommands;
    },

    getActiveTabPanel(pageElement: string, tabName: string) {
      const tabs = this._commandMap[pageElement].tabs.filter(tabStrip => tabStrip.displayName === tabName);
      return tabs.filter(tab => tab.displayName === tabName);
    },

    setActiveTab(pageElement: string, tabName: string) {
      this._activeTabGroups = [];
      this._activeCommands = [];
      this._activeTabName = tabName;
      const tabPanel = this.getActiveTabPanel(pageElement, tabName);
      tabPanel[0].tabContent.forEach(tabGroup => Object.keys(tabGroup).forEach(key => this._activeTabGroups.push(key)));
    },

    setCommandsForTabGroup(pageElement: string, tabGroupName: string) {
      this._activeCommands = [];
      if (this._activeTabName) {
        const tabPanel = this.getActiveTabPanel(pageElement, this._activeTabName);
        const activeTabGroup = tabPanel[0].tabContent.filter(tabGroup => tabGroup[tabGroupName])[0];
        activeTabGroup[tabGroupName].forEach(commandItem => this._activeCommands.push(commandItem.commandName));
      }
    }
  }
});

export { useCommandButtonStore };