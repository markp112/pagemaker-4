import { FirebaseHostingResponse } from '@core/services/firebase/dao/dao';

interface Site {
  siteId: string;
  name: string;
  created: Date;
  description: string;
  url: string;
  image: string;
  userId: string;
  hostingCreated?: number;
  lastPublished?: number;
  hostingDetails?: FirebaseHostingResponse;
};

interface SiteSettings {
  colours: Record<string, string>[];
  typography: Record<string, string>[];
};

export type { Site, SiteSettings };
