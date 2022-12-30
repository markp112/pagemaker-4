<template>
  <div class="flex justify-center content-center mt-32 p-4">
    <p class="standard-border shadow-lg w-4/12 h-auto rounded-md p-8">
      <span class="text-site-primary text-justify text-xl">
        To get started with creating your first site click on get started.
        <ul class="list-disc p-2 ml-8">
          <li class="py-2">You will be able to name your site</li>
          <li class="py-2">Select an image to represent your site</li>
          <li class="py-2">Design a colour theme and choose how that is
        applied to standard elements</li>
        </ul>
      </span>
      <BaseButton button-type="primary" 
        button-shape="rectangular" 
        size="large"
        class="h-20 bg-site-primary text-site-surface text-2xl w-2/5 mx-auto mt-16"
        @on-click="getStartedClick()"
      >
        Get Started
      </BaseButton>
    </p>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseButton from '@/components/base/baseButton/baseButton.vue';

export default defineComponent({
  name: 'firstSite',

  emits: ['createNew'],

  components: {
    BaseButton,
  },

  methods: {
    getStartedClick() {
      this.$emit('createNew');
    }
  }

})
</script>