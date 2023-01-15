<template>
  <span class="relative p-1">
    <img
      :src="getIcon"
      :id="toolbarItem.componentName"
      class="cursor-pointer hover:bg-secondary-100 w-12 inline-block py-2"
      @click="iconClick(toolbarItem.componentName)"
      @mouseover="showToolTip=true"
      @mouseleave="showToolTip=false"
      @dragstart="dragStart($event)"
      @dragleave="dragLeave($event)"
      />
    <ToolTip
      v-if="toolbarItem.tooltip !== ''"
      :tooltip="toolbarItem.tooltip"
      :showToolTip="getShowToolTip"
    ></ToolTip>
  </span>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { ToolbarComponentItem } from './model';
import toolTipVue from '@/components/utility/notifications/tooltip/toolTip.vue';
import { getImageUrl } from '@/common/getIcon';
import { drag } from '@/components/utility/composables/draggable/draggable';

  export default defineComponent({
    name: 'toolbarItem',

    emits: ['onClick'],

    props: {
      toolbarItem: {
        type: Object as PropType<ToolbarComponentItem>,
        required: true
      }
    },

    components: {
      ToolTip: toolTipVue,
    },

    data() {
      return {
        showToolTip: false,
        drag: drag(),
      }
    },

    setup() {
      return { getImageUrl }
    },


    computed: {
      getIcon(): string {
        return getImageUrl(this.$props.toolbarItem.sidebarIcon);    
      },

      getShowToolTip(): boolean {
        return this.showToolTip;
      },
    },

    methods: {

      iconClick(componentName: string) {
        this.$emit('onClick', componentName)
      },

      dragStart(event: DragEvent) {
        this.drag.onDragStart(event);
      },

      dragLeave(event: DragEvent) {
        this.drag.onDragLeave(event);
      }

    }


  })
</script>