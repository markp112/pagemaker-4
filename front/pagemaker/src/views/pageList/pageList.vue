<template>
  <section>
    <div class="flex flex-row justify-between mt-8">
      <h2 class="page-heading ml-4">My Pages</h2>
      <div class="w-32">
        <base-button
          class="mr-4 w-32"
          buttonType="primary"
          variant="solid"
          @onClick="createNewPage()"
        >
          Create New
        </base-button>
      </div>
    </div>
    <div class="flex flex-row justify-evenly font-bold ml-4 mt-10">
      <span class="w-1/12"></span>
      <span class="w-2/12">Page Name</span>
      <span class="w-2/12">Date Created</span>
      <span class="w-2/12">Last Edited</span>
      <span class="w-2/12">Active</span>
      <span class="w-1/12"></span>
    </div>
    <ul class="flex flex-col justify-start ml-4">
      <li v-for="page in pageList" :key="page.name" class="">
        <div class="flex flex-row justify-start">
          <span
            class="hover:bg-site-secondary-light hover:text-accent-1 w-11/12 p-1 mt-1 flex flex-row justify-evenly items-center cursor-pointer rounded-md"
            @click="pageRowClick(page.name)"
          >
            <span class="w-1/12">
              <span class="w-8 shadow-md">
                <img :src="getIcon(page.icon)" alt=""/>
              </span>
            </span>
            <span class="w-2/12 text-left">
              {{ page.name }}
            </span>
            <span class="w-2/12">
              {{ formatDate(page.created) }}
            </span>
            <span class="w-2/12">
              {{ formatDate(page.edited) }}
            </span>
            <span class="w-2/12 self-start">
              <input type="checkbox" value="page.active" readonly />
            </span>
          </span>
          <img
            src="@/assets/icons/pencil-24.png"
            alt="Edit pencil"
            @click="editPageClick(page.name)"
            class="w-8 h-8 hover:shadow-xl cursor-pointer"
          />
        </div>
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

export default defineComponent({
  name: 'PageList',

  components: {
    BaseButton,
  },

  data() {
    return {
      pagesService: pagesService(),
      store: usePagesStore(),
      siteStore: useSiteStore(),
    }
  },

  mounted(): void {
    const siteId = this.siteStore.site.siteId;
    const userId = this.siteStore.site.userId;
    this.pagesService.getPageList(userId, siteId);
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
      this.$router.push({
        name: 'page-editor',
        params: {
          title: 'Create New Page'
        }
      });
    },
    
    pageRowClick(pageName: string) {
      this.$router.push({
        name: 'page-builder',
        params: {
          title: pageName,
        },
      });
    }
    },
  })
  </script>
  