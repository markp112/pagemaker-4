import { FirebaseHostRepository } from '@core/repositories/firebase/hosting/hosting.repository';
import { FIREBASE_URLS } from './urls/urls';
import { required } from '@common/functions/required/required';
import { FilenameAndShaEntity, FinaliseResponseEntity, PopulateFileEntity, PopulateResponseEntity, ReleaseResponseEntity, UploadEntity, VersionEntity } from '@core/entities/hosting/hosting.entity';
import { HashedZippedEntities } from '@core/entities/files/files.entities';
import path from 'path';
import { SiteEntity } from '@core/entities/site/site.entity';
import { handleError } from '@errors/handleError';
import type { FileSystemInterface } from '../fileUtils/fileUtils';

const VERSIONS_API = '/versions';

class FirebaseHostingService {
  constructor(
    private firebaseRepository: FirebaseHostRepository,
    private fileService: FileSystemInterface
    ) {};

  async publishSiteEntity(site: SiteEntity, hashedFiles: HashedZippedEntities[]): Promise<SiteEntity> {
    const siteId = site.hostingDetails?.name;
    required('SiteEntity name', siteId);
    const SiteEntityVersion = await this.getSiteEntityVersion(siteId);
    const populatedFiles = await this.populateFiles(SiteEntityVersion, hashedFiles, siteId);
    await this.uploadFilesToFirebase(hashedFiles, populatedFiles);
    const finalised = await this.finalise(site.hostingDetails.name, SiteEntityVersion.version);
    site.created = new Date(finalised.createTime);
    const released = await this.releaseSite(site.hostingDetails.name, SiteEntityVersion.version);
    site.published = new Date(released.releaseTime);
    return site;
  }

  private async getSiteEntityVersion(siteId: string): Promise<VersionEntity> {
    required('SiteEntityId', siteId );
    const url = this.configureVersionsUrl(siteId);
    return await this.firebaseRepository.getNewSiteVersion(url);
  }

  private configureVersionsUrl(SiteEntityId: string) {
    return `${FIREBASE_URLS.firebaseBaseUrl}${FIREBASE_URLS.pageMakerBaseUrl}/${SiteEntityId}${VERSIONS_API}`;
  }

  private async populateFiles(SiteEntityVersion: VersionEntity,
    hashedFiles: HashedZippedEntities[],
    SiteEntityId: string): Promise<PopulateResponseEntity> {
    const filesToPopulate: PopulateFileEntity = {
      siteId: SiteEntityVersion.name,
      versionId: SiteEntityVersion.version,
      filesToPopulate: this.getFileDetails(hashedFiles),
    };
    const url = `${this.configureVersionsUrl(SiteEntityId)}:populateFiles`;
    return await this.firebaseRepository.populatePages(url, filesToPopulate);
  }

  private getFileDetails(zipFiles: HashedZippedEntities[]): FilenameAndShaEntity[] {
    return zipFiles.map(file => {
      return {
          fileName: path.parse(file.file).name,
          sha256: file.sha256,
      };
    });
  }

  private async uploadFilesToFirebase(hashedFiles: HashedZippedEntities[], populatedFiles: PopulateResponseEntity): Promise<number> {
    const filesToPopulate = this.convertFilesToUploadFormat(hashedFiles, populatedFiles);
    try {
      filesToPopulate.forEach(async file => {
        const fileContent = await this.fileService.readFile(file.fileName);
        await this.firebaseRepository.uploadFiles(file.uploadUrl, fileContent);
      });
      return 200;
    }
    catch (err) {
      handleError(err);
    }
  }

  private convertFilesToUploadFormat(hashedFiles: HashedZippedEntities[], populatedFiles: PopulateResponseEntity): UploadEntity[] {
    return populatedFiles.uploadRequiredHashes.map(fileHash => {
      const fileToUpload = hashedFiles.find(file => file.sha256 === fileHash);
      if (fileToUpload) {
        const uploadEntity: UploadEntity = {
          fileName: fileToUpload.file,
          uploadUrl: populatedFiles.uploadUrl,
          sha256: fileToUpload.sha256, 
        }
        return uploadEntity;
      }
    });
  }

  private async finalise(SiteEntityId: string, versionId: string): Promise<FinaliseResponseEntity> {
    const status = 'FINALIZED';
    const url = `${this.configureVersionsUrl(SiteEntityId)}?update_mask=${status}`;
    return this.firebaseRepository.finalise(url);
  }

  private async releaseSite(siteId: string, versionId: string): Promise<ReleaseResponseEntity> {
    const url =  `${FIREBASE_URLS.firebaseBaseUrl}releases?versionName=sites/${siteId}/versions/${versionId}`;
    return await this.firebaseRepository.releaseSite(url);
  }
};

export { FirebaseHostingService };