<template>
  <div class="flex flex-col justify-start w-64 border-2 shadow-lg bg-site-surface relative">
    <img :src="site.image" alt="" class="w-full object-cover h-40" />
    <div class="flex flex-row justify-between p-5">
      <p>{{ site.name }}</p>
    </div>
    <div class="grid grid-cols-3 grid-rows-2 gap-2 place-items-center h-32 mt-4" v-if="!showDeleteWarning">

      <span class="row-start-2 col-start-1">
        <img :src="getIcon('trash_can_32.png')"
          class="icon"
          @click="showDeleteWarning=!showDeleteWarning"
          @mouseenter.stop="showDeleteTooltip = !showDeleteTooltip"
          @mouseleave="showDeleteTooltip = !showDeleteTooltip"
        />
        <ToolTip tooltip="Delete Site" :showToolTip="showDeleteTooltip" />
      </span>
        <img :src="getIcon('Go-Circle-blue.png')"
        alt=""
        class="cursor-pointer w-32 h-auto row-start-1 col-start-1 col-span-3"
        @click="goClick()"
        />
      <span class="row-start-2 col-start-3">
        <img :src="getIcon('pencil-32.png')"
          alt="edit"
          class="icon"
          @click="editSiteClick()"
          @mouseenter.stop="showEditTooltip = !showEditTooltip"
          @mouseleave="showEditTooltip = !showEditTooltip"
          />
          <ToolTip tooltip="Edit Site" :showToolTip="showEditTooltip" />
        </span>
    </div>
    <div class="absolute top-40 bg-site-surface w-64 h-48 p-2 transition-propery:height ease-in-out duration-150" v-if="showDeleteWarning">
      <h3 class="text-center text-site-warning font-bold text-xl mb-2 leading-6">Warning</h3>
      <p>This will delete the site and all content relating to the site excluding images.</p>
      <p>Click Yes to proceed or Cancel to abandon</p>
      <span class="flex justify-between mt-2">
        <BaseButton buttonType="primary" 
          size="small" 
          buttonShape="rectangular"
          @onClick="showDeleteWarning=!showDeleteWarning"
        >
          Cancel
        </BaseButton>
        <BaseButton buttonType="primary" size="small" 
          buttonShape="rectangular" 
          class="bg-site-warning text-site-background"
          @click="deleteSite()"
          >
            Yes
          </BaseButton>
      </span>

    </div>
  </div>
</template>

<script lang="ts">
import type { Site } from '@/classes/sites/site';
import { getImageUrl } from '@/common/getIcon';
import { defineComponent, type PropType } from 'vue';
import toolTipVue from '@/components/utility/notifications/tooltip/toolTip.vue';
import baseButtonVue from '@/components/base/baseButton/baseButton.vue';

export default defineComponent ({
  name: 'siteCard',
  emits: ['siteClicked', 'editClicked', 'deleteClicked'],

  props: {
    site: {
      type: Object as PropType <Site>,
      required: true,
    }
  },

  components: {
    ToolTip: toolTipVue,
    BaseButton: baseButtonVue,
  },

  data() {
    return {
      showEditTooltip: false,
      showDeleteTooltip: false,
      showDeleteWarning: false,
    }
  },

  methods: {
    
    editSiteClick() {
      this.$emit('editClicked', this.$props.site.siteId);
    },

    deleteSite() {
      this.$emit('deleteClicked', this.$props.site.siteId);
    },

    getIcon(icon: string) {
      return getImageUrl(icon)
    },
    
    goClick() {
      this.$emit('siteClicked', this.$props.site.siteId);
    }
  },
})
</script>

<style lang="css">
  .icon {
    @apply cursor-pointer h-8 shadow-sm  hover:bg-site-primary transition-all ease-in-out duration-100 relative;
  }

  .warning-animation {
  
  }
</style>