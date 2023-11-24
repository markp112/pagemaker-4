<template>
    <button :class="getClasses()" @click.stop="buttonClick()" class="bg-site" :disabled="disabled">
      <slot />
      <IconImage v-if="iconName" :icon-image="getIcon()"/>
    </button>
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

  const variantMap = {
    solid: 'bg-site-primary text-site-surface',
    outline: 'border border-site-primary text-site-on-primary hover:bg-site-primary-light',
    text: 'text-site-primary',
    default: 'bg-site-primary text-site-surface',
  };

  const disabledMap = {
    active: 'cursor-pointer hover:bg-site-primary-dark text-site-surface hover:text-gray-200 transition ease-in-out delay-150',
    inActive: 'cursor-not-allowed text-accent-1 bg-gray-300 border-gray-600',
  }

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
  
  const getShape = (): string => {
    return props.buttonShape === 'circle' ? 'rounded-full' : 'rounded-md';
  }

  const getStyling = (): string => {
    const baseStyling = `${getSize()} flex items-center justify-center p-2 border`;
    const style = getShape();
    const variantStyle = variantMap[props.variant ?? 'default'];
    const activeInactive = disabledMap[props.disabled ? 'inActive' : 'active'];
    return `${variantStyle} ${baseStyling} ${activeInactive} ${style}`
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
        icon: props.iconName ?? '',
        id: '',
        tooltip: '',
      }
    } 
</script>
  