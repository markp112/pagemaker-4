<template>
  <div class="flex flex-row justify-between align-middle">
    <span class="w-24">
      <base-button
        variant="outline"
        size="small"
        buttonType="secondary"
        @click="cancelClick"
      >Cancel</base-button>
    </span>
    <span class="w-24">
      <base-button
        variant="solid"
        size="small"
        buttonType="primary"
        @click="submitClick()"
      >Submit</base-button>
    </span>
  </div>
</template>

<script lang="ts" setup>
  import BaseButton from '../baseButton.vue';

  const emits = defineEmits(['submitClick', 'cancelClick']);

  const submitClick = () => {
    emits('submitClick');
  };
    
  const cancelClick = () => {
      emits('cancelClick');
  };
</script>
