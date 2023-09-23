<template>
  <div class="w-full h-4 ml-2 mt-2 mb-1">
    <ul class="flex flex-row justify-start flex-nowrap font-smaller text-site-secondary-light">
      <li v-for="breadcrumb in breadcrumbs"
        :key="breadcrumb.name"
        @click="routeTo(breadcrumb.name)"
        :class="{ linked: !!breadcrumb.link }"
        class="p-1"
      >
        {{ breadcrumb.name }}
        <span v-if="!!breadcrumb.link">/</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { BreadcrumbLink } from './model';
import { RouteLocationNormalized, RouteRecordName, useRouter } from 'vue-router';

  const breadcrumbs = ref<BreadcrumbLink[]>([]);
  const route = useRouter();

  const isLoginPage = (page: RouteRecordName) => page === 'login';
  const isRouteExisting = (page: RouteRecordName) => { return breadcrumbs.value.findIndex(breadcrumb => breadcrumb.name === page)};

  const addPageToBreadcrumb = (page: RouteLocationNormalized) => {
    if (breadcrumbs.value.filter(breadcrumb => breadcrumb.name === page.name).length === 0) {
      breadcrumbs.value.push({ name: page.name as string, link: page.path})
    }
  };

  const removeChildRoutesAfterTo = (page: RouteRecordName) => {
    const indexOfTo = isRouteExisting(page);
    if(indexOfTo !== -1 && indexOfTo < breadcrumbs.value.length - 1) {
      breadcrumbs.value= breadcrumbs.value.slice(0, indexOfTo + 1);
    }
  };

  route.afterEach((to) => {
      if (isLoginPage(to.name)) {
        breadcrumbs.value = [];
        return;
      }
      addPageToBreadcrumb(to);
      removeChildRoutesAfterTo(to.name)
    }
  )

  const routeTo = (breadcrumb: RouteRecordName) => {
    const link = breadcrumbs.value.filter(bc => bc.name === breadcrumb)[0].link;
    if (link !== undefined) {
      route.push(`${link}`);
    }
  };
    
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
