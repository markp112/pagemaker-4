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
      @delete-clicked="deleteTabItem($event)"
    />
    <CommandHierarchyElement id="tabGroups"
      label="Tab Groups"
      class="ml-12 row-start-3 row-end-5"
      :list-items="getTabGroups"
      :dragged-item="sourceDragElementType"
      @list-item-clicked="tabGroupClicked($event)"
      @on-drag-drop="onTabGroupDrop($event)"
      @delete-clicked="deleteTabGroup($event)"
    />
    <CommandHierarchyElement id="commands"
      class="row-start-5 ml-24"
      label="Commands in Group"
      :list-items="getCommands"
      :dragged-item="sourceDragElementType"
      @on-drag-drop="onCommandGroupDrop($event)"
      @delete-clicked="onCommandGroupDelete($event)"
    />
    <p class="flex flex-row justify-end mt-16 row-start-7 items-end">
      <BaseButton 
        size="medium" 
        button-type="primary"
        class="w-32"
        :disabled="!isDirty"
        @on-click="saveCommandStructure"
        >Save
      </BaseButton>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useCommandButtonStore } from '@/stores/commandButton.store';
import { CommandsService } from '@/services/commandButtons/commandButtons.service';
import { computed, ref } from '@vue/reactivity';
import CommandHierarchyElement from './commandHierarchyElement.vue';
import BaseButton from '@/components/base/baseButton/baseButton.vue';
import { displayMessage } from '@/common/displayMessage';

type IsDirtyElement = {
  tabs: boolean,
  tabGroup: boolean,
  commandsGroup: boolean
};

const store = useCommandButtonStore();
const service = CommandsService();

const props = defineProps<{
  pageElement: string,
  sourceDragElementType: string,
}>();

const isDirtyElement = ref<IsDirtyElement>({
  tabGroup: false,
  tabs: false,
  commandsGroup: false,
});

const getTabs = computed(() => store.getTabList);
const getTabGroups = computed(() => store.getActiveTabGroups);
const getCommands = computed(() => store.getActiveCommands);
const isDirty = ref(false);

const onTabDrop = (tabName: string) => {
  store.addTabToElement(props.pageElement, tabName);
  isDirty.value = true;
  isDirtyElement.value.tabs = true;
};

const tabItemClicked = (tab: string) => {
  store.setActiveTab(props.pageElement, tab);
};

const deleteTabItem = (tabName: string) => {
  store.deleteTabFromActiveTabs(tabName);
}

const onTabGroupDrop = (tabGroupName: string) => {
  store.addTabGroup(tabGroupName);
  isDirty.value = true;
  isDirtyElement.value.tabGroup = true;
};

const tabGroupClicked = (tabGroup: string) => {
  store.setCommandsForTabGroup(props.pageElement, tabGroup)
};

const deleteTabGroup = (tabGroupName: string) => {
  store.deleteTabGroup(props.pageElement, tabGroupName);
  isDirty.value = true;
};

const onCommandGroupDrop = (commandName: string) => {
  store.addCommandToActiveCommands(commandName);
  isDirty.value = true;
  isDirtyElement.value.commandsGroup = true;
};

const onCommandGroupDelete = (commandName: string) => {
  store.deleteCommandFromActiveCommands(commandName);
  isDirty.value = true;
};

const saveCommandStructure = () => {
  try {

    if(isDirtyElement.value.tabs) {
      service.updatePageElementTabs(props.pageElement, store.getTabList);
    }
  } catch (err) {
    displayMessage('failed', 'error', 'failed to save');
  }

  displayMessage('Saved ok', 'success', 'Saved Commands');
};

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