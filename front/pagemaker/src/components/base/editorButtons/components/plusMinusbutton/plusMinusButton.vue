<template>
  <div class="flex flex-row justify-center items-center relative">
    <img :src="getPath(buttonData.displayIcon)"
      @mouseover="showToolTip=!showToolTip"
      @mouseleave="showToolTip=!showToolTip"
      class="text-accent-600"
    />
    <div class="flex flex-col items-center">
      <span class="icon-img plus h-4 w-4 inline-block active:rounded-full"
        @click="handleClick(1)"
      ></span>
      <span class="icon-img minus h-4 inline-block w-4 active:rounded-full"
        @click="handleClick(-1)"
      ></span>
    </div>
    <Tooltip :tooltip="buttonData.tooltip" :showToolTip="showToolTip" class="left-8"/>
  </div>
</template>

<script lang="ts" setup>
import Tooltip from '@/components/utility/notifications/tooltip/toolTip.vue';
import { getImageUrl } from '@/common/getIcon';
import type { CommandProperties } from '@/classes/command/model/command';
import type { EditorButtonBase } from '../../model';
import { ref } from 'vue';

  const props = defineProps<{
    buttonData: EditorButtonBase,
  }>();

  const emit = defineEmits(['onClick']);
  const showToolTip = ref(false);

  const handleClick = (value: number) => {
    const commandProperties: CommandProperties = {
      commandType: props.buttonData.commandType,        
      commandName: props.buttonData.commandName,
      payload: value,
    };
    emit('onClick', commandProperties);
  };
    
  const getPath = (image: string) => getImageUrl(image);
</script>

<style lang="css" scoped>
.icon-img {
  background-size: 16px 16px;
  background-position: center;
}

.plus {
  background-image: url("../../../../../assets/icons/plus-24.png");
  @apply cursor-pointer;
}

.plus:hover {
  background-image: url("../../../../../assets/icons/plus-olive-24.png");
}
.minus {
  background-image: url("../../../../../assets/icons/minus-24.png");
  @apply cursor-pointer;
}

.minus:hover {
  background-image: url("../../../../../assets/icons/minus-olive-24.png");
}
</style>
