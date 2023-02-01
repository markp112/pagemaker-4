<template>
  <div class="flex flex-row justify-start numeric-input-layout w-12">
    <span class="relative">
      <img :src="getPath(buttonData.displayIcon)"
        class="text-accent-600 cursor-pointer hover:bg-gray-600 mr-2 relative "
        @mouseover="showTooltip = !showTooltip"
        @mouseleave="showTooltip = !showTooltip"
      />
      <Tooltip :showToolTip="showTooltip" :tooltip="buttonData.tooltip" />
    </span>
      <input type="number"
        v-model="inputValue"
        size="2"
        class="w-10 bg-site-surface text-on-surface text-sm text-right self-center -ml-4 mb-2 "
        @change="onInputChange()"
      />
  </div>
</template>

<script lang="ts">
import type { CommandProperties } from '@/classes/command/model/command';
import { getImageUrl } from '@/common/getIcon';
import { defineComponent, type PropType } from 'vue';
import type { EditorButtonNumericSelectList } from '../../model';
import dropDown from '@/components/base/pickers/dropDown/dropDown.vue';
import toolTip from '@/components/utility/notifications/tooltip/toolTip.vue';

export default defineComponent({
  name:  'numericInputSelect',

  emits: ['onClick'],

  props: {
    buttonData: {
      type: Object as PropType<EditorButtonNumericSelectList>,
      required: true,
    } 
  },

  components: {
    DropDown: dropDown,
    Tooltip: toolTip,
  },

  data() {
    return {
      inputValue: 0,
      showTooltip: false,
    }
  },

  methods: {

    onChange() {
      const commandProperties: CommandProperties = {
        commandName: this.buttonData.commandName,
        payload:  this.inputValue,
      };
      this.$emit('onClick', commandProperties);
    },
    
    onInputChange() {
      this.onChange();
    },
    
    getPath(image: string): string {
      return getImageUrl(image);
    },
  }
})
</script>

<style scoped>
.numeric-input-layout {
  @apply w-full;
  @apply justify-evenly;
}

@screen md {
  .numeric-input-layout {
    @apply flex-col;
    @apply h-auto;
    @apply w-16;
    @apply justify-start;
    @apply items-center;
    @apply p-1;
  }
}

@screen lg {
  .numeric-input-layout {
    @apply flex-row;
    @apply h-12;
    @apply w-3/4;
    @apply justify-start;
  }
}
</style>
