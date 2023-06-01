import { httpStatusCodes } from '@api/httpStatusCodes';
import { Response } from '@api/types';
import { constructResponse } from '@common/functions/constructResponse';
import { handleError } from '@errors/handleError';
import { storage, storageRef } from '@fbase/initFirebase';
import { getDownloadURL, uploadBytes } from '@firebase/storage';

function StorageController() {

  async function transferFileToStorage(file: Express.Multer.File, filename: string, userId: string): Promise<Response> {
    try {
      const ref = `${userId}/images/${filename}`;
      const bucketRef = storageRef(storage, ref);
      await uploadBytes(bucketRef, file.buffer);
      const downloadURL = await getDownloadURL(bucketRef);
      return constructResponse(downloadURL, httpStatusCodes.OK);
    } catch (err) {
      handleError(err);
    }
  }

  return { transferFileToStorage };
}

export { StorageController };
