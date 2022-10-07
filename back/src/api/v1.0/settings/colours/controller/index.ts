import { constructResponse } from '../../../../../common/functions/constructResponse';
import { Response } from '@api/types';
import { collection, getDocs } from 'firebase/firestore';
import { firebaseDb } from '../../../../../firebase/initFirebase';
import { GenericError } from '../../../../../common/errors/customErrors';
import { logger } from '../../../../../logger/logger';

type Colour = {
  colourName: string;
  value: string;
};

function colourSettings() {

  const COLLECTION = 'default-colours';

  async function getDefaultColours(userId: string, siteId: string): Promise<Response> {
    try {
      const userSiteCollection = `${userId}::${siteId}::${COLLECTION}`
      const firebaseResponse = await getDocs(collection(firebaseDb, userSiteCollection));
      const defaultColours: Colour[] = [];
      firebaseResponse.docs.forEach(doc => {
        const colour = doc.data() as unknown as Colour;
        defaultColours.push(colour);
      });

      return constructResponse<Colour[]>(defaultColours, 200);
    } catch (err) {
      logger.error(err);
      throw new GenericError(err);
    }
    }

    return { getDefaultColours }
  }

  export { colourSettings };
