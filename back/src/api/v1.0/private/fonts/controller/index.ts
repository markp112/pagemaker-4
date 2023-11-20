import { Response } from '@api/types';
import { constructResponse } from '@common/functions/constructResponse';
import axios from 'axios';
import * as secrets from '../../../../../secrets/firebase-config.json'
import { GoogleFontItemInterface } from './model';
import { handleError } from '@errors/handleError';
import { memoize } from '@decorators/memoize/memoize';
import { httpStatusCodes } from '@api/httpStatusCodes';
import { logger } from '@logger/pino';

export class FontsController {

  constructor(private api: string, private key: string) {}

  @memoize
  public async fetchFonts(): Promise<Response> {
    try {
      const fontData = await this.getFontsFromGoogle() as GoogleFontItemInterface[];
      logger.info('%c⧭', 'color: #99adcc', fontData);
      return constructResponse<GoogleFontItemInterface[]>(fontData, httpStatusCodes.OK);
    } catch (error) {
      handleError(error);
    }
  }

  private async getFontsFromGoogle() {
    const fontData = await axios.get(`${this.api}?key=${this.key}`);
    return fontData.data.items;
  }

}

export function fontsController() {
  const GOOGLE_API = "https://www.googleapis.com/webfonts/v1/webfonts";
  const key = secrets.fontsAPIKey;
  async function getGoogleFonts(): Promise<Response> {
    try {
      const fontData = await getFontsFromGoogle() as GoogleFontItemInterface[];
      return constructResponse<GoogleFontItemInterface[]>(fontData, httpStatusCodes.OK);
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
