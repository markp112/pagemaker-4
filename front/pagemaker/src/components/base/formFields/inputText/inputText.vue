<template>
  <InputBase 
    input-type="text"
    :value="value"
    :place-holder="placeHolder"
    :disabled="disabled"
    :name="name"
    :validationProperties="validationProperties"
    @on-field-change="onFieldChange($event)"
    @validate-field="validateField($event)"
  />
</template>

<script lang="ts" setup>
  import { } from 'vue';
  import InputBase from '../inputBase/inputBase.vue';
import { ValidationProperties } from './model';

defineProps<{
    value: string,
    placeHolder: string,
    name: string,
    disabled: boolean,
    validationProperties?: ValidationProperties
  }>();

  const emits = defineEmits(['onFieldChange', 'validateField']);
  
  const onFieldChange = (value: string) => {
    emits('onFieldChange', value);
  };

  const validateField = (value: string) => {
    emits('validateField', value)
  };
</script>