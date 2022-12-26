<template>
  <div class="flex flex-row justify-start p-0 items-center relative">
    <input
      type="number"
      v-model="inputValue"
      size="2"
      class="w-20 bg-site-surface text-right self-center md:mt-1 md:mb-1"
      @change="onInputChange()"
    />
    <Dropdown
      :itemList="listItems"
      class="absolute"
      :selectedItem="selectedItem"
      @onSelectChange="onItemSelected($event)"
    >
    </Dropdown>
  </div>
</template>

<script lang="ts">

import { defineComponent, type PropType } from 'vue'
import dropDownVue from '../dropDown.vue';

export default defineComponent({
  name: 'numeric-dropdown',
  
  props: {
    listItems: Array as PropType<string[]>,
    label: String,
    selectedItem: String,
  },
  
  emits: ['onChange'],

  components: {
    Dropdown: dropDownVue,
  },
  
  data() {
    return {
      inputValue: 0,
      itemList: this.$props.listItems,
    }
  },

  methods: {
    onItemSelected(item: string) {
      this.inputValue = parseInt(item);
      this.$emit('onChange', item);
    },

    onInputChange() {
      this.$emit('onChange', this.inputValue.toString())
    }
  }
})
</script>

