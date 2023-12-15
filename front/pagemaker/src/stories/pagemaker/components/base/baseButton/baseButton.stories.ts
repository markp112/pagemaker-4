import type { Meta, StoryObj } from '@storybook/vue3';
import BaseButton from '../../../../../components/base/baseButton/baseButton.vue';
import {  ButtonShape, ButtonSize, Variants, } from '../../../../../components/base/baseButton/model/model';

type ButtonProps = {
  disabled?: boolean,
  variant?: Variants,
  size?: ButtonSize,
  buttonShape?: ButtonShape,
  iconName?: string,
}

const meta = {
  title: 'Pagemaker/Base Button',
  component: BaseButton,
  parameters: {
    slots: {
      default: 'ok'
    }
  },
  render: (args: ButtonProps) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<base-button v-bind="args">Ok</base-button>',
  }),
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['solid' , 'outline' , 'text' , 'default'] },
    size: { control: 'select', options: ['small' ,'medium' ,'large'] },
    buttonShape: { control: 'select', options: [ 'rectangular', 'circle']  },

  },

} satisfies Meta<typeof BaseButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    variant: 'solid',
    size: 'medium'
  },
};
