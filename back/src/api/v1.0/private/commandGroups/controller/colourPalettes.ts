import { Colours, ColourSwatches } from '@api/v1.0/sites/model/colourPalette';
import { CommandPanel, EditorButtonContent } from '../model';

function buildColourCommandTabGroups(colourPalettes: ColourSwatches) {
  const commandPanels: CommandPanel[] = [];
  colourPalettes.colourSwatches.forEach(swatch => {
    const commandPanel: CommandPanel = {
      [swatch.swatchName]:  getColourCommands(swatch.swatch)
    } 
    commandPanels.push(commandPanel);
  })
  return commandPanels;
}

function getColourCommands(colours: Colours): EditorButtonContent[] {
  return colours.map(colour => {
    return {
      key: '',
      tooltip: 'set colour',
      displayIcon: '',
      buttonType: 'colourButton',
      commandName:'set-colour',
      commandType: 'direct',
      content: colour
    };
  });
}

export { buildColourCommandTabGroups };
