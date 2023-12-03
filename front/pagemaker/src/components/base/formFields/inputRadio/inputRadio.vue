
<template>
  <InputBase input-type="radio"
    :value="value.toString()"
    :place-holder="placeHolder"
    :name="name"
    :disabled="disabled"
    :validation-properties="validationProperties"
    @on-field-change="onFieldChange($event)"
    @validate-field="validateField($event)"
  />
</template>

<script lang="ts" setup>
import InputBase from '../inputBase/inputBase.vue';
import type { ValidationProperties } from '../inputText/model';

  defineProps<{
    inputType: string,
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

  const validateField = (value: number) => {
    emits('validateField', value)
  };

</script>

<style lang="css">

input[type="radio"] {
  -webkit-appearance: none;
  appearance: none;
  background-color: #dad0d0;
  margin: 0;
  margin-left: 1em;
  margin-bottom: 0.5em;
  font: inherit;
  color: #4a3d94;
  width: 0.8em;
  height: 0.8em;
  border: 0.15em solid #4a3d94;
  border-radius: 50%;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
  }

input[type="radio"]::before {
    content: "";
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 0.4em 1em #4a3d94;
    background-color: aliceblue;
  }

  input[type="radio"]:checked::before {
    transform: scale(1);
  }

  input[type="radio"]:focus {
  outline: max(2px, 0.15em) solid #4a3d94;
  outline-offset: max(2px, 0.15em);
}

</style>