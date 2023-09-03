import { FirebaseHostRepository } from '@core/repositories/firebase/hosting/hosting.repository';
import { FIREBASE_URLS } from './urls/urls';
import { required } from '@common/functions/required/required';
import { FileAndSha, FilenameAndShaEntity, FinaliseResponseEntity, PopulateFileEntity, PopulateResponseEntity, ReleaseResponseEntity, UploadEntity, VersionEntity } from '@core/entities/hosting/hosting.entity';
import { HashedZippedEntities } from '@core/entities/files/files.entities';
import { SiteEntity } from '@core/entities/site/site.entity';
import { handleError } from '@errors/handleError';
import type { FileSystemInterface } from '../fileUtils/fileUtils';
import { logger } from '@logger/pino';
import { httpStatusCodes } from '@api/httpStatusCodes';
import { FolderAndPage } from '../siteBuilder/createPageContent/publishPage/model';

const VERSIONS_API = '/versions';

class FirebaseHostingService {
  constructor(
    private firebaseRepository: FirebaseHostRepository,
    private fileService: FileSystemInterface
    ) {};

  async publishSiteEntity(site: SiteEntity, hashedFiles: FolderAndPage[]): Promise<SiteEntity> {
    const siteId = site.siteId;
    required('SiteEntity name', siteId);
    const siteEntityVersion = await this.getSiteEntityVersion(siteId);
    site.hostingDetails.version = siteEntityVersion.name;
    const populatedFiles = await this.populateFiles(hashedFiles, site);
    await this.uploadFilesToFirebase(hashedFiles, populatedFiles);
    const finalised = await this.finalise(site);
    site.created = new Date(finalised.createTime);
    const released = await this.releaseSite(site.siteId, site.hostingDetails.version);
    site.published = new Date(released.releaseTime);
    return site;
  }

  private async getSiteEntityVersion(siteId: string): Promise<VersionEntity> {
    required('SiteEntityId', siteId );
    const url = this.configureVersionsUrl(siteId);
    return await this.firebaseRepository.getNewSiteVersion(url);
  }

  private configureVersionsUrl(SiteEntityId: string) {
    return `${FIREBASE_URLS.firebaseBaseUrlSites}${SiteEntityId}${VERSIONS_API}`;
  }

  private async populateFiles(
    hashedFiles: FolderAndPage[],
    siteEntity: SiteEntity): Promise<PopulateResponseEntity> {
    const files = this.getFileDetails(hashedFiles);
    const fileNamesAndSha = this.getFileAndSha(files);
    const filesToPopulate: PopulateFileEntity = {
      files: fileNamesAndSha,
    };
    const url = `${FIREBASE_URLS.firebaseBaseUrl}${siteEntity.hostingDetails.version}:populateFiles`;
    return await this.firebaseRepository.populatePages(url, filesToPopulate);
  }

  private getFileDetails(webSiteContent: FolderAndPage[]): FilenameAndShaEntity[] {
    return webSiteContent.map(file => {
      return {
        fileName: `${file.filename}.${file.type}` ,
        sha256: file.sha256,
      };
    });
  }

  private getFileAndSha(files: FilenameAndShaEntity[]): FileAndSha {
    const fileNamesAndSha: FileAndSha = {};
    files.forEach(file => {
      logger.info(`${JSON.stringify(file)}`)
      fileNamesAndSha[`/${file.fileName}`] = file.sha256;
    });
    return fileNamesAndSha;
  }

  private async uploadFilesToFirebase(hashedFiles: FolderAndPage[], populatedFiles: PopulateResponseEntity): Promise<number> {
    logger.info(` ${JSON.stringify(hashedFiles)} --> ${JSON.stringify(populatedFiles)}`)
    if (populatedFiles.uploadRequiredHashes && populatedFiles.uploadRequiredHashes.length > 0) {
      const filesToPopulate = this.convertFilesToUploadFormat(hashedFiles, populatedFiles);
      try {
        for (let file of filesToPopulate) {
          const fileToUpload = hashedFiles.find(hashedFile => hashedFile.sha256 === file.sha256);
          if (fileToUpload) {
            const fileToRead = this.fileService.joinPath(fileToUpload.resolvedPathToFile, `${fileToUpload}.zip`);
            logger.info(`file being uploaded = ${fileToRead}`);
            const fileContent = await this.fileService.readFile(fileToRead);
            const result = await this.firebaseRepository.uploadFiles(file.uploadUrl, fileContent);
            logger.info(`uploaded files no error -> ${result}`);
          }
        };
      }
      catch (err) {
        logger.error(err);
        handleError(err);
      }
    }
    return httpStatusCodes.OK;
  }

  private convertFilesToUploadFormat(hashedFiles: FolderAndPage[], populatedFiles: PopulateResponseEntity): UploadEntity[] {
    return hashedFiles.map(file => {
      return {
        fileName: `${file.filename}.${file.type}`,
        sha256: file.sha256,
        uploadUrl: `${populatedFiles.uploadUrl}/${file.sha256}`,
      }
    })
  }

  private async finalise(siteEntity: SiteEntity): Promise<FinaliseResponseEntity> {
    const status = { status: 'FINALIZED' };
    const url = `${FIREBASE_URLS.firebaseBaseUrl}${siteEntity.hostingDetails.version}?update_mask=status`;
    return this.firebaseRepository.finalise(url, status);
  }

  private async releaseSite(siteId: string, versionId: string): Promise<ReleaseResponseEntity> {
    const url =  `${FIREBASE_URLS.firebaseBaseUrlSites}${siteId}/releases?versionName=${versionId}`;
    return await this.firebaseRepository.releaseSite(url);
  }
};

export { FirebaseHostingService };