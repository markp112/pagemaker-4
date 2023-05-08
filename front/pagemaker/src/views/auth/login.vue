<template>
  <div class="flex justify-center items-center flex-row mt-32">
    <div class="flex flex-row justify-center w-full h-full">
      <img
          src="@/assets/images/bank-vault.jpg"
          alt="picture of a bank vault"
          class="object-fit"
        />
      <div class="border-2 rounded-md p-4 text-left w-4/12 h-98 flex flex-col justify-center items-center">
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
import { auth } from '@/services/auth/';
import { useNavMenuItemStore } from '@/stores/navMenuItems.store';
import  { defineComponent } from 'vue';
import loginFormVue from './loginForm.vue';
import type { Credentials } from './types';

export default defineComponent({
  name: 'Login-View',

  data() {
    return {
      formErrors: [] as string[],
      store: useNavMenuItemStore(),
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
      this.formErrors = [];
      try {
        const loggedIn = await auth().login(credential);
        if (loggedIn) {
          this.store.fetchMenuItems(loggedIn);
          this.$router.push('/sites');
        } else {
          this.formErrors.push('Login failed !');
        }
      } 
      catch (err) {
        console.log('%c⧭', 'color: #007300', err)
        this.formErrors.push(err as string);
      }
    }
  }
})
</script>
