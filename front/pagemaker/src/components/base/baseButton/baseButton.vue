<template>
  <span :class="getClasses" @click="buttonClick($event)" class="bg-site ">
    <slot />
  </span>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export type ButtonTypes = 'primary' | 'secondary' | 'default';
export type Variants = 'solid' | 'outline' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonShape = 'rectangular' | 'circle';

// const ButtonProps = {
//   buttonSize: Button
// }

export default defineComponent({
  name: 'BaseButton',

  emits: ['onClick'],

  props: {
    buttonType: {
      type: String as PropType<ButtonTypes>,
      default: (): ButtonTypes => {
        return 'default';
      },
    },
    disabled: { default: false },
    variant: {
      type: String,
      default:(): Variants => {
        return 'solid';
      },
    },
    size: {
      type: String as PropType<ButtonSize>,
      default: (): ButtonSize => {
        return 'medium';
      }
    },
    buttonShape: {
      default: (): ButtonShape => {
        return 'rectangular';
      },
    },
  },

  data() {
    return {
      colour: '',
    }
  },

  computed: {

    getSize(): string {
      if (this.size === 'small' && this.buttonShape === 'rectangular') {
        return 'h-6 w-auto px-2 text-xs';
      }
      if (this.size === 'small' && this.buttonShape === 'circle') {
        return 'h-8 w-8 text-xs';
      }
      if (this.size === 'medium' && this.buttonShape === 'rectangular') {
        return 'h-8 w-auto px-4 text-sm';
      }
      if (this.size === 'medium' && this.buttonShape === 'circle') {
        return 'w-12 h-12 text-sm';
      }
      if (this.size === 'large' && this.buttonShape === 'rectangular') {
        return 'h-10 w-auto px-6 text-md';
      }
      if (this.size === 'large' && this.buttonShape === 'circle') {
        return 'h-16 w-16 text-md';
      }
      return 'h-10 w-24';
    },

    getStyling(): string {
      const baseStyling = `${this.getSize} flex items-center justify-center p-2 border border-gray-400`;
      const active = `cursor-pointer hover:bg-site-primary-dark hover:text-gray-200 transition ease-in-out delay-150`;
      const activeOutline = `cursor-pointer hover:bg-border-${this.buttonType} hover:text-site-primary-dark`;
      const activeText = `cursor-pointer hover:text-site-primary-dark text-site-${this.buttonType}`;
      const inActiveText = `cursor-pointer hover:text-accent-1 text-gray-400`;
      const style = this.getStyle();

      if (this.disabled && this.variant !== 'text') {
        return `bg-gray-200 text-dark ${baseStyling} ${style}`;
      }
      if (this.variant === 'solid') {
        return `bg-site-${this.buttonType}-light text-site-${this.buttonType} ${baseStyling} ${active} shadow-md ${style}`;
      }
      if (this.variant === 'outline') {
        return `border border-site-${this.buttonType}-light ${baseStyling} ${activeOutline} shadow-md ${style}`;
      }
      if (this.variant === 'text') {
        return `text-md font-bold ${baseStyling} ${
          this.disabled ? inActiveText : activeText
        } ${style}`;
      }
      return ``;
    },
    
    getClasses(): string {
      return this.getStyling;
    }
  },

  methods: {
    buttonClick(event: MouseEvent): void {
      event.stopPropagation();
      this.$emit('onClick');
    },
    
    getStyle(): string {
      return this.buttonShape === 'circle'? `rounded-full` : 'rounded-md';
    },

  }
})
</script>
  