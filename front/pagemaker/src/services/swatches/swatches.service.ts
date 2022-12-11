import type { SupportedColourModels } from '@/classes/colourPalette/colourModel';
import type { ColourSwatch, ColourSwatches } from '@/classes/sites/siteColours/colour/colourPalette';
import { useSiteStore } from '@/stores/site.store';
import { axiosClient } from '../httpService';

function swatchesService() {
  const BASE_ROUTE = '/swatches/';
  const store = useSiteStore();

  async function increaseSaturation(colourSwatch: ColourSwatch[]): Promise<void> {
    const newSwatches = await axiosClient().post<ColourSwatch[], ColourSwatch[]>(`${BASE_ROUTE}saturation/increase`, colourSwatch);
    store.updateColourSwatches(newSwatches);
  }

  async function decreaseSaturation(colourSwatch: ColourSwatch[]): Promise<void> {
    const newSwatches = await axiosClient().post<ColourSwatch[], ColourSwatch[]>(`${BASE_ROUTE}saturation/decrease`, colourSwatch);
    store.updateColourSwatches(newSwatches);
  }

  async function getNewSwatchesFromColour(colourSwatches: ColourSwatches): Promise<void> {
    const newSwatches =  await axiosClient().post<ColourSwatches, ColourSwatches>(`${BASE_ROUTE}create/swatches`, colourSwatches);
    store.setColourPalette(newSwatches);
  }

  async function changeColourModel(colourSwatches: ColourSwatches) {
    await getNewSwatchesFromColour(colourSwatches);
  }

  return { increaseSaturation, decreaseSaturation, getNewSwatchesFromColour, changeColourModel }

};

export { swatchesService };
