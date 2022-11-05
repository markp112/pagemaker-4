<template>
  <div class="flex flex-col justify-center align-middle w-full text-sm relative">
    <input
      class="w-full app-input-field text-site-primary-dark mb-1"
      type="file"
      @change="setImage($event.target)"
      accept="image/png, image/jpeg"
    />
    <input
      class="w-full app-input-field text-sm text-site-primary-dark  mb-1"
      type="text"
      @change="getImageFromUrl()"
      placeholder="or paste URL"
      name="url"
      v-model="url"
    />
    <div
      class="image-drop flex flex-col justify-start "
      :class="{ 'is-dragging': isDragging }"
      @dragstart.prevent="dragOver()"
      @dragover.prevent="dragOver()"
      @dragleave.prevent="dragLeave()"
      @drop.prevent="drop($event)"
    >
      <h3
        v-if="url ===''"
        class="z-10 fixed font-bold text-site-primary-dark flex-row flex-wrap justify-start p-1 mb-1 block"
      >
        Upload a file by dropping it here
      </h3>
      <img
        :src="url"
        class="border object-contain h-32 mt-2"
        ref="imagePlaceholder"
        @load="onImageLoad()"
      />
    </div>
    <div class="flex flex-row justify-start w-full items-center h-8">
      <label for="maintain-ratio" class="w-6/12">Maintain Ratio</label>
      <input
        type="checkbox"
        class="w-2/12"
        @click="maintainClick"
        :checked="maintainRatio"
        id="maintain-ratio"
      />
    </div>
    <div class="my-2 w-16">
      <BaseButton
        size="small"
        buttonType="primary"
        variant="solid"
        @onClick="showImageGallery"

      >
        Library
      </BaseButton>
    </div>
    <div
      class="image-picker w-full relative"
      v-if="showImagePicker"
      >
      <ImageGallery
        :userId="userId"
        :image-details="images"
        @closeClicked="showImagePicker=false"
        @imageClicked="imageClicked($event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/base/baseButton/baseButton.vue' ;
import ImageGallery from '../imageGallery/imageGallery.vue';
import { defineComponent } from 'vue';
import { getImageUrl } from '@/common/getIcon';
import { userService } from '@/services/user/userService';
import { useImagesStore } from '@/stores/images.store';
import type { ImageCardProps } from '../imageGallery/types';
import { Image } from '@/classes/image/image';

export default defineComponent({
  name:'upload-image',
  
  props: {
    urlEdited: {
      type: String,

    },
    userId: {
      type: String,
      required: true,
    },
  },

  emits: ['imageChanged'],

  components: {
    ImageGallery,
    BaseButton,
  },

  data() {
    return {
      urlEdited: '',
      url: '',
      isDragging: false,
      wrongFile: false,
      hasFile: false,
      maintainRatio: true,
      showImagePicker: false,
      userService: userService(),
      imageStore: useImagesStore(),
      images: [] as ImageCardProps[],
    }
  },

  mounted() {
    this.url = this.urlEdited;
  },

  computed: {
    getImages() {
      return this.images;
    },
  },

  methods: {

    updateImage() {
      const img = this.$refs.imagePlaceholder as HTMLImageElement;
      const image = new Image();
      image.maintainRatio = this.maintainRatio;
      image.content = this.url;
      image.naturalSize.width.value = img.naturalWidth;
      image.naturalSize.height.value = img.naturalHeight;
      this.$emit('imageChanged', image);
    },

    async showImageGallery() {
      await userService().retrieveImages(this.$props.userId);
      this.images = this.imageStore.imageDisplayList;
      this.showImagePicker = true;
    },
    
    dragOver() {
      this.isDragging = true;
    },
    
    dragLeave() {
      this.isDragging = false;
    },
    
    onImageLoad() {
      this.updateImage();
    },
    
    maintainClick() {
      this.maintainRatio = !this.maintainRatio;
      this.updateImage();
    },
    
    drop(e: DragEvent) {
      if (e.dataTransfer !== null) {
        const files = e.dataTransfer.files;
        this.wrongFile = false;
        // allows only 1 file
        if (files.length === 1) {
          const file = files[0];
          // return new Promise((resolve, reject) => {
            
          //   firestoreSaveFile(file, this.siteAndUser).then(result => {
          //     this.hasFile = true;
          //     this.url = result.message;
          //     this.updateImage();
          //     resolve('');
          //   });
          // });
        }
      }
    },
    
    imageClicked(url: string) {
      this.url = url;
      this.updateImage();
    },
    
    setImage(target:Event['target']) {


    //   const url = file[0];
    //   return new Promise((resolve, reject) => {
    //     firestoreSaveFile(file[0], this.siteAndUser)
    //     .then(result => {
    //       this.url = result.message;
    //       this.updateImage();
    //       resolve('');
    //     })
    //     .catch(err => reject(err));
    //   });
    },
    
    getImageFromUrl() {
      this.hasFile = this.url !== '';
    },
    
    getImage() {
      if (this.url === '') {
        this.url = this.urlEdited;
        return this.url === ''
        ? getImageUrl('imageplaceholder-100x83.png')
        : this.url;
      } else {
        return this.url;
      }
    },
  },   
})
</script>
  
<style lang="postcss">
  .image-drop {
    width: 100%;
    @apply h-full;
    background-color: #eee;
    @apply flex;
    @apply flex-row;
    @apply justify-center;
  }

  .is-dragging {
    background-color: rgba(217, 196, 184);
  }

  .image-picker {
    width: 100%;
    height: 240px;
    top: -0px;
    left: 0px;
  }
</style>
