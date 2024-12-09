// @ts-nocheck

function authMiddleware(req, res, next) {
  try {
    const token  = req.headers.authorization.split(' ')[1];
    if (!token) {
      return next(res.status(401).send('Not authenticated!'));
    }
    next();
  } catch (error) {
    return next(res.status(401).send('Not authenticated!'));
  }
};

export default authMiddleware
