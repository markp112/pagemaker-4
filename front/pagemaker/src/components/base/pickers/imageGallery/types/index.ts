type ImageCardProps = {
  title: string;
  tags: string[];
  url: string;
};

type BucketImage = {
  bucket: string,
  fullPath: string,
  name: string,
};

type UsersBucket = {
  bucket: string,
  filename?: string,
}


export type { ImageCardProps, BucketImage, UsersBucket };
