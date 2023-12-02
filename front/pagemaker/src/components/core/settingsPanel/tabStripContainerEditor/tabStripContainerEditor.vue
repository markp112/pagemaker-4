<template>
  <div class="tab-wrapper">
    <div class="tabs">
      <div class="tab" v-for="(label, index) in labels " :key="index"
      :class="{ 'active-tab': index === activeTab }"
      >
        <input type="radio" 
          :name="`tab-${index}`" 
          :id="`tab-${index}`"
          class="tab-switch" 
        />
        <span
          class="tab-label"
          :class="{ 'active-tab': index === activeTab }"
          @click="setActiveTab(index)"
        >{{ label }}</span>
      </div>
    </div>
  </div>
  <div class="tab-content">
    <slot name="tab-0" v-if="getActiveTab(0)"></slot>
    <slot name="tab-2" v-if="getActiveTab(2)"></slot>
    <slot name="tab-3" v-if="getActiveTab(3)"></slot>
    <slot name="tab-1" v-if="getActiveTab(1)"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
export default defineComponent({
  name: 'tabStrip-container',
  props: {
    labels: {
      type: [] as PropType<string[]>,
      required: true,
    }
  },
  data() {
    return {
      activeTab: 0,
    }
  },
  methods: {
    setActiveTab(tabClicked: number) {
      this.activeTab = tabClicked;
    },
    getActiveTab(tab: number) {
      return this.activeTab === tab;
    }
  },
})
</script>


<style  lang="css" scoped>
.tab-wrapper {
  @apply w-full;
  @apply h-auto;
  @apply m-1 pr-3;
  @apply flex flex-row justify-start;
  min-width: 18em;
  overflow: hidden;
}
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
  @apply w-full;
  @apply rounded-tr-lg;
  @apply bg-slate-300;
  @apply border-r-2 border-r-site-primary-dark;
  @apply p-2;
}
.tab-switch {
  display: none;
}
.tab-label {
  @apply relative; 
  @apply h-12 p-2 w-full;  
  @apply cursor-pointer;
  @apply top-0;
  @apply text-site-primary;
  @apply text-center;
  @apply overflow-hidden;
  transition: all 0.25s;
}
.tab-label:hover {
  @apply h-12 p-2 w-full;  
  top: -0.30rem;
  transition: top 0.25s;
  font-weight: 700;
}
.tab-content {
  @apply w-full;
  @apply flex;
  @apply flex-col;
  @apply mt-2;
}

.tab-switch:checked + .tab-label {
  @apply bg-site-primary-dark;
  @apply text-site-surface;
  border-bottom: 0;
  transition: all 0.35s;
  z-index: 1;
  @apply rounded-tr-lg;
}
.tab-switch:checked + label + .tab-content {
  z-index: 2;
  opacity: 1;
  transition: all 0.35s;
}

.active-tab {
  @apply bg-site-primary-dark;
  @apply text-site-surface;
  @apply rounded-tr-lg;
  @apply h-auto p-2 w-full;  
}
</style>
