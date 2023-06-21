<template>
  <div class="flex flex-row justify-between align-middle">
    <span class="w-24">
      <base-button
        variant="outline"
        size="small"
        buttonType="secondary"
        @click="cancelClick"
      >Cancel</base-button>
    </span>
    <span class="w-24">
      <base-button
        variant="solid"
        size="small"
        buttonType="primary"
        @click="submitClick()"
      >Submit</base-button>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseButton from '../baseButton.vue';

export default defineComponent({

  name: "SubmitCancel",

  emits: ['submitClick', 'cancelClick'],

  components: {
    'base-button': BaseButton,
  },

  methods: {

    submitClick() {
      this.$emit('submitClick');
    },
    
    cancelClick() {
      this.$emit('cancelClick');
    },
  },
}
</script>
