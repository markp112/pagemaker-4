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
        :list-items="getAllTabNames"
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
    <div class="grid grid-rows-3 col-span-1 gap-4 bg-gray-100 ">
      <InputFieldBasic :fields="[{label: 'Page Element', value: pageElement}]"
        @onNewClick="setPageElement('')"
        @on-save-click="createNewPageElement($event)"
      />
      <InputFieldBasic :fields="[
        { label: 'Key', value: tabKey },
        { label: 'Display Name', value: displayName },
        ]"
        @on-new-click="tabElement=''"
        @on-save-click="addNewTabElement($event)"
      />
      <InputFieldBasic :fields="[{label: 'Groups', value: groupElement}]"
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
import InputFieldBasic from './inputFieldBasic.vue';
import PageElementBuilder from './pageElementBuilder.vue';
import DragFromGroup from './dragFromGroup.vue';
import type { TabGroup } from '@/classes/commandButtons/model';
import { displayMessage } from '@/common/displayMessage';

type Field = {
  label: string,
  value: string,
};


const store = useCommandButtonStore();
const service = CommandsService();
const commandList = ref<string[]>([]);
const pageElement = ref();
const tabElement = ref();
const displayName = ref('');
const tabKey = ref('');
const groupElement = ref();
const sourceDragElementType = ref();

  onMounted(async () => {
    const IGNORE_USER_SITE_ID = '-1';
    await service.fetchAllCommands();
    await service.fetchCommandHierarchy(IGNORE_USER_SITE_ID, IGNORE_USER_SITE_ID);
    store.setTabList();
    store.setTabGroups();
    store.setExistingTabs();
    const commands = store.getAllCommandButtons;
    Object.keys(commands).forEach(key => {
      commandList.value.push(key)});
  });

  const getCommands = computed(() => {
    return commandList.value;
  });

  const getPageElements = computed(() => {
    const pageElements = store.getCommandMap;
    if (pageElements) {
      return Object.keys(pageElements)
    }
    return [];
  });

  const getAllTabNames = computed(() => store.getAllTabNames.map(tab => tab.key));

  const getTabGroups = computed(() => {
    return store.getTabGroupList;
  });

  const setPageElement = (item: string) => {
    pageElement.value = item;
    store.setTabList(item);
  }

  const createNewPageElement = async (element: Field[]) => {
    const newEelement =element[0].value;
    await service.createPageElement(newEelement);
    store.createNewPageElement(newEelement);
  };

  const addNewTabElement = async (tabName: Field[]) => {
    const tabElement: Omit<TabGroup, 'tabContent'> = {
      displayName: tabName.filter(tab => tab.label === 'Display Name')[0].value,
      key: tabName.filter(tab => tab.label === 'Key')[0].value,
    }
    const tabGroup = await service.createNewTabElement(tabElement);
    store.addTabGroupToExistingTabs(tabGroup);
    displayMessage('Tab group created', 'success', 'Created');
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