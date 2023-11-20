<!-- eslint-disable prettier/prettier -->
<template>
  <div class="bg-gray-100 w-full h-screen flex flex-row justify-center mt-4 pt-5 overflow-auto relative">
    <PageComponent :page="page" 
      :scale="zoomPage"
      v-if="zoomPage !== 0" />
  </div>
</template>

<script lang="ts" setup>
import {  } from 'vue';
import type { Page } from '../page/model/pageElement/pageElement';
import PageComponent from "../page/page.vue";

defineProps<{
  zoomPage: number,
    page: Page
  }>();

</script>
