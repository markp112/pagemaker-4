<template>
  <div class="flex justify-center items-center flex-row h-auto mt-32 mx-4 ">
    <div class="flex flex-row justify-center w-full h-full">
      <img
          src="@/assets/images/bank-vault.jpg"
          alt="picture of a bank vault"
          class="object-fit"
        />
      <div class="border-2 rounded-md p-5 text-left w-2/6 h-100 flex flex-col justify-start">
        <Login-Form
          :form-errors="formErrors"
          @cancel-clicked="cancelClicked"
          @submit-clicked="submitClicked"
        />
      </div>
    </div>
  </div>  
</template>

<script lang="ts">
import { auth } from '@/services/auth';
import  { defineComponent } from 'vue';
import loginFormVue from './loginForm.vue';
import type { Credentials } from './types';

export default defineComponent({
  name: 'Login-View',

  data() {
    return {
      formErrors: [] as string[],

    }
  },

  components: {
    'Login-Form': loginFormVue,
  },

  methods: {
    cancelClicked() {
      this.$router.push('/');
    },

    async submitClicked(credential: Credentials) {
      await auth().login(credential);
    }
  }
})
</script>
