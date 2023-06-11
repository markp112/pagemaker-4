import { httpStatusCodes } from '@api/httpStatusCodes';
import { Response } from '@api/types';
import { constructResponse } from '@common/functions/constructResponse';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { firebaseDb } from '@fbase/initFirebase';
import { sitesController } from '../../controller';
import { ColourSwatch, ColourSwatches, ColourSwatchesFirebase } from '../../model/colourPalette';
import { FirebaseMaterialColours, MaterialColours } from '../../model/materialColours';
import { SiteTypography } from '../../model/typography';
import { handleError } from '@errors/handleError';

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

    async function getDefaultMaterialColours(): Promise<Response> {
      const firebaseResponse = await firebaseGetCollection('material-colours');
      const returnedData = firebaseResponse.data() as unknown as FirebaseMaterialColours;
      const materialColours = returnedData.materialColours; 
      return constructResponse(materialColours, httpStatusCodes.OK);
    }

    async function getDefaultTypography(): Promise<Response> {
      const firebaseResponse = await firebaseGetCollection('default-typography');
      const siteTypography = firebaseResponse.data() as unknown as SiteTypography;
      return constructResponse(siteTypography, httpStatusCodes.OK);
    }

    async function createMaterialColours(): Promise<Response> {
      const data = await sitesController().getSiteMaterialColours('hDkHXv0i06dVCPmIfRKefti9t4p1', '7de7de6c-3a9d-8464-8493-91ffdaf21fdd');
      const  materialColours = data.data as MaterialColours;
      const coloursCollection = 'site-defaults';
      const docRef = doc(firebaseDb, coloursCollection, 'material-colours');
      const colourPalette: FirebaseMaterialColours  = { materialColours };
      await setDoc(docRef, colourPalette);
      return constructResponse<MaterialColours>(materialColours, httpStatusCodes.OK)
    }

    async function firebaseGetCollection(collectionName: string) {
      try {
        const collection = 'site-defaults';
        const docRef = doc(firebaseDb, collection, collectionName);
        return await getDoc(docRef);
      } catch (err) {
        handleError(err);
      }
    }

    return {
      getDefaultPalette,
      getDefaultMaterialColours,
      createMaterialColours,
      getDefaultTypography,
    }
}

export { SiteDefaultsController };
