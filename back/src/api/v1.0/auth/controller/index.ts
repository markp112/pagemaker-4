import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { GenericError, ResourceNotFoundError } from '../../../../common/errors/customErrors';
import { auth as firebaseAuth } from '../../../../firebase/initFirebase';
import { logger } from '../../../../logger';
import type { Response } from '../../../types/index';

export type Credentials = {
  email: string;
  password: string;
};

function auth() {

	async function login(credentials: Credentials): Promise<Response>  {
		try {
			const user = await signInWithEmailAndPassword(firebaseAuth, credentials.email, credentials.password);
			const response = {
				data: { uid: user.user.uid, email: user.user.email, displayName: user.user.displayName, tokenId: user.user.getIdToken },
				status: 200,
			};
			return response;
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

