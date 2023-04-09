<template>
  <div class="grid grid-cols-5 p-8 gap-8 overflow-hidden">
    <div class="grid grid-rows-3 col-span-1">
      <DragFromGroup 
        id="pageElements"
        :is-draggable="false"
        label="Page Elements"
        :list-items="getPageElements"
        @listItemClick="setPageElement($event)"
      />
      <DragFromGroup 
        id="tabs"
        :is-draggable="true"
        label="Tabs"
        :list-items="getTabs"
        @listItemClick="tabElement=$event"
        @drag-started="sourceDragElementType=$event"
      />
      <DragFromGroup 
        id="tabGroups"
        :is-draggable="true"
        label="Tab Groups"
        :list-items="getTabGroups"
        @listItemClick="groupElement=$event"
        @drag-started="sourceDragElementType=$event"
      />
    </div>
    <div class="grid grid-rows-3 col-span-1 gap-8 bg-gray-100 p-2 items-start">
      <InputField :text-value="pageElement"
        label="Page Element"
        @onNewClick="setPageElement('')"
        @on-save-click="createNewPageElement($event)"
      />
      <InputField :text-value="tabElement"
        label="Tabs"
        @on-new-click="tabElement=''"
        @on-save-click="addNewTabElement($event)"
      />
      <InputField :text-value="groupElement"
        label="Groups"
        @on-new-click="groupElement = ''"
        @on-save-click="addNewTabGroup($event)"  
      />
    </div>
    <div class="grid grid-rows-1 col-span-2">
      <PageElementBuilder :page-element="pageElement"
        :source-drag-element-type="sourceDragElementType"
      />
    </div>
    <div class="col-span-1 flex flex-col items-end">
      <DragFromGroup 
        id="commands"
        :is-draggable="true"
        label="Commands"
        :list-items="getCommands"
        @drag-started="sourceDragElementType=$event"
      />
    </div>
  </div>
</template>

<script lang="ts" setup> 

import { CommandsService } from '@/services/commandButtons/commandButtons.service';
import { useCommandButtonStore } from '@/stores/commandButton.store';
import { computed, onMounted, ref } from 'vue';
import InputField from './inputField.vue';
import PageElementBuilder from './pageElementBuilder.vue';
import DragFromGroup from './dragFromGroup.vue';

const store = useCommandButtonStore();
const service = CommandsService();
const commandList = ref<string[]>([]);
const pageElement = ref();
const tabElement = ref();
const groupElement = ref();
const sourceDragElementType = ref();

  onMounted(async () => {
    await service.fetchAllCommands();
    await service.fetchCommandHierarchy();
    store.setTabList();
    store.setTabGroups();
    const commands = store.getAllCommandButtons;
    Object.keys(commands).forEach(key => {
      commandList.value.push(key)});
  });

  const getCommands = computed(() => {
    return commandList.value;
  });


const getPageElements = computed(() => {
  const pageElements = store.getCommandMap;
  return Object.keys(pageElements)
});

const getTabs = computed(() => {
  return store.getTabList;
});

const getTabGroups = computed(() => {
  return store.getTabGroupList;
});

const setPageElement = (item: string) => pageElement.value = item;

const createNewPageElement = (element: string) => {
  store.createNewPageElement(element);
};

const addNewTabElement = (tabName: string) => {
  store.createNewTabElement(tabName);
};

const addNewTabGroup = (tabGroupName: string) => {
  store.createNewTabGroupElement(tabGroupName);
};


</script>

<style lang="css" scoped>
.list-item {
  @apply hover:bg-site-primary-dark hover:text-on-primary p-2 cursor-pointer;
}

.list-container {
  @apply border p-2 h-auto w-48 mt-2
}

.selected {
  @apply bg-zinc-600;
  @apply text-white;
  @apply p-2;
}
</style>