<template>
  <div class="w-8">
    <img
      :id="iconImage.id"
      class="hover: cursor-pointer"
      :class="iconImage.classDef"
      :src="getIcon"
      @click="iconClick"
      @mouseover="displayTooltip(true)"
      @mouseleave="displayTooltip(false)"
    />
    <tooltip :showToolTip="showToolTip" :tooltip="iconImage.tooltip"></tooltip>
  </div>
</template>

<script lang="ts">
import { getImageUrl } from '@/common/getIcon';
import errorMessages from '@/globals/errors/error-messqges';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import tootlipVue from '../notifications/tooltip/tootlip.vue';
import type { Icon } from './model/model';

export default defineComponent ({
  name: 'icon',

  emits: ['iconClick'],

  props: {
    iconImage: {
      type: Object as PropType<Icon>,
      required: true,
    },
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
        console.log('%c⧭', 'color: #0088cc', error)
        console.log(`${errorMessages.files.icons.missingIcon}${this.$props.iconImage.icon}`);
        throw new Error(`${errorMessages.files.icons.missingIcon}${this.$props.iconImage.icon}`);
      }
    }
  },

  methods: {

    iconClick(): void {
      console.log('%c⧭', 'color: #731d6d', this.$props.iconImage.id)
      return this.$emit('iconClick', this.$props.iconImage.id);
    },

    displayTooltip(show: boolean): void {
      this.showToolTip = show && this.$props.iconImage.tooltip !== undefined;
    }
  }

})
</script>