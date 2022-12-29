import { httpStatusCodes } from '@api/httpStatusCodes';
import { Response } from '@api/types';
import { constructResponse } from '@common/functions/constructResponse';
import { GenericError } from '@errors/index';
import { storage, storageRef } from '@firebase/initFirebase';
import { getDownloadURL, uploadBytes } from '@firebase/storage';

function StorageController() {

  async function transferFileToStorage(file: Express.Multer.File, filename: string, userId: string): Promise<Response> {
    try {
      const ref = `${userId}/images/${filename}`;
      const bucketRef = storageRef(storage, ref);
      await uploadBytes(bucketRef, file.buffer);
      const downloadURL = await getDownloadURL(bucketRef);
      return constructResponse(downloadURL, httpStatusCodes.OK);
      
    } catch (error) {
      console.log('%c⧭', 'color: #99adcc', error);
      throw new GenericError(error.message);
    }
  }

  return { transferFileToStorage };
}

export { StorageController };
