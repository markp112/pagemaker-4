import type { ColourSwatches } from '../siteColours/colour/colourPalette';
import type { MaterialColours } from '../siteColours/models/colours.model';
import type { SiteTypography } from '../typography/model';

interface UserAndSiteName {
  userId: string;
  siteId: string;
  siteName: string;
}

interface HostingDetails {
  name: string;
  defaultUrl: string;
  type: string;
}

interface PublishedDetails {
  createTime: string;
  createUser: string;
  status: string;
  finalisedTime: string;
  finalisedUser: string;
}

interface SiteEntity {
  siteId: string;
  userId: string;
  name: string;
  created: Date;
  description: string;
  url: string;
  image: string;
  published
  hostingCreated?: number;
  lastPublished?: number;
  hostingDetails?: HostingDetails;
  publishedDetails?: PublishedDetails;
}
const UNDEFINED_ID = '-1';

const NEW_SITE: SiteEntity = {
  siteId: UNDEFINED_ID,
  created: new Date(),
  description: '',
  image: '',
  name: '',
  published: undefined,
  url: '',
  userId: '',
};

interface SiteData {
  site: SiteEntity,
  materialColours?: MaterialColours,
  colourSwatches?: ColourSwatches,
  typography?: SiteTypography,
  imageFile?: File,
  isSiteSaved: boolean,
}

export type { SiteData, UserAndSiteName, SiteEntity };
export { NEW_SITE };
