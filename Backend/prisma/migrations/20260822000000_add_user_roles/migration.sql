-- Add platform roles and account activation state.
ALTER TABLE "User"
  ADD COLUMN "userType" INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN "isEnable" BOOLEAN NOT NULL DEFAULT true;
