import type { BucketImage, ImageCardProps, UsersBucket } from '@/components/base/pickers/imageGallery/types';
import { useImagesStore } from '@/stores/images.store';
import { storeToRefs } from 'pinia';
import { axiosClient } from '../httpService';

function userService() {
  const baseRoute = '/users/';
  const imageStore =  useImagesStore();
  const imagesRoute = 'images/';
  const IMAGE_FOLDER = 'images';

  async function getUsersImagesRaw(userId: string): Promise<BucketImage[]> {
    const usersBucket: UsersBucket = {
      bucket: IMAGE_FOLDER
    };
    try {
      return axiosClient().get<BucketImage[]>(`${baseRoute}${userId}/${imagesRoute}imagelist/bucket/${usersBucket.bucket}`);
    } catch(err) {
      console.log('%c⧭', 'color: #1d3f73', err);
      throw (err);
    }
  }

  async function getImageMetaData(userId: string, fileNames: string[]): Promise<ImageCardProps[]> {
    try {
      const route = `${baseRoute}${userId}/${imagesRoute}metadata/bucket/${IMAGE_FOLDER}`;
      return axiosClient().post<ImageCardProps[], string[]>(route, fileNames);
    } catch(err) {
      console.log('%c⧭', 'color: #1d3f73', err);
      throw (err);
    }
  }

  async function retrieveImages(userId: string) {
    const imageListRaw = await getUsersImagesRaw(userId);
    imageStore.setImageListRaw(imageListRaw);
    const files = imageListRaw.map(file => file.name);
    const metadata = await getImageMetaData(userId, files);
    imageStore.setImageListDisplay(metadata);
  }

  return {
    retrieveImages,
  }

}

export { userService };