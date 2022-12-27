<template>
  <BaseButton buttonType="primary"
    size="medium"
    variant="solid"
    @onClick="saveClicked()"
    >
    save
  </BaseButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseButton from '../baseButton.vue';

export default defineComponent({
  name: 'SaveButton',
  
  emits:['onClick'],

  components: {
    BaseButton,
  },

  methods: {

    saveClicked() {
      this.$emit('onClick');
    }
  }
})
</script>