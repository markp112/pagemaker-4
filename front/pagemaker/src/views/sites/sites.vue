<template>
    <div class="text-accent1 mt-8 ml-8 bg-site-background overflow-hidden">
      <h3 class="page-heading w-full">My Sites</h3>
      <div v-if="hasSites">
        <div class="flex justify-end">
          <BaseButton
            buttonType="primary"
            size="medium"
            variant="solid"
            class="w-36 h-4/6 mr-12 place-self-end"
            @onClick="createNewSite()"
          >
            Create New
          </BaseButton>
        </div>
        <SiteCardContainer :sites="sites"
          @site-clicked="siteClicked($event)"
          @site-edit-clicked="siteEditClick($event)"
          @site-delete-clicked="siteDeleteClicked($event)"
          @site-publish-click="sitePublishClick($event)"
        />
      </div>
      <div v-else>
        <FirstSite @create-new="createNewSite()"/>
      </div>
  </div>
</template>

<script lang="ts">

import type { SiteAndUser } from '@/classes/siteAndUser/siteAndUser';
import type { Site } from '@/classes/sites/site';
import { siteService } from '@/services/site/site.service';
import { sitesService } from '@/services/sites/sites.service';
import { useAuthStore } from '@/stores/auth.store';
import { useSiteStore } from '@/stores/site.store';
import { useSitesStore } from '@/stores/sites.store';
import { defineComponent } from 'vue';
import siteCardContainerVue from './components/sideCardContainer/siteCard.container.vue';
import FirstSite from './components/firstSite/firstSite.vue';
import baseButton from '@/components/base/baseButton/baseButton.vue';

  export default defineComponent({
    name: 'sites',

    components: {
      FirstSite,
      SiteCardContainer: siteCardContainerVue,
      'BaseButton': baseButton,
    },

    data() {
      return {
        store: useSitesStore(),
        siteStore: useSiteStore(),
        userStore: useAuthStore(),
        userId: '',
        hasSites: true,
      }
    },

    async created() {
      this.userId = this.userStore.userUid;
      await sitesService().getSites(this.userId);
      this.hasSites = this.store.sites.length > 0;
    },
    
    methods: {
      async createNewSite(): Promise<void> {
        await sitesService().createNewSite();
        this.$router.push({ name: 'site-editor', params: { title: 'New Site' } });
      },

      async getSiteData(siteId: string, route: string) {
        this.store.setCurrentSite(siteId);
        this.siteStore.setSite(this.store.currentSite); 
        const siteAndUser: SiteAndUser = {
          siteId: siteId,
          userId: this.userId,
        };
        await Promise.all([
          siteService().getSiteMaterialColours(siteAndUser),
          siteService().getSiteColourPalette(siteAndUser),
          siteService().getSiteTypography(siteAndUser),
        ]);
        this.$router.push(route);
      },
      
      siteClicked(siteId: string) {
        this.getSiteData(siteId, `/pagelist` );
      },

      async siteDeleteClicked(siteId: string) {
        await siteService().deleteSite(siteId);
      },

      sitePublishClick(siteId: string) {
        this.siteStore.setSiteId(siteId);
        this.$router.push({ name: 'site',  params: { siteId }})
      },

      async siteEditClick(siteId: string) {
        await this.getSiteData(siteId, `/site-editor`);
        this.$router.push({ name: 'site-editor', params: { title: 'edit site' }})
      }

    },

    computed: {
      sites(): Site[] {
        return this.store.sites;
      },
    },

  })

</script>