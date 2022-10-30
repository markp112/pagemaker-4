import { admin } from '../firebase/initFirebase';

function authMiddleware(req, res, next) {
  const LOGIN_ROUTE = '/api/v1.0/auth/login';
  const headerToken = req.headers.authorization;
  if (req.originalUrl === LOGIN_ROUTE) {
    next()
  } else {

    console.log('%c⧭', 'color: #cc0088', req.originalUrl, 'route');
    if (!headerToken) {
      return res.send({ message: 'No token provided' }).status(401);
    }
    if (headerToken && headerToken.split(' ')[0] !== 'Bearer') {
      res.send({ message: 'Invalid token' }).status(401);
    }
    const token = headerToken.split(' ')[1];
    admin
    .auth()
    .verifyIdToken(token)
    .then(() => next())
    .catch(() => res.send({ message: 'Could not authorize' }).status(403));
  }
}

export { authMiddleware };
