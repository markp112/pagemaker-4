import type { TypographyInterface } from '../../typography/model';
import type { MaterialColoursInterface } from './colours.model';

interface SiteSettings {
  colours: MaterialColoursInterface;
  typography: TypographyInterface;
};

export type { SiteSettings };