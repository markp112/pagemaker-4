<template>
  <div class="flex flex-row justify-center items-center relative cursor-pointer"
    :class="getIsActive"
  >
  <img :src="getPath(buttonData.displayIcon)"
    @mouseover="showToolTip=!showToolTip"
    @mouseleave="showToolTip=!showToolTip"
    class="icon-img hover:bg-gray-600"
  />
    <input type="text"
      v-model="inputValue"
      :placeholder="placeholder"
      @input="handleClick()"
    >
    <Tooltip :tooltip="buttonData.tooltip" :showToolTip="showToolTip" class="left-12"/>
  </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue';
import type { EditorButtonBase } from '../../model';
import { getImageUrl } from '@/common/getIcon';
import Tooltip from '@/components/utility/notifications/tooltip/toolTip.vue';

  const emit = defineEmits(['onButtonClick']);

  const props = defineProps<{
    buttonData: EditorButtonBase,
    activeCommandName: string,
    placeholder: string,
  }>();

  let showToolTip = ref(false);
  let inputValue = ref('');

  const getIsActive = () => {
    return props.buttonData.commandName === props.activeCommandName ? 'border border-solid border-white' : '';
  };

  const handleClick = () => {
    emit('onButtonClick', props.buttonData, inputValue);
  };

  const getPath = (url: string) => {
    return getImageUrl(url);
  };

</script>

<style lang="css" scoped>
input {
  @apply w-10/12 border-solid border self-end;
  @apply bg-accent-2;
  @apply h-8;
  @apply p-2;
  @apply text-sm;
}
</style>