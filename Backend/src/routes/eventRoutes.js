const express = require('express');
const { getEvents, getEvent, postEvent } = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');
const requireRoles = require('../middleware/roleMiddleware');
const { USER_TYPES } = require('../services/authService');

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEvent);
router.post('/', authMiddleware, requireRoles(USER_TYPES.ADMIN, USER_TYPES.MASTER), postEvent);

module.exports = router;
