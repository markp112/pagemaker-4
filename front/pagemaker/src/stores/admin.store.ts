import type { Command, CommandButtonTypes, EditorButtonBase } from '@/classes/commandButtons/model';
import type { EditorButtonContent } from '@/components/base/editorButtons/model';
import { defineStore } from 'pinia';

export const useAdminStore = defineStore({
  id: 'adminStore',

  state: () => {
    return {
      _commandMap: {} as Command,
      _editedCommand: {} as CommandButtonTypes,
    }
  },

  getters: {
    commands: (state) => {
      return state._commandMap;
    },

    editedCommand: (state) => {
      return state._editedCommand;
    },
  },

  actions: {
    setCommands(commands: Command) {
      this.$state._commandMap = commands;
    },

    setEditedCommand(command: CommandButtonTypes) {
      this.$state._editedCommand = command;
    },

    addCommand(key: string, buttonType: CommandButtonTypes) {
      this._commandMap[key] = buttonType;
    }
  }
})