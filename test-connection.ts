import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Try to fetch something from the database
    const bills = await prisma.bill.findMany();
    console.log("✅ Database connected! Found bills:", bills.length);
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
