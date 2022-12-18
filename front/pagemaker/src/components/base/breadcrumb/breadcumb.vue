<template>
  <div class="w-full h-4 ml-2 mt-2">
    <ul class="flex flex-row justify-start flex-nowrap font-smaller text-site-secondary-light">
      <li v-for="breadcrumb in breadcrumbs"
        :key="breadcrumb.name"
        @click="routeTo(breadcrumb.name)"
        :class="{ linked: !!breadcrumb.link }"
      >
        {{ breadcrumb.name }}
        <span v-if="!!breadcrumb.link">/</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { BreadcrumbLink } from './model';

export default defineComponent({
  name: 'breadcrumb',

  data() {
    return {
      breadcrumbs: [] as BreadcrumbLink[],
    }
  },

  created() {
    this.breadcrumbs = this.$route.meta.breadcrumb as BreadcrumbLink[];
    this.$watch(() => this.$route.fullPath, this.updateList,{ immediate: true, deep: true });
  },

  methods: {
    routeTo(breadcrumb: string) {
      const link =
      this.breadcrumbs.filter(bc => bc.name === breadcrumb)[0].link;
      if (link != undefined) {
        this.$router.push(`${link}`);
      }
    },
    
    updateList() {
      if (this.$route !== undefined) {
        this.breadcrumbs = [];
        this.breadcrumbs = this.$route.meta.breadcrumb as BreadcrumbLink[];
      }
    },
    
    getbreadCrumbList(): BreadcrumbLink[] {
      return this.breadcrumbs;
    }
  },
  })
</script>

<style lang="postcss">
.linked {
  cursor: pointer;
  color: $accent;
  text-decoration: underline;
}
.linked:hover {
  color: orange;
}
</style>
