<template>
  <section class="flex flex-col justify-start wrapper rounded-sm bg-white shadow-lg border-2 border-gray-400 p-1">
    <p class="flex justify-end flex-row w-full">
      <CloseButton @onClick="closeClicked()"/>
    </p>
    <div class="flex flex-row flex-nowrap w-full justify-between items-center h-72">
      <img
        src="@/assets/icons/left-grey-32.png"
        alt=""
        class="nav-arrow"
        @click="leftArrowClick()"
      >
      <span
        v-for="image in getImages"
        :key="image.url"
        class="w-44 h-auto border border-gray-200 inline-block ml-1 mr-1"
      >
        <img :src="image.url" alt="" @click="imageClicked(image.url)" class="cursor-pointer max-h-48 w-full">
      </span>
      <img
        src="@/assets/icons/right-grey-32.png"
        alt=""
        class="nav-arrow"
        @click="rightArrowClick()"
      >
    </div>
  </section>
</template>

<script lang="ts">
import type { UsersBucket, ImageCardProps } from './types';
import  { defineComponent, type PropType } from 'vue';
import  CloseButton from '@/components/base/baseButton/closeButton/closeButton.vue';

export default defineComponent({
  name: 'ImageGallery',
  
  emits: ['imageClicked', 'closeClicked'],
  
  props: {
    userId: {
      type: String,
      required: true,
    },
    imageDetails: {
      type: Object as PropType<ImageCardProps[]>,
      required: true,
    },
  },
  
  data() {
    return {
      NUMBER_OF_IMAGES_TO_DISPLAY: 4,
      imagePointer: 0,
      maxImages:0,
      tags: [] as string[],
      filters: [] as string[],
      userBucket: Object as any as UsersBucket,
    }
  },

  components: {
    CloseButton,
  },

  computed: {

    getImages() {
      this.maxImages = this.imageDetails.length < this.NUMBER_OF_IMAGES_TO_DISPLAY ? this.imageDetails.length : this.NUMBER_OF_IMAGES_TO_DISPLAY;
      const imageBuffer: ImageCardProps[] = [];
      for (let index = this.imagePointer; index < this.maxImages + this.imagePointer; index++) {
        imageBuffer.push(this.imageDetails[index]);
      }
      return imageBuffer;
    }
  },

  methods: {

    closeClicked() {
      this.$emit('closeClicked')
    },
    
    imageClicked(url: string) {
      this.$emit('imageClicked', url)
    },
    
    leftArrowClick() {
      this.imagePointer--;
      console.log('%c⧭', 'color: #00bf00', this.imagePointer)
      if (this.imagePointer < 0) this.imagePointer = this.imageDetails.length - this.maxImages;
    },
    
    rightArrowClick() {
      this.imagePointer++;
      console.log('%c⧭', 'color: #00bf00', this.imagePointer)
      if (this.imagePointer + this.maxImages > this.imageDetails.length) this.imagePointer = 0;
    },
  }

})

</script>

<style lang="css">
  .nav-arrow {
    @apply cursor-pointer;
    @apply rounded-full;
  }

  .nav-arrow:hover {
    @apply bg-gray-400;
  }

  .wrapper {
    background-color: rgba(0,0,0,0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    position: absolute;
  }
</style>>
