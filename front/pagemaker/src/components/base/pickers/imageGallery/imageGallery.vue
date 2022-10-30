<template>
  <section class="flex flex-col justify-start h-72 p-1 w-full rounded-sm bg-white shadow-lg border-2 border-gray-400">
    <p class="flex justify-end flex-row w-full">
      <CloseButton @onClick="closeClicked()"/>
    </p>
    <div class="flex flex-row flex-nowrap w-full justify-between items-center h-full">
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
        <img :src="image.url" alt="" @click="imageClicked(image.url)" class="cursor-pointer">
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
  name:'ImageGallery',

  props: {
    userId: {
      type: String,
      required: true,
    },
    imageDetails: {
      type: Object as PropType<ImageCardProps[]>,
      required: true,
    }
  },

  data() {
    return {
      imagePointer: 0,
      maxImages:0,
      images: Object as any as ImageCardProps[],
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
      this.maxImages = this.images.length < 3 ? this.images.length : 3;
      const imageBuffer: ImageCardProps[] = [];
      for (let index = this.imagePointer; index < this.maxImages + this.imagePointer; index++) {
        imageBuffer.push(this.images[index]);
      }
      return imageBuffer;
    }
  },

  methods: {

    closeClicked() {
      this.$emit('closeClicked')
    },
    
    imageClicked(url: string) {
      this.$emit('imageClicked')
    },
    
    leftArrowClick() {
      this.imagePointer--;
      if (this.imagePointer < 0) this.imagePointer = this.images.length - this.maxImages;
    },
    
    rightArrowClick() {
      this.imagePointer++;
      if (this.imagePointer + this.maxImages > this.images.length) this.imagePointer = 0;
    },
    
    // getImagesFromBucket() {
    //   this.images = [];
    //   this.getImageDetailsFromStorage()
    //   .then(files => {
    //     const fileList = files;
    //     this.getFileUrls(fileList);
    //   });
    // }
    addTagsToTags(tags: string[]) {
    const tempTags = new Set([...this.tags, ...tags]);
    this.tags = [...tempTags];
    this.tags.sort();
  }
  }

  // private getImageDetailsFromStorage(): Promise<BucketImage[]> {
  //   let fileList: BucketImage[] = [];
  //   return new Promise((resolve, reject) => {

  //     getImagesFromBucket(this.userBucket)
  //     .then(files => {
  //       fileList = (files as BucketImage[]);
  //       resolve(fileList);
  //     });
  //   });
  // }

  // private getFileUrls(fileList: BucketImage[]) {
  //   fileList.forEach(bucketImage => {
  //     getFileUrl(bucketImage.name, this.userBucket)
  //     .then (url => {
  //       const image: ImageCardProps = {
  //         url: url,
  //         title: bucketImage.name,
  //         tags: [],
  //       };
  //       getImageMetaData(bucketImage.name, this.userBucket)
  //       .then (tags => {
  //         if (tags.length > 0) {
  //           image.tags = tags;
  //           this.addTagsToTags(tags)
  //         }
  //         this.images.push(image);
  //       })
  //     });
  //   });
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
</style>>
