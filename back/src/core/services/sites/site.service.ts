import { SiteAndUser } from '@common/models/siteAndUser';
import { PagesInterface } from '../pages/pages.service';
import type { FileService, FileSystemInterface } from '@core/services/fileUtils/fileUtils';
import { SiteBuilderService } from '@core/services/siteBuilder/siteBuilder.service';
import type { DatabaseInterface } from '@core/repositories/firebase/database/database.repository';
import { FirebaseHostingService } from '../firebase/firebase.service';
import { SiteEntity } from '@core/entities/site/site.entity';
import { HashedZippedEntities } from '@core/entities/files/files.entities';
import { handleError } from '@errors/handleError';
import { logger } from '@logger/pino';
import { PageBuilder } from '../siteBuilder/createPageContent/constructPage';
import { pagePublisher } from '../siteBuilder/createPageContent/publishPage/publishPage';
import { FolderAndPage } from '../siteBuilder/createPageContent/publishPage/model';
import { file } from 'googleapis/build/src/apis/file';


interface SiteInterface {
  fetchSite(siteAndUser: SiteAndUser): Promise<SiteEntity>;
  fetchSites(siteAndUser: SiteAndUser): Promise<SiteEntity[]>;
};

const BASE_FOLDER = () => process.env.BASE_PUBLISHED_FILES_FOLDER;

class SiteService implements SiteInterface {

  private sitesCollection = (userId: string) => `${userId}::sites`;

  constructor(private databaseRepository: DatabaseInterface) {}

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
    try {
      const publishFolder = this.getPublishFolder(siteAndUser);
      const site = await this.fetchSite(siteAndUser);
      const sitePages = await pageService.fetchPages(siteAndUser.siteId);
      const siteBuilder = new SiteBuilderService(sitePages, publishFolder);
      const pageBuilder = new PageBuilder();
      let webSiteContent = siteBuilder.createSitePages(pageBuilder);
      webSiteContent = await this.createSystemPath(webSiteContent, fileService);
      await this.writeWebSiteContent(webSiteContent);
      webSiteContent = await this.createZippedFiles(webSiteContent, fileService);
      webSiteContent = await this.createFileHashes(webSiteContent, fileService);
      return await hostingService.publishSiteEntity(site, webSiteContent);
    } catch (error) {
      logger.error(`Error: --> ${JSON.stringify(error)}`)
      handleError(error);
    }
  }

  private getPublishFolder(siteAndUser: SiteAndUser): string {
    return `${BASE_FOLDER()}${siteAndUser.userId}/sites/${siteAndUser.siteId}`;
  }

  private async createSystemPath(webSiteContent: FolderAndPage[], fileService: FileSystemInterface): Promise<FolderAndPage[]> {
    if (webSiteContent.length === 0) {
      return Promise.resolve(webSiteContent);
    }
    return await Promise.all(
      webSiteContent.map(async content => {
        const filePath = fileService.resolvePath(content.pathToFile);
        if (! await fileService.isFolderExisting(filePath)) {
          await fileService.mkdir(filePath);
        }
        content.resolvedPathToFile = filePath;
        return content;
      })
    );
  }

  private async createFileHashes(webSiteContent: FolderAndPage[], fileService: FileSystemInterface): Promise<FolderAndPage[]> {
    return await Promise.all(
      webSiteContent.map(async (content) => {
        const fileToCalc = fileService.joinPath(content.resolvedPathToFile, `${content.filename}.zip`);
        content.sha256  = await fileService.calculateFileSHA(fileToCalc);
        return content;
      })
    )
  }

  private async writeWebSiteContent(htmlFilePages: FolderAndPage[]): Promise<void> {
    await Promise.all(htmlFilePages.map(async file =>  await pagePublisher().writeLocalFile(file)));
  }

  private async createZippedFiles(webSiteContent: FolderAndPage[], fileService: FileSystemInterface): Promise<FolderAndPage[]> {
    return await Promise.all(webSiteContent.map(async content => {
      const filePath = fileService.resolvePath(content.pathToFile);
      const fileToWrite = fileService.joinPath(filePath, `${content.filename}.${content.type}`);
      await fileService.zipFile(fileToWrite);
      content.isZipped = true;
      return content;
    }));
  }
}

export {
  SiteService,
};

export type { SiteInterface };