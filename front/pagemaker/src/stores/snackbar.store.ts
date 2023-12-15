import type { SnackbarActions, SnackbarTypes } from '@/components/base/notifications/snackbar/models';
import { defineStore } from 'pinia'

const useSnackbarStore = defineStore({
  id: 'snackbarStore',

  state: () => {
    return {
      _snackbarMessage: {} as SnackbarTypes,
    }
  },

  getters: {
    getSnackbarMessage: (state) => {
      return state._snackbarMessage;
    },

    isShowSnackBar: (state) => {
      return state._snackbarMessage.show;
    },
  },

  actions: {
    setSnackbarMessage(snackbarAction: SnackbarActions ) {
      switch(snackbarAction.type) {
        case 'error':
        case 'info':
        case 'success':
          this._snackbarMessage = {
            type: snackbarAction.type,
            message: snackbarAction.payload.message,
            title: snackbarAction.payload.title,
            show: true,
          };
          setTimeout( () => {
            this.setSnackbarMessage({type: 'hidden'});
          }, 5000);
          break;
        case 'hidden':
          this._snackbarMessage = {
            type: snackbarAction.type,
            message: '',
            title: '',
            show: false
          };
          break;
      }
    },
  },
});

export { useSnackbarStore };
