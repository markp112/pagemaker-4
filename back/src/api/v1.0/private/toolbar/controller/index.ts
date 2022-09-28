import { Dimension } from '@common/models/dimension';
import { Location } from '@common/models/location';
import { getDocs, collection } from 'firebase/firestore';
import { firebaseDb } from '../../../../../firebase/initFirebase';
import { Response } from '@api/types';
import { GenericError } from '../../../../../common/errors/customErrors';
import { logger } from '../../../../../logger/index';

export type ComponentTypesString =
  | undefined
  | 'container'
  | 'jumbo'
  | 'button'
  | 'navBar'
  | 'pageTemplate'
  | 'text'
  | 'image'
  | 'rootContainer';

export interface Toolbar {
  componentName: string;
  dimension: Dimension;
  location: Location;
  classes: string;
  componentRef: string;
  isContainer: boolean;
  sidebarIcon: string;
  type: ComponentTypesString;
  tooltip: string;
};

function toolbarElements() {
  const COLLECTION = 'component-definitions';
  
  async function get(): Promise<Response> {
		try {

      console.log('%c⧭', 'color: #00bf00', firebaseDb);
			const firebaseResponse = await getDocs(collection(firebaseDb, COLLECTION));
      let toolbarElements: Toolbar[] = []; 
      firebaseResponse.docs.forEach(doc => {
        const toolbarElement = doc.data() as unknown as Toolbar;
        toolbarElements.push(toolbarElement);
        console.log('%c⧭', 'color: #ffa640', toolbarElements);
      });
      const response: Response = {
				data: toolbarElements,
				status: 200,
			};
      return response
    }
    catch (err) {
      logger.error(err);
      throw new GenericError(err);
    }
  }

  return { get };
}

export { toolbarElements };
