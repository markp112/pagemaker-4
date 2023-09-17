import { SiteAndUser, SiteAndPage } from '@common/models/siteAndUser';

function getUserAndSiteId(userId: string, siteId: string, path?: string) {
  return path ? `${userId}${siteId}::${path}` : `${userId}${siteId}`; 
}

const fetchSiteAndUser = (req): SiteAndUser => {
  return {
    siteId: req.params.siteId,
    userId: req.params.userId
  }
};

const fetchSiteAndPage = (req): SiteAndPage => {
  return {
    siteId: req.params.siteId,
    pageId: req.params.pageId,
  }
}

export { getUserAndSiteId, fetchSiteAndUser, fetchSiteAndPage };
