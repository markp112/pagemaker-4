<template>
  <div class="flex flex-row justify-start">
    <SelectButtonWithIcon v-for="button in buttonsData"
        :button-data="button" 
        @on-click="handleButtonClick($event)"
      />
  </div>
</template>

<script lang="ts">
import type { CommandProperties } from '@/classes/command/model/command';
import { defineComponent } from 'vue';
import { borderButtonDataMock, lineStyleButtonMock } from '../../components/selectButtonWithIcon/borderButtonData';
import selectButtonWithIcon from '../../components/selectButtonWithIcon/selectButtonWithIcon.vue';
  
export default defineComponent({
    name: 'bordersContainer',

    emits: ['onButtonClick'],

    data() {
      return {
        buttonsData: [borderButtonDataMock, lineStyleButtonMock]
      }
    },

    components: {
      SelectButtonWithIcon: selectButtonWithIcon,
    },

    methods: {
      handleButtonClick(payload: CommandProperties) {
        this.$emit('onButtonClick', payload);
      }
    }
  })

</script>