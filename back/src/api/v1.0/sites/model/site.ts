import { FirebaseHostingResponse } from '@api/v1.0/hosting/firebase/dao/dao';



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
