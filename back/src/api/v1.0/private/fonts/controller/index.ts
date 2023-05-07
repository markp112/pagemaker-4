import { Response } from '@api/types';
import { constructResponse } from '@common/functions/constructResponse';
import axios from 'axios';
import * as secrets from '../../../../../secrets/firebase-config.json'
import { GoogleFontItemInterface } from './model';
import { handleError } from '@errors/handleError';

export function fontsController() {
  const GOOGLE_API = "https://www.googleapis.com/webfonts/v1/webfonts";
  const key = secrets.fontsAPIKey;

  async function getGoogleFonts(): Promise<Response> {
    try {
      const fontData = await getFontsFromGoogle() as GoogleFontItemInterface[];
      return constructResponse<GoogleFontItemInterface[]>(fontData, 200);
    } catch (error) {
      handleError(error);
    }
  }
  
  async function getFontsFromGoogle() {
    const fontData = await axios.get(`${GOOGLE_API}?key=${key}`);
    return fontData.data.items;
  }

  return { getGoogleFonts }
}
