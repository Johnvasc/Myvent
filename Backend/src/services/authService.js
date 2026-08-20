const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');

const jwtSecret = process.env.JWT_SECRET;
const accessTokenExpiresIn = process.env.JWT_EXPIRES_IN || '15m';
const refreshTokenDays = Number(process.env.REFRESH_TOKEN_DAYS || 7);

function assertJwtSecret() {
  if (!jwtSecret) throw new Error('JWT_SECRET nao configurado');
}

function createAccessToken(user) {
  assertJwtSecret();
  return jwt.sign(
    { sub: String(user.id), username: user.username },
    jwtSecret,
    { expiresIn: accessTokenExpiresIn }
  );
}

async function createRefreshToken(userId) {
  const token = crypto.randomBytes(48).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const expiresAt = new Date(Date.now() + refreshTokenDays * 24 * 60 * 60 * 1000);

  await prisma.refreshToken.create({ data: { tokenHash, userId, expiresAt } });
  return token;
}

async function issueTokens(user) {
  return {
    accessToken: createAccessToken(user),
    refreshToken: await createRefreshToken(user.id)
  };
}

async function rotateRefreshToken(token) {
  if (!token) return null;
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const storedToken = await prisma.refreshToken.findUnique({
    where: { tokenHash },
    include: { user: true }
  });

  if (!storedToken || storedToken.expiresAt <= new Date()) return null;

  await prisma.refreshToken.delete({ where: { id: storedToken.id } });
  return issueTokens(storedToken.user);
}

async function revokeRefreshToken(token) {
  if (!token) return;
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  await prisma.refreshToken.deleteMany({ where: { tokenHash } });
}

async function registerUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { username, passwordHash },
    select: { id: true, username: true, createdAt: true }
  });
}

async function authenticateUser(username, password) {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) return null;

  return { id: user.id, username: user.username, createdAt: user.createdAt };
}

module.exports = {
  registerUser,
  authenticateUser,
  issueTokens,
  rotateRefreshToken,
  revokeRefreshToken
};
