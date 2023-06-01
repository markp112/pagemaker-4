import { httpStatusCodes } from '@api/httpStatusCodes';
import { Response } from '@api/types';
import { constructResponse } from '@common/functions/constructResponse';
import { doc, setDoc, updateDoc } from '@firebase/firestore';
import { firebaseDb } from '@fbase/initFirebase';
import { commandGroups, COMMANDS, COMMAND_COLLECTION, COMMAND_ELEMENT_COLLECTION } from '../../commandGroups/controller';
import { Command, EditorButtonBase, TabGroup } from '../../commandGroups/model';
import { handleError } from '@errors/handleError';

function Commands() {

  async function get(): Promise<Response> {
    try {
      const commands = await commandGroups().getCommands();
      return constructResponse<EditorButtonBase[]>(commands, httpStatusCodes.OK)
    } catch (error) {
      handleError(error);
    }
  }

  async function post(command: Command): Promise<Response> {
    type Data = Omit<Command, 'key'>;
    const data: Data = {...command };
    const key = command.key;
    const dataToStore = { [key]: { ...data } };
    const docRef = doc(firebaseDb, COMMAND_COLLECTION, COMMANDS);
    await updateDoc(docRef, dataToStore);
    return constructResponse<Command>(command, httpStatusCodes.OK);
  }

  async function createPageElement(key: string, tabs: string[]): Promise<Response> {
    try {
      const docRef = doc(firebaseDb, COMMAND_COLLECTION, key);
      const dataToStore = { tabs };
      await setDoc(docRef, dataToStore);
      return constructResponse<string>(key, httpStatusCodes.OK);

    } catch (err) {
      handleError(err);
    }
  }

  async function addPageElementNameToCommandCollection(pageElementName: string): Promise<Response> {
    try {
      const docRef = doc(firebaseDb, COMMAND_COLLECTION, COMMAND_ELEMENT_COLLECTION);
      const commandElements = await commandGroups().getAllCommands();
      const dataToStore = { commandElements: [...commandElements.commandElements, pageElementName]};
      await updateDoc(docRef, dataToStore);
      return constructResponse<string>(pageElementName, httpStatusCodes.CREATED);
    } catch (err) {
      handleError(err);
    }
  }

  async function updatePageElementTabs(pageElementName: string, tabs: string[]): Promise<Response> {
    try {
      const docRef = doc(firebaseDb, COMMAND_COLLECTION, pageElementName);
      const dataTostore = { tabs };
      await updateDoc(docRef, dataTostore);
      return constructResponse<string[]>(tabs, httpStatusCodes.OK);
    } catch (err) {
      handleError(err);
    }
  }

  async function addTabGroup(tabGroup: TabGroup): Promise<Response> {
    try {
    const docRef = doc(firebaseDb, COMMAND_COLLECTION, tabGroup.key);
    await setDoc(docRef, tabGroup);
    return constructResponse<TabGroup>(tabGroup, httpStatusCodes.CREATED);
    } catch (err) {
      handleError(err);
    }
  }

  return { get,
    post,
    createPageElement,
    addPageElementNameToCommandCollection, 
    updatePageElementTabs,
    addTabGroup,
  };
}

export { Commands };
