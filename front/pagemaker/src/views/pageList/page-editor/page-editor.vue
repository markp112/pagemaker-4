<template>
  <div class="flex justify-center mt-24 w-full flex-wrap h-full">
    <div class="w-7/12 flex flex-row mb-2">
      <p class="m-4 text-site-primary text-3xl">Page Editor</p>
    </div>
    <form
      @submit.prevent="saveClick"
      class="w-7/12 border-2 p-5 bg-gray-50"
    >
      <TextInput label="Name:"
        :value="page.name"
        :required="true"
        place-holder="e.g Home, Blog Home and must be unique"
        :is-validated="pageNameIsValid"
        @validate-field="validatePageName($event)"
        @onFieldChange="($event) => page.name = $event"
      />
      <div class="field-wrapper">
        <label for="icon">Select Page Icon:</label>
        <div class="flex flex-row justify-start">
          <span
            class="h-8 w-8 bg-accent1 text-center font-bold align-middle border cursor-pointer relative inline-block"
            @click="iconPickerClicked()"
          >
            ...
          </span>
          <span>
          <img :src="getIcon(page.icon)" alt="">
          </span>
          <IconPicker @iconClick="iconClick($event)"
            @on-close-click="showIconPicker = !showIconPicker"
            id="icon" 
            :show="showIconPicker"/>
        </div>
      </div>
      <div class="field-wrapper">
        <label for="created">Created:</label>
        <datepicker
          v-model="page.created"
          name="created"
          class="w-9/12 border-solid border bg-white py-1 px-2 leading-4 text-site-primary-light "
          inputFormat="dd-MM-yyyy">
        </datepicker>
      </div>
      <div class="field-wrapper">
        <label for="edited">Background Colour:</label>
        <span class="h-8 w-8" :style="{ 'background-color': page.backgroundColour }">
        </span>
      </div>
      <div class="field-wrapper">
        <label for="edited">Text Colour:</label>
        <span class="h-8 w-8" :style="{ 'background-color': page.colour }">
        </span>
      </div>
        <NumberInput label="Screen Width (px):"
        :value="page.width.value"
        place-holder="Enter max width for page width"
        @on-field-change="($event) => page.width.value = $event"
        /> 
      <NumberInput label="Screen Height (px):"
        :value="page.height.value"
        place-holder="Enter max height for page height"
        @on-field-change="($event) => page.height.value = $event"
      />


      <div class="field-wrapper">
        <label for="edited">Last Edited:</label>
        <span class="bg-white p-2 w-2/12 leading-4 text-site-primary-light">
            {{ formatDate(page.edited) }}
        </span>
      </div>
      <div class="w-full mt-8 flex justify-between">
        <BaseButton
          buttonType="primary"
          variant="outline"
          size="small"
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

<script lang="ts">
import iconPickerVue from '@/components/base/pickers/iocnPicker/iconPicker.vue';
import baseButtonVue from '@/components/base/baseButton/baseButton.vue';
import saveButtonVue from '@/components/base/baseButton/saveButton/saveButton.vue';
import invalidFormVue from '../invalidForm/invalidForm.vue';
import inputTextVue from '@/components/base/formFields/inputText/inputText.vue';
import inputNumericVue from '@/components/base/formFields/inputNumeric/inputNumeric.vue';
import Datepicker from 'vue3-datepicker';
import { defineComponent } from 'vue';
import { getSiteAndUser } from '@/classes/siteAndUser/siteAndUser';
import type { PageMetaData } from '@/classes/pageMetaData/pageMetaData';
import { getImageUrl } from '@/common/getIcon';
import { formatDate } from '@/common/dateFunctions';
import { usePageStore } from '@/stores/page.store';
import type { ValidField } from '@/components/base/formFields/inputText/model';
import { PageService } from '@/services/page/page.service';

export default defineComponent ({
  name: 'page-editor',
  data() {
    return {
      pageTitle: '',
      page: Object as unknown as PageMetaData,
      dateCreated: new Date(),
      showIconPicker: false,
      formErrors: [] as string[],
      siteAndUser: getSiteAndUser(),
      store: usePageStore(),
      pageService: PageService(),
      pageNameIsValid: { isValid: true, message: '' } as ValidField,
      enableSave: false,
    }
  },

  components: {
    IconPicker: iconPickerVue,
    BaseButton: baseButtonVue,
    SaveButton: saveButtonVue,
    InvalidForm: invalidFormVue,
    TextInput: inputTextVue,
    NumberInput: inputNumericVue,
    Datepicker,
  },

  created() {
    this.pageTitle = this.$route.params.title as string;
    this.page = this.store.page;
    this.dateCreated = this.page.created,
    this.formErrors = [];
  },

  watch: {
    pageNameIsValid() {
      this.enableSave = this.pageNameIsValid.isValid;
    }
  },

  methods:{

    getFormErrors(): string[] {
      return this.formErrors;
    },
    
    validatePageName(value: string): void {
      this.pageNameIsValid = this.pageService.validatePageName(value);
    },

    getIcon(iconName: string | undefined): string {
      if (!iconName || iconName === '') return '';
      return getImageUrl(iconName);
    },
    
    formatDate(date: Date): string  {
      return formatDate(date);
    },
    
    iconPickerClicked() {
      this.showIconPicker = !this.showIconPicker;
    },
    
    iconClick(icon: string) {
      this.showIconPicker = false;
      this.page.icon = icon;
    },
    
    cancelClick() {
      this.$router.push({ name: "pageList" });
    },
    
    async saveClick() {
      await this.pageService.savePage(this.page); 
      
    },
},
  
})
</script>

<style lang="css">


label {
  @apply text-sm justify-self-start inline-block w-2/12 text-left;
}

input[type='text'],
datepicker,
textarea {
  @apply w-9/12 border-solid border bg-site-surface p-2 leading-4;
  @apply text-site-primary-dark;
}

.field-wrapper {
  @apply flex flex-row justify-start mb-2 ml-1;
}
</style>
