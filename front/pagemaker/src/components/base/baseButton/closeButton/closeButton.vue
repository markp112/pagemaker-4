<template>
  <BaseButton
    buttonShape="rectangular"
    variant="outline"
    size="small"
    buttonType="secondary"
    @onClick="closeClicked()"
    ref="BaseButton"
  >
    X
  </BaseButton>
</template>

<script lang="ts" setup>
import BaseButton from '../baseButton.vue';
  
  const emits = defineEmits(['onClick']);

  const closeClicked = () => {
    emits('onClick');
  }
</script>
