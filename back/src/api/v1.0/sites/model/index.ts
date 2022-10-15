interface Site {
  siteId: string;
  name: string;
  created: Date;
  description: string;
  url: string;
  image: string;
};

interface SiteSettings {
  colours: Record<string, string>[];
  typography: Record<string, string>[];
};

export type { Site, SiteSettings };
