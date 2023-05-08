<template>
  <div class="flex flex-row justify-start  bg-gray-300 shadow-md mb-2">
    <keep-alive>
      <component v-for="(commandButton, index) in buttonData" 
        track-by="$index"
        :is="commandButtons[commandButton.buttonType]"
        class="p-2"
        :key="index"
        :index="index"
        :button-data = "commandButton"
        :active-command-name="activeCommandButton"
        @onClick="handleButtonClick($event)"
      />
    </keep-alive>
  </div>
</template>

<script lang="ts" setup>
import type { CommandProperties } from '@/classes/command/model/command';
import { ref, type Component } from 'vue';
import TextInputButton from '../../components/textInputButton/textInput.vue';
import IconImageButton from '../../components/iconImageButton/iconImageButton.vue';
import plusMinusButton from '../../components/plusMinusbutton/plusMinusButton.vue';
import numericButtonwithSelectlist from '../../components/numericButton/numericButtonwithSelectlist.vue';
import selectButtonWithIcon from '../../components/selectButtonWithIcon/selectButtonWithIcon.vue';
import UploadButton from '../../components/uploadButton/uploadButton.vue';
import ImageGallery from '@/components/base/pickers/imageGallery/imageGallery.vue';
import type { CommandButtonTypes, EditorButtonTypes } from '@/classes/commandButtons/model';
import ColourButton from '../../components/colourButton/colour-button.vue';
import ColourBackForeBorder from '@/components/colourBackForeBorder/colourBackForeBorder.vue';
import editorFontPicker from '../../components/editorFontPicker/editorFontPicker.vue';

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
  'colourButton': ColourButton,
  'colourApplyTo': ColourBackForeBorder,
  'setFont': editorFontPicker,
};

  defineProps<{
    buttonData: CommandButtonTypes[],
  }>();
  
  const emit = defineEmits(['onButtonClick']);

  let activeCommandButton = ref('');
  
  const handleButtonClick = (payload: CommandProperties) => {
    if (payload.commandName === 'set-colour') {
      setActiveButton(payload.payload as string);
    } else {
      setActiveButton(payload.commandName);
    }
    emit('onButtonClick', payload);
  };

  const setActiveButton = (buttonName: string) => {
    activeCommandButton.value = buttonName;
  };

</script>