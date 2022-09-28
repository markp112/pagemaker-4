import type { Dimension } from '@/classes/dimension';
import type { Location } from '@/classes/location';

export type ComponentTypesString =
| undefined
| 'container'
| 'jumbo'
| 'button'
| 'navBar'
| 'pageTemplate'
| 'text'
| 'image'
| 'rootContainer';

export interface Toolbar {
  componentName: string;
  dimension: Dimension;
  location: Location;
  classes: string;
  componentRef: string;
  isContainer: boolean;
  sidebarIcon: string;
  type: ComponentTypesString;
  tooltip: string;
};