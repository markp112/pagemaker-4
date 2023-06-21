import type { Dimension } from '@/classes/dimension';
import type { Location } from '@/classes/location';
import type { ComponentTypesString } from '@/components/page/model/pageElement/pageElement';

export interface ToolbarComponentItem {
  componentName: string;
  dimension: Dimension;
  location: Location;
  classes: string;
  componentRef: string;
  isContainer: boolean;
  sidebarIcon: string;
  type: ComponentTypesString;
  tooltip: string;
  componentHTMLTag: string;
};