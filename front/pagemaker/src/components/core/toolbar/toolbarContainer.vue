<template>
  <section class="sidebar-button-container">
    <h4 class="text-siteSurface mb-2 block">{{ $props.title }}</h4>
      <ToolbarItem v-for="toolbarItem in toolbarItems"
        :key="toolbarItem.componentRef"
        class="sidebar-container-items"
        :toolbar-item="toolbarItem"
      />
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