<template>
  <section>
    <div class="flex flex-row justify-between text-accent1 mt-8 bg-site-background overflow-hidden">
      <h2 class="page-heading ml-4 text-site-primary-dark">My Sites</h2>
      <div class="w-32 h-4/6">
        <base-button
          class="mr-4 w-32"
          buttonType="primary"
          variant="solid"
          @onClick="createNewSite()"
        >
          Create New
        </base-button>
      </div>
    </div>
    <ul class="flex flex-row justify-evenly w-full mt-20">
      <li class="ml-3" v-for="site in sites" :key="site.siteId">
        <SiteCard :site="site"
          @site-clicked="siteClicked($event)"
          @edit-clicked="siteEditClick($event)"
        />
      </li>
    </ul>
  </section>
</template>

<script lang="ts">

import type { SiteAndUser } from '@/classes/siteAndUser/siteAndUser';
import type { Site } from '@/classes/sites';
import { siteService } from '@/services/site/site.service';
import { sitesService } from '@/services/sites/sites.service';
import { useAuthStore } from '@/stores/auth.store';
import { useSiteStore } from '@/stores/site.store';
import { useSitesStore } from '@/stores/sites.store';
import { defineComponent } from 'vue';
import SiteCard from './components/siteCard/siteCard.vue';
import baseButton from '@/components/base/baseButton/baseButton.vue';


  export default defineComponent({
    name: 'sites',

    components: {
      SiteCard: SiteCard,
      'base-button': baseButton,
    },

    data() {
      return {
        store: useSitesStore(),
        siteStore: useSiteStore(),
        userStore: useAuthStore(),
        userId: '',
      }
    },

    async mounted() {
      this.userId = this.userStore.userUid;
      await sitesService().getSites(this.userId);
    },

    methods: {
      createNewSite(): void {
        this.$router.push({ name: 'newSite', params: { title: 'New Site' } });
      },

      async getSiteDefaults(siteId: string, route: string) {
        this.store.setCurrentSite(siteId);
        this.siteStore.setSite(this.store.currentSite); 
        const siteAndUser: SiteAndUser = {
          siteId: siteId,
          userId: this.userId,
        };
        await Promise.all([
          siteService().getSiteMaterialColours(siteAndUser),
          siteService().getSiteColourPalette(siteAndUser),
        ]);
        this.$router.push(route);
      },
      
      siteClicked(siteId: string) {
        try {
          this.getSiteDefaults(siteId, `/pagelist` );
        } catch (error) {
            console.log('%c⧭', 'color: #5200cc', error)
        }
      },

      async siteEditClick(siteId: string) {
        try {
          await this.getSiteDefaults(siteId, `/site-editor`);
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