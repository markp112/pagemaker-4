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

export type { Site };
export { NEW_SITE };
