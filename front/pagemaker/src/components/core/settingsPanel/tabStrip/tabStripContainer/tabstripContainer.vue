<template>
  <div class="tab-wrapper">
    <Tab 
      v-for="(tab) in data"
      :tab="tab"
      :active-tab="getActiveTab()"
      @on-click="($event) => activeTab=$event"
    />
  </div>
  <div v-for="(tab) in data">
    <TabStripContentVue v-if="tab.id === activeTab"
      :tabContent="tab.commandPanels"
      @onButtonClick="handleButtonClick($event)"
    />
  </div>
</template>

<script lang="ts" setup>
import type { CommandProperties } from '@/classes/command/model/command';
import Tab from '../tab/tab.vue';
import  TabStripContentVue from '../tabStripContent/tabStripContent.vue';
import type { TabStrip } from './model';
import { onMounted, ref } from 'vue';

  const emits = defineEmits(['onClick', 'onButtonClick']);
  const props = defineProps<{
    data: TabStrip[]
  }>();
  
  const activeTab = ref('');

  onMounted(() => {
    activeTab.value = props.data[0].id;
  });

  const setActiveTab = (id: string) => {
    emits('onClick', id);
    activeTab.value = id;
  };

  const getActiveTab = () => {
    if(props.data.filter(tab => tab.id === activeTab.value).length === 0) {
      activeTab.value = props.data[0].id;
    } 
    return activeTab.value;
  };

  const handleButtonClick = (command: CommandProperties) => {
    emits('onButtonClick', command);
  };

</script>

<style  lang="css" scoped>

.tab-wrapper {
  @apply w-full;
  @apply h-auto;
  @apply m-1 pr-3;
  @apply flex flex-row justify-start;
  min-width: 18em;
}

</style>