<template>
  <Tooltip :showToolTip="showToolTip" :tooltip="iconImage.tooltip">
    <div class="w-8 inline-block">
      <img
        :id="iconImage.id"
        :ref="iconImage.id"
        class="hover: cursor-pointer"
        :src="getIcon"
        @click="iconClick"
        @mouseover="displayTooltip(true)"
        @mouseleave="displayTooltip(false)"
      />
    </div>
  </Tooltip>
</template>

<script lang="ts" setup>
import { getImageUrl } from '@/common/getIcon';
import errorMessages from '@/globals/errors/error-messqges';
import Tooltip from '@/components/utility/notifications/tooltip/toolTip.vue';
import type { Icon } from './model/model';
import { computed, ref } from 'vue';

  const props = defineProps<{
    iconImage: Icon,
  }>();
  const emits = defineEmits(['iconClick']);

  const showToolTip = ref(false);
  const getIcon = computed(() => {
    try {
      if (props.iconImage.icon) {
        return getImageUrl(`${props.iconImage.icon}`);
      }
      return '';
    }  catch (error) {
        throw new Error(`${errorMessages.files.icons.missingIcon}${props.iconImage.icon}`);
      }
    });

    const iconClick = (): void => {
      return emits('iconClick', props.iconImage.id);
    };

    const displayTooltip = (show: boolean): void  => {
      showToolTip.value = show && props.iconImage.tooltip !== '';
    };
</script>