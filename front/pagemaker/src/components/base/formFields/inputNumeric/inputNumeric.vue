<template>
  <InputBase input-type="number"
    :is-validated="isValidated"
    :label="label"
    :value="value.toString()"
    :place-holder="placeHolder"
    @on-field-change="onFieldChange($event)"
    @validate-field="validateField($event)"
  />
</template>

<script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import type { ValidField } from '../inputText/model';
  import inputBaseVue from '../inputBase/inputBase.vue';

  export default defineComponent({
  name: 'base-input-field',

  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: Number,
      default: 0
    },
    placeHolder: {
      type: String,
      default: '', 
    },
    isValidated: {
      type:  Object as PropType<ValidField>,
      default: undefined,
    }
  },
  components: {
    InputBase: inputBaseVue,
  },

  emits: ['onFieldChange', 'validateField'],
  
  methods: {
    onFieldChange(value: number) {
      this.$emit('onFieldChange', value);
    },

    validateField(value: number) {
      this.$emit('validateField', value)
    }
  }
  });


</script>