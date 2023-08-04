import { Site } from '@api/v1.0/sites/model/site';
import { SiteAndUser } from '@common/models/siteAndUser';
import { firebaseDb } from '@fbase/initFirebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { fetchPages } from '../pages/pages';
import * as fileUtils from '@core/services/fileUtils/fileUtils';
import { SiteBuilder } from '../siteBuilder/siteBuilder';
import { VersionCreateResponse } from '../firebase/siteVersion/siteVersion';
import { FirebaseSiteVersion } from '../firebase/siteVersion/siteVersion';
import { HostingParams } from '../firebase/model';
import { required } from '@common/functions/required/required';
import { populateFiles, 
  type PopulateFileDetail, SiteFiles, PopulateFilesResponse
} from '../firebase/populateFiles/populateFiles';
import path from 'path';
import { FileUploadResource, uploadFileToFirebase } from '../firebase/uploadFile/uploadFile';
import { finalise } from '../firebase/finalise/finalise';
import { releaseSite } from '../firebase/release/release';
import { handleError } from '@errors/handleError';
import type { DatabaseInterface } from '@core/repositories/firebase/database/database.repository';

interface SiteInterface {
  fetchSite(siteAndUser: SiteAndUser): Promise<Site>;
};

class SiteService implements SiteInterface {

  private sitesCollection = (userId: string) => `${userId}::sites`;

  constructor(private siteRepository: DatabaseInterface){}

  async fetchSite(siteAndUser: SiteAndUser): Promise<Site> {
    const collection = this.sitesCollection(siteAndUser.userId);
    return await this.siteRepository.fetch<Site>(collection, siteAndUser.siteId);
  }
}

const BASE_FOLDER = './publishedFiles/';

type ZipFileWithHash = {
  file: string;
  sha256: string;
};

const sitesCollection = (userId: string) => `${userId}::sites`;

async function fetchSite(siteAndUser: SiteAndUser): Promise<Site> {
  const collection = sitesCollection(siteAndUser.userId);
  const docRef = doc(firebaseDb, collection, siteAndUser.siteId);
  const firebaseResponse = await getDoc(docRef);
  return firebaseResponse.data() as Site;
}

async function createZipFiles(files: string[]): Promise<string[]> {
  const zipFiles: string[] = [];
  files.forEach(async file => {
    zipFiles.push(await fileUtils.zipFile(file));
  })
  return zipFiles;
}

async function createFileHashes(zippedFiles: string[]): Promise<ZipFileWithHash[]> {
  const zipsWithHash: ZipFileWithHash[] = [];
  zippedFiles.forEach(async zipFile => {
    const zipWithHash: ZipFileWithHash = {
      file: zipFile,
      sha256: await  fileUtils.calculateFileSHA(zipFile),
    };
    zipsWithHash.push(zipWithHash);
  })
  return zipsWithHash;
}

async function getSiteVersion(siteName: string): Promise<VersionCreateResponse> {
  required('siteName', siteName);
  const hostingParams: HostingParams = {
    siteName,
  };
  const firebaseSiteVersion = new FirebaseSiteVersion();
  return await firebaseSiteVersion.createVersion(hostingParams);
}

async function saveSiteToDatabase(site: Site): Promise<Site> {
  try {
    const userId = site.userId;
    await setDoc(doc(firebaseDb, sitesCollection(userId), site.siteId), site);
    return site;
  }  catch (err) {
      handleError(err);
  }
}

async function populateTheFiles(siteVersion: VersionCreateResponse, zipFilesWithHash: ZipFileWithHash[]): Promise<PopulateFilesResponse> {
  const filesToPopulate: SiteFiles = {
    siteId: siteVersion.name,
    versionId: siteVersion.version,
    filesToPopulate: getFileDetails(zipFilesWithHash),
  }
  return await populateFiles(filesToPopulate);
}

function getFileDetails(zipFiles: ZipFileWithHash[]): PopulateFileDetail[] {
  return zipFiles.map(file => {
    return {
        fileName: path.parse(file.file).name,
        sha256: file.sha256,
    };
  });
}

async function uploadFilesToFirebase(zipFiles: ZipFileWithHash[], populatedFiles: PopulateFilesResponse): Promise<void> {
  populatedFiles.uploadRequiredHashes.forEach(async fileHash => {
    const fileToUpload = zipFiles.find(file => file.sha256 === fileHash);
    if (fileToUpload) {
      const fileUploadResource: FileUploadResource = {
        fileName: fileToUpload.file,
        uploadUrl: populatedFiles.uploadUrl,
        sha256: fileToUpload.sha256
      };
      await uploadFileToFirebase(fileUploadResource);
    }
  })
}

async function publishSiteToFirebase(siteAndUser: SiteAndUser): Promise<Site> {
    const publishFolder = `${BASE_FOLDER}${siteAndUser.userId}/sites/${siteAndUser.siteId}`;
    if (! await fileUtils.isFolderExisting(publishFolder)) {
      await fileUtils.mkdir(publishFolder);
    }
    const site = await fetchSite(siteAndUser);
    const sitePages = await fetchPages(siteAndUser.siteId);
    const siteBuilder = new SiteBuilder(sitePages, publishFolder);
    const htmlFilePages = await siteBuilder.createSitePages();
    const zippedFiles = await createZipFiles(htmlFilePages);
    const filesWithHash = await createFileHashes(zippedFiles);
    const siteVersion = await getSiteVersion(site.hostingDetails?.name);
    const populatedFiles = await populateTheFiles(siteVersion, filesWithHash);
    await uploadFilesToFirebase(filesWithHash, populatedFiles);
    const finalised = await finalise(site.hostingDetails.name, siteVersion.version);
    const released = await releaseSite(site.hostingDetails.name, siteVersion.version);
    site.lastPublished = new Date(released.releaseTime).getUTCDate();
    const updatedSite = await saveSiteToDatabase(site);
    return updatedSite;
}

export { fetchSite,
  saveSiteToDatabase,
  publishSiteToFirebase,
};

export type { SiteInterface };