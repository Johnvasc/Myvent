const express = require('express');
const { getEvents, getEvent, postEvent } = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEvent);
router.post('/', authMiddleware, postEvent);

module.exports = router;
