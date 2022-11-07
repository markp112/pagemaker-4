import type { BucketImage, ImageCardProps } from '@/components/base/pickers/imageGallery/types'
import { defineStore } from 'pinia'

const useImagesStore = defineStore({
  id: 'imagesStore',

  state: () => {
    return {
      _imageListRaw:[] as  BucketImage[],
      _imageDisplayList: [] as ImageCardProps[],
    }
  },

  getters: {
    imageRawList: (state) => {
      return state._imageListRaw;
    },

    imageDisplayList: (state) => {
      return state._imageDisplayList
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


  },
});

export { useImagesStore };
