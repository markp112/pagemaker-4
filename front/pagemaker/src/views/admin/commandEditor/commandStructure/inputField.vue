<template>
  <p class="flex-col flex w-84 justify-center border-t-zinc-600 border p-4">
        <fieldset>
          <label for="pageElementInput" class="w-32 pb-2">{{ label }}</label>
          <input type="text" name="pageElementInput" 
            id="pageElementId" 
            class="w-full disabled:bg-gray-400 disabled:border-gray-400" 
            :value="localValue"
            @input="updatedValue=$event.target.value"
            :disabled="!newClicked"
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

      </p>
</template>

<script lang="ts" setup>
import BaseButton from '@/components/base/baseButton/baseButton.vue';
import { computed, ref } from 'vue';

const props = defineProps({
  label: String,
  textValue: {
    type: String,
    required: true
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