import { Dimension } from '@common/models/dimension';
import { Location } from '@common/models/location';
import { getDocs, collection, setDoc, updateDoc, doc } from 'firebase/firestore';
import { firebaseDb } from '@fbase/initFirebase';
import { Response } from '@api/types';
import { handleError } from '@errors/handleError';
import { constructResponse } from '@common/functions/constructResponse';
import { httpStatusCodes } from '@api/httpStatusCodes';
import { logger } from '@logger/pino';
import { admin } from '@fbase/initFirebase';

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
  componentHTMLTag: string;
};

function toolbarElements() {
  const COLLECTION = 'component-definitions';
  
  async function get(): Promise<Response> {
		try {
			const firebaseResponse = await getDocs(collection(firebaseDb, COLLECTION));
      const toolbarElements: Toolbar[] = []; 
      firebaseResponse.docs.forEach(doc => {
        const toolbarElement = doc.data() as unknown as Toolbar;
        toolbarElements.push(toolbarElement);
      });
      const response: Response = {
				data: toolbarElements,
				status: 200,
			};
      return response
    }
    catch (err) {
      handleError(err);
    }
  }

  async function saveToolbarElement(toolbarElement: Toolbar) {
    try {
      const docRef = doc(firebaseDb, COLLECTION, toolbarElement.componentName);
      await setDoc(docRef, toolbarElement);
      return constructResponse<Toolbar>(toolbarElement, httpStatusCodes.OK);
    } catch (err) {
      handleError(err);
    }
  }

  async function updateToolbarElement(toolbarElement: Toolbar) {
    try {
      logger.info(toolbarElement.componentName);
      const collectionRef = admin.firestore().collection(COLLECTION);
      const ref = collectionRef.doc(toolbarElement.componentName);
      await ref.update({...toolbarElement})
      return constructResponse<Toolbar>(toolbarElement, httpStatusCodes.OK);
    } catch (err) {
      console.log('%c⧭', 'color: #7f7700', err);
      handleError(err);
    }
  }

  return { 
    get,
    saveToolbarElement,
    updateToolbarElement };
}

export { toolbarElements };
