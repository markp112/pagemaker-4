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
  @apply w-20;
  @apply rounded-tr-lg;
  @apply bg-slate-300;
  @apply border-r-2 border-r-site-primary-dark;
}
.tab-switch {
  display: none;
}
.tab-label {
  @apply relative; 
  @apply leading-10;
  @apply h-12 p-2 w-20;  
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
  font-weight: 700;
}
.tab-content {
  @apply w-full;
  @apply flex;
  @apply flex-col;
  @apply mt-4;
  
}
.tab-switch:checked + .tab-label {
  @apply bg-site-primary-dark;
  @apply text-site-surface;
  border-bottom: 0;
  transition: all 0.35s;
  z-index: 1;
  @apply rounded-tr-lg;
}
.activeTab {
  @apply bg-site-primary-dark;
  @apply text-site-surface;
  @apply rounded-tr-lg;
  border-bottom: 0;
  transition: all 0.35s;
  z-index: 1;
}
.tab-switch:checked + label + .tab-content {
  z-index: 2;
  opacity: 1;
  transition: all 0.35s;
}
</style>