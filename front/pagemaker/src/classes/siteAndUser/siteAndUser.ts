import { useAuthStore } from '@/stores/auth.store';
import { useSiteStore } from '@/stores/site.store';

type SiteAndUser = {
  siteId: string,
  userId: string,
};

function getSiteAndUser(): SiteAndUser {
  return {
    siteId: useSiteStore().site.siteId,
    userId: useAuthStore().userUid,
  }
}
export type { SiteAndUser };
export { getSiteAndUser };
