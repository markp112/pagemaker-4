<template>
  <div :style="{'width': slider.width + 'px' }" :class="getPosition" class="z-50">
    <label for="" class="block">{{ slider.label }}</label>
    <span class="rangeValue">{{ slider.min }}</span>
    <input class="range" 
      type="range"
      name="Zoom" 
      v-model="sliderValue"
      :min="slider.min"
      :max="slider.max" 
      @mousemove.self="rangeSlide()"/>
    <span class="rangeValue">{{ slider.max }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { SliderPosition, SliderSettings } from './model';

export default defineComponent({
    name:'slider',
    emits: ['sliderChange'],

    props: {
      slider: {
        type: Object as PropType<SliderSettings>,
        required: true
      },
      position: {
        type: Object as PropType<SliderPosition>
      }
    },

    mounted() {
      this.sliderValue = this.$props.slider.initialValue;
    },

    data() {
      return {
        sliderValue: 0,
      }
    },

    computed: {
      getWidth() {
        return `width:${this.$props.slider.width};`;
      },

      getPosition() {
        return `${this.$props.position?.left} ${this.$props.position?.top}`;
      }
    },

    methods: {

      rangeSlide() {
        this.$emit('sliderChange', this.sliderValue)
      },
    },
  })
</script>

<style scoped>
div {
  @apply absolute;
}
.rangeValue {
  @apply relative;
  @apply text-center;
  @apply text-sm;
  @apply text-site-primary-dark;
  @apply font-normal;
  @apply ml-1;
  @apply mr-1;
}
.range {
  @apply h-4;
  @apply appearance-none;
  @apply bg-site-primary-light;
  @apply appearance-none;
  @apply rounded-lg;
  @apply truncate;
  @apply w-8/12
  /* box-shadow: inset 0 0 5px rgba(0, 0, 0, 1); */
}
.range::-webkit-slider-thumb {
  /* -webkit-appearance: none; */
  @apply w-4;
  @qpply h-4;
  @apply rounded-sm;
  @apply bg-site-primary-light;
  @apply cursor-pointer;
  @apply border;
  @apply border-2;
  @apply border-site-primary;
  box-shadow: -407px 0 0 400px #050772;
}

</style>