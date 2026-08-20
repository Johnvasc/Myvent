const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization;
  const [scheme, token] = authorization ? authorization.split(' ') : [];

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'token de acesso obrigatorio' });
  }

  try {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET nao configurado');
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (_error) {
    return res.status(401).json({ error: 'token de acesso invalido ou expirado' });
  }
}

module.exports = authMiddleware;
