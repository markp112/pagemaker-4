import type { CommandMap } from '@/classes/commandButtons/model';
import type { TabContent, TabStrip } from '@/components/core/settingsPanel/tabStrip/tabStripContainer/model';
import { defineStore } from 'pinia';


const useCommandButtonStore = defineStore({
  id: 'commandButtonStore',
  
  state: () => {
    return {
      _commandMap: {} as CommandMap,
      _activeTabElements: [] as TabStrip[],
      _activeTabCommands: [] as TabContent[],
    }
  },

  getters: {

    getCommandMap: (state) => {
      return state._commandMap;
    }

  },

  actions: {
    setCommandMap(commandMap: CommandMap) {
      this._commandMap = commandMap;
    },

    setActiveTabElements(tabElements: TabStrip[]) {
      this._activeTabElements = tabElements;
    },

    setActiveTabCommands(tabCommands: TabContent[]) {
      this._activeTabCommands = tabCommands;
    }
  }
});

export { useCommandButtonStore };