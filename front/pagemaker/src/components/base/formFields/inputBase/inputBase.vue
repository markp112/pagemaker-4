<template>
  <div class="relative h-8 bg-transparent">
    <input
      :type="inputType"
      id="input-field"
      :value="getLocalValue"
      @input="updateLocalValue($event)"
      :placeholder="placeHolder"
      class="border disabled:bg-gray-200 disabled:border-gray-400 rounded-sm w-auto"
      :name="name"
      :disabled="disabled"
      @change="onFieldChange($event)"
      @blur="validateinput()"
    />
    <p v-show="isValid === 'invalid'"
      class="bg-red-300 leading-6 text-red-800 p-2 rounded-md w-auto z-10 absolute mt-2"
    >
      {{ failedValidationMessage }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import type { ValidateStates, ValidationProperties } from '../inputText/model';

  const props = defineProps<{
    inputType: string,
    value: string,
    placeHolder: string,
    name: string,
    disabled: boolean,
    validationProperties?: ValidationProperties
  }>();

    const emits = defineEmits(['onFieldChange', 'validateField']);
    const inputValue = ref(props.value);
    const isValid = ref<ValidateStates>('valid');
    const failedValidationMessage = ref('');
    const getLocalValue = computed(() => inputValue.value === '' ? props.value : inputValue.value);

    const onFieldChange = (event: Event) => {
      const value = inputValue.value;
      if (props.validationProperties) {
        validateinput();
      }
      emits('onFieldChange', value);
    };

    const updateLocalValue = (event: Event) => {
      inputValue.value = (event.target as HTMLInputElement).value;
    };

    const validateinput = () => {
      isValid.value = 'valid';
      const value = inputValue.value;
      const validationState = {
        isEmpty: true,
        isRequiredLength: false,
        isRequiredType: false
      }
      if (props.validationProperties) {
        validationState.isEmpty = isEmptyField(value);
        validationState.isRequiredLength = isRequiredLength(value);
        validationState.isRequiredType = isRequiredType(value);
      }
      if (validationState.isEmpty) {
        isValid.value = 'invalid';
      }
    };

    const isEmptyField = (value: string) => {
      if (value === '') {
        failedValidationMessage.value = `Field ${props.name} is required`;
        return true;
      }
      return false;
    };

    const isRequiredLength = (value: string) => {
      const { inputType, name, validationProperties } = props;
      if (inputType === 'string') {
        const { minLength, maxLength } = validationProperties || {};
        if (minLength && value.length < minLength) {
          failedValidationMessage.value = `Field ${name} must be at least ${minLength} characters`;
          return false;
        }
        if (maxLength && value.length > maxLength) {
          failedValidationMessage.value = `Field ${name} must be less than ${maxLength} characters`;
          return false;
        }
      }
      return true;
    };

    const isRequiredType = (value: string) => {
      const { inputType, name } = props;
      if (inputType === 'number') {
        try {
          parseInt(value);
        } catch (err) {
          failedValidationMessage.value = `Field ${name} must be a number`;
          return false;
        }
      }
      return true;
    }

</script>

<style lang="css" scoped>
  input[type="text"] {
    @apply h-8;
  }

  input[type="number"] {
    @apply bg-site-surface;
    @apply text-site-primary-dark;
    @apply h-8;
    @apply text-right;
  }

  .invalid {
    @apply border-site-warning border-dashed;
  }
  .valid {
    @apply border-solid border-site-primary;
  }

</style>
