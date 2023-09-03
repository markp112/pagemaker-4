import { FIREBASE_URLS } from '../urls/urls';

function getSiteAndVersionUrl(siteId: string, versionId: string): string {
  const populateSiteStub = `${FIREBASE_URLS.populateSiteFiles.replace('<SITE_ID>', siteId).replace('<VERSION_ID>', versionId)}`;
  return `${FIREBASE_URLS.firebaseBaseUrl}${populateSiteStub}`;
}

export { getSiteAndVersionUrl };