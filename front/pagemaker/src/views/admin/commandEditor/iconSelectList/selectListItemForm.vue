<template>
  <div class="flex flex-col w-full border p-5 rounded-md shadow-md bg-site-surface">
    <form action="">
      <fieldset class="mt-4">
        <label for="icon">Icon:</label>
        <input type="text"
          id="icon"
          name="icon"
          placeholder="icon .jpg / .png file"
          v-model="selectListItem.icon"
        />  
      </fieldset>
      <fieldset class="mt-4">
        <label for="classToApply">CSS Class to apply:</label>
        <input type="text"
          id="classToApply"
          name="classToApply"
          placeholder="name of tailwind css class"
          v-model="selectListItem.classToApply"
        />  
      </fieldset>
      <fieldset class="mt-4">
        <label for="tooltip">Tooltip:</label>
        <input type="text"
          id="tooltip"
          name="tooltip"
          placeholder="tooltip"
          v-model="selectListItem.tooltip"
        />  
      </fieldset>
      <p class="flex flex-row justify-between mt-4">
        <BaseButton :button-type="'primary'" variant="outline" @on-click="onClose()">Cancel</BaseButton>
        <BaseButton :button-type="'primary'"
          variant="solid"
          :disabled="addDisabled"
          @on-click="addItem()"
        >Add</BaseButton>
        <BaseButton button-type="primary"
          @on-click="saveItem()"
          :disabled="saveDisabled"
        >Save</BaseButton>
      </p>
    </form>

  </div>
</template>

<script lang="ts" setup>
  import { ref } from '@vue/reactivity';
  import BaseButton from '@/components/base/baseButton/baseButton.vue';
import type { SelectListIcon } from '@/classes/commandButtons/model';

  const props = defineProps<{ editedItem: SelectListIcon }>();
  const emits = defineEmits(['onClose', 'onSave']);

  let addDisabled = ref(true);
  let saveDisabled = ref(false)

  let selectListItem = ref<SelectListIcon>(props.editedItem);

  const onClose = () => {
    emits('onClose');
  };

  const saveItem = () => {
    emits('onSave', selectListItem.value);
    addDisabled.value = false;
    saveDisabled.value = true;
  };

  const addItem = () => {
    selectListItem.value = {
      classToApply: '',
      icon: '',
      tooltip: ''
    };
    addDisabled.value = true;
    saveDisabled.value = false;
  }

</script>