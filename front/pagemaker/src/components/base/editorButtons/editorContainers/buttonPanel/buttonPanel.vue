<template>
  <div class="flex flex-row justify-center flex-wrap gap-2 bg-gray-300 p-2 shadow-md mb-2">
    <IconImageButton v-for="(commandButton, index) in buttonData"
      :key="index"
      :buttonData="commandButton "
      class="mr-2"
      @on-click="handleButtonClick($event)"
      :activeCommandName="activeCommandButton"
    />
  </div>
</template>

<script lang="ts" setup>
import type { CommandProperties } from '@/classes/command/model/command';
import { ref } from 'vue';
import type { EditorButtonBase } from '../../model';
import IconImageButton  from '../../components/iconImageButton/iconImageButton.vue';

defineProps<{
  buttonData: EditorButtonBase[],
}>();

const emit = defineEmits(['onButtonClick']);

let activeCommandButton = ref('');

const handleButtonClick = (buttonData: EditorButtonBase) => {
  const payload: CommandProperties =  {
    commandName: buttonData.commandName,
    commandType: buttonData.commandType,
    payload: buttonData.commandName,
  };
  setActiveButton(buttonData.commandName);
  emit('onButtonClick', payload);
};

const setActiveButton = (buttonName: string) => {
  activeCommandButton.value = buttonName;
};
</script>