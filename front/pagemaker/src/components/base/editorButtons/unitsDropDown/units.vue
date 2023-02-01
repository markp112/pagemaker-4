
<template>
  <Dropdown :item-list="units"
    :selected-item="selectedUnit"
    label="Units"
    class="w-32"
    @on-select-change="onChange($event)"
  ></Dropdown>
</template>

<script lang="ts">
import type { CommandProperties } from '@/classes/command/model/command';
import  { defineComponent } from 'vue';
import DropDown from '../../pickers/dropDown/dropDown.vue';

export default defineComponent({
  name: 'units',

  emits: ['onChange'],

  components: {
    Dropdown: DropDown
  },

  data() {
    return { 
      units:['px', '%', 'em'] as string[],
      selectedUnit: 'px',
    }
  },

  methods: {
    onChange(unit: string) {
      const command: CommandProperties = {
        commandName: 'set-units',
        payload: unit
      };
      this.$emit('onChange', command);
      this.selectedUnit = unit;
    }
  }
})
</script>