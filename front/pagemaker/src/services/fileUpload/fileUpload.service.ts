import { axiosClient } from '../httpService';

const BASE_ROUTE = '/storage'
const getRoute = (userId: string) => `${BASE_ROUTE}/${userId}`;

function FileUploadService() {

  async function uploadFile(file: File, userId: string): Promise<string> {
    console.log('%c⧭', 'color: #00bf00', file);
    try {
      const formData = new FormData();
      formData.append('uploadFile', file, file.name);
      formData.append('filename', file.name);
      return await axiosClient().postMultiPart<FormData, string>(`${getRoute(userId)}`, formData);
    } catch (error) {
      console.log('%c⧭', 'color: #cc0036', error);
      return '';
    }
  }

  return { uploadFile };
}

export { FileUploadService };
