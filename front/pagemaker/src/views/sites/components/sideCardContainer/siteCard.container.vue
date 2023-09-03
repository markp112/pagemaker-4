<template>
  <div class="flex flex-row justify-center w-full overflow-y-auto p-2" >
    <ul class="flex flex-row justify-around ml-8 w-8/12 mt-20 flex-wrap">
      <li class="ml-3 mt-4" v-for="site in sites" :key="site.siteId">
        <SiteCard :site="site"
          @site-clicked="siteClicked($event)"
          @edit-clicked="siteEditClick($event)"
          @delete-clicked="siteDeleteClick($event)"
          @publish-clicked="sitePublishClick($event)"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import type { SiteEntity } from '@/classes/sites/site';
import { defineComponent, type PropType } from 'vue';
import siteCardVue from '../siteCard/siteCard.vue';

  export default defineComponent({
    name: "siteCardContainer",

    emits:['siteClicked', 'siteEditClicked', 'siteDeleteClicked', 'sitePublishClick'],

    components: {
      SiteCard: siteCardVue,
    }, 

    props: {
      sites: {
        type: Object as PropType<SiteEntity[]>,
        default: [],
      },
    },
  
    methods: {
      siteClicked(siteId: string) {
        this.$emit('siteClicked', siteId);
      },

      siteEditClick(siteId: string) {
        this.$emit('siteEditClicked', siteId);
      },

      siteDeleteClick(siteId: string) {
        this.$emit('siteDeleteClicked', siteId);
      },

      sitePublishClick(siteId: string) {
        this.$emit('sitePublishClick', siteId);
      }
    }
  
  })




</script>