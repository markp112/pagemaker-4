import { constructResponse } from '../../../../../common/functions/constructResponse';
import { Response } from '@api/types';
import { FullMetadata, getDownloadURL, getMetadata, listAll } from '@firebase/storage';
import { storage, storageRef } from '../../../../../firebase/initFirebase';
import { logger } from '../../../../../logger';
import { handleError } from '@errors/handleError';

type UsersBucket = {
  bucket: string,
  filename?: string,
};

type BucketImage = {
  bucket: string;
  fullPath: string;
  name: string;
};

type MetaData = {
  name: string,
  tags: string[],
  url: string,
};

function userImages() {

  const getStorageRef = (userId: string, bucket: string): string  => `${userId}/${bucket}/`;

  async function getImageList(userId: string, userBucket: UsersBucket): Promise<Response> {
    const path  = getStorageRef(userId, userBucket.bucket);
    try {
      const files: BucketImage[] = [];
      const bucketRef = storageRef(storage, path);
      const fileList = await listAll(bucketRef);
      fileList.items.forEach(item => {
        const bucketImage: BucketImage = {
          bucket: item.bucket,
          fullPath: item.fullPath,
          name: item.name,
        };
        files.push(bucketImage);
      });
      return constructResponse<BucketImage[]>(files, 200);
    } 
    catch (err) {
      handleError(err);
    }
  }

  async function getImageUrl(userId: string, bucket: string, fileName: string): Promise<string> {
    const path = getStorageRef(userId, bucket);
    try {
      const url = await getDownloadURL(storageRef(storage, `${path}/${fileName}`));
      return url;
    } catch (err) {
      handleError(err);
    }
  };

  async function getMetaData(userId: string, userBucket: string, fileName: string): Promise<FullMetadata> {
    const path = getStorageRef(userId, userBucket);
    try {
      const metaData = await getMetadata(storageRef(storage, `${path}/${fileName}`));
      return metaData;
    } catch (err) {
      logger.error(err);
      handleError(err);
    }
  }

  async function buildMetaData(userId: string, bucket: string, fileList: string[]): Promise<MetaData[]> {
    const props = fileList.map( async (file) => {
      const metaData = await getMetaData(userId, bucket, file);
      const url = await getImageUrl(userId, bucket, file);
      const imageFile: MetaData = {
        name: metaData.name,
        url,
        tags: metaData.customMetadata?.tags.split(',')
      };
      return imageFile;
    });
    return await Promise.all(props);
  }

  async function getMetaDataForList(userId: string, bucket: string, fileList: string[]): Promise<Response> {
    const fileProps: MetaData[] = await buildMetaData(userId, bucket, fileList);  
    return constructResponse<MetaData[]>(fileProps, 200);
  }

  return {
    getImageUrl,
    getImageList,
    getMetaDataForList,
  }
};

export { userImages };

export type { UsersBucket };
