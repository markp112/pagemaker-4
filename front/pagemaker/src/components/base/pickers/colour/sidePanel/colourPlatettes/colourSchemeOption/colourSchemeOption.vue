<template>
  <span class="w-6/12 flex flex-row justify-start align-middle h-8">
    <label :for="label" class="w-auto mr-2 min-w-[7rem]">{{ label }}</label>
    <InputRadio
      class="mt-1"
      :id="label"
      name="colour-scheme"
      :value="value"
      :checked="isChecked"
      :disabled="false"
      @change="changeScheme"/>
  </span>
</template>

<script setup lang="ts">
import InputRadio from '@/components/base/formFields/inputRadio/inputRadio.vue';
  defineProps<{
    label: string,
    value: string,
    isChecked: boolean,
  }>();

  const emits = defineEmits(['change']);

  const changeScheme = (scheme: string) => {
    emits('change', scheme);
  };
</script>