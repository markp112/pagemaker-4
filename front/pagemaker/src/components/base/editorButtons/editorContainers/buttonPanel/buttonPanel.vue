<template>
  <div class="flex flex-row justify-center flex-wrap gap-2 bg-gray-300 p-2 shadow-md mb-2">
    <component v-for="(commandButton, index) in buttonData"
      track-by="$index"
      :is="components[commandButton.buttonType]"
      :key="index"
      :index="index"
      :button-data = "commandButton"
      :active-command-name="activeCommandButton"
      @onClick="handleButtonClick($event)"
    />
  </div>
</template>

<script lang="ts" setup>
import type { CommandProperties } from '@/classes/command/model/command';
import { computed, ref, type Component } from 'vue';
import type { EditorButtonBase } from '../../model';
import TextInputButton from '../../components/textInputButton/textInput.vue';
import IconImageButton from '../../components/iconImageButton/iconImageButton.vue';
import type { EditorButtonTypes } from '../../model';

type ComponentKey = { [buttonType in EditorButtonTypes]: Component }

const components: ComponentKey = {
  'textInputButton': TextInputButton,
  'iconImageButton': IconImageButton,
  'iconList': () => IconImageButton,
  'uploadButton': () => IconImageButton,
  'list': () => IconImageButton,
  'numericWithSelect': () => IconImageButton,
  'plusMinus': () => IconImageButton
};

const component = computed((buttonType: EditorButtonTypes) => components[buttonType])

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