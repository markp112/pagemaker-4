interface Site {
  siteId: string;
  userId: string;
  name: string;
  created: Date;
  description: string;
  url: string;
  image: string;
  published: Date;
  hostRepo: string;
};

export type { Site };
