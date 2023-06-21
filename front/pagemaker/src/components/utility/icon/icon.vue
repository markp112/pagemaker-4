<template>
  <tooltip :showToolTip="showToolTip" :tooltip="iconImage.tooltip">
    <span class="inline-block">
      <img
        :id="iconImage.id"
        :ref="iconImage.id"
        class="hover: cursor-pointer"
        :class="classes"
        :src="getIcon"
        @click="iconClick"
        @mouseover="displayTooltip(true)"
        @mouseleave="displayTooltip(false)"
      />
    </span>
</tooltip>
</template>

<script lang="ts">
import { getImageUrl } from '@/common/getIcon';
import errorMessages from '@/globals/errors/error-messqges';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import tootlipVue from '../notifications/tooltip/toolTip.vue';
import type { Icon } from './model/model';

export default defineComponent ({
  name: 'icon',

  emits: ['iconClick'],

  props: {
    iconImage: {
      type: Object as PropType<Icon>,
      required: true,
    },
    classes: {
      type: String,
      default: '',
    }
  },

  setup() {
    return { getImageUrl }
  },

  components: {
    Tooltip: tootlipVue,
  },

  data() {
    return {
      showToolTip: false,
      tooltipPosition: ' left',
    }
  },


  computed: {

    getIcon(): string {
      try {
        const icon =
          this.$props.iconImage.icon !== ''
            ? this.getImageUrl(`${this.$props.iconImage.icon}`)
            : this.getImageUrl(`emoji_waiting-32.png`);
        return icon;
      } catch (error) {
        throw new Error(`${errorMessages.files.icons.missingIcon}${this.$props.iconImage.icon}`);
      }
    }
  },

  methods: {

    iconClick(): void {
      return this.$emit('iconClick', this.$props.iconImage.id);
    },

    displayTooltip(show: boolean): void {
  
      this.showToolTip = show && this.$props.iconImage.tooltip !== undefined;
    },

  },

})
</script>