const express = require('express');
const { register, login, refresh, logout, listPendingAdmins, approveAdmin } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const requireRoles = require('../middleware/roleMiddleware');
const { USER_TYPES } = require('../services/authService');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/pending-admins', authMiddleware, requireRoles(USER_TYPES.MASTER), listPendingAdmins);
router.patch('/admins/:id/approve', authMiddleware, requireRoles(USER_TYPES.MASTER), approveAdmin);

module.exports = router;
