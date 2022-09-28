<template>

  <section class="mt-2">
    <h4 class="text-siteSurface mb-8">{{ $props.title }}</h4>
    <div class="sidebar-button-container">
      <ToolbarItem v-for="toolbarItem in toolbarItems"
        :key="toolbarItem.componentRef"
        class="m-2"
        :toolbar-item="toolbarItem"
      />
    </div>
  </section>
  </template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Toolbar } from './model';
import ToolbarItem from './toolbarItem.vue';

  export default defineComponent({
    name: "toolbarContainer",

    props: {
        toolbarItems: {
            type: Array as PropType<Toolbar[]>,
            required: true,
        },
        title: {
            type: String,
            required: true,
        }
    },
    components: { ToolbarItem }
})

</script>