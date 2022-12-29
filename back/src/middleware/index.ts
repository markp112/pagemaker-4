import { admin } from '../firebase/initFirebase';

const nonAuthRoutes = {
  '/api/v1.0/auth/login': true,
  '/api/v1.0/private/menus/navmenu/true': true,
  '/api/v1.0/private/fonts': true,
  '/api/v1.0/sites/defaults/create': true,
};

const routeDoesNotRequireAuth = (requestedUrl: string): boolean => {
  return nonAuthRoutes[requestedUrl];
};

function authMiddleware(req, res, next) {
  const headerToken = req.headers.authorization;
  if (routeDoesNotRequireAuth(req.originalUrl)) {
    next();
  } else {
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
