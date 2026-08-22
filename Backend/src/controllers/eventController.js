const { listEvents, findEvent, createEvent } = require('../services/eventService');

async function getEvents(_req, res, next) {
  try {
    return res.json(await listEvents());
  } catch (error) {
    return next(error);
  }
}

async function getEvent(req, res, next) {
  try {
    const event = await findEvent(Number(req.params.id));
    if (!event) return res.status(404).json({ error: 'evento nao encontrado' });
    return res.json(event);
  } catch (error) {
    return next(error);
  }
}

async function postEvent(req, res, next) {
  try {
    const { title, description, date, location, imageUrl, category, price, status } = req.body;
    if (!title || !date || !location) {
      return res.status(400).json({ error: 'title, date e location sao obrigatorios' });
    }
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: 'date invalida' });
    }

    const event = await createEvent(
      { title, description, date: parsedDate, location, imageUrl, category, price, status },
      Number(req.user.sub)
    );
    return res.status(201).json(event);
  } catch (error) {
    return next(error);
  }
}

module.exports = { getEvents, getEvent, postEvent };
