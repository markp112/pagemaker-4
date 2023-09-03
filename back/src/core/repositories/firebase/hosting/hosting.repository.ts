import axios from 'axios';
import { VersionEntity, PopulateFileEntity, FinaliseResponseEntity, PopulateResponseEntity, ReleaseResponseEntity } from '../../../entities/hosting/hosting.entity';
import { FirebaseHosting } from './model';
import { HeadersAxios } from './model';
import { handleError } from '@errors/handleError';
import { logger } from '@logger/pino';
import { ReadStream } from 'fs';

class FirebaseHostRepository implements FirebaseHosting {
  constructor(private token: string) {};

  private getHeader(): HeadersAxios {
    const headersAxios = new HeadersAxios();
    headersAxios.headers.Authorization = `Bearer ${this.token}`;
    return headersAxios;
  }

  async getNewSiteVersion(url: string): Promise<VersionEntity> {
    const headers = this.getHeader();
    headers.headers['Content-Type'] = 'application/json';
    try {
      const result = await axios.post(url, {}, {
        headers: headers.headers,
      });
      return result.data as unknown as VersionEntity;
    } catch (error) {
      handleError(error);
    }
  }

  async populatePages(url: string, contentToPost: PopulateFileEntity): Promise<PopulateResponseEntity> {
    try {
      const headers = this.getHeader();
      headers.headers['Content-Type'] = 'application/json';
      const data = await axios.post(url, contentToPost, {
        headers: headers.headers,
      });
      logger.info(`reposonse from pop files = ${data.data}`);
      return data.data as PopulateResponseEntity;
    } catch (error) {
        handleError(error);
    }
  }

  async uploadFiles(url: string, fileContent: Buffer): Promise<number> {
    try {
      const contentLength = fileContent.length;
      const headers = this.getHeader();
      headers['Content-Type'] = 'application/octet-stream';
      headers['Content-Length'] = contentLength;
      const result = await axios.post(url, fileContent, {
        headers: headers.headers,
      });
      return result.status;
    } catch (error) {
      logger.error(`upload Files -> ${error}`);
      handleError(error);    
    }
  }

  async finalise(url: string, status: { status: string }): Promise<FinaliseResponseEntity> {
    try {
      const headers = this.getHeader();
      headers['Content-Type'] = 'application/json';
      headers['Content-Length'] = 23;
      const result = await axios.patch(url, status, {
        headers: headers.headers,
      });
      logger.info(`finalise reponse = ${JSON.stringify(result.data)}`)
      return result.data as FinaliseResponseEntity;
    } catch (err) {
      handleError(err);
    }
  }

  async releaseSite(url: string): Promise<ReleaseResponseEntity> {
    try {
      const headers = this.getHeader();
      const result = await axios.post(url, {}, {
        headers: headers.headers,
      });
      return result.data as ReleaseResponseEntity;
    } catch (err) {
      handleError(err);
    }
  }
}

export { FirebaseHostRepository };