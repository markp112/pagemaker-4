<template>
  <div class="flex-col flex w-full h-full justify-center border-t-zinc-600 border p-1">
    <span v-for="(field, index) in fields"
      class="mt-2"
      :key="index"
    >
      <InputText
        :label="field.label"
        :value="getLocalValue(index)"
        place-holder=""
        :disabled="!newClicked"
        @on-field-change="updateValue($event, index)" 
      />
    </span>
    <p class="flex flex-row justify-between p-4">
      <BaseButton variant="solid" 
        button-type="primary"
        class="w-20 self-start mt-4"
        @on-click="newClick()"  
      >
        New
      </BaseButton>
      <BaseButton variant="solid" 
        button-type="primary"
        class="w-20 self-start mt-4"
        @on-click="onSaveClick()"
      >
        Save
      </BaseButton>
    </p>
  </div>
</template>

<script lang="ts" setup>
import BaseButton from '@/components/base/baseButton/baseButton.vue';
import  InputText from '@/components/base/formFields/inputText/inputText.vue';
import { ref, type PropType } from 'vue';

type Field = {
  label: string,
  value: string,
};

const props = defineProps({
  fields: {
    type: [] as PropType<Field[]>,
    default: []
}});

const emit = defineEmits(['onSaveClick', 'onNewClick']);
const updatedValue = ref<Field[]>(props.fields);
const newClicked = ref(false);

const getLocalValue = (index: number): string => {
  if(updatedValue.value.length > 0) {
    return updatedValue.value[index].value === undefined ? props.fields[index].value : updatedValue.value[index].value;
  }
  return '';
};

const updateValue = (newValue: string, index: number) => {
  updatedValue.value[index].value = newValue;
}

const newClick = () => {
  newClicked.value = true;
  emit('onNewClick');
};

const onSaveClick = () => {
  newClicked.value = false;
  emit('onSaveClick', updatedValue.value);
};

</script>