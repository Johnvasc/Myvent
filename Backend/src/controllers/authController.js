const {
  registerUser,
  authenticateUser,
  issueTokens,
  rotateRefreshToken,
  revokeRefreshToken
} = require('../services/authService');

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
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'username e password sao obrigatorios' });
    }

    const user = await registerUser(username.trim(), password);
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

module.exports = { register, login, refresh, logout };
