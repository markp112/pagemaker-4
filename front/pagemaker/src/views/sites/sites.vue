<template>
    <div class="text-accent1 mt-8 ml-8 bg-site-background overflow-hidden">
      <h3 class="page-heading w-full">My Sites</h3>
      <div v-if="hasSites">
        <div class="flex justify-end">
          <base-button
            buttonType="primary"
            size="medium"
            variant="solid"
            class="w-36 h-4/6 mr-12 place-self-end"
            @onClick="createNewSite()"
          >
            Create New
          </base-button>
        </div>
        <div class="flex flex-row justify-center w-full overflow-y-auto p-2" >
        <ul class="flex flex-row justify-around ml-8 w-8/12 mt-20 flex-wrap">
          <li class="ml-3 mt-4" v-for="site in sites" :key="site.siteId">
            <SiteCard :site="site"
              @site-clicked="siteClicked($event)"
              @edit-clicked="siteEditClick($event)"
            />
          </li>
        </ul>
        </div>
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
import SiteCard from './components/siteCard/siteCard.vue';
import FirstSite from './components/firstSite/firstSite.vue';
import baseButton from '@/components/base/baseButton/baseButton.vue';

  export default defineComponent({
    name: 'sites',

    components: {
      SiteCard: SiteCard,
      FirstSite,
      'base-button': baseButton,
    },

    data() {
      return {
        store: useSitesStore(),
        siteStore: useSiteStore(),
        userStore: useAuthStore(),
        userId: '',
        hasSites: false,
      }
    },

    async mounted() {
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
        try {
          this.getSiteData(siteId, `/pagelist` );
        } catch (error) {
            console.log('%c⧭', 'color: #5200cc', error)
        }
      },

      async siteEditClick(siteId: string) {
        try {
          await this.getSiteData(siteId, `/site-editor`);
          this.$router.push({ name: 'site-editor', params: { title: 'edit site' }})
        } catch (error) {
            console.log('%c⧭', 'color: #5200cc', error)
        }
      }

    },

    computed: {
      sites(): Site[] {
        return this.store.sites;
      },
    },

  })

</script>