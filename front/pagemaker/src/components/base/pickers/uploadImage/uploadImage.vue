<template>
  <div class="flex flex-col justify-center align-middle w-full text-sm relative">
    <input
      class="w-full app-input-field  mb-1"
      type="file"
      @change="uploadImage($event)"
      accept="image/png, image/jpeg"
    />
    <input
      class="w-full app-input-field text-sm mb-1"
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
        class="object-contain h-32 mt-2 mb-2 bg-site"
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
    <div class="image-picker w-full relative"
      v-if="showImagePicker"
    >
      <ImageGallery
        :class="getGalleryPosition"
        class="z-30"
        :userId="userId"
        :image-details="images"
        @closeClicked="showImagePicker=false"
        @imageClicked="galleryImageSelected($event)"
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
import type { UploadImage } from './model';

export default defineComponent({
  name:'upload-image',
  
  props: {
    urlEdited: {
      type: String,
      default: ''
    },
    userId: {
      type: String,
      required: true,
    },
    galleryLocation: {
      type: String,
      required: true,
    }
  },

  emits: ['onChange'],

  components: {
    ImageGallery,
    BaseButton,
  },

  data() {
    return {
      urlEditedLocal: '',
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
    if(this.urlEdited) {
      this.url = this.urlEdited;
    }
  },

  computed: {
    getImages() {
      return this.images;
    },

    getGalleryPosition() {
      return `${this.$props.galleryLocation}-0`;
    },
  },

  methods: {

    async showImageGallery() {
      await userService().retrieveImages();
      this.images = this.imageStore.imageDisplayList;
      useImagesStore().setShowGallery();
      this.showImagePicker = true;
    },
    
    dragOver() {
      this.isDragging = true;
    },
    
    dragLeave() {
      this.isDragging = false;
    },

    drop(e: DragEvent) {
      if (e.dataTransfer !== null) {
        const files = e.dataTransfer.files;
        this.wrongFile = false;
        if (files.length === 1) {
          const uploadImage = this.getUploadImage(files[0], 'file');
          this.$emit('onChange', uploadImage);
        }
      }
    },

    onImageLoad() {
      this.updateImage();
    },
    
    maintainClick() {
      this.maintainRatio = !this.maintainRatio;
      this.updateImage();
    },
    
    updateImage() {
      const img = this.$refs.imagePlaceholder as HTMLImageElement;
      const image = new Image();
      image.maintainRatio = this.maintainRatio;
      image.content = this.url;
      image.naturalSize.width.value.value = img.naturalWidth.toString();
      image.naturalSize.height.value.value = img.naturalHeight.toString();
    },
    
    galleryImageSelected(url: string) {
      this.url = url;
      this.updateImage();
      const uploadImage = this.getUploadImage(url, 'url');
      this.$emit('onChange', uploadImage);
    },
    
    uploadImage(event: Event) {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if(files) {
          this.$emit('onChange', this.getUploadImage(files[0], 'file'));
      }

    },
    
    getImageFromUrl() {
      this.hasFile = this.url !== '';
      this.$emit('onChange', this.getUploadImage(this.url, 'url'));
    },

    getUploadImage(image: File | string, type: 'file' | 'url'): UploadImage {
      return {
        image: image,
        type: type,
      };
    },
    
    getImage() {
      if (this.url === '') {
        this.url = this.urlEditedLocal;
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
  
<style lang="css">
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
    height: 72em;
    top: -0px;
  }
</style>
