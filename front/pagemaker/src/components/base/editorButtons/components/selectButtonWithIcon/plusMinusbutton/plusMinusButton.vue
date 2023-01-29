<template>
  <div
    class="flex flex-row justify-center items-center relative"
  >
    <img
      :src="getPath(buttonData.displayIcon)"
      @mouseover="showToolTip=!showToolTip"
      @mouseleave="showToolTip=!showToolTip"
      class="text-accent-600 cursor-pointer hover:bg-gray-600"
    />
    <div class="flex flex-col items-center">
      <span
      class="icon-img plus h-4 inline-block w-4"
      @click="lineThicknessChange(1)"
      ></span>
      <span
        class="icon-img minus h-4 inline-block w-4"
        @click="lineThicknessChange(-1)"
      ></span>
    </div>
    <Tooltip
      :tooltip="buttonData.tooltip"
      :showToolTip="showToolTip"
    />
  </div>
</template>

<script lang="ts">
import { getImageUrl } from '@/common/getIcon';
import { defineComponent, type PropType } from 'vue';
import toolTip from '@/components/utility/notifications/tooltip/toolTip.vue';
import type { EditorButtonBase } from '../../../model';
import type { CommandProperties } from '@/classes/command/model/command';

export default  defineComponent ({
  name: 'plusMinusIcon',

  props: {
    buttonData: {
      type: Object as PropType<EditorButtonBase>,
      required: true,
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

  methods: {

    lineThicknessChange(value: number) {
      const commandProperties: CommandProperties = {
        commandName: 'line-thickness',
        payload: value
      };
      this.$emit('onClick', commandProperties);
    },
    
    getPath(image: string): string {
      return getImageUrl(image);
    },
  }
})
</script>

<style lang="css" scoped>
.icon-img {
  background-size: 16px 16px;
  background-position: center;
}

.plus {
  background-image: url("../../../../../../assets/icons/plus-24.png");
}

.plus:hover {
  background-image: url("../../../../../../assets/icons/plus-olive-24.png");
}
.minus {
  background-image: url("../../../../../../assets/icons/minus-24.png");
}

.minus:hover {
  background-image: url("../../../../../../assets/icons/minus-olive-24.png");
}
</style>
