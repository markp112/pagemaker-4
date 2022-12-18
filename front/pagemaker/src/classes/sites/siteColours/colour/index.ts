import type { MaterialColours } from '../models/colours.model';

export function siteDefaultColours(): MaterialColours {
  return [
    {      
      paletteName: 'Primary',
      colours: [
            { name: 'Dark', hexColourBackground: '#555555', hexColourText: '#ff'},
            { name: 'Neutral', hexColourBackground: '#bbbbbb', hexColourText: '#ff'},
            { name: 'Light', hexColourBackground: '#eeeeee', hexColourText: '#ff'},
          ],
      },
      {      
        paletteName: 'Secondary',
        colours: [
              { name: 'Dark', hexColourBackground: '#555555', hexColourText: '#ff'},
              { name: 'Neutral', hexColourBackground: '#bbbbbb', hexColourText: '#ff'},
              { name: 'Light', hexColourBackground: '#eeeeee', hexColourText: '#ff'},
            ],
      },
    {      
      paletteName: 'Accent',
          colours: [
            { name: 'Dark', hexColourBackground: '#555555', hexColourText: '#ff'},
            { name: 'Neutral', hexColourBackground: '#bbbbbb', hexColourText: '#ff'},
            { name: 'Light', hexColourBackground: '#eeeeee', hexColourText: '#ff'},
          ],
    },
    {      
      paletteName: 'Error',
      colours: [
            { name: 'Neutral', hexColourBackground: '#ff0000', hexColourText: '#ff'},
          ],
    },
      {
      paletteName: 'Surface',
      colours: [
            { name: 'Neutral', hexColourBackground: '#eeeeee', hexColourText: '#ff'},
          ],
      },
    ] as MaterialColours;
}
