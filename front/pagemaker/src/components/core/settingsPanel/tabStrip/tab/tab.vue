<template>
  <div class="tabs">
    <div class="tab">
      <input type="radio" 
        :name="`tab-${tab.id}`" 
        :id="`tab.id`"
        class="tab-switch" 
        />
      <label for="`tab-${index}`"
        class="tab-label"
        :class="{ activeTab: tab.id === activeTab }"
        @click="setActiveTab(tab.id)"
      >{{ tab.displayName }}</label>
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    tab: {
      id: string,
      displayName: string,
    },
    activeTab: string,
  }>();

  const emit = defineEmits(['onClick']);

  const setActiveTab = (id: string)  => {
    emit('onClick', id)
  };
</script>
<style lang="css" scoped>
.tabs {
  @apply relative;
  @apply m-1;
  @apply bg-site-surface;
  @apply w-full; 
  @apply flex flex-row justify-start;
}
.tabs::before,
.tabs::after {
  content: "";
}
.tabs::after {
  clear: both;
}
.tab {
  @apply w-auto min-w-[4rem];
}
.tab-switch {
  display: none;
}
.tab-label {
  @apply relative; 
  @apply leading-10;
  @apply w-auto h-12 p-2;  
  @apply border-r-2 border-r-site-primary-dark;
  @apply bg-gray-400;
  @apply cursor-pointer;
  @apply top-0;
  @apply text-on-surface;
  @apply text-center;
  @apply overflow-hidden;
  transition: all 0.25s;
}
.tab-label:hover {
  top: -0.30rem;
  transition: top 0.25s;
}
.tab-content {
  @apply w-full;
  @apply flex;
  @apply flex-col;
  @apply mt-4;
  z-index: 1;
  left: 0;
  padding: 1rem;
  opacity: 0;
  transition: all 0.35s;
}
.tab-switch:checked + .tab-label {
  @apply bg-site-primary-dark;
  @apply text-site-surface;
  border-bottom: 0;
  border-right: 0.125rem solid #fff;
  transition: all 0.35s;
  z-index: 1;
  top: -0.0625rem;
}
.activeTab {
  @apply bg-site-primary-dark;
  @apply text-site-surface;
  border-bottom: 0;
  border-right: 0.125rem solid #fff;
  transition: all 0.35s;
  z-index: 1;
  top: -0.0625rem;
  @apply shadow-lg;
}
.tab-switch:checked + label + .tab-content {
  z-index: 2;
  opacity: 1;
  transition: all 0.35s;
}
</style>