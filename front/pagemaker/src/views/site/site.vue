<template>
  <div class="grid grid-cols-12 mt-8 bg-gray-50">
    <div class=" h-full col-start-1 col-span-4 row-start-1">
      <h2 class="page-heading mt-4 ml-32">{{ site.name }}</h2>
      <div class="ml-32 mt-8 p-4 rounded-lg grid grid-cols-1 gap-2 grid-rows-8 h-86 text-lg text-site-primary border border-gray-300 bg-white relative">
        <img :src="getImageUrl('responsive-48.png')" class="absolute top-4 right-4"/>
        <span class="col-start-1 row-start-1 h-8 font-semibold">Site Name:</span>
        <span class="col-start-1 row-start-3 h-8 font-semibold">Description:</span>
        <span class="col-start-1 row-start-5 h-8 font-semibold">Url:</span>
        <span class="col-start-1 row-start-7 h-8 font-semibold">Last Published:</span>
        <span class="data-element row-start-2">{{ site.name }}</span>
        <span class="data-element row-start-4">{{ site.description }}</span>
        <span class="data-element row-start-6">{{ site.hostingDetails?.defaultUrl }}</span>
        <span class="data-element row-start-8">{{ site.lastPublished }}</span>
      </div>
    </div>
    <div class="col-start-5 row-start-1 col-span-6">
      <div class="grid grid-cols-12 grid-rows-4 gap-1">
        <div class="col-start-4 row-start-2 relative">
            <button class=" big-button "
              @click="isShowSiteName=true"
            >
            <span class="mt-4 text-lg font-bold">Create Hosting Site</span>
          </button>
          <SiteInput :isShowMe="isShowSiteName" @onOkClick="createSite($event)" @onCancel="isShowSiteName=false" class="z-50"/>
        </div>
        <div class="col-start-8 row-start-2 relative">
          <button class=" big-button "
            @click="publishSite()"
          >
          <span class="mt-4 text-lg font-bold">Publish Site</span>
        </button>
      </div>
    </div>
  </div>

  </div>
</template>

<script setup lang="ts">

import { getSiteAndUser } from '@/classes/siteAndUser/siteAndUser';
import { NEW_SITE,  type SiteEntity } from '@/classes/sites/site';
import { displayMessage } from '@/common/displayMessage';
import { siteService } from '@/services/site/site.service';
import { onMounted, ref } from 'vue';
import { getImageUrl } from '@/common/getIcon';
import SiteInput from './siteInput/siteInput.vue';

const site = ref<SiteEntity>(NEW_SITE);
const isShowSiteName = ref(false);

onMounted( async () => {
  const siteAndUser = getSiteAndUser();
  site.value = await siteService().fetchSite(siteAndUser);
});

const getUserAndSiteName = (siteName: string) => {
  const siteAndUser = getSiteAndUser();
  return  {
    userId: siteAndUser.userId,
    siteId: siteAndUser.siteId,
    siteName,
  };
}

const createSite = async (siteName: string) => {
  if (site.value.hostingDetails?.defaultUrl) {
    displayMessage('A hosting site already exists', 'info', `Can't Create`)
  }
  const userAndSiteName = getUserAndSiteName(siteName);
  const result = await siteService().createHostingSite(userAndSiteName);
  site.value = result;
  displayMessage('Site host created', 'success', 'Created');    
};

const publishSite = () => {
  console.log('pending implementation');
  siteService().publishSite();
}


</script>

<style lang="css" scoped>
  .big-button {
    @apply w-32;
    @apply  h-32;
    @apply rounded-md;
    @apply bg-gray-200;
    @apply shadow-lg;
    @apply text-center;
    @apply hover:bg-site-primary;
    @apply hover:text-site-surface;
    @apply cursor-pointer;
  }

  .data-element {
    @apply bg-site-background;
    @apply px-4;
    @apply h-8;
    @apply w-10/12;
    @apply text-site-primary-dark;
  }

</style>