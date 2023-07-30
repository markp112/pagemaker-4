import { Site } from '@api/v1.0/sites/model/site';
import { SiteAndUser } from '@common/models/siteAndUser';
import { firebaseDb } from '@fbase/initFirebase';
import { doc, getDoc } from 'firebase/firestore';
import { fetchPages } from '../pages/pages';
import * as fileUtils from '@core/services/fileUtils/fileUtils';
import { SiteBuilder } from '../siteBuilder/siteBuilder';
import { VersionCreateResponse } from '../firebase/siteVersion/siteVersion';
import { FirebaseSiteVersion } from '../firebase/siteVersion/siteVersion';
import { HostingParams } from '../firebase/model';
import { required } from '@common/functions/required/required';
import { populateFiles } from '../firebase/populateFiles/populateFiles';

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

async function populateTheFiles(siteVersion: VersionCreateResponse, zipFilesWithHash: ZipFileWithHash[]): Promise<> {

}

async function publishSite(siteAndUser: SiteAndUser) {
    //get the site data
    // generate the site pages
    // create a new version for the site
    // generate zips for each page
    // create shas for each file
    // populate the files
    // get the returned list of Shas to upload
    // for each file upload to firebase
    const publishFolder = `${BASE_FOLDER}${siteAndUser.userId}/sites/${siteAndUser.siteId}`;
    if (! await fileUtils.isFolderExisting(publishFolder)) {
      await fileUtils.mkdir(publishFolder);
    }
    const site = await fetchSite(siteAndUser);
    const sitePages = await fetchPages(siteAndUser.siteId);
    const siteBuilder = new SiteBuilder(sitePages, publishFolder);
    const htmlFilePages = await siteBuilder.createSitePages();
    const zippedFiles = await createZipFiles(htmlFilePages);
    const fileWithHash = await createFileHashes(zippedFiles);
    const siteVersion = await getSiteVersion(site.hostingDetails?.name);
    const populatedFiles = await populateTheFiles(siteVersion, fileWithHash);

}

export { fetchSite,

};