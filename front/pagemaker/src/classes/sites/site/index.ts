import type { ColourSwatches } from '../siteColours/colour/colourPalette';
import type { MaterialColours } from '../siteColours/models/colours.model';
import type { SiteTypography } from '../typography/model';

interface SiteHosting {
  name: string;
  defaultUrl: string;
  type: string;
};

interface UserAndSiteName {
  userId: string;
  siteId: string;
  siteName: string;
};

interface Site {
  siteId: string;
  userId: string;
  name: string;
  created: Date;
  description: string;
  url: string;
  image: string;
  published: Date | undefined;
  hostRepo: string;
  hostingCreated?: number;
  lastPublished?: number;
  hostingDetails?: SiteHosting;
};
const UNDEFINED_ID = '-1';
const NEW_SITE: Site = {
  siteId: UNDEFINED_ID,
  created: new Date(),
  description: '',
  hostRepo: '',
  image: '',
  name: '',
  published: undefined,
  url: '',
  userId: '',
};

interface SiteData {
  site: Site,
  materialColours?: MaterialColours,
  colourSwatches?: ColourSwatches,
  typography?: SiteTypography,
  imageFile?: File,
  isSiteSaved: boolean,
};

export type { Site, SiteData, UserAndSiteName };
export { NEW_SITE };
