<template>
  <div class="w-4/6">
    <p class="text-center text-2xl font-bold">Welcome Back</p>
    <p class=" text-lg font-bold mt-4 mb-4">Login</p>
    <form  class="mt-6 p-4 rounded-xl shadow-xl">
      <label for="email" class="text-sm">E-Mail</label>
      <input
        type="email"
        id="email"
        v-model="email"
        class="input-control"
        placeholder="E-mail address"
        required
      />
      <label for="password" class="text-sm mt-4 block">Password</label>
      <input
        type="password"
        id="password"
        v-model="password"
        class="input-control"
        placeholder="Password"
        required
      />
      <div class="flex justify-between flex-row mt-12">
        <button
          type="button"
          class="bg-gray-600 py-1 px-3 rounded-md text-white"
          @click="cancelClick()"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="bg-blue-600 py-1 px-3 rounded-md text-white"
          @click="submitClick"
        >
          Submit
        </button>
      </div>
      <div class="error" v-if="$props.formErrors.length > 0">
        <p v-for="error in $props.formErrors" :key="error">{{ error }}</p>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import  { defineComponent, type PropType } from 'vue';
import type { Credentials } from './types';

const credential: Credentials = {
  email: '',
  password: '',
};

export default defineComponent({
  name: 'login-form',

  emits: ['submitClicked', 'cancelClicked' ],

  props: {
    formErrors: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },

  data() {
    return (
      credential
    )
  },

  methods: {

    submitClick(e: Event) {
      e.preventDefault();
      if (this.validateForm()) {
        this.$emit('submitClicked', credential)
      }
    },
    
    cancelClick() {
      this.$emit('cancelClicked');
    },
    
    validateForm(): boolean {
      if (this.email !=='' && this.password !=='') return true;
      return false;
    }
  }
})
</script>

<style lang="postcss" scoped>
.input-control {
  @apply block border-2 rounded-md w-full p-1 text-on-surface;
}

.error {
  @apply bg-red-600 text-white w-full mt-2 rounded-md p-2 text-sm;
}
</style>
