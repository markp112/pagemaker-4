<template>
  <Tooltip :showToolTip="showTooltip" :tooltip="buttonData.tooltip">
  <div class="flex flex-row justify-start numeric-input-layout items-center">
    <span class="relative">
      <img :src="getPath(buttonData.displayIcon)"
        class="text-accent-600 cursor-pointer hover:bg-gray-600 mr-2 relative h-10"
        @mouseover="showTooltip = !showTooltip"
        @mouseleave="showTooltip = !showTooltip"
      />
    </span>
      <input type="number"
        v-model="inputValue"
        size="2"
        class="w-10 bg-site-surface text-on-surface text-sm text-right self-center "
        @change="onInputChange()"
      />
  </div>
</Tooltip>
</template>

<script lang="ts">
import type { CommandProperties } from '@/classes/command/model/command';
import { getImageUrl } from '@/common/getIcon';
import { defineComponent, type PropType } from 'vue';
import toolTip from '@/components/utility/notifications/tooltip/toolTip.vue';
import type { EditorButtonNumericSelectList } from '@/classes/commandButtons/model';

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
        commandType: this.buttonData.commandType,
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
  @apply items-center;
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
    @apply items-center;
    @apply justify-start;
  }
}
</style>
