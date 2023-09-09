interface HostingDetails {
  name: string;
  defaultUrl: string;
  type: string;
  version: string;
};

interface PublishedDetails {
  createTime: string;
  createUser: string;
  status: string;
  finalisedTime: string;
  finalisedUser: string;
};

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
};

interface SiteSettings {
  colours: Record<string, string>[];
  typography: Record<string, string>[];
};

export type { SiteEntity,
  SiteSettings,
  HostingDetails, 
  PublishedDetails,
};