<template>
    <span :class="getClasses()" @click.stop="buttonClick()" class="bg-site ">
      <slot />
      <IconImage v-if="iconName" :icon-image="getIcon()"/>
  </span>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { Icon } from '@/components/utility/icon/model/model';
import IconImage from '@/components/utility/icon/icon.vue';

export type ButtonTypes = 'primary' | 'secondary' | 'default';
export type Variants = 'solid' | 'outline' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonShape = 'rectangular' | 'circle';

const sizeMap = {
  small_rectangular: 'h-6 w-auto px-2 text-xs',
  small_circle: 'h-8 w-8 text-xs',
  medium_rectangular: 'h-8 w-auto px-4 text-sm',
  medium_circle: 'w-12 h-12 text-sm',
  large_rectangular: 'h-10 w-auto px-6 text-md',
  large_circle: 'h-16 w-16 text-md',
};



  const emits = defineEmits(['onClick']);

  const props = defineProps <{
    buttonType: ButtonTypes,
    disabled?: boolean,
    variant?: Variants,
    size?: ButtonSize,
    buttonShape?: ButtonShape,
    iconName?: string,
  }> ()
  

  
  
  const getSize = (): string => {
    const key = `${props.size}_${props.buttonShape ?? 'rectangular'}`;
    return sizeMap[key];
  }
  
  const getStyle = (): string => {
    return props.buttonShape === 'circle' ? 'rounded-full' : 'rounded-md';
  }

  const getStyling = (): string => {
    const baseStyling = `${getSize()} flex items-center justify-center p-2 border border-gray-400`;
    const active = 'cursor-pointer hover:bg-site-primary-dark text-site-surface hover:text-gray-200 transition ease-in-out delay-150';
    const activeOutline = `cursor-pointer hover:bg-border-${props.buttonType} hover:text-site-surface hover:bg-site-primary-dark`;
    const activeText = `cursor-pointer hover:text-site-primary-dark text-site-${props.buttonType}`;
    const inActiveText = 'cursor-pointer hover:text-accent-1 text-gray-400';
    const style = getStyle();
    
    if (props.disabled && props.variant !== 'text') {
      return `bg-gray-200 text-dark ${baseStyling} ${style}`;
    }
    if (props.variant === 'solid' || props.variant===undefined) {
      return `bg-site-primary-light text-site-surface ${baseStyling} ${active} shadow-md ${style}`;
    }
    if (props.variant === 'outline') {
      return `border border-site-${props.buttonType}-light ${baseStyling} ${activeOutline} shadow-md ${style}`;
    }
    if (props.variant === 'text') {
      return `text-md font-bold ${baseStyling} ${
        props.disabled ? inActiveText : activeText
      } ${style}`;
    }
    return '';
  };
  
  onMounted(() => {
    getStyling();
  })
    
  const getClasses = (): string => {
      return getStyling();
    }

    const buttonClick = (): void => {
      emits('onClick');
    }
    
    const getIcon = (): Icon => {
      return {
        classDef: '',
        icon: props.iconName,
        id: '',
        tooltip: '',
      }
    } 


</script>
  