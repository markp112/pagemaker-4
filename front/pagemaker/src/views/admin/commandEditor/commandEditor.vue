<template>
  <div class="p-4 h-90vh">
    <h2 class="text-2xl mb-4 ml-4">Command Editor</h2>
    <div class="grid grid-cols-8 h-full gap-8">
      <div class=" bg-site-primary h-full">
        <ul class="p-2">
          <li v-for="commandName in getCommands" 
            class="text-site-background p-1 hover:bg-site-background hover:text-site-primary"
            :key="commandName"
            @click="onCommandListClick(commandName)"
          >{{ commandName }}</li>
        </ul>
      </div>
      <div class="col-span-7 flex mt-24 ml-32">
        <div class="grid grid-rows-7 grid-flow-row gap-12 w-full h-128">
          <p class="flex flex-row justify-start w-8/12 h-4 row-span-1">
          <BaseButton @on-click="addNew()"
            class="base-button"
            button-type="primary" 
            size="medium" 
          >
              Add New
          </BaseButton>
        </p>
        <form action="" class="w-8/12 row-span-6 border-1 border p-12  ">
          <fieldset class="">
            <label for="key">Command Key:</label>
            <input type="text"
              id="key"
              name="key"
              placeholder="Enter command reference / key"
              v-model="commandKey"
            />
          </fieldset>
          <fieldset class=" mt-4">
            <label for="commandName">Command Name:</label>
            <input type="text"
              id="commandName"
              name="commandName"
              placeholder="The name of the command as used by the command processor"
              v-model="command.commandName"
            />
          </fieldset>
          <fieldset class=" mt-4">
            <label for="commandType">Command Action:</label>
            <select 
              id="commandType"
              name="commandType"
              placeholder="indicates if command has a direct action on the element or is a setting"
              v-model="command.commandType"
            >
              <option value="direct">Direct</option>
              <option value="indirect">Indirect</option>
            </select>
          </fieldset>
          <fieldset class="mt-4">
            <label for="buttonType">Button Type:</label>
            <select class="h-8 p-1"
              id="buttonType"
              name="buttonType"
              placeholder="button type to use"
              v-model="command.buttonType"
            >
              <option :value="button" v-for="button in getButtonTypes()" :key="button">
                {{ button }}
              </option>
            </select>
          </fieldset>
          <SelectListItemContainer v-if="command?.buttonType === 'iconList'"
            :select-list-items="(command as EditorButtonSelectList).listValues"
            @list-updated="updateIconSelectList($event)"
          />
          <NumericSelectList v-else-if="command.buttonType === 'numericWithSelect'"
            :list-items="(command as EditorButtonNumericSelectList).listValues"
            @on-add="addNumericSelectListItem($event)"
          />
          <fieldset class=" mt-4">
            <label for="displayIcon">Icon:</label>
            <input type="text"
              id="displayIcon"
              name="displayIcon"
              placeholder="The name of the command as used by the command processor"
              v-model="command.displayIcon"
            />
          </fieldset>
          <fieldset class="mt-4">
            <label for="tooltip">Tooltip:</label>
            <input type="text"
              id="tooltip"
              name="tooltip"
              placeholder="tooltip"
              v-model="command.tooltip"
            />
          </fieldset>
          <p class="flex flex-row justify-end mt-12 w-10/12">
            <BaseButton @on-click="saveCommand()" 
              class="base-button"
              button-type="primary" 
              size="medium" 
              title="Save"
            >
                Save
            </BaseButton>
          </p>
        </form>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CommandButtonTypes } from '@/classes/commandButtons/model';
import type { EditorButtonNumericSelectList, EditorButtonSelectList, SelectListIcon } from '@/components/base/editorButtons/model';
import { displayMessage } from '@/common/displayMessage';
import { computed, } from '@vue/reactivity';
import { onMounted, ref } from 'vue';
import SelectListItemContainer from './iconSelectList/selectListItemContainer.vue';
import NumericSelectList from './numericSelectList/numericSelectList.vue';
import BaseButton from '@/components/base/baseButton/baseButton.vue';
import { CommandsService } from '@/services/commandButtons/commandButtons.service';
import { useCommandButtonStore } from '@/stores/commandButton.store';

  const service = CommandsService();
  const store = useCommandButtonStore();
  const commandList = ref<string[]>([]);
  const commandListRefs = ([]);
  const selectListItems = ref<SelectListIcon[]>([]);
  let command = ref<CommandButtonTypes>({
    buttonType: 'iconImageButton',
    commandName: 'border',
    commandType: 'direct',
    displayIcon: '',
    tooltip: ''
  });
  let commandKey = ref('');
  const buttonTypes = [
    'numericWithSelect',
    'plusMinus',
    'iconImageButton',
    'uploadButton',
    'textInputButton',
    'iconList',
  ];

  onMounted(async () => {
    await service.fetchAllCommands();
    const commands = store.getAllCommandButtons;
    Object.keys(commands).forEach(key => {
      commandList.value.push(key)});
  });

  const getCommands = computed(() => {
    return commandList.value;
  });

  const onCommandListClick = (key: string) => {
    command.value = store.getAllCommandButtons[key];
    commandKey.value = key;
  };

  const getButtonTypes = () => {
    return buttonTypes.sort();
  };

  const addNew = () => {
    command.value = {...{
      buttonType: 'iconImageButton',
      commandName: 'border',
      commandType: 'direct',
      displayIcon: '',
      tooltip: '',
    }};
    commandKey.value = '';
  };

  const saveCommand = async () => {
    if(command.value) {
      const commandToSave: CommandButtonTypes = { ...command.value };
      await service.postCommand(commandKey.value, commandToSave);
      displayMessage('Saved', 'success' ,'Command Added');
      commandList.value.push(commandKey.value);
    }
  };

  const updateIconSelectList = (updatedList: SelectListIcon[]) => {
    selectListItems.value = updatedList;
    (command.value as EditorButtonSelectList)['listValues'] = updatedList;
  };

  const addNumericSelectListItem = (item: string) => {
    if(!(command.value as EditorButtonNumericSelectList)['listValues']) {
      (command.value as EditorButtonNumericSelectList)['listValues'] = [];
    }
    (command.value as EditorButtonNumericSelectList)['listValues'].push(item);
  }

</script>

<style lang="css" scoped>
  select {
    @apply p-1;
    @apply h-10;
    @apply w-48;
    @apply border border-gray-300;
  }

  option {
    @apply p-2;

  }

  .base-button {
    @apply w-24;
    @apply h-10;
  }
</style>