import type { BucketImage, ImageCardProps } from '@/components/base/pickers/imageGallery/types'
import { defineStore } from 'pinia'

const useImagesStore = defineStore({
  id: 'imagesStore',

  state: () => {
    return {
      _imageListRaw: [] as BucketImage[],
      _imageDisplayList: [] as ImageCardProps[],
      _showGallery: false,
    }
  },

  getters: {
    imageRawList: (state) => {
      return state._imageListRaw;
    },

    imageDisplayList: (state) => {
      return state._imageDisplayList;
    },

    showGallery: (state) => {
      return state._showGallery;
    }

  },

  actions: {
    setImageListRaw(imageList: BucketImage[]) {
      this._imageListRaw = imageList;
    },

    setImageListDisplay(imageList: ImageCardProps[]) {
      this._imageDisplayList = imageList;
    },

    clearImageListRaw() {
      this._imageListRaw = [];
    },

    clearImageDisplayList() {
      this._imageDisplayList = [];
    },

    setShowGallery(show: boolean) {
      this._showGallery = !this._showGallery;
    }

  },
});

export { useImagesStore };
