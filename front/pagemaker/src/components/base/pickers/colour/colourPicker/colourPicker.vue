<template>
  <div>
    <div class="flex flex-row justify-start z-50" @mouseleave="onMouseLeave">
      <ColourPalette :hue="sliderHue" @colour-click="setColour"/>
      <ColourSlider @colour-click="setHue"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ColourPalette from './colourPalette/colourPalette.vue';
import ColourSlider from './colourSlider/colourSlider.vue';

export default defineComponent({
  name: 'colour-picker',
  
  emits: [ 'colourClicked', 'onMouseLeave' ],
  
  props: {
    hue: { 
      type: String,
      required: true,
    }
  },

  components: {
    ColourSlider,
    ColourPalette,
  },

  data() {
    return {
      sliderHue: this.$props.hue ? this.$props.hue.toString() : '#ff',
    }
  },

  methods: {
    
    setColour(rgbColour: string) {
      this.$emit('colourClicked', rgbColour)
    },
    
    onMouseLeave() {
      this.$emit('onMouseLeave')
    },
    
    setHue(hue: string) {
      this.sliderHue = hue;
    },
  }
})
</script>

<style lang="css">
:host {
  @apply block;
  @apply w-auto;
  @apply p-4;
}

.input-wrapper {
  margin-top: 16px;
  display: flex;
  border-radius: 1px;
  border: 1px solid rgb(220, 220, 220);
  padding: 2px;
  height: 32px;
  justify-content: center;
  width: 60%;
  font-size: 8px;
}

.color-div {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid rgb(220, 220, 220);
  background-color: #ff4433;
}

.text {
  flex: 1;
  font-size: 14px;
  font-family: Montserrat;
  line-height: 24px;
}

.text-style {
  font-size: 12px !important;
  font-family: inherit;
  display: inline-block;
  background-color: rgb(189, 173, 173);
  border: 1px solid rgb(220, 220, 220);
  color: rgb(224, 213, 213);
  text-align: center;
  width: 60px;
  padding: 2px 2px;
  margin-left: 20px;
  -webkit-box-shadow: inset 10px 15px 39px -6px rgba(115, 104, 216, 0.58);
  -moz-box-shadow: inset 10px 15px 39px -6px rgba(59, 14, 143, 0.58);
  box-shadow: inset 10px 15px 39px -6px rgba(25, 11, 151, 0.58);
  cursor: pointer;
}

.text-style:hover {
    background-color: rgb(189, 173, 173);
}
</style>
