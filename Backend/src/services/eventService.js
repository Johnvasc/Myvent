const prisma = require('../lib/prisma');

const publicEvent = {
  id: true,
  title: true,
  description: true,
  date: true,
  location: true,
  imageUrl: true,
  creatorId: true,
  createdAt: true,
  updatedAt: true
};

async function listEvents() {
  return prisma.event.findMany({
    orderBy: { date: 'asc' },
    select: publicEvent
  });
}

async function findEvent(id) {
  return prisma.event.findUnique({ where: { id }, select: publicEvent });
}

async function createEvent(data, creatorId) {
  return prisma.event.create({
    data: { ...data, creatorId },
    select: publicEvent
  });
}

module.exports = { listEvents, findEvent, createEvent };
