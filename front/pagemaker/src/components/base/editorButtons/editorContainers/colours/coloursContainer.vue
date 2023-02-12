<template>
  <BackForeBorderSelector @on-change="onAppliesToChange($event)"/>
  <ColourPalettes :site-palette="store.getColourSwatches"
    :simple="true"
    @on-change="onColourChange($event)"
  />
</template>

<script lang="ts">
import type { CommandProperties } from '@/classes/command/model/command';
import type { ColourSwatches } from '@/classes/sites/siteColours/colour/colourPalette';
import { rgbToHex } from '@/common/rgbToHex';
import ColourPalettes from '@/components/base/pickers/colour/sidePanel/colourPlatettes/colourPalettes.vue';
import ColourBackForeBorder from '@/components/colourBackForeBorder/colourBackForeBorder.vue';
import { useSiteStore } from '@/stores/site.store';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  name: 'coloursContainer',

  components: {
    ColourPalettes,
    BackForeBorderSelector: ColourBackForeBorder,
  },

  emits:['onButtonClick'],

  props: {
    selectedColour: {
      type: '' as unknown as PropType<string>,
      required: true,
      default: '#ffffff',
    }
  },

  data() {
    return {
      hue: this.selectedColour,
      store: useSiteStore(),
    }
  },

  methods: {
    onColourChange(colourSwatches: ColourSwatches) {
      let colour = colourSwatches.baseColourHex; 
      if(colour.includes('rgb')) {
        colour = rgbToHex(colourSwatches.baseColourHex);
      }
      const commandProperties: CommandProperties = {
        commandType: 'indirect',
        commandName: 'set-colour',
        payload: colour,
      };
      this.$emit('onButtonClick', commandProperties);
    },

    onAppliesToChange(payload: CommandProperties) {
      this.$emit('onButtonClick', payload);
    }
  }

})
</script>