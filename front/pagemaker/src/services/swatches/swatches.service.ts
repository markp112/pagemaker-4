import type { ColourSwatch, ColourSwatches } from '@/classes/sites/siteColours/colour/colourPalette';
import { axiosClient } from '../httpService';

function swatchesService() {
  const BASE_ROUTE = '/swatches/';

  async function increaseSaturation(colourSwatch: ColourSwatch[]): Promise<ColourSwatch[]> {
    return await axiosClient().post<ColourSwatch[], ColourSwatch[]>(`${BASE_ROUTE}saturation/increase`, colourSwatch);
  }

  async function decreaseSaturation(colourSwatch: ColourSwatch[]): Promise<ColourSwatch[]> {
    return await axiosClient().post<ColourSwatch[], ColourSwatch[]>(`${BASE_ROUTE}saturation/decrease`, colourSwatch);
  }

  async function getNewSwatchesFromColour(colourSwatches: ColourSwatches): Promise<ColourSwatches> {
    return await axiosClient().post<ColourSwatches, ColourSwatches>(`${BASE_ROUTE}create/swatches`, colourSwatches);
  }

  async function changeColourModel(colourSwatches: ColourSwatches): Promise<ColourSwatches> {
    return await getNewSwatchesFromColour(colourSwatches);
  }

  return { increaseSaturation, decreaseSaturation, getNewSwatchesFromColour, changeColourModel }

};

export { swatchesService };
