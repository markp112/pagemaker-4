<template>
  <div class="mt-24 w-full h-full flex flex-row justify-center flex-wrap">
      <div class="w-7/12 flex flex-row mb-2">
        <p class="m-4 text-site-primary text-3xl">Page Editor</p>
      </div>
      <form
        @submit.prevent="saveClick"
        class=" w-6/12 border-2 p-5 bg-gray-50 shadow-sm"
      >
      <div class="field-wrapper">
        <TextInput label="Name:"
          :value="page.name"
          :required="true"
          place-holder="e.g Home, Blog Home and must be unique"
          :is-validated="pageNameIsValid"
          @validate-field="validatePageName($event)"
          @onFieldChange="($event) => page.name = $event"
        />
      </div>
      <div class="field-wrapper">
        <div class="grid grid-cols-5 w-full">
          <label for="icon" class="col-span-2 w-full p-2">Select Page Icon:</label>
          <div class="col-span-3 w-full">
            <span
              class="h-8 w-8 bg-accent1 text-center font-bold align-middle border cursor-pointer relative inline-block"
              @click="iconPickerClicked()"
            >
            ...
            </span>
            <img :src="getIcon(page.icon)" alt="" class="inline-block h-12 w-12 ml-2">
            <IconPicker @iconClick="iconClick($event)"
              @on-close-click="showIconPicker = !showIconPicker"
              id="icon" 
              :show="showIconPicker"
            />
        </div>
      </div>
    </div>
    <div class="field-wrapper">
      <div class="grid grid-cols-5 w-full">
        <label for="created" class="col-span-2 p-2">Created:</label>
        <datepicker
          v-model="page.created"
          name="created"
          class="border-solid border bg-white py-1 px-2 text-site-primary-light col-span-3 w-full "
          inputFormat="dd-MMM-yyyy">
        </datepicker>
      </div>
    </div>
      <div class="field-wrapper">
        <div class="grid grid-cols-5 w-full">
          <label for="edited" class="col-span-2 p-2 w-full">Background Colour:</label>
          <span class="h-8 w-8 col-span-3" :style="{ 'background-color': page.backgroundColour }">
          </span>
        </div>
      </div>
      <div class="field-wrapper">
        <div class="grid grid-cols-5 w-full">
          <label for="edited" class="col-span-2 w-full p-2">Text Colour:</label>
          <span class="h-8 w-8 col-span-3" :style="{ 'background-color': page.colour }">
          </span>
        </div>
      </div>
      <div class="field-wrapper">
        <NumberInput label="Screen Width (px)"
          :value="page.width.value"
          place-holder="Enter max width for page width"
          @on-field-change="($event) => page.width.value = $event"
        /> 
      </div>
      <div class="field-wrapper">
        <NumberInput label="Screen Height (px)"
        :value="page.height.value"
        place-holder="Enter max height for page height"
        @on-field-change="($event) => page.height.value = $event"
        />
      </div> 
      <div class="field-wrapper">
          <div class="grid grid-cols-5 w-full">
          <label for="edited" class="w-full col-span-2 p-2">Last Edited:</label>
          <span class="bg-white p-2 leading-4 text-site-primary-light col-span-3 w-full">
            {{ formatDate(page.edited) }}
          </span>
        </div>
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
      await this.pageService.createPage(this.page);
      
    },
},
  
})
</script>

<style lang="css" scoped>

  datepicker,
  textarea {
    @apply w-9/12 border-solid border bg-site-surface p-2 leading-4;
    @apply text-site-primary-dark;
  }

  .field-wrapper {
    @apply mb-2 ml-1;
    @apply w-6/12;
}
</style>
