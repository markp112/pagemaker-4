import { VersionEntity, PopulateFileEntity, PopulateResponseEntity, FinaliseResponseEntity, ReleaseResponseEntity } from '../../../entities/hosting/hosting.entity'; 

interface FirebaseHosting {
  getNewSiteVersion(url: string): Promise<VersionEntity>;
  populatePages(url: string, contentToPost: PopulateFileEntity): Promise<PopulateResponseEntity>;
  uploadFiles(url: string, fileContent: Buffer): Promise<number>;
  finalise(siteId: string, versionId: string): Promise<FinaliseResponseEntity>;
  releaseSite(siteId: string, versionId: string): Promise<ReleaseResponseEntity>;
};

type ContentType = 'application/json' | 'application/octet-stream';

type HeadersBase =  Record<string, string | string[] | number>;

interface Headers {
  headers?: HeadersBase;   
};

class HeadersAxios implements Headers {
  headers: {
    Authorization: string;
    'Content-Type'?: ContentType;
    'Content-Length'?: number;
  }
};

export type { FirebaseHosting };
export { HeadersAxios };