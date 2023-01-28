<template>
  <div>
    <div class="sidebar-button-container relative">
      <div class="flex flex-row justify-start ">
        <img
          :src="getPath(buttonData.displayIcon)"
          alt=""
          class="cursor-pointer hover:bg-gray-600"
          @click="show()"
        />
        <img
          :src="getPath('down-24.png')"
          class="w-4 h-4 cursor-pointer hover:bg-gray-800"
          @click="show()"
        />
      </div>
    </div>
    <div>
      <ul class="dropdown-menu-background flex flex-col items-center absolute w-12 shadow-lg z-20"
        v-if="toggleSelectOptions"
        @mouseleave="show"
        @blur="show"
      >
        <li v-for="iconElement in buttonData.listValues"
          :key="iconElement.classToApply"
          @click="iconClicked(iconElement)"
          class="dropdown-menu-item mb-2 relative "
          :class="{
            'border border-site-primary': iconElement.classToApply === selectedItem
          }"
        >
          <img :src="getPath(iconElement.icon)"
            class="w-8 h-8"
            :class="getClass(iconElement.classToApply)"
            @mouseover.stop="showTooltip = iconElement.icon"
            @mouseleave.stop="showTooltip = ''"
          />
          <Tooltip
            :showToolTip="getShowToolTip(iconElement.icon)"
            :tooltip="iconElement.tooltip"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import toolTip from '@/components/utility/notifications/tooltip/toolTip.vue';
import type { Style } from '@/components/page/model/pageElement/pageElement';
import type { EditorButtonSelectList, SelectListIcon } from '../../model';
import { getImageUrl } from '@/common/getIcon';
import type { CommandProperties } from '@/classes/command/command';

export default defineComponent({
  name:'Select-Button',
  emits: ['onClick'],

  props: {
    buttonData: {
      type: Object as PropType<EditorButtonSelectList>,
      required: true,
    }
  },
  
  components: {
    Tooltip: toolTip
  },

  data() {
    return {
      toggleSelectOptions: false,
      selectedItem: '',
      showTooltip: ''
    }
  },

  methods: {

    iconClicked(iconElement: SelectListIcon) {
      this.selectedItem = iconElement.classToApply;
      const payload: CommandProperties = {
        commandName: 'border',
        payload: iconElement.classToApply,
      };
      this.show();
      this.$emit('onClick', payload)
    },

    show() {
      this.toggleSelectOptions = !this.toggleSelectOptions;
    },

    getPath(image: string): string {
      return getImageUrl(image);
    },

    getClass(classDef: string) {
      return classDef === "hidden" ? "" : classDef;
    },

    getShowToolTip(classDef: string): boolean {
      return this.showTooltip === classDef;
    },
  }
})
</script>
