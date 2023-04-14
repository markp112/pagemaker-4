<template>
  <div class="flex-col flex w-84 justify-center border-t-zinc-600 border p-4">
    <fieldset>
      <InputText 
        :label="label"
        :value="localValue"
        place-holder="fred"
        :disabled="!newClicked"
        @on-field-change="updatedValue=$event" 
      />
    </fieldset>
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
        :disabled="localValue === ''"
      >
        Save
      </BaseButton>
    </p>
  </div>
</template>

<script lang="ts" setup>
import BaseButton from '@/components/base/baseButton/baseButton.vue';
import  InputText from '@/components/base/formFields/inputText/inputText.vue';
import { computed, ref } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  textValue: {
    type: String,
    required: true,
  }
});

const emit = defineEmits(['onSaveClick', 'onNewClick']);
const updatedValue = ref('');
const newClicked = ref(false);
const localValue = computed((): string => 
  updatedValue.value === '' ? props.textValue : updatedValue.value
);

const newClick = () => {
  newClicked.value = true;
  emit('onNewClick');
};

const onSaveClick = () => {
  newClicked.value = false;
  emit('onSaveClick', updatedValue.value);
};

</script>