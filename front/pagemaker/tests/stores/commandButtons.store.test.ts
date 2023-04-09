import { describe, it } from 'node:test';
import { useCommandButtonStore } from '../../src/stores/commandButton.store';
s
import { CommandMap, CommandTabs } from '../../src/classes/commandButtons/model';
import { TabPanel } from  '../../src/components/core/settingsPanel/tabStrip/tabStripContainer/model';

const tabPanel: TabPanel = {
  'borderGroup1': [
    {

    }
  ]
}


const tabs: CommandTabs = {
  tabs:[
  {
    displayName: 'borders',
    tabContent: [tabPanel],
  }
]};

const commandMap: CommandMap = {
  imageElement: tabs
}
describe('commandButtonStore', () => {
  const store = useCommandButtonStore();
  describe('setActiveTabElement', () => {
    it('should do something', () => {

    })
  })
})