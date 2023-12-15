import type { Meta, StoryObj } from '@storybook/vue3';

import Snackbar from '../../../../../components/base/notifications/snackbar/snackbar.vue';
import { useSnackbarStore } from '../../../../../stores/snackbar.store';
import type { SnackbarTypes } from '../../../../../components/base/notifications/snackbar/models';

const store = useSnackbarStore();
const meta = {
  title: 'Pagemaker/snackbar',
  component: Snackbar,
  render: () => ({
    components: { Snackbar },
    setup() {
      const showSnackbarSuccess: SnackbarTypes = {
        type: 'success',
        message: 'test',
        show: true,
        title: 'test',
      };
      return { store };
    },
    template: '<div class="w-full h-full"> <Snackbar /> </div>',
  })
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const showSnackbarSuccess: SnackbarTypes = {
  type: 'success',
  message: 'test',
  show: true,
  title: 'test',
};
const showSnackbarWarning: SnackbarTypes = {
  type: 'warning',
  message: 'test',
  show: true,
  title: 'test',
};

export const Success: Story = {
  play:() => store.setSnackbarMessage(showSnackbarSuccess)
};
export const Warning: Story = {
  play:() => store.setSnackbarMessage(showSnackbarWarning)
};
