<template>
  <div class="flex flex-row justify-start">
    <SelectButtonWithIcon v-for="(button, index) in buttonsData"
        :key="index"
        :button-data="button" 
        @on-click="handleButtonClick($event)"
        @on-clear="handleClear($event)"
      />
      <PlusMinusButton :button-data="lineThicknessButton" @on-click="handleButtonClick($event)"/>
  </div>
</template>

<script lang="ts">
import type { CommandProperties } from '@/classes/command/model/command';
import { defineComponent } from 'vue';
import { borderButtonDataMock, lineStyleButtonMock, lineThicknessButton } from '../../components/selectButtonWithIcon/borderButtonData';
import selectButtonWithIcon from '../../components/selectButtonWithIcon/selectButtonWithIcon.vue';
import plusMinusButton from '../../components/selectButtonWithIcon/plusMinusbutton/plusMinusButton.vue';
  
export default defineComponent({
    name: 'bordersContainer',

    emits: ['onButtonClick', 'onClearCommand'],

    data() {
      return {
        buttonsData: [borderButtonDataMock, lineStyleButtonMock],
        lineThicknessButton: lineThicknessButton,
      }
    },

    components: {
      SelectButtonWithIcon: selectButtonWithIcon,
      PlusMinusButton: plusMinusButton, 
    },

    methods: {
      handleButtonClick(payload: CommandProperties) {
        this.$emit('onButtonClick', payload);
      },

      handleClear(payload: CommandProperties) {
        this.$emit('onClearCommand', payload);
      }

    }
  })

</script>