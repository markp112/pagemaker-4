<template>
  <ButtonPanel :button-data="alignmentDirection"
    @on-button-click="handleButtonClick($event)"
  />
  <ButtonPanel :button-data="horizontalAlignment"
    @on-button-click="handleButtonClick($event)"
  />
  <ButtonPanel :button-data="verticalAlignment"
    @on-button-click="handleButtonClick($event)"
  />
  <ButtonPanel :button-data="zindex"
    @on-button-click="handleButtonClick($event)"
  />
  <UploadButton :button-data="uploadImage" active-command-name="me"/>
  <TextInputButton :button-data="pasteImageUrl" active-command-name="test" placeholder="paste url"></TextInputButton>
</template>

<script lang="ts">
import type { CommandProperties } from '@/classes/command/model/command';
import  { defineComponent } from 'vue';
import type { EditorButtonBase } from '../../model';
import { justifyCenter, justifyEnd, justifyStart, justifyBetween, justifyEvenly, justifyAround, flexColumn, flexRow, itemsStart, itemsCenter, itemsEnd, bringToFront, sendToBack, uploadImage, pasteImageUrl } from '../../model/borderButtonData';
import buttonPanel from '../buttonPanel/buttonPanel.vue';
import uploadButton from '../../components/uploadButton/uploadButton.vue';
import TextInputButton from '../../components/textInputButton/textInput.vue';

export default defineComponent({
  name: 'layoutsContainer',

  emits: ['onButtonClick'],

  components: {
    ButtonPanel: buttonPanel,
    UploadButton: uploadButton,
    TextInputButton,
  },

  data() {
    return {
      alignmentDirection: [flexRow, flexColumn] as EditorButtonBase[],
      horizontalAlignment: [justifyStart, justifyCenter, justifyEnd, justifyBetween, justifyEvenly, justifyAround] as EditorButtonBase[],
      verticalAlignment: [itemsStart, itemsCenter, itemsEnd] as EditorButtonBase[],
      zindex:[bringToFront, sendToBack] as EditorButtonBase[],
      uploadImage,
      pasteImageUrl,
    }
  },

  methods: {
    handleButtonClick(buttonData: EditorButtonBase) {
      const payload: CommandProperties =  {
        commandName: buttonData.commandName,
        commandType: buttonData.commandType,
        payload: buttonData.commandName,
      };
      this.$emit('onButtonClick', payload);
    },
  }
})
</script>