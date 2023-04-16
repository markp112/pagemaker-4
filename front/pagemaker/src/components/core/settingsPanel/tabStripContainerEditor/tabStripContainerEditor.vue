<template>
  <div class="tab-wrapper">
    <div class="tabs">
      <div class="tab" v-for="(label, index) in labels " :key="index">
        <input type="radio" 
          :name="`tab-${index}`" 
          :id="`tab-${index}`"
          class="tab-switch" 
        />
        <label for="`tab-${index}`"
          class="tab-label"
          :class="{ activeTab: index === activeTab }"
          @click="setActiveTab(index)"
        >{{ label }}</label>
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
  @apply w-24;
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
  @apply h-12 p-2 w-24;  
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
  @apply mt-2;
}

.activeTab {
  @apply bg-site-primary-dark;
  @apply text-site-surface;
  @apply rounded-tr-lg;
  @apply h-12 p-2 w-24;  
}
</style>
