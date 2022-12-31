<template>
  <div class="flex justify-center mt-24 w-full flex-wrap h-full">
    <div class="w-7/12 flex flex-row mb-2">
      <p class="m-4 text-site-primary text-3xl">Site Editor</p>
    </div>
    <form
      @submit.prevent="saveClick"
      class="w-7/12 border-2 p-5 bg-gray-50"
    >
      <div class="field-wrapper">
        <label for="page-name">Name:</label>
        <input
          type="text"
          id="page-name"
          v-model="page.name"
          class="w-9/12 border-solid border bg-white py-1 px-2 leading-4 text-site-primary-light"
          placeholder="e.g Home, Blog Home and must be unique"
        />
      </div>
      <div class="field-wrapper">
        <label for="icon">Select Icon:</label>
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
          class="w-9/12 border-solid border bg-white py-1 px-2 leading-4 text-site-primary-light -ml-11"
          inputFormat="dd-MM-yyyy">
        </datepicker>
      </div>
      <div class="field-wrapper">
        <label for="edited">Default background colour</label>
        <span class="py-1 px-2 leading-4 text-site-primary-light h-4 w-4" :style="{backgroundColor: page.backgroundColour}">
        </span>
      </div>
      <div class="field-wrapper">
        <label for="edited">Edited:</label>
        <span class="bg-white py-1 px-2 leading-4 text-site-primary-light">
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
import Datepicker from 'vue3-datepicker';
import { defineComponent } from 'vue';
import { getSiteAndUser } from '@/classes/siteAndUser/siteAndUser';
import type { PageMetaData } from '@/classes/pageMetaData/pageMetaData';
import { getImageUrl } from '@/common/getIcon';
import { formatDate } from '@/common/dateFunctions';
import { usePageStore } from '@/stores/page.store';

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
    }
  },

  components: {
    IconPicker: iconPickerVue,
    BaseButton: baseButtonVue,
    SaveButton: saveButtonVue,
    InvalidForm: invalidFormVue,
    Datepicker,
  },

  created() {
    this.pageTitle = this.$route.params.title as string;
    this.page = this.store.page;
    this.dateCreated = this.page.created,
    this.formErrors = [];
  },

  methods:{

    getFormErrors(): string[] {
      return this.formErrors;
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
  
  saveClick() {
    // this.formErrors = this.validateForm();
    // if (this.formErrors.length === 0) {
    //   this.page.edited = new Date();
    //   this.savePage();
    // };
  },
  
  // validateForm(): string[] {
  //   const errors: string[] = [];
  //   if (this.page.name.length === 0) {
  //     errors.push("Page name is required");
  //   }
  //   const pageList: ASitePage[] = this.store.getters.pages;
  //   if (pageList !== undefined) {
  //     if (pageList.filter(page => page.name === this.page.name && page.id !== this.page.id).length > 0) {
  //       errors.push("Page name must be unique");
  //     }
  //   }
  //   if (this.page.icon === '') {
  //     errors.push('An Icon is required');
  //   }
  //   return errors;
  // },
  
  // savePage(): void {
  //   this.store.dispatch(AllActionTypes.ADD_A_NEW_PAGE,
  //   {
  //     page: this.page,
  //     siteAndUser: this.siteAndUser,
  //   }
  //   )
  //   .then(result => {
  //     const notification = result;
  //     if (notification.status === "ok") {
  //       const message = `The ${this.page.name} page has been created`;
  //       console.log('%c⧭', 'color: #007300', message)
  //       showTheSnackbar('Page saved', message, 'success')
  //     } else {
  //       const message = notification.message;
  //       console.log('%c⧭', 'color: #006dcc', message)
  //       showTheSnackbar('Error', message, 'error');
  //     }
  //   })
  //   .catch(err => {
  //     const errMsg = err as Notification;
  //     showTheSnackbar( "Error", errMsg.message, 'error');
  //   });
  // },
},
  
})
</script>

<style lang="css">


label {
  @apply text-sm justify-self-start inline-block w-2/12 text-left;
}

input,
datepicker,
textarea {
  @apply w-9/12 border-solid border bg-white py-1 px-2 leading-4;
  @apply text-site-primary-light;
}

.field-wrapper {
  @apply flex flex-row justify-start mb-2 ml-1;
}
</style>
