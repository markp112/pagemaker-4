<template>
  <div class="relative">
    <img
      :src="getIcon"
      class="cursor-pointer hover:bg-secondary-100 w-12"
      @click="iconClick(toolbarItem.componentName)"
      @mouseover="showToolTip=true"
      @mouseleave="showToolTip=false"
    />
    <ToolTip
      v-if="toolbarItem.tooltip !== ''"
      :tooltip="toolbarItem.tooltip"
      :showToolTip="getShowToolTip"
    ></ToolTip>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Toolbar } from './model';
import toolTipVue from '@/components/utility/notifications/tooltip/toolTip.vue';
import { getImageUrl } from '@/common/getIcon';

  export default defineComponent({
    name: 'toolbarItem',

    emits: ['onClick'],

    props: {
      toolbarItem: {
        type: Object as PropType<Toolbar>,
        required: true
      }
    },

    components: {
      ToolTip: toolTipVue,
    },

    data() {
      return {
        showToolTip: false,
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

    }


  })
</script>