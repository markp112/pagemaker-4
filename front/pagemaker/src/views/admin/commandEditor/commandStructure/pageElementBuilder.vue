<template>
  <div class="ml-8 bg-gray-200 p-4 grid grid-rows-8">
    <h2 class="font-bold text-xl mb-4 row-start-1">{{ pageElement }}</h2>
    <CommandHierarchyElement id="tabs"
      class="row-start-2 row-end-3"
      label="tabs"
      :list-items="getTabs"
      :dragged-item="sourceDragElementType"
      @list-item-clicked="tabItemClicked($event)"
      @on-drag-drop="onTabDrop($event)"
    />
    <CommandHierarchyElement id="tabGroups"
      label="Tab Groups"
      class="ml-12 row-start-3 row-end-5"
      :list-items="getTabGroups"
      :dragged-item="sourceDragElementType"
      @list-item-clicked="tabGroupClicked($event)" 
    />
    <CommandHierarchyElement id="commands"
      class="row-start-5 ml-24"
      label="Commands in Group"
      :list-items="getCommands"
      :dragged-item="sourceDragElementType"
    />
    <p class="flex flex-row justify-end mt-16 row-start-7 items-end">
      <BaseButton size="medium" button-type="primary" class="w-32">Save</BaseButton>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useCommandButtonStore } from '@/stores/commandButton.store';
import { computed, ref } from '@vue/reactivity';
import CommandHierarchyElement from './commandHierarchyElement.vue';
import BaseButton from '@/components/base/baseButton/baseButton.vue';
const store = useCommandButtonStore();

const props = defineProps<{
  pageElement: string,
  sourceDragElementType: string,
}>();

const getTabs = computed(() => {
  if(props.pageElement) {
    const elements = store.getCommandMap[props.pageElement];
    return elements.tabs.map(tab => tab.displayName);
  };
  return [];
});

const getTabGroups = computed(() => store.getActiveTabGroups);
const getCommands = computed(() => store.getActiveCommands);

const onTabDrop = (tabName: string) => {
  store.AddTabToElement(props.pageElement, tabName);
};

const tabItemClicked = (tab: string) => {
  store.setActiveTab(props.pageElement, tab)
};

const tabGroupClicked = (tabGroup: string) => {
  store.setCommandsForTabGroup(props.pageElement, tabGroup)
}

</script>

<style lang="css" scoped>
.list-item {
  @apply hover:bg-site-primary-dark hover:text-on-primary p-2 cursor-pointer;
}

.list-container {
  @apply border p-2 h-auto w-44 mt-2
}

.selected {
  @apply bg-zinc-600;
  @apply text-white;
  @apply p-2;
}

</style>