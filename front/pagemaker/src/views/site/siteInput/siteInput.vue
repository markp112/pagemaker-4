<template>
  <div class="h-1 w-16 bg-site-primary-dark left-32 top-3 absolute" v-if="isShowMe">
    <div class="w-96 h-24 bg-site-primary-dark text-site-surface absolute -top-2 left-16 shadow-lg rounded-md grid grid-rows-2 grid-cols-2 p-2">
      <p class="row-start-1 col-start-1 col-span-2">
        <InputText label="Site Name" 
          :value="siteName"
          place-holder="Enter unique name for site"
          @validate-field="validateSiteName($event)"
          :is-validated="siteNameIsValid"
        
        />
      </p>
      <BaseButton size="small"
        variant="solid"
        button-type="secondary"
        class="mt-4 w-6/12 justify-self-start row-start-2 col-start-1"
        @on-click="onCancel()"
      >Cancel</BaseButton>
      <BaseButton size="small"
        variant="solid"
        button-type="primary"
        class="mt-4 w-6/12 justify-self-end row-start-2 col-start-2"
        :disabled="!siteNameIsValid"
        @on-click="onClick()"
      >Ok</BaseButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import InputText from '@/components/base/formFields/inputText/inputText.vue';
import BaseButton from '@/components/base/baseButton/baseButton.vue';

const props = defineProps<{
  isShowMe: boolean,
}>();

const emits = defineEmits(['onOkClick', 'onCancel'])

const showMe = ref<boolean>();
const siteName = ref('');
const siteNameIsValid = ref();

onMounted(() => {
  showMe.value = props.isShowMe;
});

const validateSiteName = (value: string) => {
  siteName.value = value;
  siteNameIsValid.value = value === '' ? false : true;
};

const onClick = () => {
  emits('onOkClick', siteName.value);
};

const onCancel = () => {
  emits('onCancel')
}

</script>
