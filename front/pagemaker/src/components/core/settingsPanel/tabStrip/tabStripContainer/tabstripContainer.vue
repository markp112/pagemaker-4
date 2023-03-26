<template>
  <div class="tab-wrapper">
    <Tab 
      v-for="(tab) in data"
      :tab="tab"
      :active-tab="activeTab"
      @on-click="($event) => activeTab=$event"
    />
  </div>
  <div v-for="(tab) in data">
    <TabStripContent v-if="tab.id === activeTab"
      :tabContent="tab.commandPanels"
      @onButtonClick="handleButtonClick($event)"
    />
  </div>
</template>

<script lang="ts">
import type { CommandProperties } from '@/classes/command/model/command';
import { defineComponent, type PropType } from 'vue';
import tab from '../tab/tab.vue';
import  tabStripContentVue from '../tabStripContent/tabStripContent.vue';
import type { TabStrip } from './model';

export default defineComponent({
  name: 'tabStrip-container',
  emits: ['onClick', 'onButtonClick'],
  props: {
    data: {
      type: [] as PropType<TabStrip[]>,
      required: true,
    }
  },
  
  components: { TabStripContent: tabStripContentVue,
    Tab: tab,
  },

  data() {
      return {
          activeTab: '',
      };
  },

  methods: {
    setActiveTab(id: string) {
        this.$emit("onClick", id);
        this.activeTab = id;
    },
    getActiveTab(id: string) {
        return this.activeTab === id;
    },
    handleButtonClick(command: CommandProperties) {
      this.$emit('onButtonClick', command);
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
}

</style>