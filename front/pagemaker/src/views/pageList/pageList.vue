<template>
  <section class="">
    <div class="flex flex-row justify-between mt-8">
      <h2 class="page-heading ml-4">My Pages</h2>
      <div class="w-auto mr-10">
        <base-button
          class="mr-4"
          buttonType="primary"
          variant="solid"
          @onClick="createNewPage()"
        >
          Create New
        </base-button>
      </div>
    </div>
    <div class="w-full">
      <div class="ml-auto mr-auto grid grid-cols-6 font-bold mt-10 text-lg w-8/12">
          <span class="w-1/12"></span>
          <span class="">Page Name</span>
          <span class="">Date Created</span>
          <span class="">Last Edited</span>
          <span class="w-2/12">Active</span>
          <span class="w-2/12"></span>
      </div>  
    
      <ul class="font-semibold text-lg mt-8">
        <li v-for="page in pageList" 
          :key="page.name"
          class="mx-auto w-8/12 std-list-item mt-1 cursor-pointer rounded-md grid grid-cols-6"
          @click="pageRowClick(page)"
        >
          <span class="flex justify-end mr-8">
            <img :src="getIcon(page.icon)" alt="" class="w-8 h-8"/>
          </span>
          <span class="flex items-start">
            {{ page.name }}
          </span>
          <span class="">
            {{ formatDate(page.created) }}
          </span>
          <span class="">
            {{ formatDate(page.edited) }}
          </span>
          <span class="w-2/12">
            <input type="checkbox" value="page.active" readonly />
          </span>
          <span class="flex justify-start">
            <img
              src="@/assets/icons/pencil-24.png"
              alt="Edit pencil"
              class="w-8 h-8 hover:bg-site-primary cursor-pointer"
            />
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseButton from '@/components/base/baseButton/baseButton.vue';
import { getImageUrl } from '@/common/getIcon';
import { formatDate, } from '@/common/dateFunctions';
import { pagesService } from '@/services/pages/pages.service';
import { usePagesStore } from '@/stores/pages.store';
import { useSiteStore } from '@/stores/site.store';
import { PageService } from '@/services/page/page.service';
import { CommandsService } from '@/services/commandButtons/commandButtons.service';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import type { Page } from '@/components/page/model/pageElement/pageElement';

export default defineComponent({
  name: 'PageList',

  components: {
    BaseButton,
  },

  data() {
    return {
      pagesService: pagesService(),
      pageService: PageService(),
      editorSettingsService: new EditorSettingsService(),
      store: usePagesStore(),
      siteStore: useSiteStore(),
      siteId: '',
      userId: '',
    }
  },

  mounted(): void {
    this.siteId = this.siteStore.site.siteId;
    this.userId = this.siteStore.site.userId;
    this.pagesService.getPageList(this.userId, this.siteId);
  },

  computed: {

    pageList() {
      return this.store.pages;
    },
  },

  methods: {
    
    getIcon (iconName: string){
      return getImageUrl(iconName);
    },

    formatDate(date: Date): string {
      return formatDate(date);
    },
    
    createNewPage() {
      this.pageService.createNewPage(this.siteId);
      this.$router.push({
        name: 'page-editor',
        params: {
          title: 'Create New Page'
        }
      });
    },
    
    async pageRowClick(page: Page) {
      await CommandsService().fetchCommandHierarchy(this.siteId, this.userId);
      this.pageService.setPageContent(page);
      this.$router.push({
        name: 'pagebuilder',
        params: { 
          pageName: page.name,
        }
      });
    }
    },
  })
  </script>
  
  