import type { Meta, StoryObj } from '@storybook/vue3';
import Tooltip from '../../../../../components/utility/notifications/tooltip/tooltip.vue';
import {type TooltipProps } from '../../../../../components/utility/notifications/tooltip/constants';


const meta = {
  title: 'Pagemaker/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    slots: {
      default: '<div>test</div>'
    }
  },
  argTypes: {
    showToolTip: {
      control: 'boolean'
    },
    tooltip: {control: 'text'},
  },
  render: (args: TooltipProps) => ({
    components: { Tooltip },
    setup() {
      return { args };
    },
    template: '<Tooltip v-bind="args"><div class="bg-blue-400 p-5 rounded-sm border-1">some element</div></Tooltip>',
  }),
  args: { showToolTip: true }, // default value
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Show: Story = {
  args: {
    tooltip: 'tooltip',
    showToolTip: true,
  },
};
