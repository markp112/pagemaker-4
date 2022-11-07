<template>
  <span :class="getClasses" @click="buttonClick($event)">
    <slot />
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export type ButtonTypes = 'primary' | 'secondary' | 'default';
export type Variants = 'solid' | 'outline' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonShape = 'rectangular' | 'circle';

export default defineComponent({
  name: 'BaseButton',

  emits: ['onClick'],

  props: {
    buttonType: {
      default: (): ButtonTypes => {
        return 'default';
      },
    },
    disabled: { default: false },
    variant: (): Variants => {
      return 'solid';
    },
    size: (): ButtonSize => {
      return 'medium';
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
      if (this.size === 'small' && this.buttonShape === 'rectangular')
      return 'h-8 w-auto text-xs';
      if (this.size === 'small' && this.buttonShape === 'circle')
      return 'h-8 w-8 text-xs';
      if (this.size === 'medium' && this.buttonShape === 'rectangular')
      return 'h-10 w-auto text-sm';
      if (this.size === 'medium' && this.buttonShape === 'circle')
      return 'w-12 h-12 text-sm';
      if (this.size === 'large' && this.buttonShape === 'rectangular')
      return 'h-12 w-auto text-md';
      if (this.size === 'large' && this.buttonShape === 'circle')
      return 'h-16 w-16 text-md';
      return 'h-10 w-24';
    },

    getStyling(): string {
      const baseStyling = `${this.getSize} flex items-center justify-center p-2`;
      const active = `cursor-pointer hover:bg-site-${this.buttonType} hover:text-accent-2`;
      const activeOutline = `cursor-pointer hover:bg-border-${this.buttonType} hover:text-accent-1`;
      const activeText = `cursor-pointer hover:text-accent-1 text-site-${this.buttonType}`;
      const inActiveText = `cursor-pointer hover:text-accent-1 text-gray-400`;
      const style = this.getStyle();

      if (this.disabled && this.variant !== 'text') {
        return `bg-gray-200 text-dark ${baseStyling} ${style}`;
      }
      if (this.variant === 'solid') {
        return `bg-site-${this.buttonType}-light text-on-${this.buttonType} ${baseStyling} ${active} shadow-md ${style} bg-site-${this.buttonType}-dark`;
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
  