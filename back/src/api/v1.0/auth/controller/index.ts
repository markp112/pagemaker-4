import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { GenericError } from '../../../../common/errors/customErrors';
import { auth as firebaseAuth } from '../../../../firebase/initFirebase';
import { logger } from '../../../../logger';
import type { Response } from '../../../types/index';

export type Credentials = {
  email: string;
  password: string;
};

function auth() {

	async function login(credentials: Credentials): Promise<Response>  {
		let response: Response;
		try {
			const user = await signInWithEmailAndPassword(firebaseAuth, credentials.email, credentials.password);
			response = {
				data: user.user.uid,
				status: 200,
			};
			return response;
		} catch (error) {
			logger.error(error.message);
			throw new GenericError(error.message);
		}
	}

	return { login };
}

export { auth };

