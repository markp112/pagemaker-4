<template>
    <span class="px-1 pt-1">Apply colour to:</span>
    <fieldset class="flex flex-row justify-between flex-nowrap">
      <InputRadio label="back" 
        name="colourSelect" 
        value="background-color" 
        :checked="selection"
        :is-validated="{isValid:true, message: ''}"
        @on-field-change="onSelectionChange($event)"/>
      <InputRadio label="fore" name="colourSelect" value="color" @on-field-change="onSelectionChange('color')"  :is-validated="{isValid:true, message: ''}"/>
      <InputRadio label="border"
        name="colourSelect"
        value="border-color"
        :is-validated="{isValid:true, message: ''}"
        @on-field-change="onSelectionChange('border-color')"
      />
    </fieldset>
</template>

<script lang="ts">
import type { CommandProperties } from '@/classes/command/model/command';
import { defineComponent } from 'vue';
import InputRadio from '../base/formFields/inputRadio/inputRadio.vue';

export default defineComponent({
  name: 'ColourForeBackBorder',

  emits: ['onClick'],

  data() {
    return {
      selection: 'color',
    }
  },
  components: {
    InputRadio
  },

  methods: {
    onSelectionChange(value: string) {
      const payload: CommandProperties = {
        commandName: 'set-colour-applies-to',
        commandType: 'direct',
        payload: value,
      }
      this.$emit('onClick', payload);
    }
  }
})
</script>