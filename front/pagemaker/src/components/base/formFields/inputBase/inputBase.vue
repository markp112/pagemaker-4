<template>
  <input
    :type="inputType"
    id="input-field"
    :value="getLocalValue"
    @input="updateLocalValue($event)"
    :placeholder="placeHolder"
    class="border disabled:bg-gray-200 disabled:border-gray-400 relative"
    :name="name"
    :disabled="disabled"
    @change="onFieldChange($event)"
    @blur="checkIsValid()"
  />
  <p v-if="isValid === 'invalid'"
    class="bg-red-300 leading-6 ml-44 p-2 rounded-md w-9/12 absolute"
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
    }
  },

  computed: {
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
