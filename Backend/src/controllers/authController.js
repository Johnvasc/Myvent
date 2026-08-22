const {
  registerUser,
  authenticateUser,
  issueTokens,
  rotateRefreshToken,
  revokeRefreshToken,
  getUserEnableStatus,
  USER_TYPES
} = require('../services/authService');
const prisma = require('../lib/prisma');

const refreshCookieName = 'refreshToken';
const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/api/auth'
};

function setRefreshCookie(res, token) {
  const days = Number(process.env.REFRESH_TOKEN_DAYS || 7);
  res.cookie(refreshCookieName, token, {
    ...refreshCookieOptions,
    maxAge: days * 24 * 60 * 60 * 1000
  });
}

async function register(req, res, next) {
  try {
    const { username, password, userType: requestedType } = req.body;
    const normalizedType = String(requestedType || '').toLowerCase();
    if (!username || !password || !requestedType) {
      return res.status(400).json({ error: 'username, password e userType sao obrigatorios' });
    }
    const userType = normalizedType === 'user' ? USER_TYPES.USER :
      normalizedType === 'admin' ? USER_TYPES.ADMIN : null;
    if (!userType) return res.status(400).json({ error: 'userType deve ser user ou admin' });

    const isEnable = userType === USER_TYPES.USER;
    const user = await registerUser(username.trim(), password, userType, isEnable);
    if (!isEnable) {
      return res.status(202).json({ user, message: 'cadastro de admin aguardando aprovacao do master' });
    }

    const tokens = await issueTokens(user);
    setRefreshCookie(res, tokens.refreshToken);
    return res.status(201).json({ user, accessToken: tokens.accessToken });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'username ja cadastrado' });
    }
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'username e password sao obrigatorios' });
    }
    const isEnable = await getUserEnableStatus(username.trim());
    if (isEnable === false) {
      return res.status(403).json({ error: 'usuario ainda não foi atividado por um administrador' });
    }
    const user = await authenticateUser(username.trim(), password);
    if (!user) return res.status(401).json({ error: 'credenciais invalidas' });

    const tokens = await issueTokens(user);
    setRefreshCookie(res, tokens.refreshToken);
    return res.json({ user, accessToken: tokens.accessToken });
  } catch (error) {
    return next(error);
  }
}

async function refresh(req, res, next) {
  try {
    const tokens = await rotateRefreshToken(req.cookies[refreshCookieName]);
    if (!tokens) return res.status(401).json({ error: 'refresh token invalido ou expirado' });

    setRefreshCookie(res, tokens.refreshToken);
    return res.json({ accessToken: tokens.accessToken });
  } catch (error) {
    return next(error);
  }
}

async function logout(req, res, next) {
  try {
    await revokeRefreshToken(req.cookies[refreshCookieName]);
    res.clearCookie(refreshCookieName, refreshCookieOptions);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

async function listPendingAdmins(req, res, next) {
  try {
    const admins = await prisma.user.findMany({
      where: { userType: USER_TYPES.ADMIN, isEnable: false },
      select: { id: true, username: true, createdAt: true },
      orderBy: { createdAt: 'asc' }
    });
    return res.json(admins);
  } catch (error) {
    return next(error);
  }
}

async function approveAdmin(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'id invalido' });
    const result = await prisma.user.updateMany({
      where: { id, userType: USER_TYPES.ADMIN, isEnable: false },
      data: { isEnable: true }
    });
    if (result.count === 0) return res.status(404).json({ error: 'admin pendente nao encontrado' });
    return res.json({ message: 'admin aprovado' });
  } catch (error) {
    return next(error);
  }
}

module.exports = { register, login, refresh, logout, listPendingAdmins, approveAdmin };
