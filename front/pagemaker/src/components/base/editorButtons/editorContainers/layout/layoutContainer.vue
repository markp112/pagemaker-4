<template>
  <ButtonPanel :button-data="alignmentDirection" @on-button-click="handleButtonClick($event)"></ButtonPanel>
  <ButtonPanel :button-data="horizontalAlignment" @on-button-click="handleButtonClick($event)"></ButtonPanel>
  <ButtonPanel :button-data="verticalAlignment" @on-button-click="handleButtonClick($event)"></ButtonPanel>
  <ButtonPanel :button-data="zindex" @on-button-click="handleButtonClick($event)"></ButtonPanel>
</template>

<script lang="ts">
import type { CommandProperties } from '@/classes/command/model/command';
import  { defineComponent } from 'vue';
import iconImageButton from '../../components/iconImageButton/iconImageButton.vue';
import type { EditorButtonBase } from '../../model';
import { justifyCenter, justifyEnd, justifyStart,justifyBetween, justifyEvenly, justifyAround, flexColumn, flexRow, itemsStart, itemsCenter, itemsEnd, bringToFront, sendToBack } from '../../model/borderButtonData';
import buttonPanel from '../buttonPanel/buttonPanel.vue';

export default defineComponent({
  name: 'layoutsContainer',

  emits: ['onButtonClick'],

  components: {
    IconImageButton: iconImageButton,
    ButtonPanel: buttonPanel,
  },

  data() {
    return {
      alignmentDirection: [flexRow, flexColumn],
      horizontalAlignment: [justifyStart, justifyCenter, justifyEnd, justifyBetween, justifyEvenly, justifyAround],
      verticalAlignment: [itemsStart, itemsCenter, itemsEnd],
      zindex:[bringToFront, sendToBack],
      activeDirectionButton: '',
      activeJustifyButton: '',
      activeItemsAlignmentButton: '',
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