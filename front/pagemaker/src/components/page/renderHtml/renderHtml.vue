<template>
  <div v-html="pageContent"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useNavMenuItemStore } from '@/stores/navMenuItems.store';
import { usePageStore } from '@/stores/page.store';

const HIDE_MENU_BAR = false;
const pageContent = ref('');
const navStore = useNavMenuItemStore();

onMounted(() => {
  pageContent.value = usePageStore().pageAsHtml;
})

onUnmounted(() => {
  navStore.setIsHideMenubar(HIDE_MENU_BAR);
})

</script>