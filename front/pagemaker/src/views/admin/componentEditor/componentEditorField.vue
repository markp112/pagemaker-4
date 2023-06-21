<template>
  <div class="mb-4">
    <InputText 
    :value="value"
    :label="label"
    @onFieldChange="onFieldChange($event)"
    />
  </div>
 </template>

<script lang="ts" setup>

import InputText from '@/components/base/formFields/inputText/inputText.vue';

  defineProps<{
    value: string | undefined,
    label: string,
  }>();

  const emits = defineEmits(['onFieldChange']);
  
  const onFieldChange = (newValue: string) => {
    emits('onFieldChange', newValue);
  }

</script>