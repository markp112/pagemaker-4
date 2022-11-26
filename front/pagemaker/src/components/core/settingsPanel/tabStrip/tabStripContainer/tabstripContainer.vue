<template>
  <div class="tab-wrapper">
    <div class="tabs">
      <div class="tab" v-for="(label, index) in labels ">
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
  <div>
    <slot name="tab-0" v-if="getActiveTab(0)" class="tab-content"></slot>
    <slot name="tab-1" v-if="getActiveTab(1)"  class="tab-content"></slot>
    <slot name="tab-2" v-if="getActiveTab(2)"  class="tab-content"></slot>
    <slot name="tab-3" v-if="getActiveTab(3)"  class="tab-content"></slot>
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
      console.log('%c⧭', 'color: #8c0038', tabClicked)
      this.activeTab = tabClicked;
    },

    getActiveTab(tab: number) {
      return this.activeTab === tab;
    }
  },

})

</script>


<style  lang="postcss" scoped>

.tab-wrapper {
  @apply w-full;
  @apply h-auto;
  @apply m-1 pr-3;
  @apply flex flex-row justify-start;
}
.tabs {
  @apply relative;
  @apply m-1;
  @apply bg-site-surface;
  @apply border;
  @apply border-gray-400;
  @apply w-full rounded-md;
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
  @apply border rounded-md;
}
.tab-switch {
  display: none;
}
.tab-label {
  @apply relative block shadow-sm;
  @apply leading-10;
  @apply w-auto h-12 p-1;  
  @apply border-r-2 border-r-site-primary-dark;
  @apply bg-slate-400;
  @apply cursor-pointer;
  @apply top-0;
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
  @apply bg-site-surface;
  border-bottom: 0.25rem solid #bdc3c7;
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
}
.tab-switch:checked + label + .tab-content {
  z-index: 2;
  opacity: 1;
  transition: all 0.35s;
}
</style>