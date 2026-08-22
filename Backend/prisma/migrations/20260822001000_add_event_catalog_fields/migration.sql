ALTER TABLE "Event"
  ADD COLUMN "category" TEXT NOT NULL DEFAULT 'Geral',
  ADD COLUMN "price" TEXT NOT NULL DEFAULT 'Entrada Grátis',
  ADD COLUMN "status" TEXT NOT NULL DEFAULT 'Disponível';