import { ReadStream } from 'fs';
import { VersionEntity, PopulateFileEntity, PopulateResponseEntity, FinaliseResponseEntity, ReleaseResponseEntity } from '../../../entities/hosting/hosting.entity'; 

interface FirebaseHosting {
  getNewSiteVersion(url: string): Promise<VersionEntity>;
  populatePages(url: string, contentToPost: PopulateFileEntity): Promise<PopulateResponseEntity>;
  uploadFiles(url: string, fileContent: Buffer): Promise<number>;
  finalise(url: string, status: { status: string }): Promise<FinaliseResponseEntity>;
  releaseSite(siteId: string, versionId: string): Promise<ReleaseResponseEntity>;
};

type ContentType = 'application/json' | 'application/octet-stream';

interface Headers {
  headers: {
    Authorization: string;
    'Content-Type'?: ContentType;
    'Content-Length'?: string;  
  };
};

class HeadersAxios implements Headers {
  headers: { Authorization: string; 'Content-Type'?: ContentType; 'Content-Length'?: string; };

  constructor() {
    this.headers = {
      Authorization:'',
    };
  }
};

export type { FirebaseHosting };
export { HeadersAxios };