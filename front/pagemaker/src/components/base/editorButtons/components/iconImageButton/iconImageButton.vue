<template>
  <div class="flex flex-row justify-center items-center relative cursor-pointer hover:bg-gray-600"
    :class="getIsActive()"
    >
    <img :src="getPath(buttonData.displayIcon)"
      @mouseover="showToolTip=!showToolTip"
      @mouseleave="showToolTip=!showToolTip"
      class="icon-img"
      @click="handleClick()"
    />
    <slot></slot>
    <Tooltip :tooltip="buttonData.tooltip" :showToolTip="showToolTip" class="left-8"/>
  </div>
</template>
<script lang="ts" setup>
import Tooltip from '@/components/utility/notifications/tooltip/toolTip.vue';
import { getImageUrl } from '@/common/getIcon';
import type { EditorButtonBase } from '../../model';
import { ref } from '@vue/reactivity';


  const props = defineProps<{
    buttonData: EditorButtonBase,
    activeCommandName: string 
  }>();

  const emits = defineEmits(['onClick']);
  let showToolTip = ref(false);


    const getIsActive = () => {
      return props.buttonData.commandName === props.activeCommandName ? 'border border-solid border-white' : '';
    };

    const getPath = (image: string): string => {
      return getImageUrl(image);
    };

    const handleClick = () => {
      emits('onClick', props.buttonData);
    };


</script>

<style lang="css" scoped>
.icon-img {
  width: 32px;
  height: auto;
  background-position: center;
};

.active-command {
  background-color: aqua;
  border-style: dotted;
  border: 1px blanchedalmond;
}

</style>