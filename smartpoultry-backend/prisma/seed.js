// Load env vars first — required before any Prisma imports
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const bcrypt = require("bcrypt");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting seed...");

  // ─── Clean existing data (order matters for FK constraints) ───────────────
  await prisma.auditLog.deleteMany();
  await prisma.alert.deleteMany();
  await prisma.report.deleteMany();
  await prisma.delivery.deleteMany();
  await prisma.logEntry.deleteMany();
  await prisma.batch.deleteMany();
  await prisma.farm.deleteMany();
  await prisma.user.deleteMany();

  // ─── Users ────────────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("password123", 10);
  const AdminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)

  const admin = await prisma.user.create({
    data: {
      name: "Kofi Mensah",
      email: "admin@smartpoultry.com",
      password: AdminPassword,
      role: "ADMIN",
    },
  });

  const manager = await prisma.user.create({
    data: {
      name: "Ama Owusu",
      email: "manager@smartpoultry.com",
      password: hashedPassword,
      role: "MANAGER",
    },
  });

  const worker = await prisma.user.create({
    data: {
      name: "Kwame Asante",
      email: "farmer@smartpoultry.com",
      password: hashedPassword,
      role: "WORKER",
    },
  });

  console.log("✅ Users created: admin, manager, farmer");

  // ─── Farm ─────────────────────────────────────────────────────────────────
  const farm = await prisma.farm.create({
    data: {
      name: "SmartPoultry Farm",
      location: "Accra, Ghana",
      userId: admin.id,
    },
  });

  console.log("✅ Farm created:", farm.name);

  // ─── Batches ──────────────────────────────────────────────────────────────
  // Batch A - Broilers (matches logbook entries LOG-001, LOG-002, LOG-005, LOG-007)
  const batchA = await prisma.batch.create({
    data: {
      batchNumber: "Batch A",
      farmId: farm.id,
      breed: "Broilers",
      initialCount: 2500,
      currentCount: 2491,
      status: "ACTIVE",
      startDate: new Date("2026-01-15"),
      notes: "Primary broiler batch — House A",
    },
  });

  // Batch B - Layers (matches logbook entries LOG-003, LOG-004)
  const batchB = await prisma.batch.create({
    data: {
      batchNumber: "Batch B",
      farmId: farm.id,
      breed: "Layers",
      initialCount: 1800,
      currentCount: 1797,
      status: "ACTIVE",
      startDate: new Date("2026-02-01"),
      notes: "Layer batch — House B",
    },
  });

  console.log("✅ Batches created: Batch A (Broilers), Batch B (Layers)");

  // ─── Log Entries (7 entries matching dummy.js logbookEntries) ─────────────
  const logEntries = [
    // LOG-001
    {
      batchId: batchA.id,
      userId: worker.id,
      date: new Date("2026-03-12"),
      mortality: 2,
      feedConsumption: 480,
      waterConsumption: 960,
      avgWeight: 2.1,
      temperature: 29,
      humidity: 68,
      notes: "Normal conditions",
    },
    // LOG-002
    {
      batchId: batchA.id,
      userId: worker.id,
      date: new Date("2026-03-11"),
      mortality: 1,
      feedConsumption: 475,
      waterConsumption: 950,
      avgWeight: 2.0,
      temperature: 28,
      humidity: 76,
      notes: "Humidity slightly high",
    },
    // LOG-003
    {
      batchId: batchB.id,
      userId: worker.id,
      date: new Date("2026-03-10"),
      mortality: 0,
      feedConsumption: 390,
      waterConsumption: 780,
      avgWeight: 1.8,
      temperature: 27,
      humidity: 70,
      notes: "All clear",
    },
    // LOG-004
    {
      batchId: batchB.id,
      userId: manager.id,
      date: new Date("2026-03-09"),
      mortality: 3,
      feedConsumption: 395,
      waterConsumption: 790,
      avgWeight: 1.8,
      temperature: 28,
      humidity: 72,
      notes: "Vet inspection done",
    },
    // LOG-005
    {
      batchId: batchA.id,
      userId: worker.id,
      date: new Date("2026-03-08"),
      mortality: 0,
      feedConsumption: 500,
      waterConsumption: 1000,
      avgWeight: 2.2,
      temperature: 30,
      humidity: 65,
      notes: "High production day",
    },
    // LOG-006
    {
      batchId: batchB.id,
      userId: worker.id,
      date: new Date("2026-03-07"),
      mortality: 1,
      feedConsumption: 310,
      waterConsumption: 620,
      avgWeight: 1.6,
      temperature: 27,
      humidity: 69,
      notes: "Feed adjusted",
    },
    // LOG-007
    {
      batchId: batchA.id,
      userId: worker.id,
      date: new Date("2026-03-06"),
      mortality: 2,
      feedConsumption: 488,
      waterConsumption: 976,
      avgWeight: 2.1,
      temperature: 29,
      humidity: 67,
      notes: "Normal",
    },
  ];

  await prisma.logEntry.createMany({ data: logEntries });
  console.log("✅ Log entries created: 7 entries (LOG-001 to LOG-007)");

  // ─── Alerts (matching dummy.js alerts) ────────────────────────────────────
  await prisma.alert.createMany({
    data: [
      {
        farmId: farm.id,
        batchId: null,
        userId: admin.id,
        type: "warning",
        message: "Humidity at 82% — above 75% threshold. Ventilation recommended.",
        severity: "MEDIUM",
        isResolved: false,
      },
      {
        farmId: farm.id,
        batchId: batchB.id,
        userId: manager.id,
        type: "info",
        message: "Batch B afternoon feeding is due in 30 minutes.",
        severity: "LOW",
        isResolved: false,
      },
      {
        farmId: farm.id,
        batchId: null,
        userId: admin.id,
        type: "success",
        message: "Egg yield forecast updated for next 10 days. Expected: 1,220 eggs/day.",
        severity: "LOW",
        isResolved: true,
        resolvedAt: new Date(),
      },
      {
        farmId: farm.id,
        batchId: batchA.id,
        userId: manager.id,
        type: "error",
        message: "3 deaths recorded today. Monitor health status closely.",
        severity: "HIGH",
        isResolved: false,
      },
    ],
  });

  console.log("✅ Alerts created: 4 alerts");

  // ─── Deliveries (matching dummy.js deliveries) ────────────────────────────
  await prisma.delivery.createMany({
    data: [
      {
        farmId: farm.id,
        userId: worker.id,
        type: "OTHER",
        supplier: "Kofi Supermart",
        quantity: 40,
        unit: "Crates",
        deliveryDate: new Date("2026-03-12"),
        notes: "Eggs (Crates) — Delivered. Driver: Kwame A.",
      },
      {
        farmId: farm.id,
        userId: worker.id,
        type: "OTHER",
        supplier: "Accra Fresh Market",
        quantity: 120,
        unit: "Birds",
        deliveryDate: new Date("2026-03-12"),
        notes: "Broilers (Live) — In Transit. Driver: Emmanuel B.",
      },
      {
        farmId: farm.id,
        userId: manager.id,
        type: "OTHER",
        supplier: "Good Shepherd Hotel",
        quantity: 25,
        unit: "Crates",
        deliveryDate: new Date("2026-03-13"),
        notes: "Eggs (Crates) — Pending. Driver: Unassigned.",
      },
    ],
  });

  console.log("✅ Deliveries created: 3 deliveries");

  // ─── Audit Log ────────────────────────────────────────────────────────────
  await prisma.auditLog.createMany({
    data: [
      { userId: admin.id, action: "CREATE", entity: "Farm", entityId: farm.id, details: { note: "Farm initialized" } },
      { userId: admin.id, action: "CREATE", entity: "Batch", entityId: batchA.id, details: { batchNumber: "Batch A" } },
      { userId: admin.id, action: "CREATE", entity: "Batch", entityId: batchB.id, details: { batchNumber: "Batch B" } },
      { userId: worker.id, action: "CREATE", entity: "LogEntry", entityId: null, details: { note: "7 log entries seeded" } },
    ],
  });

  console.log("✅ Audit log entries created");
  console.log("\n🎉 Seed completed successfully!");
  console.log("─────────────────────────────────────");
  console.log("  Admin   → admin@smartpoultry.com");
  console.log("  Manager → manager@smartpoultry.com");
  console.log("  Farmer  → farmer@smartpoultry.com");
  console.log("  Password (all): password123");
  console.log("─────────────────────────────────────");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
