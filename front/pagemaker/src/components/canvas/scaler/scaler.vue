<template>
  <div  :style="getWidth()">
    <label for="" class="block">{{ slider.label }}</label>
    <span class="rangeValue">{{ slider.min }}</span>
    <Input class="range" 
      type="range" 
      name="Zoom" 
      v-model="sliderValue"
      :min="slider.min"
      :max="slider.max" 
      @change="rangeSlide($event.target.value)" 
      @mousemove="rangeSlide($event.target.value)"></Input>
    <span class="rangeValue">{{ slider.max }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { SliderSettings } from './model';

export default defineComponent({
    name:'slider',
    emits: ['sliderChange'],

    props: {
      slider: {
        type: Object as PropType<SliderSettings>,
        required: true
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

    methods: {

      rangeSlide(value: string) {
        console.log('%c%s', 'color: #7f7700', value)
        this.sliderValue = parseInt(value);
        this.$emit('sliderChange', this.sliderValue)
      },

      getWidth() {
        return `width:${this.$props.slider.width}`;
      }
    },
  })
</script>

<style scoped>
div {
  @apply absolute;
  @apply top-0;
  @apply left-2;
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