
<template>
  <InputBase input-type="radio"
    :is-validated="isValidated"
    :label="label"
    :value="value.toString()"
    :place-holder="placeHolder"
    :name="name"
    @on-field-change="onFieldChange()"
    @validate-field="validateField($event)"
  />
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import inputBaseVue from '../inputBase/inputBase.vue';
import type { ValidField } from '../inputText/model';

export default defineComponent({
  name: 'InputRadio',

  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: 0
    },
    placeHolder: {
      type: String,
      default: '', 
    },
    isValidated: {
      type:  Object as PropType<ValidField>,
      default: undefined,
    },
    name: {
      type: String,
      default: '',
    }
  },

  components: {
    InputBase: inputBaseVue,
  },

  emits: ['onFieldChange', 'validateField'],

  methods: {
      onFieldChange() {
        this.$emit('onFieldChange', this.value);
      },

      validateField(value: number) {
        this.$emit('validateField', value)
      }
    }
})

</script>

<style lang="css" scoped>

input[type="radio"] {
  -webkit-appearance: none;
  appearance: none;
  background-color: #ffeeee;
  margin: 0;
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