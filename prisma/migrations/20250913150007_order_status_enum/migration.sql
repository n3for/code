-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ServiceOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "assignedToId" INTEGER,
    CONSTRAINT "ServiceOrder_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ServiceOrder_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ServiceOrder" ("assignedToId", "createdAt", "description", "id", "status", "updatedAt", "vehicleId") SELECT "assignedToId", "createdAt", "description", "id", "status", "updatedAt", "vehicleId" FROM "ServiceOrder";
DROP TABLE "ServiceOrder";
ALTER TABLE "new_ServiceOrder" RENAME TO "ServiceOrder";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
