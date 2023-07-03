export interface HostingParams {
  siteId: string;
}

export interface Hosting {
  createSite: (params: HostingParams) => void;
};
