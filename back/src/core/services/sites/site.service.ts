import { SiteAndUser } from '@common/models/siteAndUser';
import { PagesInterface } from '../pages/pages.service';
import type { FileSystemInterface } from '@core/services/fileUtils/fileUtils';
import { SiteBuilder } from '../siteBuilder/siteBuilder';
import type { DatabaseInterface } from '@core/repositories/firebase/database/database.repository';
import { FirebaseHostingService } from '../firebase/firebase.service';
import { SiteEntity } from '@core/entities/site/site.entity';
import { HashedZippedEntities } from '@core/entities/files/files.entities';
import { handleError } from '@errors/handleError';


interface SiteInterface {
  fetchSite(siteAndUser: SiteAndUser): Promise<SiteEntity>;
  fetchSites(siteAndUser: SiteAndUser): Promise<SiteEntity[]>;
};

const BASE_FOLDER = process.env.BASE_PUBLISHED_FILES_FOLDER;

class SiteService implements SiteInterface {

  private sitesCollection = (userId: string) => `${userId}::sites`;

  constructor(private databaseRepository: DatabaseInterface,
    ) {}

  async fetchSite(siteAndUser: SiteAndUser): Promise<SiteEntity> {
    const collection = this.sitesCollection(siteAndUser.userId);
    return await this.databaseRepository.fetch<SiteEntity>(collection, siteAndUser.siteId);
  
  }
  async fetchSites(siteAndUser: SiteAndUser): Promise<SiteEntity[]> {
    const collection = this.sitesCollection(siteAndUser.userId);
    const sites = await this.databaseRepository.fetch<SiteEntity>(collection);
    return Array.isArray(sites) ? sites : [];
  }

  async saveSiteToDatabase(site: SiteEntity): Promise<SiteEntity> {
      try {
        const userId = site.userId;  
        const collection = this.sitesCollection(userId);
        const savedSite = await this.databaseRepository.save<SiteEntity>(collection, site.siteId, site);
        return savedSite;
      }  catch (err) {
          handleError(err);
      }
    }


  async publishSite(
      pageService: PagesInterface, 
      fileService: FileSystemInterface,
      hostingService: FirebaseHostingService,
      siteAndUser: SiteAndUser
    ): Promise<SiteEntity> {
    const publishFolder = this.getPublishFolder(siteAndUser);
    const site = await this.fetchSite(siteAndUser);
    const sitePages = await pageService.fetchPages(siteAndUser.siteId);
    const siteBuilder = new SiteBuilder(sitePages, publishFolder);
    const htmlFilePages = await siteBuilder.createSitePages();
    const zippedFiles = await fileService.zipFiles(htmlFilePages);
    const filesWithHash = await this.createFileHashes(zippedFiles, fileService);
    return await hostingService.publishSiteEntity(site, filesWithHash);
  }

  private getPublishFolder(siteAndUser: SiteAndUser): string {
    return `${BASE_FOLDER}${siteAndUser.userId}/sites/${siteAndUser.siteId}`;
  }

  private async createFileHashes(zippedFiles: string[], fileService: FileSystemInterface): Promise<HashedZippedEntities[]> {
    return await Promise.all(
      zippedFiles.map(async (zipFile) => {
        const sha256 = await fileService.calculateFileSHA(zipFile);
        return {
          file: zipFile,
          sha256,
        };
      })
    )
  }
}


// type ZipFileWithHash = {
//   file: string;
//   sha256: string;
// };

// const sitesCollection = (userId: string) => `${userId}::sites`;

// // async function fetchSite(siteAndUser: SiteAndUser): Promise<Site> {
// //   const collection = sitesCollection(siteAndUser.userId);
// //   const docRef = doc(firebaseDb, collection, siteAndUser.siteId);
// //   const firebaseResponse = await getDoc(docRef);
// //   return firebaseResponse.data() as Site;
// // }

// async function createZipFiles(files: string[]): Promise<string[]> {
//   const zipFiles: string[] = [];
//   files.forEach(async file => {
//     zipFiles.push(await fileUtils.zipFile(file));
//   })
//   return zipFiles;
// }

// async function createFileHashes(zippedFiles: string[]): Promise<ZipFileWithHash[]> {
//   const zipsWithHash: ZipFileWithHash[] = [];
//   zippedFiles.forEach(async zipFile => {
//     const zipWithHash: ZipFileWithHash = {
//       file: zipFile,
//       sha256: await  fileUtils.calculateFileSHA(zipFile),
//     };
//     zipsWithHash.push(zipWithHash);
//   })
//   return zipsWithHash;
// }

// async function getSiteVersion(siteName: string): Promise<VersionCreateResponse> {
//   required('siteName', siteName);
//   const hostingParams: HostingParams = {
//     siteName,
//   };
//   const firebaseSiteVersion = new FirebaseSiteVersion();
//   return await firebaseSiteVersion.createVersion(hostingParams);
// }

// async function saveSiteToDatabase(site: Site): Promise<Site> {
//   try {
//     const userId = site.userId;
//     await setDoc(doc(firebaseDb, sitesCollection(userId), site.siteId), site);
//     return site;
//   }  catch (err) {
//       handleError(err);
//   }
// }

// async function populateTheFiles(siteVersion: VersionCreateResponse, zipFilesWithHash: ZipFileWithHash[]): Promise<PopulateFilesResponse> {
//   const filesToPopulate: SiteFiles = {
//     siteId: siteVersion.name,
//     versionId: siteVersion.version,
//     filesToPopulate: getFileDetails(zipFilesWithHash),
//   }
//   return await populateFiles(filesToPopulate);
// }

// function getFileDetails(zipFiles: ZipFileWithHash[]): PopulateFileDetail[] {
//   return zipFiles.map(file => {
//     return {
//         fileName: path.parse(file.file).name,
//         sha256: file.sha256,
//     };
//   });
// }

// async function uploadFilesToFirebase(zipFiles: ZipFileWithHash[], populatedFiles: PopulateFilesResponse): Promise<void> {
//   populatedFiles.uploadRequiredHashes.forEach(async fileHash => {
//     const fileToUpload = zipFiles.find(file => file.sha256 === fileHash);
//     if (fileToUpload) {
//       const fileUploadResource: FileUploadResource = {
//         fileName: fileToUpload.file,
//         uploadUrl: populatedFiles.uploadUrl,
//         sha256: fileToUpload.sha256
//       };
//       await uploadFileToFirebase(fileUploadResource);
//     }
//   })
// }

// async function publishSiteToFirebase(siteAndUser: SiteAndUser): Promise<Site> {
//     const publishFolder = `${BASE_FOLDER}${siteAndUser.userId}/sites/${siteAndUser.siteId}`;
//     if (! await fileUtils.isFolderExisting(publishFolder)) {
//       await fileUtils.mkdir(publishFolder);
//     }
//     const site = await fetchSite(siteAndUser);
//     const sitePages = await fetchPages(siteAndUser.siteId);
//     const siteBuilder = new SiteBuilder(sitePages, publishFolder);
//     const htmlFilePages = await siteBuilder.createSitePages();
//     const zippedFiles = await createZipFiles(htmlFilePages);
//     const filesWithHash = await createFileHashes(zippedFiles);
//     const siteVersion = await getSiteVersion(site.hostingDetails?.name);
//     const populatedFiles = await populateTheFiles(siteVersion, filesWithHash);
//     await uploadFilesToFirebase(filesWithHash, populatedFiles);
//     const finalised = await finalise(site.hostingDetails.name, siteVersion.version);
//     const released = await releaseSite(site.hostingDetails.name, siteVersion.version);
//     site.lastPublished = new Date(released.releaseTime).getUTCDate();
//     const updatedSite = await saveSiteToDatabase(site);
//     return updatedSite;
// }

export {
  SiteService,
};

export type { SiteInterface };