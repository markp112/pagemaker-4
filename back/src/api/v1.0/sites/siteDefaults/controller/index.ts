import { httpStatusCodes } from '@api/httpStatusCodes';
import { Response } from '@api/types';
import { constructResponse } from '@common/functions/constructResponse';
import { GenericError } from '@errors/index';
import { getDoc, doc } from '@firebase/firestore';
import { firebaseDb } from '@firebase/initFirebase';
import { logger } from '@logger/logger';
import { ColourSwatch, ColourSwatches, ColourSwatchesFirebase } from '../../model/colourPalette';

function SiteDefaultsController() {

    async function getDefaultPalette(): Promise<Response> {
      const response = await firebaseGetCollection('default-palette');
      const data = response.data() as unknown as ColourSwatchesFirebase
      const swatches: ColourSwatch[] = JSON.parse(data.colourSwatches);
      const colourSwatches: ColourSwatches = {
        baseColourHex: data.baseColourHex,
        colourScheme: data.colourScheme,
        colourSwatches: swatches
      }
      return constructResponse<ColourSwatches>(colourSwatches, httpStatusCodes.OK);
    }

    async function firebaseGetCollection(collectionName: string) {
      try {
        const collection = 'site-defaults';
        const docRef = doc(firebaseDb, collection, collectionName);
        return await getDoc(docRef);
      } catch (err) {
        logger.error(err);
        throw new GenericError(err);
      }
    }

    return {
      getDefaultPalette,
    }
}

export { SiteDefaultsController };
