import { NEW_SITE, type SiteEntity } from '@/classes/sites/site';
import { useSitesStore } from '@/stores/sites.store';
import { axiosClient } from '../httpService';
import { siteService } from '@/services/site/site.service';
import { useSiteStore } from '@/stores/site.store';
import { useAuthStore } from '@/stores/auth.store';

function sitesService() {
  const BASE_ROUTE = '/sites';
  const store = useSitesStore();
  const siteStore = useSiteStore();
  const authStore = useAuthStore();

  async function getSites(userId: string) {
    try {
      store.clear();
      const sites = await axiosClient().get<SiteEntity[]>(`${BASE_ROUTE}/${userId}`);
      if (sites?.length > 0) {
        store.setSites(sites);
      } 
    } catch (error) {
      console.log('%c⧭', 'color: #1d3f73', error);
      throw (error);
    }
  }

  async function createNewSite(): Promise<void> {
    await Promise.all([
      siteService().getDefaultSwatches(),
      siteService().getDefaultMaterialColours(),
      siteService().getDefaultTypography(),
    ]);
    const site: SiteEntity = { ...NEW_SITE };
    site.userId = authStore.user.uid;
    siteStore.setSite(site);
  }

  return {
    getSites,
    createNewSite,
  }
}

export { sitesService };
