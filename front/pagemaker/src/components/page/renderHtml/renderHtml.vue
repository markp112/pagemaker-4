<template>
  <div v-html="serverContent"></div>
</template>

<script setup lang="ts">

defineProps<{
    serverContent: string;
  }>();

</script>