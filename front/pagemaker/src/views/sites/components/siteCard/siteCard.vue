<template>
  <div class="flex flex-col justify-start w-64 border-2 shadow-lg bg-site-surface">
    <img :src="site.image" alt="" class="w-full object-cover" />
    <div class="flex flex-row justify-between p-5">
      <p>{{ site.name }}</p>
      <img
        :src="getIcon('pencil32.png')"
        alt=""
        class="cursor-pointer"
        @click="editSiteClick()"
      />
    </div>
    <div class="flex flex-row justify-center align-middle">
      <img
        :src="getIcon('Go-Circle-blue.png')"
        alt=""
        class="object-contain cursor-pointer w-32 h-auto"
        @click="goClick()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import type { Site } from '@/classes/sites';
import { getImageUrl } from '@/common/getIcon';
import { defineComponent, type PropType } from 'vue';

export default defineComponent ({
  name: 'siteCard',
  emits: ['siteClicked', 'editClicked'],

  props: {
    site: {
      type: Object as PropType <Site>,
      required: true,
    }
  },

  methods: {
    
    editSiteClick() {
      this.$emit('editClicked', this.$props.site.siteId);
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
