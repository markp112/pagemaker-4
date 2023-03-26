import type { EditorButtonBase } from '@/classes/commandButtons/model';

interface TabPanel {
  commands: EditorButtonBase[];
}

interface TabStrip {
  id: string;
  displayName: string;
  commandPanels: TabPanel[],
};

interface TabContent {
  panels: TabPanel[];
}

export type { TabStrip, TabContent, TabPanel };