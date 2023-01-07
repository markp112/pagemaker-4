import type { Unit } from '@/components/page/model/model';

interface PageMetaData {
    pageId: string,
    siteId: string,
    name: string,
    width: Unit,
    height: Unit,
    backgroundColour: string,
    colour: string,
    created: Date,
    edited: Date,
    icon: string,
  };
  
export type { PageMetaData };
