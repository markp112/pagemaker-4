
<template>
  <div
    class="w-screen border-box font-body h-screen overflow-hidden"
  >
    <HomeView />
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HomeView from "./views/HomeView.vue";
</script>

