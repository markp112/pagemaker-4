import type { SnackbarType } from '@/components/base/notifications/snackbar/models';
import { useSnackbarStore } from '@/stores/snackbar.store';

function displayMessage(msg: string, type: SnackbarType, title: string) {
  useSnackbarStore().setSnackbarMessage(
    { 
      type: type,
      payload: {
        message: msg,
        title: title 
      }
    });
}

export { displayMessage };