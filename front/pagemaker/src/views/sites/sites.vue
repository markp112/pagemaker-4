<template>
  <section>
    <div class="flex flex-row justify-between text-accent1 mt-8 bg-site-background overflow-hidden">
      <h2 class="page-heading ml-4 text-on-secondary">My Sites</h2>
      <div class="w-32 h-4/6">
        <!-- <base-button
          class="mr-4 w-32"
          buttonType="primary"
          variant="solid"
          @onClick="createNewSite()"
        >
          Create New
        </base-button> -->
      </div>
    </div>
    <ul class="flex flex-row justify-evenly w-full mt-20">
      <li class="ml-3" v-for="site in sites" :key="site.siteId">
        <SiteCard :site="site" @site-clicked="siteClicked($event)" />
      </li>
    </ul>
  </section>
</template>

<script lang="ts">

import type { Site } from '@/classes/sites';
import { sitesService } from '@/services/sites/sites.service';
import { useAuthStore } from '@/stores/auth.store';
import { useSiteStore } from '@/stores/site.store';
import { useSitesStore } from '@/stores/sites.store';
import { defineComponent } from 'vue';
import SiteCard from './components/siteCard/siteCard.vue';


  export default defineComponent({
    name: 'sites',

    components: {
      SiteCard: SiteCard,
    },

    data() {
      return {
        store: useSitesStore(),
        siteStore: useSiteStore(),
        userStore: useAuthStore(),
      }
    },

    async mounted() {
      const userId = this.userStore.userUid;
      await sitesService().getSites(userId);
    },

    methods: {
      createNewSite(): void {
        this.$router.push({ name: 'newSite', params: { title: 'New Site' } });
      },

      
      siteClicked(siteId: string) {
        console.log('%c%s', 'color: #99614d', siteId);
        this.store.setCurrentSite(siteId);
        this.siteStore.setSite(this.store.currentSite);
        // const siteDefaultSettings = SiteDefaults.getInstance();
        // // move to pageList
        //   siteDefaultSettings.loadDefaults()
        //     .then(() => {
          //       this.$router.push({ name: "pageList" });
          //     })
          //     .catch(err => {
            //       console.log('%c⧭', 'color: #514080', err)
            //       // showTheSnackbar('Warning', 'Site defaults load failed, - defaults applied', 'warning')
            //     });
            //   }
            
          },
        },

        computed: {
          sites(): Site[] {
            console.log('%c⧭', 'color: #d0bfff', this.store.sites)
            return this.store.sites;
          }
        }

  })

</script>