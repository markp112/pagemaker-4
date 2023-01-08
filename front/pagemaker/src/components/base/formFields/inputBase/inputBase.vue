<template>
  <div class="field-wrapper">
    <label for="input-field">{{ label }}</label>
    <input
      :type="inputType"
      id="input-field"
      v-model="inputValue"
      :placeholder="placeHolder"
      class="inputField"
      :class="getClasses"
      @change="onFieldChange()"
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
    }
  },

  emits: ['onFieldChange', 'validateField'],

  data() {
    return {
      inputValue: this.value,
      isValid: 'valid' as ValidateStates,
      failedValidationMessage: '',
      fieldWidthMap: {
        'text': 'w-9/12',
        'number': 'w-2/12'
      } as Record<string, string>,
    }
  },

  computed: {
    getClasses() {
      const fieldWidth = this.fieldWidthMap[this.inputType];
      return `${this.isValid} ${fieldWidth}`;
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
    onFieldChange() {
      this.$emit('onFieldChange', this.inputValue)
    },

    checkIsValid() {
      this.$emit('validateField', this.inputValue);
    },
  }

})
</script>

<style lang="css">
  .inputField {
    @apply bg-site-surface p-2 leading-4 border;
    @apply text-site-primary-dark;
  }

  .field-wrapper {
    @apply flex flex-row justify-start mb-2 ml-1;
  }

  .invalid {
    @apply border-site-warning border-dashed;
  }
  .valid {
    @apply border-solid border-site-primary;
  }
</style>
