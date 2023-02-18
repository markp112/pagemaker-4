<template>
  <div class="flex flex-row justify-center items-center relative cursor-pointer hover:bg-gray-600"
    :class="getIsActive"
    >
    <img :src="getPath(buttonData.displayIcon)"
      @mouseover="showToolTip=!showToolTip"
      @mouseleave="showToolTip=!showToolTip"
      class="icon-img"
      @click="handleClick()"
    />
    <slot></slot>
    <Tooltip :tooltip="buttonData.tooltip" :showToolTip="showToolTip" class="left-8"/>
  </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import toolTip from '@/components/utility/notifications/tooltip/toolTip.vue';
import { getImageUrl } from '@/common/getIcon';
import type { EditorButtonBase } from '../../model';

export default defineComponent({
  name: 'iconImageButton',

  props: {
    buttonData: {
      type: Object as PropType<EditorButtonBase>,
      required: true,
    },
    activeCommandName: {
      type: String,
      default: false,
    }
  },

  emits: ['onClick'],

  
  data() {
    return {
      showToolTip: false,
    }
  },

  components: {
    Tooltip: toolTip,
  },

  computed: {
    getIsActive() {
      return this.buttonData.commandName === this.activeCommandName ? 'border border-solid border-white' : '';
    }
  },

  methods: {
    getPath(image: string): string {
      return getImageUrl(image);
    },

    handleClick() {
      this.$emit('onClick', this.buttonData);
    },

  
  },
})

</script>

<style lang="css" scoped>
.icon-img {
  width: 32px;
  height: auto;
  background-position: center;
};

.active-command {
  background-color: aqua;
  border-style: dotted;
  border: 1px blanchedalmond;
}

</style>