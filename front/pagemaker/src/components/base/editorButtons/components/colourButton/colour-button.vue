<template>
  <div  :class="getIsActive()" class="cursor-pointer">
    <span class="text-xs text-center flex flex-col justify-end cursor-pointer h-12 w-12"
      :style="{ backgroundColor: colour,
          color: getFontColour
      }"
      @click="colourClicked(colour)"
    >
      {{ colour.toLocaleUpperCase() }}
    </span>
  </div>
</template>

<script setup lang="ts">

import type { CommandProperties } from '@/classes/command/model/command';
import type { EditorButtonBase, EditorButtonContent } from '@/classes/commandButtons/model';
import { hexToRgb, inverseColour, rgbNumberToString, rgbToHex } from '@/common/colourUtils';
import { computed, ref } from 'vue';

const props = defineProps<{
  buttonData: EditorButtonBase,
  activeCommandName: string,
}>();

const colour = ref((props.buttonData as EditorButtonContent).content as string);

const emits = defineEmits(['onClick']);

const getIsActive = () => {
    return props.buttonData.commandName === props.activeCommandName ? 'border border-solid border-white' : '';
  };

const getFontColour = computed(() => {
  if(!colour) return '#00'
  const rgbColour = hexToRgb(colour.value);
  if(rgbColour) {
    const inverseRGB = inverseColour(rgbColour);
    return rgbToHex(rgbNumberToString(inverseRGB)); 
  }
  return colour.value;
});

const colourClicked = (colour: string) => {
  const commandProperties: CommandProperties = {
      commandName: props.buttonData.commandName,
      commandType: props.buttonData.commandType,
      payload: colour,
    }
  emits('onClick', commandProperties);
}

</script>