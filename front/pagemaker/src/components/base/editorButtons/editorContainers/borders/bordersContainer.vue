<template>
  <div class="flex flex-row justify-start flex-wrap gap-2 bg-gray-300 p-2 shadow-md mb-2">
    <Units @onChange="handleButtonClick($event)"></Units>
  </div>
  <div class="flex flex-row justify-start flex-wrap gap-2 bg-gray-300 p-2 shadow-md">
  <SelectButtonWithIcon v-for="(button, index) in buttonsData"
      :key="index"
      :button-data="button" 
      class="mr-2 "
      @on-click="handleButtonClick($event)"
      @on-clear="handleClear($event)"
    />
    <PlusMinusButton :button-data="lineThicknessButton" @on-click="handleButtonClick($event)"/>
    <NumericButton :button-data="borderRadius" @on-click="handleButtonClick($event)"></NumericButton>
    </div>
</template>

<script lang="ts">
import type { CommandProperties } from '@/classes/command/model/command';
import { defineComponent } from 'vue';
import { borderButtonDataMock, borderRadius, lineStyleButtonMock, lineThicknessButton } from '../../model/borderButtonData';
import selectButtonWithIcon from '../../components/selectButtonWithIcon/selectButtonWithIcon.vue';
import plusMinusButton from '../../components/plusMinusbutton/plusMinusButton.vue';
import numericButtonwithSelectlist from '../../components/numericButton/numericButtonwithSelectlist.vue';
import Units from '../../unitsDropDown/units.vue';

export default defineComponent({
    name: 'bordersContainer',

    emits: ['onButtonClick', 'onClearCommand'],

    data() {
      return {
        buttonsData: [borderButtonDataMock, lineStyleButtonMock],
        lineThicknessButton: lineThicknessButton,
        borderRadius: borderRadius,
        selectedRadiusUnit: '',
      }
    },
    
    components: {
    SelectButtonWithIcon: selectButtonWithIcon,
    PlusMinusButton: plusMinusButton,
    NumericButton: numericButtonwithSelectlist,
    Units
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