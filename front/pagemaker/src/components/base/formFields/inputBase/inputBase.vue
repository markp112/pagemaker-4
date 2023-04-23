<template>
  <div class="grid grid-cols-5 relative">
    <label for="input-field" class="w-auto p-2 col-span-2">{{ label }}:</label>
    <input
      :type="inputType"
      id="input-field"
      :value="getLocalValue"
      @input="updateLocalValue($event)"
      :placeholder="placeHolder"
      class="border disabled:bg-gray-200 disabled:border-gray-400 col-span-3"
      :name="name"
      :disabled="disabled"
      :class="getClasses"
      @change="onFieldChange($event)"
      @blur="checkIsValid()"
    />
  </div>
  <p v-if="isValid === 'invalid'"
    class="bg-red-300 leading-6 ml-44 p-2 rounded-md w-9/12"
  >
    {{ isValidated?.message }}
  </p>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { ValidField } from '../inputText/model';

type ValidateStates = 'valid' | 'invalid';

export default defineComponent({
  name: 'base-input-field',

  props: {
    inputType: {
      type: String, 
      default: 'text',
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: ''
    },
    placeHolder: {
      type: String,
      default: '', 
    },
    required: {
      type: Boolean,
      default: false,
    },
    isValidated: {
      type:  Object as PropType<ValidField>,
      default: undefined,
    },
    name: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },

  emits: ['onFieldChange', 'validateField'],

  data() {
    return {
      inputValue: this.$props.value,
      isValid: 'valid' as ValidateStates,
      failedValidationMessage: '',
      fieldWidthMap: {
        'text': 'w-full',
        'number': 'w-2/12',
        'radio': 'w-32'
      } as Record<string, string>,
    }
  },

  computed: {
    getClasses() {
      const fieldWidth = this.fieldWidthMap[this.inputType];
      return `${this.isValid} ${fieldWidth}`;
    },

    getLocalValue() {
      return this.inputValue === '' ? this.value : this.inputValue;
    }
  },

  watch: {
    isValidated() {
      if(this.isValidated) {
        this.isValid = this.isValidated.isValid ? 'valid' : 'invalid';
        this.failedValidationMessage = this.isValidated.message;
      }
    }
  },

  methods: {
    onFieldChange(event: Event) {
      this.$emit('onFieldChange', (event.target as HTMLInputElement).value)
    },

    updateLocalValue(event: Event) {
      this.inputValue = (event.target as HTMLInputElement).value;
    },

    checkIsValid() {
      this.$emit('validateField', this.inputValue);
    },
  }

})
</script>

<style lang="css" scoped>
  input[type="text"] {
    @apply bg-site-surface;
    @apply text-site-primary-dark;
    @apply h-8;
  }
/* 
  .field-wrapper {
    @apply flex flex-row justify-start mb-2 ml-1;
  } */

  .invalid {
    @apply border-site-warning border-dashed;
  }
  .valid {
    @apply border-solid border-site-primary;
  }

</style>
