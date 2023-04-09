import type { CommandButtonTypes, EditorButtonBase } from '@/classes/commandButtons/model';

interface TabPanel {
  [key: string]: CommandButtonTypes[];
};

interface TabStrip {
  id: string;
  displayName: string;
  commandPanels: TabPanel[],
};

interface TabContent {
  panels: TabPanel[];
};  

export type { TabStrip, TabContent, TabPanel };