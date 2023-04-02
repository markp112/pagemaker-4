<template>
  <span class="flex flex-row mt-4">
    <label for="">Items: </label>
    <span>
      {{ getListItemsFormatted }}
    </span>
    <fieldset class="flex flex-row">
      <label for="item" class="ml-16 w-24">New Item:</label>
        <input type="text"
          class="w-12" 
          id="item"
          name="item"
          placeholder="item"
          v-model="selectListItem"
        />  
        <BaseButton button-type="primary"
        variant="solid"
        class="w-12 ml-4"
        @on-click="addItem()"
        >Add</BaseButton>
    </fieldset>
  </span>
</template>

<script lang="ts" setup>

import { computed, ref } from '@vue/reactivity';
import BaseButton from '@/components/base/baseButton/baseButton.vue';

  const props = defineProps<{listItems: string[]}>();
  const emit = defineEmits(['onAdd'])
  const selectListItem = ref('');

  const addItem = () => {
    emit('onAdd', selectListItem.value);
  };

  const getListItemsFormatted = computed(() => {
    return props.listItems ? props.listItems.join(',') : '';
  });
</script>