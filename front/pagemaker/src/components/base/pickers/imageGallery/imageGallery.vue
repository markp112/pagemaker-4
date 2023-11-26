<template>
  <teleport to="#library-target" v-if="isOpen">
    <section class="z-50 bg-white shadow-lg border-2 rounded-lg border-gray-400 p-1 w-8/12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <p class="flex justify-end flex-row w-full">
        <CloseButton @onClick="closeClicked()"/>
      </p>
      <div class="flex flex-row h-auto justify-between items-center min-w-fit mt-4 mb-4">
        <img
        src="@/assets/icons/left-grey-32.png"
        alt=""
        class="nav-arrow"
        @click="leftArrowClick()"
        >
        <span
          v-for="image in getImages"
          :key="image.url"
          class="w-52 inline-block ml-1 mr-1"
        >
        <span class="inline-block h-auto border border-gray-200">
          <img :src="image.url" alt="" @click="imageClicked(image.url)" class="cursor-pointer w-full">
        </span>
      </span>
      <img
        src="@/assets/icons/right-grey-32.png"
        alt=""
        class="nav-arrow"
        @click="rightArrowClick()"
        >
      </div>
    </section>
    </teleport>
</template>

<script lang="ts">
import type { UsersBucket, ImageCardProps } from './types';
import  { defineComponent, type PropType } from 'vue';
import  CloseButton from '@/components/base/baseButton/closeButton/closeButton.vue';
import { useImagesStore } from '@/stores/images.store';

export default defineComponent({
  name: 'ImageGallery',
  
  emits: ['imageClicked', 'closeClicked', 'openClicked'],
  
  props: {
    imageDetails: {
      type: Object as PropType<ImageCardProps[]>,
      required: true,
    },
  },
  
  data() {
    return {
      NUMBER_OF_IMAGES_TO_DISPLAY: 5,
      imagePointer: 0,
      maxImages: 0,
      tags: [] as string[],
      filters: [] as string[],
      userBucket: Object as any as UsersBucket,
      imagesStore: useImagesStore(),
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
    },

    isOpen() {
      return this.imagesStore.showGallery;
    },
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
      if (this.imagePointer < 0) this.imagePointer = this.imageDetails.length - this.maxImages;
    },
    
    rightArrowClick() {
      this.imagePointer++;
      if (this.imagePointer + this.maxImages > this.imageDetails.length) this.imagePointer = 0;
    },

    showImageGallery() {
      this.$emit('openClicked');
    },

    closeImageGallery() {
      this.$emit('closeClicked');
    }
  }

})

</script>

<style lang="css">
  .nav-arrow {
    @apply cursor-pointer;
    @apply rounded-full;
    @apply h-10;
    @apply self-center;
  }

  .nav-arrow:hover {
    @apply bg-site-primary-dark;
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
