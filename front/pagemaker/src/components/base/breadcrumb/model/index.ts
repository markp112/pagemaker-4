import { RouteRecordName } from 'vue-router';

export interface BreadcrumbLink {
  name: RouteRecordName;
  link?: string;
}
