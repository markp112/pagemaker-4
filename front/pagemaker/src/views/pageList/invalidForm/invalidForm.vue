<template>
  <div class="error" v-if="hasErrors()">
    <p v-for="error in formErrors" :key="error.valueOf">{{ error.toString() }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  name: 'invalidForm',

  props: { 
    formErrors: {
      type: [] as PropType<String[]>,
      default: [],
    }
  },

  methods: {
    hasErrors(): boolean {
      return this.formErrors.length > 0 ? true : false;
    },
  },
})
</script>

<style lang="css" >
.input-control {
  @apply block border-2 rounded-md w-full p-1;
}

.error {
  @apply bg-red-600 text-white w-full mt-2 rounded-md p-2 text-sm;
}
</style>
