<template>
  <div class="flex flex-row justify-center flex-wrap gap-2 bg-gray-300 p-2 shadow-md mb-2">
    <IconImageButton v-for="(button, index) in alignmentDirection"
      :key="index"
      :button-data="button"
      class="mr-2"
      @on-click="handleButtonClick($event, 'direction')"
      :activeCommandName="activeDirectionButton"
    />
  </div>
  <div class="flex flex-row justify-start flex-wrap gap-2 bg-gray-300 p-2 shadow-md mb-2">
    <IconImageButton v-for="(button, index) in horizontalAlignment"
      :key="index"
      :button-data="button"
      class="mr-2"
      @on-click="handleButtonClick($event, 'justification')"
      :active-command-name="activeJustifyButton"
    />
  </div>
  <div class="flex flex-row justify-start flex-wrap gap-2 bg-gray-300 p-2 shadow-md mb-2">
    <IconImageButton v-for="(button, index) in verticalAlignment"
      :key="index"
      :button-data="button"
      class="mr-2"
      @on-click="handleButtonClick($event, 'itemsAlignment')"
      :active-command-name="activeJustifyButton"
    />
  </div>
</template>

<script lang="ts">
import type { CommandProperties } from '@/classes/command/model/command';
import  { defineComponent } from 'vue';
import iconImageButton from '../../components/iconImageButton/iconImageButton.vue';
import type { EditorButtonBase } from '../../model';
import { justifyCenter, justifyEnd, justifyStart,justifyBetween, justifyEvenly, justifyAround, flexColumn, flexRow, itemsStart, itemsCenter, itemsEnd } from '../../model/borderButtonData';

type ActiveButtonGroups = 'direction' | 'justification' | 'itemsAlignment';

export default defineComponent({
  name: 'layoutsContainer',

  emits: ['onButtonClick'],

  components: {
    IconImageButton: iconImageButton,
  },

  data() {
    return {
      alignmentDirection: [flexRow, flexColumn],
      horizontalAlignment: [justifyStart, justifyCenter, justifyEnd, justifyBetween, justifyEvenly, justifyAround],
      verticalAlignment: [itemsStart, itemsCenter, itemsEnd],
      activeDirectionButton: '',
      activeJustifyButton: '',
      activeItemsAlignmentButton: '',
    }
  },

  methods: {
    handleButtonClick(buttonData: EditorButtonBase, group: ActiveButtonGroups ) {
      const payload: CommandProperties =  {
        commandName: buttonData.commandName,
        commandType: buttonData.commandType,
        payload: buttonData.commandName,
      };
      this.setActiveButton(buttonData.commandName, group);
      this.$emit('onButtonClick', payload);
    },

    setActiveButton(buttonName: string, group: ActiveButtonGroups) {
      type groupKey = { [commandName in ActiveButtonGroups]: (buttonName: string) => void }
      const groupMap: groupKey = {
        'direction': (buttonName: string) => this.activeDirectionButton = buttonName,
        'justification': (buttonName: string) => this.activeJustifyButton = buttonName,
        'itemsAlignment': (buttonName: string) => this.activeItemsAlignmentButton = buttonName,
      };
      groupMap[group](buttonName);
    }
  }
})
</script>