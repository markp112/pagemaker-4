import { constructResponse } from '../../../../common/functions/constructResponse';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth as firebaseAuth } from '../../../../firebase/initFirebase';
import { logger } from '../../../../logger/index';
import type { Response } from 'api/types';
import { ResourceNotFoundError, GenericError } from '../../../../common/errors';

export type Credentials = {
  email: string;
  password: string;
};

type User = {
  email: string,
  uid: string,
  displayName: string,
  tokenId: string,
};

function auth() {

	async function login(credentials: Credentials): Promise<Response>  {
		try {
			const firebaseCredentials = await signInWithEmailAndPassword(firebaseAuth, credentials.email, credentials.password);
			const token = await  firebaseCredentials.user.getIdToken();
			const userInfo = firebaseCredentials.user;
			const user: User = { uid:  userInfo.uid, email:  userInfo.email, displayName:  userInfo.displayName, tokenId: token };
			return constructResponse<User>(user, 200);
		} catch (error) {
			logger.error(error);
			switch(error.code) {
				case 'auth/user-not-found':
				case 'auth/wrong-password':
					throw new ResourceNotFoundError(credentials.email);
				default:
					throw new GenericError(error.message);
			}
		}
	}

	return { login };
}

export { auth };

