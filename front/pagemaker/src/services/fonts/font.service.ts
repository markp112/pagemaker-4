import type { GoogleFontItemInterface } from '@/classes/base/fonts/models/models';
import { useFontStore } from '@/stores/font.store';
import { axiosClient } from '../httpService';

export function FontService() {
  const BASE_ROUTE = '/private/fonts';

  async function getFontsFromGoogle() {
    const fontData = await axiosClient().get<GoogleFontItemInterface[]>(BASE_ROUTE);
    storeFonts(fontData);
  }

  async function storeFonts(fontData: GoogleFontItemInterface[]) {
    useFontStore().setFonts(fontData);
    useFontStore().setFontNames();
    useFontStore().initWebFonts();

  }

  return { getFontsFromGoogle };
}