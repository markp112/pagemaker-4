interface HostingParams {
  siteId: string;
};

interface Hosting {
  createSite: (params: HostingParams) => void;
};

export type { HostingParams, Hosting };
