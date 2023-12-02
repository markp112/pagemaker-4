<template>
  <div class="mt-24 grid grid-cols-4 ">
    <p class="m-4 text-site-primary text-3xl col-start-2 col-span-3">Page Editor</p>
  </div>
    <div class="flex flex-row justify-center">
      <form
        @submit.prevent="saveClick"
        class="w-3/6 border-2 p-4 pl-10"
      >
      <FieldWrapper>
        <template #label>
          <label  for="pageName" class=" w-full p-2">Page Name:</label>
        </template>
        <template #field>
          <TextInput 
            :value="page.name"
            :disabled="false"
            name="page name"
            id="pageName"
            place-holder="e.g Home, Blog Home and must be unique"
            @onFieldChange="($event) => page.name = $event"
          />
          </template>
      </FieldWrapper>
      <FieldWrapper>
        <template #label>
          <label for="icon" class="w-full p-2">Select Page Icon:</label>
        </template>
        <template #field>
          <span
            class="h-8 w-8 bg-accent1 text-center font-bold align-middle border cursor-pointer relative inline-block bg-site-primary"
            @click="iconPickerClicked()"
          >
            ...
          </span>
          <img :src="getIcon(page.icon)" alt="" class="inline-block h-12 w-12 ml-2">
        </template>
      </FieldWrapper>
      <div class="w-full relative">
        <IconPicker @iconClick="iconClick($event)"
          @on-close-click="showIconPicker = !showIconPicker"
          id="icon" 
          :show="showIconPicker"
        />
      </div>
      <FieldWrapper>
        <template #label>
          <label for="created" class="p-2">Created:</label>
        </template>
        <template #field>
          <DatePicker
            v-model="page.created"
            name="created"
            class="border-solid border bg-white py-1 px-2 text-site-primary-light w-auto h-8 "
            inputFormat="dd-MMM-yyyy">
          </DatePicker>
        </template>
      </FieldWrapper>
      <FieldWrapper>
        <template #label>
          <label for="edited" class="p-2 w-full">Back Colour:</label>
        </template>
        <template #field>
          <span class="h-8 w-8 inline-block" :style="{ 'background-color': page.backgroundColour }"></span>
        </template>
      </FieldWrapper> 
      <FieldWrapper>
        <template #label>
          <label for="edited" class=" w-full p-2">Text Colour:</label>
        </template>
        <template #field>
          <span class="h-8 w-8 inline-block" :style="{ 'background-color': page.colour }"></span>
        </template>
      </FieldWrapper>
      <FieldWrapper>
        <template #label>
          <label for="edited" class="w-full p-2">Screen Width (px):</label>
        </template>
        <template #field>
          <NumberInput 
          :value="parseInt(page.dimension.width.value.value)"
          :disabled="false"
          name="page name"
          place-holder="Enter max width for page width"
          @on-field-change="($event) => page.dimension.width.value.value= `${$event}`"
          /> 
        </template>
      </FieldWrapper>
      <FieldWrapper>
        <template #label>
          <label for="edited" class="w-full p-2">Screen Height (px):</label>
        </template>
        <template #field>
          <NumberInput 
          :value="parseInt(page.dimension.height.value.value)"
          :disabled="false"
          name="Screen height"
          place-holder="Enter max height for page height"
          @on-field-change="($event) => page.dimension.height.value.value = `${$event}`"
          />
        </template>
      </FieldWrapper> 
      <FieldWrapper >
        <template #label>
          <label for="edited" class="w-full col-span-2 p-2">Last Edited:</label>
        </template>
        <template #field>
          <span class="bg-white text-site-primary-light w-full pt-1 px-2 h-8">
            {{ formatedDate(page.edited) }}
          </span>
        </template>
      </FieldWrapper>
      <hr/>
      <div class="w-full mt-8 flex justify-between">
        <BaseButton
          buttonType="primary"
          variant="outline"
          size="medium"
          @onClick="cancelClick"
        >
        Cancel
      </BaseButton>
      <SaveButton
        :is-enabled="enableSave"
        @onClick="saveClick()"
        />
    </div>
    <InvalidForm :formErrors="formErrors"></InvalidForm>
  </form>
</div>
</template>

<script lang="ts" setup>
import IconPicker from '@/components/base/pickers/iocnPicker/iconPicker.vue';
import BaseButton from '@/components/base/baseButton/baseButton.vue';
import SaveButton from '@/components/base/baseButton/saveButton/saveButton.vue';
import InvalidForm from '../invalidForm/invalidForm.vue';
import TextInput from '@/components/base/formFields/inputText/inputText.vue';
import NumberInput from '@/components/base/formFields/inputNumeric/inputNumeric.vue';
import DatePicker from 'vue3-datepicker';
import {onBeforeMount,  ref,  watch } from 'vue';
import { getImageUrl } from '@/common/getIcon';
import { formatDate } from '@/common/dateFunctions';
import { usePageStore } from '@/stores/page.store';
import type { ValidField } from '@/components/base/formFields/inputText/model';
import { PageService } from '@/services/page/page.service';
import type { Page } from '@/components/page/model/pageElement/pageElement';
import FieldWrapper from '@/components/base/fieldWrapper/fieldWrapper.vue';
import router from '@/router';

  const pageTitle = ref('');
  const dateCreated = ref<Date>(new Date());  
  const showIconPicker = ref<boolean>(false);
  const formErrors = ref<string[]>([]);
  const store = usePageStore();
  const page = ref<Page>(store.page as Page);
  const pageService = PageService();
  const pageNameIsValid = ref<ValidField>({ isValid: true, message: '' });
  const enableSave = ref<boolean>(false);

  onBeforeMount(() => {
    pageTitle.value = router.currentRoute.value.params.title as string;
    page.value = store.page;
    dateCreated.value = page.value.created;
    formErrors.value = [];
  }),

  watch(pageNameIsValid, () => {
    enableSave.value = pageNameIsValid.value.isValid;
  });

  const getIcon = (iconName: string | undefined): string => {
    if (!iconName || iconName === '') iconName = 'faq-32.png';
    return getImageUrl(iconName);
  };
  
  const formatedDate = (date: Date): string  => {
    return formatDate(date);
  };
    
    const iconPickerClicked = () => {
      showIconPicker.value = true;
    };
    
    const iconClick = (icon: string) => {
      showIconPicker.value = false;
      page.value.icon = icon;
    };
    
    const cancelClick = () => {
      router.push({ name: "pageList" });
    };
    
    const saveClick =  async () => {
      const createdPage = await pageService.createPage(page.value);
      page.value.pageId = createdPage.pageId;
    };
</script>

<style lang="css" scoped>

  datepicker,
  textarea {
    @apply w-9/12 border-solid border bg-site-surface p-2 leading-4;
    @apply text-site-primary-dark;
  }

</style>
