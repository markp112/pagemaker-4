<template>
  <div class="flex flex-row justify-center items-center relative cursor-pointer"
    :class="getIsActive"
  >
    <input type="file"
      id="file"
      accept="image/png, image/jpg"
      @change="handleClick($event)"
    >
    <label for="file">
      <img :src="getPath(buttonData.displayIcon)"
        @mouseover="showToolTip=!showToolTip"
        @mouseleave="showToolTip=!showToolTip"
        class="icon-img hover:bg-gray-600"
      />
    </label>
    <Tooltip :tooltip="buttonData.tooltip" :showToolTip="showToolTip" class="left-48"/>
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
}>();

let showToolTip = ref(false);
let inputValue = ref('');

const getIsActive = () => {
  return props.buttonData.commandName === props.activeCommandName ? 'border border-solid border-white' : '';
};

const handleClick = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if(files) {
    emit('onButtonClick', props.buttonData, files[0]);
  }
};

const getPath = (url: string) => {
  return getImageUrl(url);
};
</script>

<style lang="css" scoped>
[type="file"] {
  height: 0;
  overflow: hidden;
  width: 0;
}

[type="file"] + label {
  width: 32px;
  height: auto;
  border: none;
  cursor: pointer;
  display: inline-block;
  outline: none;
  position: relative;
  transition: all 0.3s;
  vertical-align: middle;
}
</style>