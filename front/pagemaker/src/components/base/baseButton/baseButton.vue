<template>
  <button :class="getClasses()" @click.stop="buttonClick()" :disabled="disabled">
    <slot />
    <IconImage v-if="iconName" :icon-image="getIcon()" class="ml-2"/>
  </button>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { Icon } from '@/components/utility/icon/model/model';
import IconImage from '@/components/utility/icon/icon.vue';
import { disabledMap, sizeMap, variantMap, ButtonShape, ButtonSize, Variants, ButtonShapeKey } from './model/model';

  const props = defineProps<{
    disabled?: boolean,
    variant?: Variants,
    size?: ButtonSize,
    buttonShape?: ButtonShape,
    iconName?: string,
  }>();
  const emits = defineEmits(['onClick']);

  const getSize = (): string => {
    const key = `${props.size}_${props.buttonShape ?? 'rectangular'}` as ButtonShapeKey;
    return sizeMap[key];
  };
  
  const getStyling = (): string => {
    const baseStyling = `${getSize()} flex items-center justify-center p-2 border`;
    const variantStyle = variantMap[props.variant ?? 'default'];
    const activeInactive = disabledMap[props.disabled ? 'inActive' : 'active'];
    return `${variantStyle} ${baseStyling} ${activeInactive}`;
  };
  
  onMounted(() => {
    getStyling();
  })
    
  const getClasses = (): string => {
    return getStyling();
  };

  const buttonClick = (): void => {
    emits('onClick');
  };
  
  const getIcon = (): Icon => {
    return {
      classDef: '',
      icon: props.iconName ?? '',
      id: '',
      tooltip: '',
    }
  };
</script>
  