import { useSiteStore } from '@/stores/site.store';

type SiteAndUser = {
  siteId: string,
  userId: string,
};

function getSiteAndUser(): SiteAndUser {
  return {
    siteId: useSiteStore().site.siteId,
    userId: useSiteStore().site.userId,
  }
}
export type { SiteAndUser };
export { getSiteAndUser };
