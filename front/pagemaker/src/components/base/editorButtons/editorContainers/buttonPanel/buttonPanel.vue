<template>
  <div class="flex flex-row justify-start flex-wrap gap-2 bg-gray-300 p-2 shadow-md mb-2">
    <component v-for="(commandButton, index) in buttonData" 
      track-by="$index"
      :is="commandButtons[commandButton.buttonType]"
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
import { ref, type Component } from 'vue';
import type { EditorButtonBase, EditorButtonContent, EditorButtonNumericSelectList } from '../../model';
import TextInputButton from '../../components/textInputButton/textInput.vue';
import IconImageButton from '../../components/iconImageButton/iconImageButton.vue';
import plusMinusButton from '../../components/plusMinusbutton/plusMinusButton.vue';
import numericButtonwithSelectlist from '../../components/numericButton/numericButtonwithSelectlist.vue';
import selectButtonWithIcon from '../../components/selectButtonWithIcon/selectButtonWithIcon.vue';
import UploadButton from '../../components/uploadButton/uploadButton.vue';
import type { EditorButtonTypes } from '../../model';
import ImageGallery from '@/components/base/pickers/imageGallery/imageGallery.vue';

type ComponentKey = { [buttonType in EditorButtonTypes]: Component }

const commandButtons: ComponentKey = {
  'textInputButton': TextInputButton,
  'iconImageButton': IconImageButton,
  'iconList': selectButtonWithIcon,
  'uploadButton': UploadButton,
  'list': () => IconImageButton,
  'numericWithSelect': numericButtonwithSelectlist,
  'plusMinus': plusMinusButton,
  'imageLibrary': () => ImageGallery,
};

  defineProps<{
    buttonData: EditorButtonBase[] | EditorButtonNumericSelectList[],
  }>();
  
  const emit = defineEmits(['onButtonClick']);

  let activeCommandButton = ref('');
  
  const handleButtonClick = (payload: CommandProperties) => {
    setActiveButton(payload.commandName);
    emit('onButtonClick', payload);
  };

  const setActiveButton = (buttonName: string) => {
    activeCommandButton.value = buttonName;
  };

</script>