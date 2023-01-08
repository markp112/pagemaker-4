<template>
  <section class="container w-full">
    <div class="flex flex-row justify-between mt-8">
      <h2 class="page-heading ml-4">My Pages</h2>
      <div class="w-auto">
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
    <div class="flex flex-row justify-center font-bold mt-10 text-lg">
        <div class="basis-2/12"></div>
        <div class="basis-2/12">Page Name</div>
        <div class="basis-2/12">Date Created</div>
        <div class="basis-2/12">Last Edited</div>
        <div class="basis-2/12">Active</div>
        <div class="basis-2/12"></div>
    </div>  
    
      <ul class="flex flex-row justify-center font-semibold text-lg w-full">
        <li v-for="page in pageList" 
          :key="page.name"
          class="hover:bg-site-secondary-light hover:text-accent-1 p-1 mt-1 cursor-pointer rounded-md flex flex-row justify-start w-full ml-2"
          @click="pageRowClick(page.name)"
        >
              <span class="basis-2/12 self-end"></span>
              <span class="basis-2/12">
                <img :src="getIcon(page.icon)" alt="" class="w-8 h-8 inline-block mr-2 -ml-8"/>
                {{ page.name }}
              </span>
              <span class="basis-2/12">
                {{ formatDate(page.created) }}
              </span>
              <span class="basis-2/12">
                {{ formatDate(page.edited) }}
              </span>
              <span class="basis-2/12 -ml-16">
                <input type="checkbox" value="page.active" readonly />
              </span>
              <img
              src="@/assets/icons/pencil-24.png"
              alt="Edit pencil"
              @click="editPageClick(page.name)"
              class="w-8 h-8 hover:shadow-xl cursor-pointer"
              />
        </li>
      </ul>
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

export default defineComponent({
  name: 'PageList',

  components: {
    BaseButton,
  },

  data() {
    return {
      pagesService: pagesService(),
      pageService: PageService(),
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
    
    editPageClick(pageName: string): void {
    },
    
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
    
    pageRowClick(pageName: string) {
      this.$router.push({
        name: 'home',
        params: {
          title: pageName,
        },
      });
    }
    },
  })
  </script>
  