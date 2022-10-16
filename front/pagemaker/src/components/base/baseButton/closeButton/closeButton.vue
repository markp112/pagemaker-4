<template>
  <BaseButton
    buttonShape="circle"
    variant="outline"
    size="small"
    @onClick="closeClicked()"
  >
    X
  </BaseButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseButton from '../baseButton.vue';

export default defineComponent({
  name = 'CloseButton',
  
  emits: ['onClick'],

  components: {
    BaseButton,
  },

  methods: {

    closeClicked() {
      this.$emit('onClick');
    },
  },
}
</script>
