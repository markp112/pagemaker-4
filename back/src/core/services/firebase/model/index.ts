interface HostingParams {
  siteName: string;
};

interface Hosting {
  createSite: (params: HostingParams) => void;
};

interface UserAndSiteName {
  userId: string;
  siteId: string;
  siteName: string;
};

export type { HostingParams, Hosting, UserAndSiteName };
