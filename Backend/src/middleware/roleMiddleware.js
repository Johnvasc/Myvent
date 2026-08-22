function requireRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(Number(req.user.userType))) {
      return res.status(403).json({ error: 'permissao insuficiente' });
    }
    return next();
  };
}

module.exports = requireRoles;