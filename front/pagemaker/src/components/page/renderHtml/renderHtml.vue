<template>
  <div v-html="serverContent"></div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';
import { useNavMenuItemStore } from '@/stores/navMenuItems.store';

defineProps<{
    serverContent: string;
  }>();

const HIDE_MENU_BAR = false;

const navStore = useNavMenuItemStore();

onUnmounted(() => {
  navStore.setIsHideMenubar(HIDE_MENU_BAR);
})

</script>